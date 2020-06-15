/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  // SafeAreaView,
  StyleSheet,
  // ScrollView,
  View,
  // Text,`
  StatusBar,
} from 'react-native';

import Camera from './src/Camera';

export default class App extends Component {
  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <Camera />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
});
