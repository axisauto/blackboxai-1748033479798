# Food Delivery App - Flutter with Firebase Backend

## Overview
This project is a Flutter-based mobile application integrated with Firebase backend for a food delivery service. It supports three user roles: Restaurant Owner, Delivery Personnel, and Customer. The backend uses Firebase Firestore, Authentication, Cloud Functions, and Storage. The app is designed for scalability, maintainability, and future web integration.

## Project Structure

### Flutter App (frontend)
- `lib/`
  - `main.dart` - Entry point
  - `auth/` - Authentication screens and logic
  - `restaurant_owner/` - Restaurant Owner UI and logic
  - `delivery_personnel/` - Delivery Personnel UI and logic
  - `customer/` - Customer UI and logic
  - `models/` - Data models
  - `services/` - Firebase service wrappers (auth, firestore, storage, notifications)
  - `widgets/` - Reusable UI components

### Firebase Backend (Cloud Functions)
- `functions/`
  - `index.js` - Cloud Functions entry point
  - `auth.js` - Authentication related functions
  - `menu.js` - Menu management functions
  - `orders.js` - Order processing and status updates
  - `notifications.js` - Real-time notifications
  - `utils.js` - Utility functions

### Firebase Configuration
- `firestore.rules` - Firestore security rules
- `storage.rules` - Firebase Storage security rules
- `firebase.json` - Firebase project configuration

## Setup Instructions

### Flutter App
1. Install Flutter SDK: https://flutter.dev/docs/get-started/install
2. Run `flutter pub get` to install dependencies.
3. Configure Firebase for Android and iOS using Firebase Console.
4. Run the app using `flutter run`.

### Firebase Backend
1. Install Firebase CLI: https://firebase.google.com/docs/cli
2. Initialize Firebase Functions: `firebase init functions`
3. Deploy functions: `firebase deploy --only functions`
4. Set Firestore and Storage security rules.

## API Endpoints (Cloud Functions)
- Authentication: `/api/auth/*`
- Menu Management: `/api/menu/*`
- Order Processing: `/api/orders/*`
- Notifications: `/api/notifications/*`

## Next Steps
- Implement authentication flows.
- Develop UI for each user role.
- Build Cloud Functions for backend logic.
- Integrate real-time updates and notifications.
- Add payment gateway integration.

## Notes
- Ensure role-based access control in both frontend and backend.
- Use Firebase Storage for multimedia content.
- Follow best practices for security and scalability.
