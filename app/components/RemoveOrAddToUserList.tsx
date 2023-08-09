import * as React from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Colors, colors, typography } from "../../app/theme"
import { Modal } from "./Modal"
import { View, Text, TouchableOpacity, RadioGroup, RadioButton, Button } from "react-native-ui-lib"
import { Entypo, Ionicons } from "@expo/vector-icons"
import { useMutation } from "react-query"
import { addItemToUserList, createUserListName, useUserList } from "../../app/hooks/useUser"
import { LoadingIndicator } from "./LoadingIndicator"
import { AppInput } from "./AppInput"
import { useState } from "react"
import { IArticle, IVenue } from "../../app/interface/venues"
import { IDrop } from "../../app/interface/drops"

export interface RemoveOrAddToUserListProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  setShowListModal: (value: boolean) => void
  selectedFeedItem: IVenue | IDrop | IArticle
}

/**
 * Describe your component here
 */
export const RemoveOrAddToUserList = observer(function RemoveOrAddToUserList(
  props: RemoveOrAddToUserListProps,
) {
  const { style, setShowListModal, selectedFeedItem } = props
  const [listName, setListName] = useState("")
  const [selectedUserList, setSelectedUserList] = useState()
  const $styles = [$container, style]

  const userList = useUserList()
  const createListNameMutation = useMutation({
    mutationFn: createUserListName,
    onSuccess(data, variables, context) {
      userList.refetch()
    },
  })
  const addItemToListMutation = useMutation({
    mutationFn: addItemToUserList,
  })
  const addListName = () => {
    createListNameMutation.mutate(listName)
    setListName("")
  }
  const onAddItemToUserList = () => {
    addItemToListMutation.mutate(
      {
        user_list_id: selectedUserList,
        type: selectedFeedItem?.type,
        id: selectedFeedItem?.id,
      },
      {
        onSuccess: (data, variables, context) => {
          userList.refetch()
        },
      },
    )
    setShowListModal(false)
    setSelectedUserList(undefined)
  }
  const expandableHeaders = (title: string) => (
    <View style={$headerTextContainer} row spread>
      <View>
        <Text style={$labelStyle}>{title}</Text>
      </View>
    </View>
  )

  return (
    <View style={$styles}>
      <Modal
        show={true}
        body={
          <View bottom flex style={$centeredView}>
            <View style={$modalView}>
              <View marginB-10 row spread width={"100%"}>
                <Text header center>
                  SAVE TO LIST
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setShowListModal(false)
                  }}
                >
                  <Ionicons name="close-circle-sharp" size={24} color="black" />
                </TouchableOpacity>
              </View>
              <View width={"100%"} spread>
                <RadioGroup
                  onValueChange={(userListId) => {
                    setSelectedUserList(userListId)
                  }}
                  style={{ flexWrap: "wrap" }}
                  row
                >
                  {userList?.data?.userlist &&
                    Object.entries(userList.data.userlist).map(
                      (key, index) =>
                        key[0] && (
                          <RadioButton
                            color={Colors.stay}
                            labelStyle={$userListLabelStyle}
                            key={index}
                            marginB-10
                            value={`${userList.data.userlist[key[0]]?.user_list_id}`}
                            label={expandableHeaders(
                              `${key[0]} (${userList.data.userlist[key[0]]?.cards?.length})`,
                            )}
                          />
                        ),
                    )}
                </RadioGroup>
              </View>

              {userList.isLoading && <LoadingIndicator />}
              {userList.error && <Text>an error occurred fetching userList</Text>}
              <View marginB-15 style={{ width: "100%" }}>
                <View marginT-10>
                  <AppInput
                    value={listName}
                    onTextChange={(text) => {
                      setListName(text)
                    }}
                    trailingAccessory={
                      <TouchableOpacity onPress={addListName}>
                        <Entypo name="add-to-list" size={24} color="black" />
                      </TouchableOpacity>
                    }
                    placeholder="add to a new list"
                  />
                  <View marginT-10>
                    <Button
                      onPress={onAddItemToUserList}
                      style={$buttonStyle}
                      disabled={!selectedUserList}
                      backgroundColor={Colors.stay}
                      fullWidth
                      label={"ADD TO LIST "}
                      labelStyle={$userListLabelStyle}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        }
      ></Modal>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $centeredView: ViewStyle = {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.9)",
}

// userlist
const $modalView: ViewStyle = {
  backgroundColor: "#F2F2F2",
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  padding: 15,
  alignItems: "flex-start",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowRadius: 8,
  elevation: 5,
  // borderTopWidth: 10,
  width: "100%",
  borderRadius: 8,
}

const $userListLabelStyle: TextStyle = {
  fontFamily: typography.fonts.inter.normal,
  fontWeight: "700",
  textTransform: "uppercase",
  marginRight: 5,
}
const $headerTextContainer: ViewStyle = {
  alignItems: "center",
}
const $buttonStyle: ViewStyle = {
  borderRadius: 8,
}
const $labelStyle: TextStyle = {
  fontFamily: "Inter-Regular",
  fontStyle: "normal",
  fontWeight: "600",
  textTransform: "uppercase",
}
