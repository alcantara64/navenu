import * as React from "react"
import { FlatList, StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, mapStyle, typography } from "../theme"
import { IVenue } from "../interface/venues"
import { CategoryFilterBar } from "./CategoryFilterBar"
import { View, Text } from "react-native-ui-lib"
import { useState } from "react"
import { SlimVenueCard } from "./SlimVenueCard"
import { ISuckMapMarker } from "./ISuckMapMarker"
import _ from "lodash"
import { AppMap } from "./AppMap"
import { BottomSheet } from "./BottomSheet"
import { VenueCard } from "./VenueCard"
import { DropCard } from "./DropCard"
import { getDropsByID } from "../utils/transform"
import { useStores } from "../models"

export interface NearByVenuesProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  origin?: {
    latitude: number
    longitude: number
  }
  destinationDirections: {
    origin: {
      latitude: number
      longitude: number
    }
    destination: {
      latitude: number
      longitude: number
    }
  }
  defaultLocation: {
    latitude: number
    longitude: number
  }
  setLatitude: React.Dispatch<React.SetStateAction<number>>
  setLongitude: React.Dispatch<React.SetStateAction<number>>
  venues: Array<IVenue>
}

/**
 * Describe your component here
 */
export const NearByVenues = observer(function NearByVenues(props: NearByVenuesProps) {
  const { style, venues, setLatitude, setLongitude, destinationDirections, defaultLocation } = props

  const $styles = [$container, style]
  const [DoStateButton, setDoStateButton] = useState(false)
  const [EatStateButton, setEatStateButton] = useState(false)
  const [DrinkStateButton, setDrinkStateButton] = useState(false)
  const [ShopStateButton, setShopStateButton] = useState(false)
  const [StayStateButton, setStayStateButton] = useState(false)
  const [FitStateButton, setFitStateButton] = useState(false)
  const [miniFilter, setMiniFilter] = useState([])
  const [selectedVenue, setSelectedVenue] = useState<IVenue>(null)
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const { venueStore } = useStores()
  const {
    authenticationStore: { latitude, longitude },
  } = useStores()
  const addCat = (cat) => {
    setMiniFilter([...miniFilter, cat])
  }
  const onMarkerPress = (venue) => {
    setSelectedVenue(venue)
    setShowBottomSheet(true)
    venueStore.setCurrentVenue(venue)
    venueStore.setBottomSheetStatus(true)
  }
  const removeCat = (cat) => {
    const newCatFilter = _.without(miniFilter, cat)
    setMiniFilter(newCatFilter)
  }

  let Markers
  let Venuecards

  if (miniFilter.length === 0) {
    Venuecards = venues.map((venue, index) => (
      <VenueCard
        item={venue}
        key={"g" + index}
        isFeed={false}
        currentUserLatitude={latitude}
        currentUserLongitude={longitude}
      />
    ))

    Markers = venues.map((venue, index) => (
      <ISuckMapMarker onMarkerPressed={onMarkerPress} venue={venue} key={"f" + index} />
    ))
  } else {
    Venuecards = venues.map((venue, index) => {
      if (miniFilter.includes(venue.category))
        return (
          <VenueCard
            item={venue}
            key={"m" + index}
            isFeed={false}
            currentUserLatitude={latitude}
            currentUserLongitude={longitude}
          />
        )
    })
    Markers = venues.map((venue, index) => {
      if (miniFilter.includes(venue.category))
        return <ISuckMapMarker onMarkerPressed={onMarkerPress} venue={venue} key={"b" + index} />
    })
  }
  const handleBottomSheetClose = () => {
    setShowBottomSheet(false)
  }
  return (
    <View flex-1>
      <View marginB-10 marginL-10>
        <Text left sectionHeader>
          Venues Near By
        </Text>
      </View>
      <View centerH flex marginB-10>
        <CategoryFilterBar
          addCat={addCat}
          removeCat={removeCat}
          DoStateButton={DoStateButton}
          EatStateButton={EatStateButton}
          DrinkStateButton={DrinkStateButton}
          ShopStateButton={ShopStateButton}
          StayStateButton={StayStateButton}
          FitStateButton={FitStateButton}
          setDoStateButton={setDoStateButton}
          setEatStateButton={setEatStateButton}
          setDrinkStateButton={setDrinkStateButton}
          setShopStateButton={setShopStateButton}
          setStayStateButton={setStayStateButton}
          setFitStateButton={setFitStateButton}
          catFilters={miniFilter}
        />
      </View>
      <AppMap
        latitude={destinationDirections.origin.latitude}
        longitude={destinationDirections.origin.longitude}
        onSetLatitude={setLatitude}
        onSetLongitude={setLongitude}
        item={
          miniFilter.length > 0
            ? venues.filter((venue) => miniFilter.includes(venue.category))
            : venues
        }
        useExternalMarkers
        ExternalMakers={Markers}
        style={$mapHeight}
        initialLatitude={defaultLocation.latitude}
        initialLongitude={defaultLocation.longitude}
        directions={
          destinationDirections && destinationDirections.destination
            ? {
                origin: {
                  latitude: destinationDirections.origin.latitude,
                  longitude: destinationDirections.origin.longitude,
                },
                destination: {
                  latitude: destinationDirections.destination.latitude,
                  longitude: destinationDirections.destination.longitude,
                },
              }
            : null
        }
        isfromNearBy
      />
      <BottomSheet show={showBottomSheet} onClose={handleBottomSheetClose} height={600}>
        {selectedVenue && (
          <VenueCard
            currentUserLatitude={destinationDirections.destination.latitude}
            currentUserLongitude={destinationDirections.destination.longitude}
            item={selectedVenue}
          />
        )}
        {getDropsByID(selectedVenue?.drops as any, venues).length > 0 && (
          <View>
            <View>
              <Text>Drops</Text>
            </View>
            <FlatList
              data={getDropsByID(selectedVenue.drops as any, venues)}
              renderItem={(item) => <DropCard item={item} isFeed />}
            />
          </View>
        )}
      </BottomSheet>
      <View flex marginR-5 marginL-5 marginT-15>
        {Venuecards}
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}
const $mapHeight: ViewStyle = {
  height: 300,
}
