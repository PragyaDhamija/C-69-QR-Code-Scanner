import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default class Transaction extends Component {
  constructor() {
    super();
    this.state = {
      hasCameraPermissions: null,
      scanned: false,
      scannedData: '',
      buttonState: 'normal'
    }
  }

  getCameraPermissions = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    /*status === "granted" is true when user has granted permission
      status === "granted" is false when user has not granted the permission
    */

      //destructuring assignment
      /*
        {x , y} = ball; ====> 
        ball.x = x;
        ball.y = y;
      */
    this.setState({
      hasCameraPermissions: status === "granted",
      scanned: false,
      buttonState: "clicked"
    })

  }

  handleBarCodeScanned = async ({ type, data }) => {
    this.setState({
      scanned: true,
      scannedData: data,
      buttonState: 'normal'
    })
  }


  render() {
    // const hasCameraPermissions = this.state.hasCameraPermissions;
    // const scanned = this.state.scanned;
    // const buttonState = this.state.buttonState;

    const { hasCameraPermissions , scanned , buttonState} = this.state;

    if (buttonState === "clicked" && hasCameraPermissions) {
      return (
        <BarCodeScanner onBarCodeScanned={scanned? undefined : this.handleBarCodeScanned} 
        style={StyleSheet.absoluteFillObject}/>
      )
    }
    else if (buttonState === "normal") {
      return (
        <View style={styles.container}>
         
          <Text>
            { hasCameraPermissions === true 
            ? this.state.scannedData 
            : "Request Camera Permission!!!" }
            </Text>
          <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermissions}>
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      )
    }



  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  displayText: {
    fontSize: 15,
    textDecorationLine: 'underline'
  },
  scanButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    margin: 10
  },
  buttonText: {
    fontSize: 20,
  }
});