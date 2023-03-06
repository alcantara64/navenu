import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen } from "../components"

import { useNavigation } from "@react-navigation/native"
import ChatWidget from '@papercups-io/chat-widget-native'

export const HomeScreen: FC<StackScreenProps<AppStackScreenProps, "Home">> = observer(function HomeScreen() {



 const navigation = useNavigation();

  return (
    <Screen style={root} preset="scroll">
    <View style={$container}>
    <ChatWidget
            accountId="997f9a1e-90b7-4236-b2cf-8d2d09bf0f4c"
            title="Navenu Concierge"
            subtitle="Our Concierge is still getting to know you"
            greeting=":wave: Concierge AI"
                 primaryColor="#1890ff"
             inbox= "e1bb6f96-0947-42e4-a10e-c1f77b6e3fee"
            baseUrl="https://app.papercups.io"
            customer={{
              name: 'Test User',
              email: 'test@test.com',
              external_id: '123',
            }}
          />
    </View>
    </Screen>
  )
})
const root :ViewStyle ={

}
const $container: ViewStyle = {
  flexDirection: 'column',
  flex: 1,
  backgroundColor: '#FFFFFF',

}
