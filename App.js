/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {StyleSheet, View, Button, StatusBar} from 'react-native';
import Crashes from 'appcenter-crashes';

// import Camera from './src/Camera';

export default class App extends Component {
  constructor() {
    super();

    this.checkPreviousSession();
  }

  onPressLearnMore = () => Crashes.generateTestCrash();

  async checkPreviousSession() {
    const didCrash = await Crashes.hasCrashedInLastSession();

    if (didCrash) {
      alert('Sorry about that crash, We are working on the solution');
    }
  }

  render() {
    return (
      <>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          {/* <Camera /> */}
          <Button
            onPress={this.onPressLearnMore}
            title="Crash"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
});
