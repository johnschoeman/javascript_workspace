import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import RootNavigator from './src/navigation/RootNavigator';
import RootTabs from './src/navigation/RootTabs';
import RootDrawer from './src/navigation/RootDrawer';

export default class App extends React.Component {
  render() {
    return (
      <RootDrawer />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
