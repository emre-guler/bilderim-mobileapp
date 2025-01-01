# BilderimApp

A React Native mobile application for betting and gaming with a modern UI and rich features.

## Features

- User authentication (Login/Signup)
- Betting system
- Content viewing
- Profile management
- Shop functionality
- Most winners leaderboard
- Bet tracking and history
- Beautiful splash screen
- Drawer navigation
- AdMob integration

## Tech Stack

- React Native 0.63.2
- Redux for state management
- React Navigation (Drawer) for routing
- Firebase AdMob for advertisements
- React Native Paper & Elements for UI components
- Lottie for animations
- React Native Splash Screen
- React Native Image Picker
- Vector Icons support

## Prerequisites

- Node.js
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)
- CocoaPods (for iOS dependencies)

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd BilderimApp
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Install iOS dependencies:
```bash
cd ios
pod install
cd ..
```

## Running the App

### Android

```bash
npm run android
# or
yarn android
```

### iOS

```bash
npm run ios
# or
yarn ios
```

## Available Scripts

- `npm start` - Start the Metro bundler
- `npm run android` - Build and run the Android app
- `npm run ios` - Build and run the iOS app
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Project Structure

- `/android` - Android native code
- `/ios` - iOS native code
- `/src` - React Native source code
  - `/App.js` - Main application component
  - Navigation setup
  - Redux store configuration

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
