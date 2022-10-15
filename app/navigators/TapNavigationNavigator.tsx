import React from "react"
import {
  PreferencesScreen,
  SavedDropsScreen,
  SavedLocationsScreen,
} from "../screens"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SavedArticlesScreen } from "../screens/SavedArticlesScreen";
export type TapNavigationNavigatorParamList = {
  Demo: undefined
}
const TopTabs = createMaterialTopTabNavigator();
export const TapNavigationNavigator = () => {
  return (
    <TopTabs.Navigator screenOptions={{ tabBarLabelStyle: { fontSize: 9, fontWeight: 'bold', } }}>
      <TopTabs.Screen
        name="Settings"
        component={PreferencesScreen}
        options={{
          tabBarLabel: 'Settings',
        }}
      />
      <TopTabs.Screen
        name="SavedDrops"
        component={SavedDropsScreen}
        options={{
          tabBarLabel: 'Drops',
        }}
      />
      <TopTabs.Screen
        name="Locations"
        component={SavedLocationsScreen}
        options={{
          tabBarLabel: 'Locations',
        }}
      />
      <TopTabs.Screen
        name="Articles"
        component={SavedArticlesScreen}
        options={{
          tabBarLabel: 'Articles',
        }}
      />
    </TopTabs.Navigator>
  )
}

