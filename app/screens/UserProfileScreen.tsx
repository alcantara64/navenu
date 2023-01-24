import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle, Share } from "react-native"

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
  Image,
} from "react-native-ui-lib"
import { Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons"
import DocumentPicker from "react-native-document-picker"
import { launchImageLibrary } from "react-native-image-picker"
import { UserService } from "../services/userService"
import { useNavigation } from "@react-navigation/native"
const { TextField } = Incubator

const RadioButton = ({ color, selected, onPress }) => {
  const $colorSelectorContainer: ViewStyle = {
    borderColor: selected ? "black" : "transparent",
    borderWidth: selected ? 1 : 0,
    borderRadius: 50,
    padding: 2,
    marginRight: 8,
  }

  const $colorSelector: ViewStyle = {
    backgroundColor: color,
    borderRadius: 50,
    width: 32,
    height: 32,
  }

  return (
    <TouchableOpacity style={$colorSelectorContainer} onPress={onPress}>
      <View style={$colorSelector} />
    </TouchableOpacity>
  )
}

export const UserProfileScreen: FC<StackScreenProps<AppStackScreenProps, "UserProfile">> = observer(
  function UserProfileScreen() {
    const { authenticationStore } = useStores()
    const { userStore } = useStores()
    const navigation = useNavigation()
    const {
      isLoading,
      error,
      getUser,
      usersList,
      currentUser,
      userDrops,
      updateUserName,
      updateUserDescription,

    } = userStore

    const [showBottomSheet, setShowBottomSheet] = useState(false)
    const [profileSectionExpandable, setProfileSectionExpandible] = useState({
      userName: false,
      imageUpload: false,
      color: false,
      preference: false,
      about: false,
      contact: false,
      location: false,
      logout: false,
    })
    const [singleFile, setSingleFile] = useState(null)
    const [errorMessage, setErrorMessage] = useState("")
    const [loading, setLoading] = useState(false)

    const [userName, setUserName] = useState({
      isTouched: false,
      value: currentUser?.display_name,
    })

    const [userDescription, setUserDescription] = useState({
      isTouched: false,
      value: currentUser?.description,
    })

    const [showUserListModal, setShowUserListModal] = useState(false)
    const [selectedListItem, setSelectedListItem] = useState(null)

    useEffect(() => {
      getUser()
    }, [])

    const logout = () => {
      authenticationStore.logout()
    }

    const closeBottomSheet = () => {
      setShowBottomSheet(false)
    }
    const openBottomSheet = () => {
      setShowUserListModal(false)
      setShowBottomSheet(true)
    }
    const uploadImage = async () => {
      // Check if any file is selected or not
      setLoading(true)
      if (singleFile != null) {
        // If file selected then create FormData
        const fileToUpload = singleFile
        fileToUpload.assets[0].name = fileToUpload.assets[0].fileName
        fileToUpload.assets[0].size = fileToUpload.assets[0].fileSize
        // check if is IOS
        const data = new FormData()
        data.append("avatar", fileToUpload.assets[0])
        // upload image file to server
        const userService = new UserService()
        const response = await userService.uploadAvatarImage(data)
        if (response.kind !== "ok") {
          setErrorMessage("Image upload failed")
        }
        getUser()
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
        const res = await launchImageLibrary({
          mediaType: 'photo',
        }, (response) => {
          if (response.didCancel) {
            console.log('User cancelled image picker');
            return false
          } else if (response.errorCode) {
            console.log('ImagePicker Error: ', response.errorCode);
            return false
          } 
          return true
        });
        if(!res.didCancel){
          setSingleFile(res)
        }
        
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
      setSelectedListItem(listItem)
      setShowUserListModal(true)
    }
    const openPreferenceScreen = () => {
      navigation.navigate("PreferencesScreen")
    }

    const shareLink = () => {
      Share.share({
        message: "Check out Navenu",
        url: `https://www.navenu.com`,
        title: "Navenu",
      })
    }

    const onDeleteList = async (id: string) => {
      // todo show a modal before delete
      const userService = new UserService()
      const result = await userService.clearAllList(id)
      if (result.kind !== "ok") {
        setErrorMessage("Could not remove list, try again later")
      } else {
        onCloseUserListModal()
        await getUser();
      }
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
                      value={userName.value}
                      onChangeText={(text) => setUserName({ ...userName, value: text })}
                      trailingAccessory={
                        <TouchableOpacity
                          onPress={() => {
                            updateUserName(userName.value)
                          }}
                        >
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
                      <TouchableOpacity onPress={selectFile} flex row centerV>
                        <Image
                          marginR-8
                          marginB-5
                          source={require("../../assets/icons/upload.png")}
                        />
                        <Text style={$selectFileButtonText}>
                          {singleFile?.assets
                            ? "Selected " + singleFile.assets[0].fileName.slice(0, 20)
                            : "Select File"}
                        </Text>
                      </TouchableOpacity>

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

                {/* TODO: COLOR SECTION WILL NOT BE USED FOR NOW
                <View marginT-10 style={$expandableContainer}>
                  <ExpandableSection
                    marginT-10
                    onPress={() => {
                      setProfileSectionExpandible({
                        ...profileSectionExpandable,
                        color: !profileSectionExpandable.color,
                      })
                    }}
                    expanded={profileSectionExpandable.color}
                    paddingB-10
                    sectionHeader={expandableHeaders(
                      "Choose Your Color",
                      profileSectionExpandable.color,
                    )}
                  >
                    <View row paddingV-5>
                      <RadioButton color="#E0AF00" selected={selectedOption === '#E0AF00'} onPress={() => setSelectedOption('#E0AF00')} />
                      <RadioButton color="#FF6800" selected={selectedOption === '#FF6800'} onPress={() => setSelectedOption('#FF6800')} />
                      <RadioButton color="#C849D9" selected={selectedOption === '#C849D9'} onPress={() => setSelectedOption('#C849D9')} />
                      <RadioButton color="#FF2794" selected={selectedOption === '#FF2794'} onPress={() => setSelectedOption('#FF2794')} />
                      <RadioButton color="#007CFF" selected={selectedOption === '#007CFF'} onPress={() => setSelectedOption('#007CFF')} />
                      <RadioButton color="#00CD00" selected={selectedOption === '#00CD00'} onPress={() => setSelectedOption('#00CD00')} />
                    </View>
                  </ExpandableSection>
                </View> */}

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
                    <TouchableOpacity marginV-10 style={$locationButton}>
                      <Text style={$locationButtonText}>LONDON</Text>
                    </TouchableOpacity>
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
                    sectionHeader={expandableHeaders("About", profileSectionExpandable.about)}
                  >
                    <TextField
                      value={userDescription.value}
                      onChangeText={(text) =>
                        setUserDescription({ ...userDescription, value: text })
                      }
                      numberOfLines={5}
                      multiline
                      trailingAccessory={
                        <TouchableOpacity>
                          <Text
                            style={$saveText}
                            underline
                            onPress={() => {
                              updateUserDescription(userDescription.value)
                            }}
                          >
                            SAVE
                          </Text>
                        </TouchableOpacity>
                      }
                      placeholder="Describe Yourself (250 Characters Max)"
                      fieldStyle={$withUnderline}
                    />
                  </ExpandableSection>
                </View>
                <View marginT-10 marginB-10>
                  <TouchableOpacity onPress={openPreferenceScreen}>
                    <Text style={$labelStyle}>Preference</Text>
                  </TouchableOpacity>
                </View>
                {/* 
                SAME AS COLOR SECTION, COMMMENTING FOR NOW
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
                </View> */}
                <View marginT-10 style={$expandableContainer}>
                  <ExpandableSection
                    marginT-10
                    onPress={() => {
                      setProfileSectionExpandible({
                        ...profileSectionExpandable,
                        logout: !profileSectionExpandable.logout,
                      })
                    }}
                    expanded={profileSectionExpandable.logout}
                    paddingB-10
                    sectionHeader={expandableHeaders("Logout", profileSectionExpandable.logout)}
                  >
                    <View row centerV spread>
                      <Text style={$logoutLabel}>DO YOU REALLY WANT TO LEAVE NAVENU?</Text>
                      <View row centerV>
                        <TouchableOpacity style={$logoutButton} onPress={logout}>
                          <Text style={$logoutButtonText}>YES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={$logoutButton}
                          onPress={() =>
                            setProfileSectionExpandible({
                              ...profileSectionExpandable,
                              logout: !profileSectionExpandable.logout,
                            })
                          }
                        >
                          <Text style={$logoutButtonText}>NO</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </ExpandableSection>
                </View>
              </View>
            </View>

            <View marginT-80>
              <Button
                backgroundColor={"#333333"}
                fullWidth
                bottom
                label={"Share Navenu"}
                onPress={shareLink}
              />
            </View>
          </View>
        </BottomSheet>

        <BottomSheet show={showUserListModal} onClose={onCloseUserListModal}>
          <View padding-8>
            <View row right marginB-5>
              <TouchableOpacity
                onPress={() => {
                  onDeleteList(selectedListItem?.user_list_id)
                }}
              >
                <AntDesign name="delete" size={30} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={shareLink}>
                <MaterialIcons name="ios-share" size={30} color="#black" />
              </TouchableOpacity>
            </View>
            <HorizontalLine color="black" />
            <Text header marginT-10>
              {selectedListItem?.userListName}
            </Text>
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

const $logoutLabel: TextStyle = {
  fontFamily: "Inter-Regular",
  fontStyle: "normal",
  fontWeight: "600",
  fontSize: 9,
  lineHeight: 12,
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

const $selectFileButtonText: TextStyle = {
  fontFamily: "Inter-Regular",
  textTransform: "uppercase",
  fontSize: 9,
  lineHeight: 12,
  fontWeight: "700",
}

const $locationButton: ViewStyle = {
  backgroundColor: "#333333",
  borderRadius: 5,
  width: 60,
  height: 34,
  alignItems: "center",
  justifyContent: "center",
  marginVertical: 10,
}

const $logoutButton: ViewStyle = {
  ...$locationButton,
  marginLeft: 10,
}

const $logoutButtonText: TextStyle = {
  ...$selectFileButtonText,
  color: "#FFF",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 10,
}

const $locationButtonText: TextStyle = {
  ...$logoutButtonText,
}
