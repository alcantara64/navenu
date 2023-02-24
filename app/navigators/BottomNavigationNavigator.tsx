import React from "react"
import { CardviewScreen, NotificationScreen, SavedDropsScreen, UserProfileScreen } from "../screens"
import { FontAwesome5, Foundation, Ionicons } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { TopBarLogoOnly } from "../components/TopBarLogoOnly"
import { MainStack, SearchStack } from "./MainNavigationNavigator"
import { ProfileButton } from "../components/ProfileButton"
import { TopBar } from "../components/TopBar"
import { BottomTabLogo } from "../components"
import { Colors } from "../theme"

export type BottomNavigationNavigatorParamList = {
  Demo: undefined
  Feed: undefined
  Search: undefined
  Location: undefined
  SavedDrops: undefined
  Settings: undefined
  Notification: undefined
}

const BottomTab = createBottomTabNavigator<BottomNavigationNavigatorParamList>()
export const BottomNavigationNavigator = () => {
  return (
    <BottomTab.Navigator
      initialRouteName="Feed"
      screenOptions={{ tabBarActiveTintColor: Colors.black,  }}
    >
      <BottomTab.Screen
        name="Feed"
        component={MainStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => <Foundation name="home" size={size} color={color} />,
          headerShown: false,
          header: ({ navigation }) => <TopBar navigation={navigation} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={SearchStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="search" color={color} size={size} />,
          headerShown: false,
          tabBarHideOnKeyboard:false
          
        }}
      />
      <BottomTab.Screen
        name="SavedDrops"
        component={CardviewScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => <BottomTabLogo />,
          header: ({navigation}) => <TopBar navigation={navigation} />
        }}
      />
      <BottomTab.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size, route }) => {
            return(
            <Ionicons name="notifications-outline"  size={size} color={color} />
          )},
          header: () => <TopBarLogoOnly />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={UserProfileScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => <ProfileButton />,
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  )
}
