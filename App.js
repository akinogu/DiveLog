import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';
import MemoListScreen from './src/screens/MemoListScreen';
import MemoDetailScreen from './src/screens/MemoDetailScreen';
import MemoEditScreen from './src/screens/MemoEditScreen';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import MemoCreateScreen from './src/screens/MemoCreateScreen';
import ENV from './env.json';
require('firebase/firestore');

// setting for firebase
const config = {
  apiKey: ENV.FIREBASE_API_KEY,
  authDomain: ENV.FIREBASE_AUTH_DOMAIN,
  databaseURL: ENV.FIREBASE_DB_URL,
  projectId: ENV.FIREBASE_PROJECT_ID,
  storageBucket: ENV.FIREBASE_STRAGE_BUCKET,
  messagingSenderId: ENV.FIREBASE_MESSAGINGSENDER_ID,
};
firebase.initializeApp(config);

const App = StackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Signup: {
    screen: SignupScreen,
  },
  Home: {
    screen: MemoListScreen,
  },
  MemoDetail: {
    screen: MemoDetailScreen,
  },
  MemoEdit: {
    screen: MemoEditScreen,
  },
  MemoCreate: {
    screen: MemoCreateScreen,
  },
}, {
  navigationOptions: {
    headerTitle: 'DiveLog',
    headerTintColor: '#fff',
    headerBackTitle: null,
    headerStyle: {
      backgroundColor: '#265366',
      ...Platform.select({
        android: {
          paddingTop: 20,
          height: 80,
        },
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
        },
      }),
    },
    headerTitleStyle: {
      color: '#fff',
    },
  },
});

export default App;
