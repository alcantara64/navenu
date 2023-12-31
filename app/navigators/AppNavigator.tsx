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
import React, { useEffect } from "react"
import { TextStyle, useColorScheme } from "react-native"
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
  LogoutScreen,
  CuratorProfileScreen,
  DataPolicyScreen,
  PrivacyPolicyScreen,
  TermsOfUseScreen,
  VenueDetailScreen,
  DropScreen,
  UserProfileScreen,
  ArticleScreen,
  CityScreen,
} from "../screens"
import { spacing, typography } from "../theme"

import { BottomNavigationNavigator } from "./BottomNavigationNavigator"
import { navigate, navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { TouchableOpacity, Text } from "react-native-ui-lib"
import dynamicLinks from "@react-native-firebase/dynamic-links"
import { DynamicLinkServices } from "../services/firebase/dynamicLinkServices"
import { useCopilot } from "react-native-copilot"

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
  DropScreen: { venue: any }
  VenueDetailScreen: undefined
  CuratorProfileScreen: undefined
  Location: undefined
  Notification: undefined
  Logout: undefined
  DataPolicy: undefined
  PrivacyPolicy: undefined
  TermsOfUse: undefined
  UserProfileScreen: undefined
  Article: undefined
  City: undefined
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
  } = useStores()
  // const { start } = useCopilot()

  useEffect(() => {
    const dynamicLinkServices = new DynamicLinkServices()
    const unsubscribe = dynamicLinks().onLink(dynamicLinkServices.handleDynamicLink)
    // When the component is unmounted, remove the listener
    return () => unsubscribe()
  }, [])
  useEffect(() => {
    const dynamicLinkServices = new DynamicLinkServices()
    dynamicLinks()
      .getInitialLink()
      .then((link) => {
        if (link) {
          dynamicLinkServices.handleDynamicLink(link)
        }
      })
  }, [])
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={isAuthenticated ? "Home" : "Welcome"}
    >
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Home" component={BottomNavigationNavigator} />
          <Stack.Screen name="PreferencesScreen" component={PreferencesScreen} />
          <Stack.Screen name="Location" component={LocationScreen} />
          <Stack.Screen name="Notification" component={NotificationScreen} />
          <Stack.Screen name="Logout" component={LogoutScreen} />
          <Stack.Screen name="CuratorProfileScreen" component={CuratorProfileScreen} />
          <Stack.Screen
            name="DataPolicy"
            options={headeOption("Data Policy")}
            component={DataPolicyScreen}
          />
          <Stack.Screen
            name="PrivacyPolicy"
            options={headeOption("Privacy Policy")}
            component={PrivacyPolicyScreen}
          />
          <Stack.Screen
            name="TermsOfUse"
            options={headeOption("Terms of Use")}
            component={TermsOfUseScreen}
          />
          <Stack.Screen name="VenueDetailScreen" component={VenueDetailScreen} />
          <Stack.Screen name="DropScreen" component={DropScreen} />
          <Stack.Screen name="UserProfileScreen" component={UserProfileScreen} />
          <Stack.Screen name="Article" component={ArticleScreen} />
          <Stack.Screen
            name="City"
            options={{
              headerShown: true,
              headerTitleAlign: "center",
              headerTitle: "PREFERENCES",
              headerTitleStyle: { fontFamily: typography.fonts.bourtonbase.normal, fontSize: 20 },
              headerBackTitleVisible: false,
              headerTintColor: "black",
              headerRight: () => (
                <TouchableOpacity
                  row
                  onPress={() => {
                    // start()
                    navigate("Home")
                  }}
                >
                  <Text style={$skipButton}>Skip</Text>
                </TouchableOpacity>
              ),
            }}
            component={CityScreen}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitleAlign: "center",
              headerTitle: "LOGIN",
              headerTitleStyle: { fontFamily: typography.fonts.bourtonbase.normal, fontSize: 26 },
              headerBackTitleVisible: false,
              headerTintColor: "white",
            }}
          />
          <Stack.Screen
            options={{
              headerTitleAlign: "center",
              headerShown: true,
              headerTransparent: true,
              headerTitleStyle: { fontFamily: typography.fonts.bourtonbase.normal, fontSize: 26 },
              headerBackTitleVisible: false,
              headerTintColor: "white",
            }}
            name="SignUpStart"
            component={SignUpStartScreen}
          />
          <Stack.Screen
            name="SignUpForm"
            component={SignUpFormScreen}
            options={{
              headerShown: true,
              headerTransparent: true,
              headerTitleAlign: "center",
              headerTitle: "SIGNUP",
              headerTitleStyle: { fontFamily: typography.fonts.bourtonbase.normal, fontSize: 26 },
              headerBackTitleVisible: false,
              headerBackTitleStyle: { fontFamily: typography.fonts.bourtonbase.normal },
              headerTintColor: "white",
            }}
          />
        </>
      )}
    </Stack.Navigator>
  )
})
const headeOption = (title: string, headerShown = true) => ({
  headerShown,
  headerTransparent: true,
  headerTitleStyle: { fontFamily: typography.fonts.bourtonbase.normal, fontSize: 26 },
  headerBackTitleVisible: false,
  headerTitle: title,
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

const $skipButton: TextStyle = {
  fontWeight: "600",
  fontSize: spacing.md,
}
