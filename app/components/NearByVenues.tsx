import * as React from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, mapStyle, typography } from "../theme"
import { IVenue } from "../interface/venues"
import { CategoryFilterBar } from "./CategoryFilterBar"
import { View, Text } from "react-native-ui-lib"
import MapView from "react-native-maps"
import { useState } from "react"
import { SlimVenueCard } from "./SlimVenueCard"
import { ISuckMapMarker } from "./ISuckMapMarker"
import _ from  'lodash';
import { AppMap } from "./AppMap"

export interface NearByVenuesProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  venues: Array<IVenue>
}

/**
 * Describe your component here
 */
export const NearByVenues = observer(function NearByVenues(props: NearByVenuesProps) {
  const { style, venues } = props
  const $styles = [$container, style]
  const [DoStateButton, setDoStateButton] = useState(false);
  const [EatStateButton, setEatStateButton] = useState(false);
  const [DrinkStateButton, setDrinkStateButton] = useState(false);
  const [ShopStateButton, setShopStateButton] = useState(false);
  const [StayStateButton, setStayStateButton] = useState(false);
  const [FitStateButton, setFitStateButton] = useState(false);
  const [miniFilter, setMiniFilter] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState()
  const addCat = (cat) => {
    setMiniFilter([...miniFilter, cat]);
  };
  const onMarkerPress = (venue) => {

  }
  const removeCat = (cat) => {
    const newCatFilter = _.without(miniFilter, cat);
    //const newCatFilter = catFilters.filter((x) => x !== cat);

    setMiniFilter(newCatFilter);
  };

  let Markers;
  let Venuecards;

  if (miniFilter.length === 0) {
    Venuecards = venues.map((venue, index) => <SlimVenueCard venue={venue} key={'g' + index} />);

    Markers = venues.map((venue, index) => <ISuckMapMarker onMarkerPressed={() => {}} venue={venue} key={'f' + index} />);
  } else {
    Venuecards = venues.map((venue, index) => {
      if (miniFilter.includes(venue.category))
        return <SlimVenueCard venue={venue} key={'m' + index} />;
    });
    Markers = venues.map((venue, index) => {
      if (miniFilter.includes(venue.category)) return <ISuckMapMarker onMarkerPressed={() => {}} venue={venue} key={'b' + index} />;
    });
  }

  return (
    <>
      <View centerH flex>
        <Text text40BL>Venues Near By</Text>
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
      <MapView
        style={{ flex: 1, minHeight: 350 }}
        initialRegion={{
          latitude: 51.4936171,
          longitude: -0.1675824,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        customMapStyle={mapStyle}>
        {Markers}
      </MapView>
      {/* <AppMap onSetLatitude={() => {}} onSetLongitude={() => {}} latitude={51.4936171} longitude={-0.1675824} useExternalMarkers={false} ExternalMakers={Markers}/> */}
      <View flex>{Venuecards}</View>
      </>
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
