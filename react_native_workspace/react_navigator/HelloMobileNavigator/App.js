import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome'
  };
  render() {
    const { navigate } = this.props.navigation
    return (
      <View>
        <Text>Hello Navigation</Text>
        <Button 
          onPress={() => {
            navigate('Chat', { user: 'steve' })
          }}
          title='Go To Chat'
        />
      </View>
    )
  }
}

class ChatScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with ${navigation.state.params.user}`
  })
  render() {
    const { params } = this.props.navigation.state
    return (
      <Text>Chat with {params.user}</Text>
    )
  }
}

class RecentChatsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Chat with `
  })
  render() {
    console.log('hi')
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>List of Recent Chats</Text>
        <Button 
          onPress={() => { navigate('Chat', { user: 'lucy' }) }}
          title='Go to chat'
        />
      </View>
    )
  }
}

class AllContactsScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation
    return (
      <View>
        <Text>List of All Contacts</Text>
        <Button 
          onPress={() => { navigate('Chat', { user: 'lucy' }) }}
          title='Go to chat'
        />
      </View>
    )
  }
}

class SomeComponent extends React.Component {
  render() {
    return <Text>SomeComponent</Text>
  }
}

const MainTabNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen }
})

class NavigatorWrappingScreen extends React.Component {
  render() {
    return (
      <View>
        <MainTabNavigator navigation={this.props.navigation} />
        <SomeComponent />
      </View>
    )
  }
}
NavigatorWrappingScreen.router = MainTabNavigator.router;


const MainStackNavigator = StackNavigator({
  Home: { 
    screen: MainTabNavigator,
    navigationOptions: {
      title: 'My Chats'
    }
  },
  Chat: { screen: ChatScreen },
})

const WrapStackNavigator = StackNavigator({
  Home: { 
    screen: NavigatorWrappingScreen,
  },
  Chat: { screen: ChatScreen },
})

export default class App extends React.Component {
  render() {
    return (
      <WrapStackNavigator />
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
