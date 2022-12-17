import React from "react"
import {
  SavedDropsScreen,
  SearchScreen,
  UserProfileScreen,
} from "../screens"
import { FontAwesome5, Foundation, Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { TopBarLogoOnly } from "../components/TopBarLogoOnly"
import { MainStack } from "./MainNavigationNavigator"
import { ProfileButton } from "../components/ProfileButton";
import { TopBar } from "../components/TopBar";
import { BottomTabLogo } from "../components";

export type BottomNavigationNavigatorParamList = {
  Demo: undefined,
  Feed: undefined,
  SearchScreen: undefined,
  Location: undefined,
  SavedDrops: undefined,
  Settings: undefined,
  Notification: undefined,

}

const BottomTab = createBottomTabNavigator<BottomNavigationNavigatorParamList>()
export const BottomNavigationNavigator = () => {
  return (
    <BottomTab.Navigator initialRouteName= "Feed" screenOptions={ { tabBarActiveTintColor: '#000000'}}>
      <BottomTab.Screen
        name="Feed"
        component={MainStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({color, size}) => <Foundation name="home" size={size} color={color} /> ,
          headerShown: false,
          header: ({navigation}) => <TopBar  navigation={navigation}/>
        }}
      />
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
        name="SavedDrops"
        component={SavedDropsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => <BottomTabLogo/>,
          header: () => <TopBarLogoOnly />,
        }}
      />
        <BottomTab.Screen
        name="Notification"
        component={SavedDropsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => <Ionicons name="notifications-outline" size={size} color={color} />,
          header: () => <TopBarLogoOnly />,
        }}
      />
      <BottomTab.Screen
      name="Settings"
      component={UserProfileScreen}
      options={{
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => <ProfileButton  />,
        headerShown:false
      }}
    />


    </BottomTab.Navigator>
  )
}
