import * as React from "react"
import {
  StyleProp,
  TextStyle,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { AntDesign } from "@expo/vector-icons"

import { colors, typography } from "../theme"
import { useUser } from "../hooks/useUser"

export interface FavouriteButtonProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  venue: any
  add: any
  remove: any
  favourites: any
}

/**
 * Describe your component here
 */
export const FavouriteButton = observer(function FavouriteButton(props: FavouriteButtonProps) {
  const { venue, add, remove, favourites } = props
  const { data } = useUser("1241")
  console.log("user ==>", data)
  const ftest = favourites.filter((res) => {
    // console.log('res', res.id);
    //  console.log('ven', venue.venue.id);
    return Number(res.id) === Number(venue.venue.id)
  })
  // console.log('ftest', ftest.length);
  const isFavourite = ftest.length > 0
  // favourites != null ? favourites.filter((res) => Number(res.id) === Number(venue.id)) : false;

  return (
    <TouchableWithoutFeedback>
      <TouchableOpacity onPress={() => (!isFavourite ? add(venue) : remove(venue))}>
        <AntDesign
          name={isFavourite ? "heart" : "hearto"}
          size={24}
          color={isFavourite ? "red" : "white"}
        />
      </TouchableOpacity>
    </TouchableWithoutFeedback>
  )
})
