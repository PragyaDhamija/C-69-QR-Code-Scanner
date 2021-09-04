import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Search from './screens/Search';
import Transaction from './screens/Transaction';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

export default class App extends Component {
  render() {
    return(
      <AppContainer/>
  )};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
const tabNavigator = createBottomTabNavigator({
    Transaction: {screen: Transaction},
    Search: {screen: Search}
})
const AppContainer = createAppContainer(tabNavigator)