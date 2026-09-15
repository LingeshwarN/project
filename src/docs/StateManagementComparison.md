# Food Express State Management Strategy

This document outlines when to use **React Local State (useState)**, **Context API**, and **Redux Toolkit** in the Food Express mobile architecture, updated for Experiment 4.

---

## 1. Local State (`useState`)
### Scope
Component-specific, short-lived, or ephemeral state that is only relevant within a single view, modal, or form. It resets when the component unmounts.

### Food Express Scenarios
* **Interactive Per-Dish Ratings**: The temporary rating state (`localRating` inside `DishDetailsScreen`) that the user interacts with before saving it globally.
* **Toggles & Modal Visibility**: Local UI conditions, such as showing or hiding a checkout success animation modal (`showSuccessModal` inside `CartSummaryScreen`).
* **Credentials Input**: Text inputs for authentication on the `LoginScreen` prior to successful submission.

---

## 2. Context API
### Scope
Medium-scoped, shared data that needs to be preserved across screen transitions (navigation) and accessed by deeply nested descendant components without prop-drilling.

### Food Express Scenarios
* **User Profile (`UserContext`)**: Contains authenticated profile info (email, username, phone, delivery address) shared with headers, profile views, and drawer panels.
* **Active Cart (`CartContext`)**: Holds the array of selected items, quantities, and functions to add/remove dishes, shared among `HomeScreen`, `DishDetailsScreen`, and `CartSummaryScreen`.
* **Flash Deals Flags**: Flash deal status flags toggled across lists and details.
* **Navigational Search & Cuisine Filters**: Search query and selected cuisine filters are stored here so that they are **preserved across screen navigation** (since screens unmount during navigation) and reset only at logout.
* **Dish Ratings Log**: A global log of rated dishes to persist star selections as the user explores different dishes.

---

## 3. Redux Toolkit (RTK)
### Scope
Enterprise-scale, global application state that involves complex business logic, historical data tracking, high-frequency updates, or performance-sensitive global slices.

### Food Express Scenarios
* **Spend & Savings tracker (`progressSlice`)**: Tracks metrics like `totalSpent`, `totalSavings`, and `ordersPlacedCount`.
* **Meal Health & Value Meter**: Calculates the dynamic nutritional/value score of the cart on the fly, propagating state changes globally.
* **User Account Persistence**: Enterprise-scale state for persistent logged-in credentials.
