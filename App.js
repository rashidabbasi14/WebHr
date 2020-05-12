//Libraries
import React from 'react';
import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

//files
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Main from './src/pages/Main';
import NuTimes from './src/pages/NuTimes';
import AuthLoadingScreen from './src/Routing/Auth'
import Drawer from './src/pages/Drawer'

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen

const AppStack = createStackNavigator({ Main: Main, NuTimes: NuTimes, Drawer: Drawer},{navigationOptions:{ header: null}});
const AuthStack = createStackNavigator({ Login: Login, Register: Register },{navigationOptions:{ header: null}});

const MainRouter = createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
);

export default class App extends React.Component {
  render() {
    return <MainRouter/>
  }
}