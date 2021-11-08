import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import ListView from '../Screens/ListView';
import DetailView from '../Screens/DetailView';
import BottomTabsScreen from './BottomTabs';

const RootStack = createStackNavigator();

const RootStackScreen = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="BottomTabsScreen">
        <RootStack.Screen
          name="BottomTabsScreen"
          component={BottomTabsScreen}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="ListView"
          component={ListView}
          options={{headerShown: false}}
        />
        <RootStack.Screen
          name="DetailView"
          component={DetailView}
          options={{headerShown: false}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default RootStackScreen;
