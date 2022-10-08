import React from "react"
import {
  PreferencesScreen,
  WelcomeScreen
} from "../screens"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
export type TapNavigationNavigatorParamList = {
  Demo: undefined
}
const TopTabs = createMaterialTopTabNavigator();
export const TapNavigationNavigator = () => {
  return (
    <TopTabs.Navigator screenOptions={{ tabBarLabelStyle: { fontSize: 9, fontWeight: 'bold' } }}>
      <TopTabs.Screen name="Demo" component={WelcomeScreen} />
      <TopTabs.Screen
        name="Settings"
        component={PreferencesScreen}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
      {/* <TopTabs.Screen
        name="SavedDrops"
        component={SavedDrops}
        options={{
          tabBarLabel: 'Drops',
        }}
      /> */}
      {/* <TopTabs.Screen
        name="Locations"
        component={SavedLocations}
        options={{
          tabBarLabel: 'Locations',
        }}
      />
      <TopTabs.Screen
        name="Articles"
        component={SavedArticles}
        options={{
          tabBarLabel: 'Articles',
        }}
      /> */}
    </TopTabs.Navigator>
  )
}

