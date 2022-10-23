import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import {
  DropDropDetailCard,
  ErrorMessage,
  LoadingIndicator,
  Modal,
  Screen,
} from "../components"
import { useStores } from "../models"
import { View, Text } from "react-native-ui-lib"
import { Colors } from "../theme"
import { HorizontalLine } from "../components/HorizontalLine"
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
export const DropScreen: FC<StackScreenProps<AppStackScreenProps, "Drop">> = observer(
  function DropScreen({ route, navigation }) {
    const { dropStore } = useStores()
    const { isLoading, error, currentDrop, getDropDetail, showClaimedModal, claimedCode, claimDropCode, setShowClaimModal } = dropStore

    useEffect(() => {
      setShowClaimModal(false);
      getDropDetail(route.params.venue.id)
    }, [])

    if (error.isError || (!currentDrop && !isLoading)) {
      return <ErrorMessage message={error.message} />
    }
    if (isLoading) {
      return <LoadingIndicator></LoadingIndicator>
    }
   const claimCode = () => {
     claimDropCode(currentDrop.id);
   } 
    return (
      <Screen style={$root} preset="scroll">
       {showClaimedModal && <Modal
          show={showClaimedModal}
          body={
            <View style={$centeredView}>
              <View style={$modalView}>
                <View row >
  
                <Text style={$modalText}>Icons</Text>
                </View>
                <HorizontalLine style={$modalHorizontalColour}></HorizontalLine>
                <Text style={$headerText}>CODE CLAIMED!</Text>
                <View style={$codeClaimedBox}><Text center text60>{claimedCode}</Text></View>
                <Text text80>Codes are Automatically saved on your profile</Text>
              </View>
            </View>
          }
        />}

        <DropDropDetailCard onClaimCode={claimCode} drop={currentDrop} navigation={navigation}></DropDropDetailCard>
      </Screen>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
const $centeredView: ViewStyle = {
  flex: 1,
  justifyContent: "flex-end",
  bottom: 0,
  marginTop: 22,
  position: "relative",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
}

const $modalView: ViewStyle = {
  margin: 20,
  backgroundColor: "white",
  borderTopLeftRadius: 5,
  borderTopRightRadius: 5,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
  borderTopWidth: 10,
  borderTopColor: Colors.orange,
}
const $modalText: TextStyle = {
  marginBottom: 15,
  textAlign: "center",
}
const $modalHorizontalColour: ViewStyle ={
  width:'100%', 
  borderColor:'#D8D8D8',
  borderRadius: 4
}
const $headerText: TextStyle = {
   fontSize: 20,
   fontWeight: 'bold',
   marginTop: 15,
   marginBottom: 15,
} 
const $codeClaimedBox:ViewStyle = {
  borderWidth: 10,
  borderRadius: 8,
  padding: 15,
  width: "100%",
  borderColor: Colors.orange,
  marginBottom: 15
}
