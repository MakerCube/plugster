import React, { Component } from 'react';
import Splash from './App/Components/splash';
import {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  View
} from 'react-native';

class plugster extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Plugster',
          component: Splash
        }} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('plugster', () => plugster);
