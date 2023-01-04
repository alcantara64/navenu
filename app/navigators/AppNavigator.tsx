/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer, // @demo remove-current-line
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import Config from "../config"
import { useStores } from "../models" // @demo remove-current-line
import {
  LocationScreen,
  LoginScreen,
  NotificationScreen,
  SignUpStartScreen,
  SignUpFormScreen,
  PreferencesScreen,
  WelcomeScreen,
} from "../screens"

import { BottomNavigationNavigator } from "./BottomNavigationNavigator"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  Login: undefined
  SignUpStart: undefined
  SignUpForm: undefined
  Search: undefined
  Feed: undefined
  Settings: undefined
  PreferencesScreen: undefined
  Home: undefined
  MapScreen: undefined
  DropScreen: {venue: any}
  VenueDetailScreen: undefined
  CuratorProfileScreen: undefined
  Cardview: undefined,
  Location: undefined,
  Notification: undefined,
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    authenticationStore: { isAuthenticated },
  } = useStores();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isAuthenticated ? "Home" : "Welcome"}
    >
      {isAuthenticated ? (<>
        <Stack.Screen name="Home" component={BottomNavigationNavigator} />
        <Stack.Screen  name="PreferencesScreen" component={PreferencesScreen}  />
        <Stack.Screen name="Location" component={LocationScreen} />
        <Stack.Screen name="Notification" component={NotificationScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen}  />
          <Stack.Screen name="SignUpStart" component={SignUpStartScreen}  />
          <Stack.Screen name="SignUpForm" component={SignUpFormScreen}  />
      
        </>
      )}
    </Stack.Navigator>
  )
})


interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
