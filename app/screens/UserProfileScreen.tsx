import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
import {
  BottomSheet,
  CardList,
  ErrorMessage,
  HorizontalLine,
  LoadingIndicator,
  Screen,
  ToastLoader,
  UserProfile,
} from "../components"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { useStores } from "../models"
import {
  View,
  Text,
  ExpandableSection,
  Incubator,
  Colors,
  Button,
  TouchableOpacity,
} from "react-native-ui-lib"
import { Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons"
import DocumentPicker from "react-native-document-picker"
import { NavigationContext, useNavigation } from "@react-navigation/native"
import { UserService } from "../services/userService"
const { TextField } = Incubator

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `UserProfile: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="UserProfile" component={UserProfileScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const UserProfileScreen: FC<StackScreenProps<AppStackScreenProps, "UserProfile">> = observer(function UserProfileScreen() {
  // Pull in one of our MST stores
  const { authenticationStore } = useStores()
  const navigation = useNavigation()

  const { userStore } = useStores()
  const { isLoading, error, getUser, usersList, currentUser, userDrops } = userStore
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const [profileSectionExpandable, setProfileSectionExpandible] = useState({
    userName: false,
    imageUpload: false,
    color: false,
    preference: false,
    about: false,
    contact: false,
    location: false,
  })
  const [singleFile, setSingleFile] = useState(null)
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [userName, setUserName] = useState({
    isTouched: false,
    value: currentUser.display_name,
  })
  const [showUserListModal, setShowUserListModal] = useState(false);
  const [selectedListItem, setSelectedListItem] = useState(null)

  useEffect(() => {
    getUser()
  }, [])

  const logout = () => {
    authenticationStore.logout()
  }
  const gotoPreferences = () => {
    navigation.navigate('PreferencesScreen')
  }

  const closeBottomSheet = () => {
    setShowBottomSheet(false)
  }
  const openBottomSheet = () => {
    setShowUserListModal(false);
    setShowBottomSheet(true)
  }
  const uploadImage = async () => {
    // Check if any file is selected or not
    setLoading(true)
    if (singleFile != null) {
      // If file selected then create FormData
      const fileToUpload = singleFile
      const data = new FormData()
      data.append("avatar", fileToUpload)
      // upload image file to server
      const userService = new UserService()
      const response = await userService.uploadAvatarImage(data)

      if (response.kind !== "ok") {
        setErrorMessage("Image upload failed")
      }
      setSingleFile(null)
    } else {
      // If no file selected the show alert
      alert("Please Select File first")
    }
    setLoading(false)
  }
  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pickSingle({
        // Select only images
        type: DocumentPicker.types.images,
        // There can me more options as well
      })
      // Setting the state to show single file attributes
      setSingleFile(res)
    } catch (err) {
      setSingleFile(null)
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert("Canceled")
      } else {
        // For Unknown Error
        setErrorMessage("An expected error occur please try again")
        throw err
      }
    }
  }
  const onCloseUserListModal = () => {
    setShowUserListModal(false)
  }
  const setCurrentListItem = (listItem) => {
   setShowBottomSheet(false) 
   setSelectedListItem(listItem);
   setShowUserListModal(true)
  }

  if (error.isError) return <ErrorMessage message={"Error occurred"}></ErrorMessage>
  if (isLoading) return <LoadingIndicator />
  // Pull in navigation via hook
  // const navigation = useNavigation()
  const expandableHeaders = (title: string, targetChberon: boolean) => (
    <View style={$headerTextContainer} row spread>
      <View>
        <Text style={$labelStyle}>{title}</Text>
      </View>
      <View center>
        <Entypo name={targetChberon ? "chevron-up" : "chevron-down"} size={24} color="black" />
      </View>
    </View>
  )
  return (
    <>
      <Screen style={$root} preset="scroll">
        <ToastLoader
          isLoading={loading}
          hasError={!!errorMessage}
          errorMessage={errorMessage}
          clearError={() => setErrorMessage("")}
        />
        <UserProfile
          user={currentUser}
          userList={usersList}
          userDrops={userDrops}
          showSetting={openBottomSheet}
          onSetSelectedList={setCurrentListItem}
        />
      </Screen>
      <BottomSheet show={showBottomSheet} onClose={closeBottomSheet}>
        <View bg-red padding-4>
          <View>
            <View>
              <Text sectionHeader>ACCOUNT SETTINGS</Text>
            </View>
            <View marginT-20>
              <View marginT-10 style={$expandableContainer}>
                <ExpandableSection
                  onPress={() => {
                    setProfileSectionExpandible({
                      ...profileSectionExpandable,
                      userName: !profileSectionExpandable.userName,
                    })
                  }}
                  expanded={profileSectionExpandable.userName}
                  paddingB-10
                  sectionHeader={expandableHeaders(
                    "User Name",
                    profileSectionExpandable.userName,
                  )}
                >
                  <TextField
                    trailingAccessory={
                      <TouchableOpacity>
                        <Text style={$saveText} underline>
                          SAVE
                        </Text>
                      </TouchableOpacity>
                    }
                    placeholder="Type User Name"
                    fieldStyle={$withUnderline}
                  />
                </ExpandableSection>
              </View>
              <View marginT-10 style={$expandableContainer}>
                <ExpandableSection
                  marginT-10
                  onPress={() => {
                    setProfileSectionExpandible({
                      ...profileSectionExpandable,
                      imageUpload: !profileSectionExpandable.imageUpload,
                    })
                  }}
                  expanded={profileSectionExpandable.imageUpload}
                  paddingB-10
                  sectionHeader={expandableHeaders(
                    "Profile Pic",
                    profileSectionExpandable.imageUpload,
                  )}
                >
                  <View row spread>
                    <Button
                      center
                      marginB-5
                      bottom
                      label={
                        singleFile ? "Selected " + singleFile.name.slice(0, 20) : "Select File"
                      }
                      onPress={selectFile}
                    />
                    {singleFile && (
                      <TouchableOpacity center onPress={uploadImage}>
                        <Text style={$saveText} underline>
                          Upload
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </ExpandableSection>
              </View>
              <View marginT-10 style={$expandableContainer}>
                <ExpandableSection
                  marginT-10
                  onPress={() => {
                    setProfileSectionExpandible({
                      ...profileSectionExpandable,
                      location: !profileSectionExpandable.location,
                    })
                  }}
                  expanded={profileSectionExpandable.location}
                  paddingB-10
                  sectionHeader={expandableHeaders(
                    "Current Location",
                    profileSectionExpandable.location,
                  )}
                >
                  <TextField
                    trailingAccessory={
                      <TouchableOpacity>
                        <Text style={$saveText} underline>
                          SAVE
                        </Text>
                      </TouchableOpacity>
                    }
                    placeholder="Upload Photo"
                    fieldStyle={$withUnderline}
                  />
                </ExpandableSection>
              </View>
              <View marginT-10 style={$expandableContainer}>
                <ExpandableSection
                  marginT-10
                  onPress={() => {
                    setProfileSectionExpandible({
                      ...profileSectionExpandable,
                      preference: !profileSectionExpandable.preference,
                    })
                  }}
                  expanded={profileSectionExpandable.preference}
                  paddingB-10
                  sectionHeader={expandableHeaders(
                    "Preferences",
                    profileSectionExpandable.preference,
                  )}
                >
                  <TextField
                    trailingAccessory={
                      <TouchableOpacity>
                        <Text style={$saveText} underline>
                          SAVE
                        </Text>
                      </TouchableOpacity>
                    }
                    placeholder="Upload Photo"
                    fieldStyle={$withUnderline}
                  />
                </ExpandableSection>
              </View>
              <View marginT-10 style={$expandableContainer}>
                <ExpandableSection
                  marginT-10
                  onPress={() => {
                    setProfileSectionExpandible({
                      ...profileSectionExpandable,
                      about: !profileSectionExpandable.about,
                    })
                  }}
                  expanded={profileSectionExpandable.about}
                  paddingB-10
                  sectionHeader={expandableHeaders("About", profileSectionExpandable.about)}
                >
                  <TextField
                    trailingAccessory={
                      <TouchableOpacity>
                        <Text style={$saveText} underline>
                          SAVE
                        </Text>
                      </TouchableOpacity>
                    }
                    placeholder="Upload Photo"
                    fieldStyle={$withUnderline}
                  />
                </ExpandableSection>
              </View>
              <View marginT-10 style={$expandableContainer}>
                <ExpandableSection
                  marginT-10
                  onPress={() => {
                    setProfileSectionExpandible({
                      ...profileSectionExpandable,
                      contact: !profileSectionExpandable.contact,
                    })
                  }}
                  expanded={profileSectionExpandable.contact}
                  paddingB-10
                  sectionHeader={expandableHeaders(
                    "Contact info",
                    profileSectionExpandable.contact,
                  )}
                >
                  <TextField
                    trailingAccessory={
                      <TouchableOpacity>
                        <Text style={$saveText} underline>
                          SAVE
                        </Text>
                      </TouchableOpacity>
                    }
                    placeholder="Upload Photo"
                    fieldStyle={$withUnderline}
                  />
                </ExpandableSection>
              </View>
              <View marginT-10 style={$expandableContainer}>
                <TouchableOpacity onPress={gotoPreferences}>
                  <Text marginT-4 marginB-4 style={$labelStyle}>
                    Preferences
                  </Text>
                </TouchableOpacity>
              </View>
              <View marginT-10 style={$expandableContainer}>
                <TouchableOpacity onPress={logout}>
                  <Text marginT-4 marginB-4 style={$labelStyle}>
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View marginT-80>
            <Button  backgroundColor={'#333333'} fullWidth bottom label={"Share Navenu"} onPress={selectFile} />
          </View>
        </View>
      </BottomSheet>
    
      <BottomSheet show={showUserListModal} onClose={onCloseUserListModal}>
        <View padding-8>
          <View row right marginB-5>
            <TouchableOpacity>
           <AntDesign name="delete" size={30} color="black" />
           </TouchableOpacity>
           <TouchableOpacity>
           <MaterialIcons name="ios-share" size={30} color="#black" />
           </TouchableOpacity>
           </View>
          <HorizontalLine color="black" />
          <Text header marginT-10>{selectedListItem?.userListName}</Text>
          <View marginT-15>
          <CardList data={selectedListItem?.cards || []} />
          </View>
        </View>
      </BottomSheet>
    </>
  )
},
)

const $root: ViewStyle = {
flex: 1,
}
const $withUnderline: ViewStyle = {
borderBottomWidth: 1,
borderColor: Colors.$outlineDisabledHeavy,
paddingBottom: 4,
height: 35,
}

const $labelStyle: TextStyle = {
fontFamily: "Inter-Regular",
fontStyle: "normal",
fontWeight: "600",
}
const $saveText: TextStyle = {
fontFamily: "Inter-Regular",
fontWeight: "700",
fontSize: 8,
color: "#007CFF",
}
const $expandableContainer: ViewStyle = {
borderBottomColor: Colors.$outlineDisabledHeavy,
borderBottomWidth: 1,
marginBottom: 10,
}
const $headerTextContainer: ViewStyle = {
alignItems: "center",
}
