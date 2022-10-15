import React from "react"
import {
  SearchScreen,
} from "../screens"
import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { TopBarLogoOnly } from "../components/TopBarLogoOnly"
import { NavenuButton } from "../components/NavenuButton"
import { TapNavigationNavigator } from "./TapNavigationNavigator"
import { MainStack } from "./MainNavigationNavigator"

export type BottomNavigationNavigatorParamList = {
  Demo: undefined,
  Feed: undefined,
  SearchScreen: undefined,
  PreferencesScreen: undefined,

}

const BottomTab = createBottomTabNavigator<BottomNavigationNavigatorParamList>()
export const BottomNavigationNavigator = () => {
  return (
    <BottomTab.Navigator initialRouteName= "Feed" screenOptions={ { tabBarActiveTintColor: '#000000',}}>
      <BottomTab.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="search" color={color} size={size} />,
          header: () => <TopBarLogoOnly />,
        }}
      />
      <BottomTab.Screen
        name="Feed"
        component={MainStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <NavenuButton />,
          headerShown: false,
          //   header: false, //() => <TopBar />
        }}
      />
      <BottomTab.Screen
        name="PreferencesScreen"
        component={TapNavigationNavigator}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="user" color={color} size={size} />,
          header: () => <TopBarLogoOnly />,
        }}
      />
    </BottomTab.Navigator>
  )
}
