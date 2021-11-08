import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {DrawerActions} from '@react-navigation/native';
import ListView from "../Screens/ListView";
import DetailView from "../Screens/DetailView";

const Tabs = createBottomTabNavigator();

const BottomTabsScreen = () => {
    return(
        <Tabs.Navigator>
            <Tabs.Screen name="ListView" component={ListView}/>
            <Tabs.Screen name="DetailView" component={DetailView}/>
        </Tabs.Navigator>
    )
}

export default BottomTabsScreen;