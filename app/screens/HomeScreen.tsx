import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"

import { useNavigation } from "@react-navigation/native"
import ChatWidget from '@papercups-io/chat-widget-native'
import { useStores } from "../models"

export const HomeScreen: FC<StackScreenProps<AppStackScreenProps, "Home">> = observer(function HomeScreen() {

 const {userStore:{currentUser}} = useStores()

 const navigation = useNavigation();
 if(!currentUser.ID && !currentUser.display_name && !currentUser.ID){
  navigation.navigate('Settings')
 }
 

  return (
  
    <ChatWidget
            accountId="997f9a1e-90b7-4236-b2cf-8d2d09bf0f4c"
            title="Navenu Concierge"
            subtitle="Our Concierge is still getting to know you"
            greeting=":wave: Concierge AI"
                 primaryColor="#1890ff"
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

