import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"

import { useNavigation } from "@react-navigation/native"
import ChatWidget from '@papercups-io/chat-widget-native'
import { useStores } from "../models"
import { View, Text } from "react-native-ui-lib"

export const HomeScreen: FC<StackScreenProps<AppStackScreenProps, "Home">> = observer(function HomeScreen() {

 const {userStore:{currentUser}} = useStores()

 const navigation = useNavigation();
 if(!currentUser.user_email || !currentUser.display_name || !currentUser.ID){
  return (<View center marginT-40><Text red header>Please update your display name to use the chat</Text></View>)
 }
 

  return (
  
    <ChatWidget
            accountId="997f9a1e-90b7-4236-b2cf-8d2d09bf0f4c"
            title="Navenu Concierge"
            subtitle="BETA"
            greeting=":wave: Hi Im your Navenu Concierge, how can I help you?"
                 primaryColor="#000000"
             inbox= "e1bb6f96-0947-42e4-a10e-c1f77b6e3fee"
            baseUrl="https://app.papercups.io"
            customer={{
              name: currentUser.display_name,
              email: currentUser.user_email,
              external_id: currentUser.ID,
            }}
          />
 
  )
})

