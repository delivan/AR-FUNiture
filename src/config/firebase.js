import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyBhnzWY9sNYmzRVpnCtvzjjLQf3GD51nKo',
  authDomain: 'ar-funiture.firebaseapp.com',
  databaseURL: 'https://ar-funiture.firebaseio.com',
  projectId: 'ar-funiture',
  storageBucket: 'ar-funiture.appspot.com',
  messagingSenderId: '837483506808',
};

firebase.initializeApp(config);

export const databaseRef = firebase.database().ref();
export const firebaseAuth = firebase.auth;
