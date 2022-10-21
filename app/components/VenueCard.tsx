import * as React from "react"
import { ImageBackground, ImageStyle, StyleProp, TextStyle, TouchableOpacity, ViewStyle } from "react-native"
import { View, Text } from 'react-native-ui-lib';
import { observer } from "mobx-react-lite"


export interface VenueCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  onPress: (item:any) => void
  item : {image:string, category:string, name:string, distance: number};
}

/**
 * Describe your component here
 */
export const VenueCard = observer(function VenueCard(props: VenueCardProps) {
  const { onPress, item } = props
 

  return (
    <TouchableOpacity
    key={item.id}
    onPress={() => onPress(item)}
    activeOpacity={0.1}
    //on Press of any selector sending the selector value to
    // setSections function which will expand the Accordion accordingly
  >
    <ImageBackground source={{ uri: item.image }}   imageStyle={$imageBackground} resizeMode="cover" style={$image}>
      <View style={$overlay}></View>
      <View style={$cardtext}>
        <Text
          style={$topText}>
          {item.category}
        </Text>
        <Text
          style={$belowText}>
          {item.name}
        </Text>
        <Text
          style={$bottomText}>
          {item.distance} km away
        </Text>
      </View>
    </ImageBackground>
  </TouchableOpacity>
  )
})


const $cardtext: ViewStyle =  {
  alignItems: 'baseline',
  marginHorizontal: 9,
};
const $topText: TextStyle = {
  marginBottom: 0,
  color: '#FFFFFF',
  fontWeight: 'bold',
  textTransform: 'uppercase',
  fontSize: 12,
}

const $bottomText:TextStyle ={
  
    marginTop: 0,
    color: '#FFFFFF',

    fontSize: 11,
  
}
const $overlay: ViewStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: 'black',
  opacity: 0.5,
};

const $image: ImageStyle = {
  flex: 1,
  width: '100%',
  height: 125,
  marginBottom: 5,
  justifyContent: 'center',
};
const $belowText: TextStyle = {
  
    marginBottom: 0,
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontWeight: 'bold',

    fontSize: 18,
}
const $imageBackground: ImageStyle = {
  borderRadius: 6,
}