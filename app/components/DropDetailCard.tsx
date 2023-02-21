import * as React from "react"
import { ImageBackground, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons"
import { View, Text, Button } from "react-native-ui-lib"
import { Colors } from "../theme"
import { DropCard } from "./DropCard"
import { useState } from "react"
import { IDrop } from "../interface/drops"
import { CountdownTimer, Gallery, RemoveAndAddToUserList, VenueCard } from "."
import { getStyleByCategory, getUserListIdByItemId, isItemInUserList, shareLink } from "../utils/transform"
import { useUserList } from "../hooks/useUser"
import { UserService } from "../services/userService"

export interface DropDropDetailCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  drop: IDrop
  navigation: any
  onClaimCode: () => void
}

/**
 * Describe your component here
 */
export const DropDropDetailCard = observer(function DropDropDetailCard(
  props: DropDropDetailCardProps,
) {
  const { style, drop, navigation, onClaimCode } = props
  const $styles = [$container, style]
  const userList = useUserList()
  const [bookmark, setBookmark] = useState(false)
  const [showListModal, setShowListModal] = useState(false)

  const goBack = () => {
    navigation.goBack()
  }
  const saveDrop = () => {
    setBookmark(!bookmark)
  }
  const onVenuePress = (venue) => {
    navigation.navigate('VenueDetailScreen', {
      venue
    })
  } 
  const onBookMark = async () => {
    if (!isItemInUserList(drop.id, userList.data)) {
      setShowListModal(true)
    } else {
      const userService = new UserService()
      const userListId = getUserListIdByItemId(drop.id, userList.data)
      await userService.removeCardFromList({
        user_list_id: userListId,
        type: drop.type,
        id: drop.id as any,
      })
    }
    userList.refetch()
  }

  return (
    <View style={$styles}>
      <ImageBackground source={{ uri: drop.image }} resizeMode="cover" style={$imageTop}>
        <View style={$closeBtn} center>
          <TouchableOpacity onPress={goBack} style={$padding10}>
            <Ionicons name="ios-close-circle-sharp" solid size={35} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <View flex row style={$cardTextContainer}>
          <View flex-8 bottom>
            <Text style={$cardText}>{drop.category}</Text>
            <Text style={$cardBelowText}>{drop.name}</Text>
            <View></View>
          </View>

          <View flex-1 center paddingB-20 spread >
            <TouchableOpacity
              style={{ marginVertical: 15 }}
              onPress={() => shareLink(drop.name, `Checkout ${drop.name} on Navenu`, 'https://navenuapp.page.link/drop')}
            >
              <MaterialIcons name="ios-share" size={30} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onBookMark} style={{ marginVertical: 5 }}>
              <FontAwesome5 solid={isItemInUserList(drop.id, userList.data)} name="bookmark" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={{...$contentContainer, ...getStyleByCategory(drop.category)}}>
        <View flex style={$dropContent} padding-20>
          {drop.description && (
            <View>
              <Text belowHeaderText>{drop.description}</Text>
            </View>
          )}
          <View flex row marginB-10 marginT-10 spread >
            {drop.user_claimed && (
              <>
                <Button
                  size="large"
                  label="CODE CLAIMED!"
                  color="white"
                  borderRadius={10}
                  backgroundColor={getStyleByCategory(drop.category).backgroundColor}
                  labelStyle ={$buttonLabel}
                />
                <Button
                  size="large"
                  label={drop.user_code}
                  color="white"
                  borderRadius={10}
                  backgroundColor={Colors.ash}
                  labelStyle ={$buttonLabel}
                />
              </>
            )}
            {!drop.user_claimed && (
              <>
                <View marginL-4 row style={{...$countDownContainer, ...getStyleByCategory(drop.category), borderColor:getStyleByCategory(drop.category).backgroundColor, opacity: drop.expired? 0.4: 1}}>
                  <Text style={$countdownText}>{!drop.expired ?'ENDS IN': 'Expired'}</Text>
                  {!drop.expired && <CountdownTimer time={drop.expiration} />}
                </View>
                <Button
                  size="large"
                  fullWidth
                  disabled={drop.expired}
                  label={ "CLAIM CODE!"}
                  color="white"
                  onPress={onClaimCode}
                  style={$claimButton}
                  backgroundColor={Colors.ash}
                />
              </>
            )}
          </View>
          <View row marginT-10 marginB-10>
           {drop.images?.length > 0 && <Gallery items={drop.images}></Gallery>}
          </View>
          <View row style={$horizontalLine}></View>
          <View row marginT-20 marginB-10>
            <Text sectionHeader>The Venue</Text>
          </View>

          <View>
           <VenueCard isFeed={false} item={{name:drop.venue, category:drop.category, image:drop.venue_image, distance: drop.distance || 0, id:drop.venue_id}} onPress={onVenuePress}/>
          </View>

          <View row marginT-20 marginB-10>
            <Text sectionHeader>ALL DROPS</Text>
          </View>
          <View>
            {drop &&
              drop.drops.map((item) => <DropCard key={item.id} item={item} />)}
          </View>
          <View row style={$horizontalLine}></View>
        </View>
      </View>
      <RemoveAndAddToUserList  showListModal={showListModal} setShowListModal={setShowListModal} selectedFeedItem={drop}/>
    </View>
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: "transparent",
}
const $imageTop: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  width: "100%",
  height: 300,
  justifyContent: "flex-end",
}

const $closeBtn: TextStyle = {
  right: 3,
  top: 25,
  position: "absolute",
}
const $padding10: ViewStyle = {
  marginRight: 10,
}
const $cardTextContainer: ViewStyle = {
  alignItems: "baseline",
  marginHorizontal: 10,
  position: "absolute",
}
const $cardText: TextStyle = {
  marginBottom: 0,
  textTransform: "uppercase",
  color: "#FFFFFF",
  fontWeight: "bold",
  textShadowColor: "#000000",
  fontSize: 14,
  textShadowRadius: 1,
  textShadowOffset: { width: 1, height: 1 },
}
const $cardBelowText: TextStyle = {
  textTransform: "uppercase",
  marginBottom: 15,
  color: "#FFFFFF",
  fontWeight: "bold",
  textShadowColor: "#000000",
  fontSize: 18,
  textShadowRadius: 1,
  textShadowOffset: { width: 1, height: 1 },
}
const $contentContainer: ViewStyle = {
  borderColor: Colors.orange,
  borderStyle: "solid",
  borderTopWidth: 10,
  borderTopRightRadius: 10,
  borderTopLeftRadius: 10,
  backgroundColor: Colors.orange,
  position: "relative",
  top: -7,
}
const $dropContent: ViewStyle = {
  borderTopRightRadius: 15,
  backgroundColor: "#F2F2F2",
  borderTopLeftRadius: 15,
}

const $horizontalLine: ViewStyle = {
  borderWidth: 1,
  borderColor: Colors.black,
  margin: 5,
}
const $countDownContainer: ViewStyle = {
  backgroundColor: Colors.orange,
  borderRadius: 5,
  padding: 5,
  alignItems: 'center',
}
const $countdownText: TextStyle = {
  marginBottom: 0,
  color: "#FFFFFF",
  fontWeight: "bold",
  marginRight: 4,
  padding: 9,
  fontSize: 15,
}
const $claimButton: ViewStyle = {
  borderRadius: 5
}
const $buttonLabel: TextStyle ={
  fontFamily: 'Inter-Regular',
  textTransform: 'uppercase',
  color: Colors.white,
  fontSize: 18,
}