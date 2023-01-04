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
  setLatitude: React.Dispatch<React.SetStateAction<number>>
  setLongitude: React.Dispatch<React.SetStateAction<number>>
  venues: Array<IVenue>
}

/**
 * Describe your component here
 */
export const NearByVenues = observer(function NearByVenues(props: NearByVenuesProps) {
  const { style, venues, setLatitude, setLongitude, destinationDirections } = props
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

  const addCat = (cat) => {
    setMiniFilter([...miniFilter, cat])
  }
  const onMarkerPress = (venue) => {
    setSelectedVenue(venue)
    setShowBottomSheet(true)
  }
  const removeCat = (cat) => {
    const newCatFilter = _.without(miniFilter, cat)
    setMiniFilter(newCatFilter)
  }

  let Markers
  let Venuecards

  if (miniFilter.length === 0) {
    Venuecards = venues.map((venue, index) => <SlimVenueCard venue={venue} key={"g" + index} />)

    Markers = venues.map((venue, index) => (
      <ISuckMapMarker onMarkerPressed={onMarkerPress} venue={venue} key={"f" + index} />
    ))
  } else {
    Venuecards = venues.map((venue, index) => {
      if (miniFilter.includes(venue.category))
        return <SlimVenueCard venue={venue} key={"m" + index} />
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
    <View>
      <View marginB-10 marginL-10>
        <Text left sectionHeader>
          Venues Near By
        </Text>
      </View>
      <View centerH flex>
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
        item={venues}
        useExternalMarkers
        ExternalMakers={Markers}
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
      />
      <BottomSheet show={showBottomSheet} onClose={handleBottomSheetClose} height={600}>
        {selectedVenue && <VenueCard item={selectedVenue} />}
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
      <View flex>{Venuecards}</View>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $text: TextStyle = {
  fontFamily: typography.primary.normal,
  fontSize: 14,
  color: colors.palette.primary500,
}
const $mapStyle: ViewStyle = {}
