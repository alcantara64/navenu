import * as React from "react"
import { ImageBackground, StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity, View, Text } from "react-native-ui-lib"
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons"
import { ICurator } from "../interface/user"
import { RemoveAndAddToUserList } from "./RemoveAndAddToUserList"
import { getUserListIdByItemId, isItemInUserList, shareLink } from "../utils/transform"
import { Colors, typography } from "../theme"
import { useSubscribeToNotification, useUserList } from "../hooks/useUser"
import { useState } from "react"
import { UserService } from "../services/userService"
import { DropCard } from "./DropCard"

export interface CuratorCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  curator: ICurator
}

/**
 * Describe your component here
 */
export const CuratorDetail = observer(function CuratorCard(props: CuratorCardProps) {
  const { style, curator } = props
  const $styles = [$container, style]
  const navigation = useNavigation();
  const userList = useUserList()
  const [showListModal, setShowListModal] = useState(false)
  
  
  const { mutate, isLoading: isSavingSubscription } = useSubscribeToNotification()
  const  goBack = () => {
    navigation.goBack()
  }
  const onSubscribeToNotification = () => {
    mutate({ type: 'Curator', id: curator.id })
  }
  const onLinkPress = () => {
   // openLinkInBrowser(curator.)
  }

  const onBookMark = async () => {
    if (!isItemInUserList(curator.id, userList.data)) {
      setShowListModal(true)
    } else {
      const userService = new UserService()
      const userListId = getUserListIdByItemId(curator.id, userList.data)
      await userService.removeCardFromList({
        user_list_id: userListId,
        type: 'curator',
        id: curator.id as any,
      })
    }
    userList.refetch()
  }

  return (
    <>
  
      <ImageBackground source={{ uri: curator.image }} resizeMode="cover" style={$imagetop}>
        <View style={$imageFilter} />
        <View marginT-15 style={$closeBtn}>
          <TouchableOpacity onPress={goBack}>
            <FontAwesome5 solid name="times-circle" size={27} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={$cardtext}>
          <Text text80BL style={$categoryText}>
            {curator.profession}
          </Text>
          <Text text60BL white style={$venueNameText}>
            {curator.name}
          </Text>
          <View row style={$horizontalLine}></View>
          <Text text90 white marginB-5 style={$venueNameAddress}>
            {curator.user_nicename}
          </Text>
        </View>
        <View marginB-40 style={$functionBtns}>
          <View flex-1 center spread>
            <TouchableOpacity
              marginV-10
              onPress={() =>
                shareLink(
                  curator.name,
                  `Checkout ${curator.name} on Navenu`,
                  "https://navenuapp.page.link/venue",
                )
              }
            >
              <MaterialIcons name="ios-share" size={30} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity marginV-5 onPress={onSubscribeToNotification}>
              {/* todo show spinner while is loading */}
              {/* { isSavingSubscription? <Text white>loading...</Text> : */}
              <Ionicons
                name={curator.subscribed ? "notifications" : "notifications-outline"}
                solid
                size={30}
                color="#FFFFFF"
              />
              {/* } */}
            </TouchableOpacity>
            <TouchableOpacity marginV-5 onPress={onBookMark}>
              <FontAwesome5
                name="bookmark"
                solid={isItemInUserList(curator.id, userList.data)}
                size={30}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={$contentContainer}>
        <View flex padding-15 style={$venueContent}>
          <View marginT-5 padding-8>
            <Text header>HEADLINE</Text>
            <Text belowHeaderText marginT-5 style={$longDescription}>
              {curator.description}
            </Text>
            <TouchableOpacity onPress={onLinkPress}>
              <Text style={$linkUrl} marginT-15>
                VISIT SITE
              </Text>
            </TouchableOpacity>
          </View>
  
          
          {curator.drops && curator.drops.length > 0 && (
            <View marginV-15>
              <Text sectionHeader>DROPS</Text>

              <View marginT-15>
                {curator.drops.map((drop) => (
                  <DropCard key={drop.id} item={drop} />
                ))}
              </View>
            </View>
          )}
        </View>
      </View>
      <RemoveAndAddToUserList
        showListModal={showListModal}
        setShowListModal={setShowListModal}
        selectedFeedItem={curator}
      />
    </>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}
const $contentContainer: ViewStyle = {
  borderStyle: "solid",
  borderTopWidth: 10,
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
  position: "relative",
  top: -7,
}
const $imagetop: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  width: "100%",
  height: 300,
  justifyContent: "flex-end",
}
const $imageFilter: ViewStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}
const $closeBtn: ViewStyle = {
  right: 10,
  top: 25,
  position: "absolute",
}
const $venueNameText: TextStyle = {
  marginBottom: 15,
  textTransform: "uppercase",
  fontFamily: typography.fonts.bourtonbase.normal,
  fontSize: 22,
}
const $cardtext: TextStyle = {
  alignItems: "baseline",
  marginHorizontal: 6,
  maxWidth: "70%",
  textAlign: "center",
}
const $horizontalLine: ViewStyle = {
  borderWidth: 1,
  borderColor: Colors.white,
  marginVertical: 5,
  width: "10%",
}
const $categoryText: TextStyle = {
  marginBottom: 0,
  color: "#FFFFFF",
  textTransform: "uppercase",
  fontFamily: typography.fonts.bourtonbase.normal,
  fontSize: 14,
}
const $venueNameAddress: TextStyle = {
  fontFamily: "inter",
  fontWeight: "400",
  fontStyle: "normal",
  marginBottom: 15,
}
const $functionBtns: ViewStyle = {
  right: 5,
  bottom: 5,
  position: "absolute",
}
const $venueContent: ViewStyle = {
  borderTopRightRadius: 15,
  backgroundColor: "#F2F2F2",
  borderTopLeftRadius: 15,
  padding: 8,
}
const $longDescription: TextStyle = {
  fontFamily: "inter",
  fontWeight: "400",
  fontSize: 12,
}
const $linkUrl: TextStyle = {
  color: Colors.orange,
  textDecorationColor: Colors.orange,
  textDecorationLine: "underline",
}