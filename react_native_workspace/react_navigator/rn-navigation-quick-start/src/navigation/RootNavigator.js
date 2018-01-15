import React from 'react';
import { View, Text, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

const HomeScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
    <Text>HomeScreen</Text>
    <Button 
      title="Go To Detials"    
      onPress={() => { navigation.navigate('Details') }}
    />
  </View>
)

const DetailsScreen = ({ navigation }) => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
    <Text>DetailsScreen</Text>
    <Button 
      title="Go To Home"    
      onPress={() => { navigation.navigate('Home') }}
    />
  </View>
)

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Home',
    }
  },
  Details: {
    screen: DetailsScreen,
    navigationOptions: {
      headerTitle: 'Details',
    }
  },
});

export default RootNavigator;