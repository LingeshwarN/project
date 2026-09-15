# Experiment 5 (CO3) — User Interaction Forms (Without Validation)

**Project:** FoodExpress — React Native Food Delivery App

## Objective

Design attractive, user-friendly forms for customer interactions **before validation logic is added**. All user-entered values are stored temporarily using React Hooks (`useState`) without any input validation.

## Forms Implemented

### 1. Registration Form — `src/screens/RegisterScreen.tsx`

| Field | React Native Component | State Hook |
|---|---|---|
| Full Name | `TextInput` | `useState('')` |
| Mobile Number | `TextInput` (`keyboardType="phone-pad"`) | `useState('')` |
| Email Address | `TextInput` (`keyboardType="email-address"`, `autoCapitalize="none"`) | `useState('')` |
| Password | `TextInput` (`secureTextEntry`) | `useState('')` |
| Confirm Password | `TextInput` (`secureTextEntry`) | `useState('')` |
| Gender | `TouchableOpacity` chips (Male / Female / Other) | `useState('Male')` |
| Date of Birth | `TouchableOpacity` + custom `Modal` wheel picker (Day/Month/Year) | `useState('')` |
| City | `TextInput` | `useState('')` |
| Address | `TextInput` (`multiline`) | `useState('')` |
| Accept Terms | `Switch` | `useState(false)` |
| Register button | `TouchableOpacity` → `Alert.alert(...)` + navigate Home | — |

Sections are grouped as *Personal Details*, *Account Security*, and *Location*.

### 2. Profile Edit Form — `src/screens/EditProfileScreen.tsx`

| Field | Component | State Hook |
|---|---|---|
| Profile Picture | Tappable avatar circle → emoji picker in a `Modal` grid | `useState('🧑')` |
| Full Name | `TextInput` | pre-filled from Redux user |
| Phone Number | `TextInput` (`phone-pad`) | pre-filled from Redux user |
| Email Address | `TextInput` (`email-address`) | pre-filled from Redux user |
| Save Changes button | `TouchableOpacity` → `Alert.alert(...)` + back to Profile | — |

### 3. Address Form — `src/screens/AddressScreen.tsx`

| Field | Component | State Hook |
|---|---|---|
| House/Flat Number | `TextInput` | `useState('')` |
| Street / Landmark | `TextInput` | `useState('')` |
| City & State | Two `TextInput`s side-by-side (responsive `flex: 1` row) | `useState('')` each |
| Pincode | `TextInput` (`number-pad`) | `useState('')` |
| Address Type | `TouchableOpacity` chips (🏠 Home / 💼 Work / 📍 Other) | `useState('Home')` |
| Save Address button | `TouchableOpacity` → `Alert.alert(...)` + back to Profile | — |

### 4. Checkout / Confirm Order Form — `src/screens/CheckoutScreen.tsx`

| Field | Component | State Hook |
|---|---|---|
| Customer Name | `TextInput` | `useState('')` |
| Delivery Address | `TextInput` (`multiline`) | `useState('')` |
| Payment Mode | `TouchableOpacity` option cards (💳 Credit Card / 📱 UPI / 💵 Cash on Delivery) | `useState('Credit Card')` |
| Order Summary | Itemized card: each dish × qty with price, divider, Total to Pay | from Cart Context |
| Place Order button | `TouchableOpacity` → success `Modal` 🎉 → Track Order screen | — |
| Cancel button | `TouchableOpacity` → `goBack()` | — |

### 5. Feedback Form — `src/screens/FeedbackScreen.tsx`

| Field | Component | State Hook |
|---|---|---|
| Name | `TextInput` | `useState('')` |
| Star Rating (1–5) | Five tappable ★ / ☆ `TouchableOpacity` buttons with live label (Poor→Excellent) | `useState(0)` |
| Suggestions | `TextInput` (`multiline`) | `useState('')` |
| Recommend Switch | `Switch` inside a labeled card | `useState(true)` |
| Submit Feedback button | `TouchableOpacity` → `Alert.alert(...)` + back to Home | — |

## Reusable Styling & Responsive Layout

All forms reuse the shared design system developed in previous experiments:

- **Header pattern:** back button (`BackIcon`) + centered title + spacer.
- **Labeled inputs:** uppercase labels above rounded (`borderRadius: 12`) bordered inputs on a `#FAF9F6` background.
- **Chip selectors:** pill-shaped `TouchableOpacity` groups with active state (`#FF5200` border, `#FFF0E6` fill) for Gender, Address Type, and Payment Mode.
- **Primary CTA:** orange (`#FF5200`) rounded buttons with elevation/shadow.
- **Responsive rows:** `flexDirection: 'row'` with `flex: 1` children (City/State pair), `flexWrap` grids (avatar picker).
- **Keyboard handling:** `KeyboardAvoidingView` (`padding` on iOS, `height` on Android) wrapping a `ScrollView` with `keyboardShouldPersistTaps="handled"`.

## Navigation Between Forms

Custom context-based navigation (`src/navigation/Navigation.tsx`) with history-based `goBack()`:

```
Splash → Login ⇄ Register
Login/Skip → Home
Home → Dish Details → Cart → Checkout → Order Tracking
Profile → Edit Profile → (back)
Profile → Saved Addresses → (back)
Drawer (☰) → Provide Feedback → (back)
```

## Notes

- No validation is performed anywhere in these forms (per experiment scope). `src/utils/validators.ts` remains untouched so validation can be layered in during the next experiment.
- Buttons respond immediately; values live only in component state until submitted to Redux (`updateUserProfile`) or discarded.