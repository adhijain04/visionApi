/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {PureComponent} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  NativeModules,
} from 'react-native';

import {RNCamera} from 'react-native-camera';

// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';

import ImageResizer from 'react-native-image-resizer';

import config from '../config.json';

const PendingView = () => (
  <View>
    <Text>Waiting</Text>
  </View>
);

export default class Camera extends PureComponent {
  takePicture = async function(camera) {
    const options = {quality: 0.5, base64: true};
    const data = await camera.takePictureAsync(options);

    ImageResizer.createResizedImage(data.uri, 640, 480, 'JPEG', 80)
      .then(resizedImageUri => {
        NativeModules.RNImageToBase64.getBase64String(
          resizedImageUri.uri,
          (err, base64) => {
            if (err) {
              console.log(err);
            }

            this.checkForLabels(base64);
          },
        );
      })
      .catch(err => {
        console.error(err);
      });
  };

  // API call to google cloud
  checkForLabels = base64 => {
    console.log(base64);
    fetch(config.googleCloud.api + config.googleCloud.apiKey, {
      method: 'POST',
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: base64,
            },
            features: [
              {
                type: 'LABEL_DETECTION',
              },
            ],
          },
        ],
      }),
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
      .then(data => console.log(data))
      .catch(err => {
        console.error('promise rejected');
        console.error(err);
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          {({camera, status, recordAudioPermissionStatus}) => {
            if (status !== 'READY') {
              return <PendingView />;
            }
            return (
              <View style={styles.view}>
                <TouchableOpacity
                  onPress={() => this.takePicture(camera)}
                  style={styles.capture}>
                  <Text style={styles.snaptext}> SNAP </Text>
                </TouchableOpacity>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
  view: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  snaptext: {
    fontSize: 14,
  },
});
