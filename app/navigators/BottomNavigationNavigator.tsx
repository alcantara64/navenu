import React from "react"
import {
  PreferencesScreen,
  SavedDropsScreen,
  SavedLocationsScreen,
  SearchScreen,
} from "../screens"
import { FontAwesome5, Foundation, FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { TopBarLogoOnly } from "../components/TopBarLogoOnly"
import { MainStack } from "./MainNavigationNavigator"
import { ProfileButton } from "../components/ProfileButton";
import { TopBar } from "../components/TopBar";

export type BottomNavigationNavigatorParamList = {
  Demo: undefined,
  Feed: undefined,
  SearchScreen: undefined,
  PreferencesScreen: undefined,
  Location: undefined,
  SavedDrops: undefined,
  Settings: undefined,

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
          headerShown: true,
          header: ({navigation}) => <TopBar  navigation={navigation}/>
        }}
      />
        <BottomTab.Screen
        name="Location"
        component={SavedLocationsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="map-marker-alt" color={color} size={size} />,
          header: () => <TopBarLogoOnly />,
        }}
      />
              <BottomTab.Screen
        name="SavedDrops"
        component={SavedDropsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => <FontAwesome name="bookmark" color={color} size={size} />,
          header: () => <TopBarLogoOnly />,
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
      name="Settings"
      component={PreferencesScreen}
      options={{
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => <ProfileButton  />,
        header: () => <TopBarLogoOnly />,
      }}
    />


    </BottomTab.Navigator>
  )
}
