import React, { FC, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, TouchableWithoutFeedback, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { DropDropDetailCard, ErrorMessage, LoadingIndicator, Modal, Screen } from "../components"
import { useStores } from "../models"
import { View, Text, TouchableOpacity } from "react-native-ui-lib"
import { Colors } from "../theme"
import { getStyleByCategory } from "../utils/transform"
import CategoryIcons from "../../assets/icons/drops/claim-icons.svg"
import { useDrop } from "../hooks/useDrops"
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
    const currentDropId = route.params.venue.id
    const { isLoading, data, error } = useDrop(currentDropId)
    const { showClaimedModal, claimedCode, claimDropCode, setShowClaimModal } = dropStore

    useEffect(() => {
      setShowClaimModal(false)
    }, [route.params.venue.id])

    if (error) {
      return <ErrorMessage message={error as string} />
    }
    if (isLoading) {
      return <LoadingIndicator></LoadingIndicator>
    }
    const claimCode = () => {
      //  claimDropCode(currentDropId);
    }
    const closeClaimModal = () => {
      setShowClaimModal(false)
    }
    return (
      <Screen style={$root} preset="scroll">
        {
          <Modal
            show={showClaimedModal}
            onRequestClose={closeClaimModal}
            body={
              <TouchableOpacity style={$centeredView} onPressOut={closeClaimModal}>
                <View style={{ ...$modalView, ...getStyleByCategory(data.category, false, true) }}>
                  <TouchableWithoutFeedback>
                    <>
                      <View row center>
                        <CategoryIcons />
                      </View>
                      <Text largeDarkHeader style={$headerText}>
                        CODE CLAIMED!
                      </Text>
                      <View
                        style={{
                          ...$codeClaimedBox,
                          ...getStyleByCategory(data.category, false, true),
                        }}
                      >
                        <Text bigTextDark center>
                          {claimedCode}
                        </Text>
                      </View>
                      <View row>
                        <Text text80>Codes are Automatically saved on your </Text>
                        <Text style={getStyleByCategory(data.category, true, true)}>profile</Text>
                      </View>
                    </>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableOpacity>
            }
          />
        }

        <DropDropDetailCard
          onClaimCode={claimCode}
          drop={data}
          navigation={navigation}
        ></DropDropDetailCard>
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
  position: "relative",
  backgroundColor: "rgba(0, 0, 0, 0.9)",
}

const $modalView: ViewStyle = {
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
const $headerText: TextStyle = {
  marginTop: 15,
  marginBottom: 15,
}
const $codeClaimedBox: ViewStyle = {
  borderWidth: 3,
  borderRadius: 10,
  padding: 15,
  width: "100%",
  borderColor: Colors.orange,
  marginBottom: 15,
}
