import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { DropDropDetailCard, ErrorMessage, LoadingIndicator, Screen, Text } from "../components"
import { useStores } from "../models"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Drop: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Drop" component={DropScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const DropScreen: FC<StackScreenProps<AppStackScreenProps, "Drop">> = observer(function DropScreen({route, navigation}) {
 
   const { dropStore } = useStores();
   const {isLoading, error, currentDrop, getDropDetail} = dropStore;

   useEffect(() =>{
    getDropDetail(route.params.venue.id)
    
   }, [])
   console.log('currentDrop ==>', currentDrop);
   if(error.isError || (!currentDrop && !isLoading)){
    return <ErrorMessage message={error.message} />
   }
   if(isLoading){
    return <LoadingIndicator></LoadingIndicator>
   }
  return (
    <Screen  style={$root} preset="scroll">

      <DropDropDetailCard drop={currentDrop} navigation={navigation}></DropDropDetailCard>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
