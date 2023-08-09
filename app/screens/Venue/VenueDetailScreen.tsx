import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../../navigators"
import {
  AppBottomsheet,
  ArticleCard,
  BottomSheet,
  DropCard,
  ErrorMessage,
  LoadingIndicator,
  NearByVenues,
  Screen,
  VenueCard,
  Web,
} from "../../components"
import { BottomSheetType, VenueDetailCard } from "./components/VenueDetailCard"
import { View, Text } from "react-native-ui-lib"
import { useVenue } from "../../hooks/useVenue"
import { useStores } from "../../models"
import * as Location from "expo-location"
import { getDropsByID } from "../../utils/transform"

// @ts-ignore
export const VenueDetailScreen: FC<StackScreenProps<AppStackScreenProps, "VenueDetail">> = observer(
  function VenueDetailScreen({ route }) {
    // Pull in one of our MST stores
    const {
      authenticationStore,
      venueStore: { showBottomSheet, currentVenue, setBottomSheetStatus, setCurrentVenue },
    } = useStores()
    const venueId = route.params.venue.id
    const { data, error, isLoading, refetch } = useVenue(venueId)
    const [destinationDirections, setDestinationDirections] = useState<any>(null)
    const [latitude, setLatitude] = useState(authenticationStore.latitude)
    const [longitude, setLongitude] = useState(authenticationStore.longitude)
    const [bottomSheet, setBottomSheet] = useState(false)
    const [bottomSheetCurrentContent, setBottomSheetCurrentContent] =
      useState<BottomSheetType>(null)
    const [showWebview, setShowWebview] = useState(false)
    const [currentUrl, setCurrentUrl] = useState("")

    const createUberUrl = (
      pickupLatitude: number,
      pickupLongitude: number,
      pickupNickname: string,
      dropoffLatitude: number,
      dropoffLongitude: number,
      dropoffNickname: string,
    ) => {
      return `uber://?action=setPickup&pickup[latitude]=${pickupLatitude}&pickup[longitude]=${pickupLongitude}&pickup[nickname]=${pickupNickname}&dropoff[latitude]=${dropoffLatitude}&dropoff[longitude]=${dropoffLongitude}&dropoff[nickname]=${dropoffNickname}`
    }

    const handleBottomSheetClose = () => {
      setBottomSheetStatus(false)
    }

    useEffect(() => {
      return () => {
        handleBottomSheetClose()
        setCurrentVenue(null)
      }
    }, [])

    useEffect(() => {
      if (latitude === 0 && longitude === 0) {
        ;(async () => {
          const { status } = await Location.requestForegroundPermissionsAsync()
          if (status !== "granted") {
            console.log("Permission to access location was denied")
            return
          }

          const location = await Location.getCurrentPositionAsync({})
          setLatitude(location.coords.latitude)
          setLongitude(location.coords.longitude)
        })()
      }
    }, [])
    const operatingHours = data?.operating_hours?.split(",")

    const renderWebView = () => {
      return (
        <View style={{ height: 600 }}>
          <Web
            url={currentUrl}
            onClose={() => {
              setShowWebview(false)
            }}
          ></Web>
        </View>
      )
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
            <Text text70>{"Not Available"}</Text>
          </View>
        </View>
      )
    }

    if (error) return <ErrorMessage message={"Error occurred"}></ErrorMessage>
    if (isLoading) return <LoadingIndicator />
    const renderBottomSheetContent = () => {
      switch (bottomSheetCurrentContent) {
        case BottomSheetType.operatingHours:
          return renderOperatingHours()
        case BottomSheetType.menu:
          return renderMenu()
        case BottomSheetType.webView:
          return renderWebView()
        default:
          return null
      }
    }
    return (
      <View flex-1>
        <Screen style={$root} preset="auto">
          <View style={$container}>
            <VenueDetailCard
              venue={data}
              setCurrentUrl={setCurrentUrl}
              currentUrl={currentUrl}
              setShowWebview={setShowWebview}
              showWebview={showWebview}
              setDestinationDirections={setDestinationDirections}
              createUberUrl={() =>
                createUberUrl(
                  latitude,
                  longitude,
                  "Current Location",
                  data.lat,
                  data.lng,
                  data.name,
                )
              }
              setBottomSheetCurrentContent={setBottomSheetCurrentContent}
              setBottomSheet={setBottomSheet}
              refetch={refetch}
            />
            {data?.nearby && latitude !== 0 && longitude !== 0 ? (
              <NearByVenues
                venues={data?.nearby}
                destinationDirections={{
                  origin: {
                    latitude,
                    longitude,
                  },
                  destination: destinationDirections,
                }}
                defaultLocation={{
                  latitude: !data.lat ? 0 : Number(data.lat),
                  longitude: !data.lat ? 0 : Number(data.lng),
                }}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
              />
            ) : null}
            {data.articles && data.articles.length > 0 && (
              <View marginR-5 marginL-5>
                <View marginB-10>
                  <Text sectionHeader>Editorial</Text>
                </View>

                {data.articles
                  .filter((item) => !!item)
                  .map((item) => {
                    return <ArticleCard key={item.id} item={item} />
                  })}
              </View>
            )}
          </View>
        </Screen>
        <BottomSheet
          show={bottomSheet}
          onClose={() => {
            setBottomSheet(!bottomSheet)
          }}
          category={data.category}
        >
          <View>{renderBottomSheetContent()}</View>
        </BottomSheet>
        {currentVenue && showBottomSheet && (
          <AppBottomsheet>
            <>
              {currentVenue && (
                <VenueCard
                  currentUserLatitude={latitude}
                  currentUserLongitude={longitude}
                  item={currentVenue}
                  isFeed={false}
                />
              )}
              {getDropsByID(currentVenue?.drops as any, data?.nearby).length > 0 && (
                <View>
                  <View>
                    <Text>Drops</Text>
                  </View>
                  <FlatList
                    data={getDropsByID(currentVenue?.drops as any, data?.nearby)}
                    renderItem={(item) => <DropCard item={item} isFeed={false} />}
                  />
                </View>
              )}
            </>
          </AppBottomsheet>
        )}
      </View>
    )
  },
)

const $root: ViewStyle = {
  flex: 1,
}
const $container: ViewStyle = {
  height: "100%",
  backgroundColor: "#F2F2F2",
}
