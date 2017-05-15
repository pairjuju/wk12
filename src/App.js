import React, { Component } from 'react';
import * as firebase from 'firebase';
import { LoginStack } from './Router';

class App extends Component {

  componentWillMount() {
    firebase.initializeApp({
      apiKey: "AIzaSyAb1vgEJ7aGHUGxfOX5y88aP0cbPI0yvSE",
      authDomain: "test-1cf03.firebaseapp.com",
      databaseURL: "https://test-1cf03.firebaseio.com",
      projectId: "test-1cf03",
      storageBucket: "test-1cf03.appspot.com",
      messagingSenderId: "136263190719"
      });
  }

  render() {
    return (
      <LoginStack />
    );
  }
}


export default App;
