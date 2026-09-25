import React, { useState, useMemo, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, SafeAreaView, Alert } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { store, RootState } from './src/store';
import { setUserLogin, clearUserLogin, updateUserProfile } from './src/store/userSlice';
import { recordPurchase, updateHealthMeter, resetProgress } from './src/store/progressSlice';
import { reduxAddToCart, reduxClearCart } from './src/store/cartSlice';
import { NavigationProvider, useNavigation } from './src/navigation/Navigation';
import { UserProvider, useUser } from './src/context/UserContext';
import { CartProvider, useCart } from './src/context/CartContext';
import { getStoredToken, simulateLogout } from './src/utils/authService';
import { clearSessionStorage, getStoredJson, saveStoredJson, STORAGE_KEYS } from './src/utils/storage';
import { SplashScreen } from './src/screens/SplashScreen';

import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { EditProfileScreen } from './src/screens/EditProfileScreen';
import { AddressScreen } from './src/screens/AddressScreen';
import { CheckoutScreen } from './src/screens/CheckoutScreen';
import { FeedbackScreen } from './src/screens/FeedbackScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { DishDetailsScreen } from './src/screens/DishDetailsScreen';
import { CartSummaryScreen } from './src/screens/CartSummaryScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { OrderTrackingScreen } from './src/screens/OrderTrackingScreen';
import { MenuScreen } from './src/screens/MenuScreen';
import { RestaurantsScreen } from './src/screens/RestaurantsScreen';
import { DrawerPanel } from './src/components/DrawerPanel';
import { Dish, ComboMeal } from './src/data/mockData';
import { HomeIcon, CartIcon, ProfileIcon } from './src/components/Icons';

export default function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <CartProvider>
          <SafeAreaProvider>
            <NavigationProvider>
              <AppContent />
            </NavigationProvider>
          </SafeAreaProvider>
        </CartProvider>
      </UserProvider>
    </Provider>
  );
}

function AppContent() {
  const {
    currentScreen,
    currentParams,
    navigate,
    goBack,
    drawerOpen,
    openDrawer,
    closeDrawer,
  } = useNavigation();

  const [hasActiveOrder, setHasActiveOrder] = useState(false);

  // Redux hooks
  const dispatch = useDispatch();
  const reduxUser = useSelector((state: RootState) => state.user);
  const progressState = useSelector((state: RootState) => state.progress);

  // Context hooks
  const { user, login, logout } = useUser();
  const { cartItems, addToCart, clearCart, setSelectedCuisine, setSearchQuery, finalTotal, discountAmount, bestCoupon } = useCart();

  const [isSessionRestored, setIsSessionRestored] = useState(false);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const token = await getStoredToken();
        if (token) {
          const simulatedEmail = 'user@foodexpress.com';
          login(simulatedEmail);
          dispatch(setUserLogin(simulatedEmail));
          setIsSessionRestored(true);
        }

        const savedHealthMeter = await getStoredJson<number>(STORAGE_KEYS.healthMeter, progressState.healthMeterInput);
        if (savedHealthMeter) {
          dispatch(updateHealthMeter(savedHealthMeter));
        }
      } catch (e) {
        console.error('Session restore failed:', e);
      }
    };
    restoreSession();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    saveStoredJson(STORAGE_KEYS.healthMeter, progressState.healthMeterInput);
  }, [progressState.healthMeterInput]);

  const handleAutoTransition = () => {
    if (isSessionRestored) {
      navigate('home');
    } else {
      navigate('login');
    }
  };

  // Calculate dynamic deal value score & update Redux
  const dietScore = useMemo(() => {
    if (cartItems.length === 0) {
      return 75; // baseline value score
    }
    const totalScore = cartItems.reduce((acc, curr) => {
      // Calculate value based on discounts instead of health
      let itemValue = 30; // Default low value for standard items
      if (curr.dish.discountPercent) {
        // High value for flash deals
        itemValue = Math.min(100, 50 + curr.dish.discountPercent * 1.5);
      } else if (curr.dish.id.startsWith('c')) {
        // Combos inherently have good value
        itemValue = 85;
      }
      return acc + itemValue * curr.quantity;
    }, 0);
    const totalCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);
    const score = Math.round(totalScore / totalCount);
    dispatch(updateHealthMeter(score));
    return score;
  }, [cartItems, dispatch]);

  const handleAddToCart = (dish: Dish) => {
    // Sync to Context and Redux
    addToCart(dish);
    dispatch(reduxAddToCart(dish));
  };

  const handleAddComboToCart = (combo: ComboMeal) => {
    const simulatedDish: Dish = {
      id: combo.id,
      name: combo.name,
      cuisine: 'Fast Food',
      description: `Combo meal covering ${combo.cuisineCoverage}`,
      spiceLevel: combo.spiceLevel,
      price: combo.price,
      rating: 4.8,
      deliveryTime: combo.prepTime,
      cravingScore: 90,
      healthScore: 60,
      color: combo.color,
      emoji: combo.emoji,
      imageUrl: combo.imageUrl,
      restaurantId: 'combo_hub',
      restaurantName: 'Combo Hub',

    };
    handleAddToCart(simulatedDish);
  };


const handlePlaceOrder = () => {
    const orderItemsSummary = cartItems.map((item) => `${item.dish.name} (x${item.quantity})`).join(', ');

    // Dispatch details to Redux Progress Slice using auto-applied best coupon
    dispatch(recordPurchase({ spend: finalTotal, savings: discountAmount }));

    // Push local notification or list trigger
    const newOrder = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      items: orderItemsSummary,
      total: finalTotal,
    };

    // Store order into context mock list by navigating
    setHasActiveOrder(true);
    navigate('tracking', { newOrder });

    // Clear cart in Redux & Context
    clearCart();
    dispatch(reduxClearCart());
  };

  const cartCount = cartItems.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleLogout = async () => {
    await simulateLogout();
    await clearSessionStorage();
    Alert.alert('Logged Out ðŸšª', 'You have been logged out successfully.');
    logout();
    clearCart();
    setSelectedCuisine(null);
    setSearchQuery('');
    dispatch(clearUserLogin());
    setHasActiveOrder(false);
    dispatch(resetProgress());
    navigate('login');
  };

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onAutoTransition={handleAutoTransition} />;
      case 'login':
        return (
          <LoginScreen
            onLoginSuccess={(email) => {
              login(email);
              dispatch(setUserLogin(email));
              navigate('home');
            }}
            onSkip={() => navigate('home')}
            onSignUp={() => navigate('register')}
          />
        );
      case 'register':
        return (
          <RegisterScreen
            onRegisterSuccess={(data) => {
              dispatch(updateUserProfile({
                name: data.fullName,
                email: data.email,
                phone: data.mobileNumber,
                address: data.address,
              }));
              dispatch(setUserLogin(data.email));
              navigate('home');
            }}
            onBack={goBack}
          />
        );
      case 'home':
        return (
          <HomeScreen
            onSelectDish={(dish) => navigate('details', { dish })}
            onAddToCart={handleAddToCart}
            onAddComboToCart={handleAddComboToCart}
            cartCount={cartCount}
            dietScore={dietScore}
            onNavigateToCart={() => navigate('cart')}
            onNavigateToProfile={() => navigate('profile')}
            onOpenDrawer={openDrawer}
          />
        );
      case 'details':
        const dishParam = currentParams?.dish as Dish;
        if (!dishParam) {
          navigate('home');
          return null;
        }
        return (
          <DishDetailsScreen
            dish={dishParam}
            onBack={goBack}
            onAddToCart={(dish) => {
              handleAddToCart(dish);
              navigate('home');
            }}
          />
        );
      case 'cart':
        return (
          <CartSummaryScreen
            onBack={goBack}
            onCheckout={() => navigate('checkout')}
          />
        );
case 'checkout':
        return (
          <CheckoutScreen
            cartTotal={finalTotal}
            couponCode={bestCoupon?.code}
            discountAmount={discountAmount}
            cartItems={cartItems}
            onPlaceOrder={handlePlaceOrder}
            onCancel={goBack}
          />
        );
      case 'profile':
        return (
          <ProfileScreen
            userEmail={reduxUser.email || user?.email || ''}
            userName={reduxUser.name || 'Gourmet Explorer'}
            userPhone={reduxUser.phone || '+91 98765 43210'}
            userAddress={reduxUser.address || 'Flat 402, Springdale Apartments, Indiranagar, Bengaluru - 560038'}
            pastOrders={[]} // past orders calculated via Redux or custom list hooks
            onBack={goBack}
            onLogout={handleLogout}
            onEditProfile={() => navigate('editProfile')}
            onSavedAddresses={() => navigate('address')}
          />
        );
      case 'editProfile':
        return (
          <EditProfileScreen
            initialEmail={reduxUser.email || user?.email || ''}
            initialName={reduxUser.name || 'Gourmet Explorer'}
            initialPhone={reduxUser.phone || '9876543210'}
            onSave={(data) => {
              dispatch(updateUserProfile({
                name: data.fullName,
                phone: data.phoneNumber,
                email: data.email,
              }));
              navigate('profile');
            }}
            onBack={goBack}
          />
        );
      case 'address':
        return (
          <AddressScreen
            onSave={(addressStr) => {
              dispatch(updateUserProfile({ address: addressStr }));
              navigate('profile');
            }}
            onBack={goBack}
          />
        );
      case 'feedback':
        return (
          <FeedbackScreen
            onSubmit={() => navigate('home')}
            onBack={goBack}
          />
        );
      case 'restaurants':
        return <RestaurantsScreen onAddToCart={handleAddToCart} onNavigateToCart={() => navigate('cart')} />;
      case 'menu':
        return (
          <MenuScreen
            onSelectDish={(dish) => navigate('details', { dish })}
            onAddToCart={handleAddToCart}
          />
        );
      case 'tracking':
        return <OrderTrackingScreen hasActiveOrder={hasActiveOrder} onBackToHome={() => navigate('home')} />;
      default:
        return <SplashScreen onAutoTransition={() => navigate('login')} />;
    }
  };

  const isTabBarVisible = ['home', 'menu', 'restaurants', 'cart', 'profile', 'tracking'].includes(currentScreen);

  return (
    <View style={styles.container}>
      <View style={styles.contentArea}>{renderActiveScreen()}</View>

      <DrawerPanel
        isOpen={drawerOpen}
        onClose={closeDrawer}
        onNavigate={(screen) => navigate(screen)}
        onLogout={handleLogout}
      />

      {isTabBarVisible && (
        <SafeAreaView style={styles.bottomNavContainer}>
          <View style={styles.bottomNav}>
            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigate('home')}
              activeOpacity={0.8}
            >
              <HomeIcon size={22} color={currentScreen === 'home' ? '#FF5200' : '#888'} />
              <Text style={[styles.navText, currentScreen === 'home' && styles.navTextActive]}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigate('restaurants')}
              activeOpacity={0.8}
            >
              <View style={styles.mockMenuIcon}>
                <Text style={[styles.menuDot, currentScreen === 'restaurants' ? { color: '#FF5200' } : { color: '#888' }]}>ðŸ½ï¸</Text>
              </View>
              <Text style={[styles.navText, currentScreen === 'restaurants' && styles.navTextActive]}>Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigate('tracking')}
              activeOpacity={0.8}
            >
              <View style={styles.mockMenuIcon}>
                <Text style={[styles.menuDot, currentScreen === 'tracking' ? { color: '#FF5200' } : { color: '#888' }]}>ðŸ›µ</Text>
              </View>
              <Text style={[styles.navText, currentScreen === 'tracking' && styles.navTextActive]}>Orders</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigate('cart')}
              activeOpacity={0.8}
            >
              <View style={styles.cartIconContainer}>
                <CartIcon size={22} color={currentScreen === 'cart' ? '#FF5200' : '#888'} />
                {cartCount > 0 && (
                  <View style={styles.navCartBadge}>
                    <Text style={styles.navCartBadgeText}>{cartCount}</Text>
                  </View>
                )}
              </View>
              <Text style={[styles.navText, currentScreen === 'cart' && styles.navTextActive]}>Cart</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navItem}
              onPress={() => navigate('profile')}
              activeOpacity={0.8}
            >
              <ProfileIcon size={22} color={currentScreen === 'profile' ? '#FF5200' : '#888'} />
              <Text style={[styles.navText, currentScreen === 'profile' && styles.navTextActive]}>Profile</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  contentArea: {
    flex: 1,
  },
  bottomNavContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  bottomNav: {
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: 6,
  },
  navText: {
    fontSize: 10,
    color: '#888',
    fontWeight: '700',
    marginTop: 4,
  },
  navTextActive: {
    color: '#FF5200',
  },
  mockMenuIcon: {
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuDot: {
    fontSize: 18,
    lineHeight: 22,
  },
  cartIconContainer: {
    position: 'relative',
  },
  navCartBadge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#FF5200',
    borderRadius: 7,
    width: 14,
    height: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navCartBadgeText: {
    color: '#FFF',
    fontSize: 8,
    fontWeight: '900',
  },
});



