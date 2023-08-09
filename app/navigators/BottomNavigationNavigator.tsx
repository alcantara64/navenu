import React, { useEffect, useLayoutEffect } from "react"
import { CuratorsScreen, DropsScreen, EditorialsScreen, HomeScreen, VenuesScreen } from "../screens"
import { Foundation, MaterialIcons } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { TopBar } from "../components/TopBar"
import { Colors } from "../theme"
import { BottomTabLogo } from "../components/BottomTabLogo"
// import { CopilotStep, useCopilot, walkthroughable } from "react-native-copilot"
import DropIcon from "../../assets/icons/bottom-tab/drop.svg"
import ArticleIcon from "../../assets/icons/bottom-tab/article.svg"
import { View } from "react-native"
import { useStores } from "../../app/models"


export type BottomNavigationNavigatorParamList = {
  Demo: undefined
  Feed: undefined
  Search: undefined
  Location: undefined
  Drops: undefined
  Settings: undefined
  Notification: undefined
  Curators: undefined
}

const BottomTab = createBottomTabNavigator<BottomNavigationNavigatorParamList>()
export const BottomNavigationNavigator: React.FC<any> = () => {
  // const { copilotEvents } = useCopilot()
  const {
    authenticationStore: { setOnboardingStatus },
  } = useStores()
  // useEffect(() => {
  //   const startCopilot = () => {
  //     const listener = () => {
  //       setOnboardingStatus(true)
  //     }

  //     copilotEvents.on("stop", listener)

  //     return () => {
  //       copilotEvents.off("stop", listener)
  //     }
  //   }
  //   startCopilot()
  // }, [copilotEvents])
  const WalkthroughableView = View

  return (
    <BottomTab.Navigator
      initialRouteName="Feed"
      screenOptions={{ tabBarActiveTintColor: Colors.black }}
    >
      <BottomTab.Screen
        name="Feed"
        component={VenuesScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <View name="homeIcon" order={3} text="Venues, by category and neighborhood ">
              <WalkthroughableView>
                <Foundation name="home" size={size} color={color} />
              </WalkthroughableView>
            </View>
          ),
          headerShown: true,
          header: ({ navigation }) => <TopBar isShowMap navigation={navigation} />,
        }}
      />
      <BottomTab.Screen
        name="Curators"
        component={CuratorsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size }) => (
            <View name="search" order={4} text="Meet  Navenu’s curators">
              <WalkthroughableView>
                <MaterialIcons name="groups" color={color} size={35} />
              </WalkthroughableView>
            </View>
          ),
          headerShown: false,
          header: ({ navigation }) => <TopBar navigation={navigation} />,
        }}
      />
      <BottomTab.Screen
        name="Demo"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          headerShadowVisible: true,
          tabBarIcon: ({ focused }) => (
            <View
              name="recEngine"
              order={5}
              text="Filter your search with our curated recommendations"
            >
              <WalkthroughableView>
                <BottomTabLogo isFocused={focused} />
              </WalkthroughableView>
            </View>
          ),
          header: ({ navigation }) => <TopBar navigation={navigation} />,
        }}
      />
      <BottomTab.Screen
        name="Drops"
        component={DropsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View name="drop" order={6} text="The latest's drops all in one place">
                <WalkthroughableView>
                  <DropIcon opacity={focused ? 1 : 0.5} />
                </WalkthroughableView>
              </View>
            )
          },
          header: (navigation) => <TopBar navigation={navigation} showSearch={false} />,
        }}
      />
      <BottomTab.Screen
        name="Settings"
        component={EditorialsScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ color, focused }) => (
            <View name="article" order={7} text="Our best articles all in one place">
              <WalkthroughableView>
                <ArticleIcon color={color} opacity={focused ? 1 : 0.5} />
              </WalkthroughableView>
            </View>
          ),
          header: (navigation) => <TopBar navigation={navigation} showSearch={false} />,
        }}
      />
    </BottomTab.Navigator>
  )
}
