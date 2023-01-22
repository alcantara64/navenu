import * as React from "react"
import { ImageBackground, StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, Text, View } from "react-native-ui-lib"
import { FontAwesome5, Ionicons } from "@expo/vector-icons"
import { ISavedLocation, IUser } from "../interface/user"
import { useNavigation } from "@react-navigation/native"
import LinearGradient from "react-native-linear-gradient"
import { Colors } from "../theme"
import { DropList } from "./DropList"
import { IDrop } from "../interface/drops"
import { UserListCard } from "./UserListCard"
import { useState } from "react"

export interface UserProfileProps {
  /**
   * An optional style override useful for padding & margin.
   */
  user: IUser
  style?: StyleProp<ViewStyle>
  userDrops: Array<IDrop>
  userList: Record<string, never>
  locations?: Array<ISavedLocation>
  showSetting: (value: boolean) => void
  onSetSelectedList: (value: any) => void
}

/**
 * Describe your component here
 */
export const UserProfile = observer(function UserProfile(props: UserProfileProps) {
  const { user, userDrops, userList, showSetting, onSetSelectedList } = props
  const navigation = useNavigation()
  const userListNames = Object.keys(userList || {})
  const [dropListCount, setDropListCount] = useState(3)
  const [userListCount, setUserListCount] = useState(3)
  const goBack = () => {
    navigation.goBack()
  }
  const onSelectedListItemPressed = (listName: string) => {
    onSetSelectedList({ ...(userList[listName] as any), userListName: listName })
  }

  const londonImage = require("../../assets/images/preferences/london.png")
  // need to check if the user has a profile picture or not, if not use a default one
  const userAvatar = user?.avatar ? { uri: user?.avatar } : londonImage

  return (
    <>
      <ImageBackground source={userAvatar} resizeMode="cover" style={$imagetop}>
        <View marginT-10 style={$closeBtn}>
          <TouchableOpacity onPress={goBack}>
            <FontAwesome5 solid name="times-circle" size={27} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={$cardTextContainer}>
          <Text cardSubtitleText>{"TITLE"}</Text>
          <View marginT-4>
            <Text white cardTitle>
              {user?.display_name}
            </Text>
          </View>
          <View marginT-10 row style={$horizontalLine}></View>
          <View marginB-15>
            <Text white cardUserName>
              @{user?.user_nicename}
            </Text>
          </View>
        </View>
        <View style={$functionBtns}>
          <View flex-1 center spread>
            <TouchableOpacity style={{ marginVertical: 5 }} onPress={showSetting}>
              <Ionicons name="settings-outline" size={27} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={$contentContainer}>
        <View style={$mainContent}>
          <View marginT-10>
            <View style={$dropsContainer}>
              <Text header>MY Drops</Text>
              {userDrops.length === 0 && (
                <View marginT-20>
                  <Text center white black bottom underline belowHeaderText>
                    You have no drops yet
                  </Text>
                </View>
              )}
              <View marginT-20>
                <DropList  hideBookmark drops={[...userDrops].splice(0, dropListCount)} />
              </View>
              {userDrops.length > 3 && dropListCount < userDrops.length ? (
                <View>
                  <LinearGradient
                    colors={["rgba(216, 216, 216, 0)", "#F2F2F2"]}
                    style={$fadedContainer}
                  />
                  <TouchableOpacity
                    marginT-10
                    onPress={() => {
                      setDropListCount(userDrops.length)
                    }}
                  >
                    <Text center white black bottom underline belowHeaderText>
                      LOAD MORE
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>

            <View style={$dropsContainer}>
              <Text header>My List</Text>
              <View marginT-20>
                {userListNames.slice(0, userListCount).map((name) => (
                  <UserListCard
                    onListPress={onSelectedListItemPressed}
                    key={name}
                    image=""
                    name={name}
                  />
                ))}
              </View>
              {userListNames.length > 3 && userListCount < userListNames.length && (
                <View>
                  <LinearGradient
                    colors={["rgba(216, 216, 216, 0)", "#F2F2F2"]}
                    style={$fadedContainer}
                  />
                  <TouchableOpacity
                    onPress={() => {
                      setUserListCount(userListNames.length)
                    }}
                  >
                    <Text center white black bottom underline belowHeaderText>
                      LOAD MORE
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </>
  )
})

const $cardTextContainer: TextStyle = {
  alignItems: "baseline",
  marginHorizontal: 6,
  maxWidth: "70%",
  textAlign: "center",
}
const $closeBtn: ViewStyle = {
  right: 15,
  top: 30,
  position: "absolute",
}
const $functionBtns: ViewStyle = {
  right: 10,
  bottom: 10,
  position: "absolute",
}
const $imagetop: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  width: "100%",
  height: 300,
  justifyContent: "flex-end",
}

const $horizontalLine: ViewStyle = {
  borderWidth: 1,
  borderColor: Colors.white,
  margin: 5,
  width: "10%",
}
const $contentContainer: ViewStyle = {
  borderColor: Colors.do,
  borderStyle: "solid",
  borderTopWidth: 10,
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
  backgroundColor: Colors.do,
  position: "relative",
  top: -7,
}
const $mainContent: ViewStyle = {
  borderTopRightRadius: 8,
  backgroundColor: "#F2F2F2",
  borderTopLeftRadius: 8,
  padding: 8,
}

const $dropsContainer: ViewStyle = {
  position: "relative",
}
const $fadedContainer: ViewStyle = {
  bottom: 25,
  zIndex: 10,
  position: "absolute",
  width: "100%",
  height: "100%",
}
