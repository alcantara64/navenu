/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
  NavigatorScreenParams, // @demo remove-current-line
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import React from "react"
import { useColorScheme } from "react-native"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import { NavenuButton, TopBar, TopBarLogoOnly } from "../components"
import Config from "../config"
import { useStores } from "../models" // @demo remove-current-line
import {
  CardviewScreen,
  CuratorProfileScreen,
  DropScreen,
  FeedScreen,
  LoginScreen,
  MapScreen,
  PreferencesScreen,
  SearchScreen,
  VenueDetailScreen,
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
  Search: undefined
  Feed: undefined
  Settings: undefined
  PreferencesScreen: undefined
  Home: undefined
  MapScreen: undefined
  DropScreen: undefined
  VenueDetailScreen: undefined
  CuratorProfileScreen: undefined
  Cardview: undefined
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
const BottomTab = createBottomTabNavigator<AppStackParamList>()

const AppStack = observer(function AppStack() {
  const {
    authenticationStore: { isAuthenticated },
  } = useStores()

  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isAuthenticated ? "Home" : "Login"}
    >
      {isAuthenticated ? (
        <Stack.Screen name="Home" component={BottomNavigationNavigator} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  )
})

export const TabStack = observer(function TabStack() {
  return (
    <BottomTab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "#000000",

        header: ({ navigation }) => <TopBar navigation={navigation} />,
      }}
    >
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="search" color={color} size={size} />,
          header: () => <TopBarLogoOnly />,
        }}
      />
      <BottomTab.Screen
        name="Feed"
        component={AppStack}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: () => <NavenuButton />,
          headerShown: false,
          //   header: false, //() => <TopBar />
        }}
      />
      <BottomTab.Screen
        name="PreferencesScreen"
        component={PreferencesScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => <FontAwesome5 name="user" color={color} size={size} />,
          header: () => <TopBarLogoOnly />,
        }}
      />
    </BottomTab.Navigator>
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
