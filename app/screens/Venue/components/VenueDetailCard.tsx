import React, { useState } from "react"
import { ImageBackground, StyleProp, TextStyle, ViewStyle, ImageStyle, Linking } from "react-native"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, Text, View, Avatar } from "react-native-ui-lib"
import {
  FontAwesome5,
  MaterialIcons,
  Ionicons,
  AntDesign,
  SimpleLineIcons,
} from "@expo/vector-icons"
import { IVenue } from "../../../interface/venues"
import { useNavigation } from "@react-navigation/native"
import { BottomSheet } from "../../../components/BottomSheet"
import { useSubscribeToNotification, useUserList } from "../../../hooks/useUser"
import { openLinkInBrowser } from "../../../utils/openLinkInBrowser"
import { Colors, typography } from "../../../theme"
import { getInitials, getStyleByCategory, isItemInUserList, shareLink } from "../../../utils/transform"
import { DropCard, Gallery } from "../../../components"

export interface VenueDetailCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  venue: IVenue
  setDestinationDirections: (destination: any) => void
  createUberUrl: () => string
  style?: StyleProp<ViewStyle>
}

// create a enum for the different types of bottom sheet
enum BottomSheetType {
  operatingHours = "operatingHours",
  menu = "menu",
  book = "book",
}

/**
 * Describe your component here
 */
export const VenueDetailCard = observer(function VenueDetailCard(props: VenueDetailCardProps) {
  const userList = useUserList()

  const { mutate, isLoading: isSavingSubscription } = useSubscribeToNotification()
  const { venue, setDestinationDirections, createUberUrl } = props
  const navigation = useNavigation()
  const goBack = () => {
    navigation.goBack()
  }
  const onCallPhone = () => {
    Linking.openURL(`tel:${venue.phone}`)
  }
  const onLinkPress = () => {
    openLinkInBrowser(venue.website)
  }
  const $lineDivider = [$horizontalLine, $bigDivider]
  const onSubscribeToNotification = () => {
    mutate(
      { type: "venue", id: venue.id },
  
    )
  }


  const [bottomSheet, setBottomSheet] = useState(false)
  const [bottomSheetCurrentContent, setBottomSheetCurrentContent] = useState<BottomSheetType>(null)
  const operatingHours = venue.operating_hours?.split(",")

  const renderBottomSheetContent = () => {
    switch (bottomSheetCurrentContent) {
      case BottomSheetType.operatingHours:
        return renderOperatingHours()
      case BottomSheetType.menu:
        return renderMenu()
      default:
        return null
    }
  }

  const renderOperatingHours = () => {
    return (
      <View padding-15>
        <Text text60M>Opening Hours</Text>
        <View marginT-15>
          {operatingHours?.map((item, key) => (
            <View row spread marginT-10 key={key}>
              <Text text70>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    )
  }

  const renderMenu = () => {
    return (
      <View padding-15>
        <Text text60M>Menu</Text>
        <View marginT-15>
          <Text text70>{'Not Available'}</Text>
        </View>
      </View>
    )
  }

  const renderPriceLevel = () => {
    const priceLevel = venue.price_level
    if (priceLevel) {
      const priceLevelArray = priceLevel.split(" ")[0]
      return (
        <View row>
          {Array(5)
            .fill(0)
            .map((_, index) => {
              const isPriceLevel = index < priceLevelArray.length
              return (
                <FontAwesome5
                  key={index}
                  name="pound-sign"
                  size={17}
                  style={{ marginRight: 1 }}
                  color={isPriceLevel ? Colors.white : Colors.mediumGray}
                />
              )
            })}
        </View>
      )
    }
    return null
  }

  return (
    <>
      <ImageBackground source={{ uri: venue.image }} resizeMode="cover" style={$imagetop}>
        <View style={$imageFilter} />
        <View marginT-15 style={$closeBtn}>
          <TouchableOpacity onPress={goBack}>
            <FontAwesome5 solid name="times-circle" size={27} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={$cardtext}>
          <Text text80BL style={$categoryText}>
            {venue.category}
          </Text>
          <Text text60BL white style={$venueNameText}>
            {venue.name}
          </Text>
          {renderPriceLevel()}
          <View row style={$horizontalLine}></View>
          <Text text90 white marginB-5 style={$venueNameAddress}>
            {venue.address}
          </Text>
        </View>
        <View marginB-40 style={$functionBtns}>
          <View flex-1 center spread>
            <TouchableOpacity marginV-10 onPress={() => shareLink(venue.name, `Checkout ${venue.name} on Navenu`, 'https://navenuapp.page.link/venue')}>
              <MaterialIcons name="ios-share" size={30} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity marginV-5 onPress={onSubscribeToNotification}>
              {/* todo show spinner while is loading */}
              {/* { isSavingSubscription? <Text white>loading...</Text> : */}
              <Ionicons
                name={venue.subscribed ? "notifications" : "notifications-outline"}
                solid
                size={30}
                color="#FFFFFF"
              />
              {/* } */}
            </TouchableOpacity>
            <TouchableOpacity marginV-5>
              <FontAwesome5 name="bookmark" solid={isItemInUserList(venue.id, userList.data)} size={30} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={{ ...$contentContainer, ...getStyleByCategory(venue.category) }}>
        <View flex padding-15 style={$venueContent}>
          <View marginT-5 padding-8>
            <Text header>HEADLINE</Text>
            <Text belowHeaderText marginT-5 style={$longDescription}>
              {venue.long_description}
            </Text>
            <TouchableOpacity onPress={onLinkPress}>
              <Text style={$linkUrl} marginT-15>
                VISIT SITE
              </Text>
            </TouchableOpacity>
          </View>
          <View row style={$lineDivider}></View>
          <View style={$boxWrapper} row marginT-10 spread>
            <TouchableOpacity onPress={onCallPhone}>
              <View padding-15 style={$boxContainer}>
                <Ionicons name="call-outline" size={24} color="white" />
              </View>
              <Text center marginT-8>
                {" "}
                CALL
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBottomSheet(true)
                setBottomSheetCurrentContent(BottomSheetType.operatingHours)
              }}
            >
              <View padding-15 style={$boxContainer}>
                <AntDesign name="clockcircleo" size={24} color="white" />
              </View>
              <Text center marginT-8>
                {" "}
                HOUR
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setBottomSheet(true)
                setBottomSheetCurrentContent(BottomSheetType.menu)
              }}
            >
              <View padding-15 style={$boxContainer}>
                <SimpleLineIcons name="book-open" size={24} color="white" />
              </View>
              <Text center marginT-8>
                {" "}
                MENU
              </Text>
            </TouchableOpacity>
            {/* <TouchableOpacity onPress={() => {
              setBottomSheet(true)
              setBottomSheetCurrentContent(BottomSheetType.book)
              }
            }>
              <View padding-15 style={$boxContainer}>
                <AntDesign name="calendar" size={24} color="white" />
              </View>
              <Text center marginT-8>
                {" "}
                BOOK
              </Text>
            </TouchableOpacity> */}
            <TouchableOpacity
              onPress={() =>
                setDestinationDirections({
                  latitude: venue.lat,
                  longitude: venue.lng,
                })
              }
            >
              <View padding-15 style={$boxContainer}>
                <FontAwesome5 name="map-marker-alt" size={26} color="white" />
              </View>
              <Text center marginT-8>
                {" "}
                MAP
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                const url = createUberUrl()
                Linking.openURL(url).catch((error) => console.error(error))
              }}
            >
              <View padding-15 style={$boxContainer}>
                <FontAwesome5 name="taxi" size={24} color="white" />
              </View>
              <Text center marginT-8>
                RIDE
              </Text>
            </TouchableOpacity>
          </View>
          {venue.curators && venue.curators.length > 0 && (
            <View marginT-20 row>
              <View row flex-2>
                {venue.curators.slice(0, 3).map((curator, index) => {
                  const $dynamicStyle: any = {
                    borderColor: Colors.orange,
                  }
                  if (index === 1) {
                    $dynamicStyle.borderColor = Colors.stay
                    $dynamicStyle.left = "-45%"
                  }
                  if (index === 2) {
                    $dynamicStyle.borderColor = Colors.stay
                    $dynamicStyle.left = "-90%"
                  }

                  return (
                    <Avatar
                      size={60}
                      key={curator.id}
                      containerStyle={{ ...$imageContainer, ...$dynamicStyle }}
                      label={getInitials(curator.name)}
                      labelColor={Colors.white}
                      backgroundColor={$dynamicStyle.borderColor}
                      imageStyle={$roundedImage}
                      source={{ uri: curator.image }}
                    />
                  )
                })}
              </View>
              <View flex-4 right row>
                {venue.curators.slice(3).length > 0 ? (
                  <Text style={$curatorTextColor} text20BL>
                    {" "}
                    + {venue.curators.slice(3).length}
                  </Text>
                ) : (
                  <Text style={$curatorTextColor} text20BL>
                    {venue.curators.length}
                  </Text>
                )}
                <View marginL-10>
                  <Text sectionHeader>CURATORS</Text>
                  <Text sectionHeader>MENTIONED</Text>
                  <Text sectionHeader>THIS VENUE</Text>
                </View>
              </View>
            </View>
          )}
          {venue.drops && venue.drops.length > 0 && (
            <View marginV-15>
              <Text sectionHeader>DROPS</Text>

              <View marginT-15>
                {venue.drops.map((drop) => (
                  <DropCard key={drop.id} item={drop} />
                ))}
              </View>
            </View>
          )}
        </View>
        <View>{venue?.images?.length > 0 && <Gallery items={venue.images} />}</View>
      </View>
      <BottomSheet
        show={bottomSheet}
        onClose={() => {
          setBottomSheet(!bottomSheet)
        }}
      >
        <View padding-15>{renderBottomSheetContent()}</View>
      </BottomSheet>
    </>
  )
})

const $cardtext: TextStyle = {
  alignItems: "baseline",
  marginHorizontal: 6,
  maxWidth: "70%",
  textAlign: "center",
}
const $closeBtn: ViewStyle = {
  right: 10,
  top: 25,
  position: "absolute",
}
const $functionBtns: ViewStyle = {
  right: 5,
  bottom: 5,
  position: "absolute",
}
const $imagetop: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  width: "100%",
  height: 300,
  justifyContent: "flex-end",
}
const $categoryText: TextStyle = {
  marginBottom: 0,
  color: "#FFFFFF",
  textTransform: "uppercase",
  fontFamily: typography.fonts.bourtonbase.normal,
  fontSize: 14,
}
const $venueNameText: TextStyle = {
  marginBottom: 15,
  textTransform: "uppercase",
  fontFamily: typography.fonts.bourtonbase.normal,
  fontSize: 22,
}
const $horizontalLine: ViewStyle = {
  borderWidth: 1,
  borderColor: Colors.white,
  marginVertical: 5,
  width: "10%",
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
const $venueContent: ViewStyle = {
  borderTopRightRadius: 15,
  backgroundColor: "#F2F2F2",
  borderTopLeftRadius: 15,
  padding: 8,
}
const $linkUrl: TextStyle = {
  color: Colors.orange,
  textDecorationColor: Colors.orange,
  textDecorationLine: "underline",
}
const $bigDivider: ViewStyle = {
  borderColor: "#909090",
  width: "95%",
}
const $boxContainer: ViewStyle = {
  backgroundColor: Colors.ash,
  borderRadius: 15,
  padding: 18,
}
const $boxWrapper: ViewStyle = {
  justifyContent: "space-between",
  flexWrap: "wrap",
  flexShrink: 1,
  flexGrow: 1,
}
const $roundedImage: ImageStyle = {
  height: 70,
  width: 70,
  borderRadius: 35,
}
const $imageContainer: ViewStyle = {
  borderWidth: 1,
  borderColor: Colors.orange,
}
const $curatorTextColor: TextStyle = {
  color: Colors.orange,
}
const $venueNameAddress: TextStyle = {
  fontFamily: "inter",
  fontWeight: "400",
  fontStyle: "normal",
  marginBottom: 15,
}
const $longDescription: TextStyle = {
  fontFamily: "inter",
  fontWeight: "400",
  fontSize: 12,
}
const $imageFilter: ViewStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}
