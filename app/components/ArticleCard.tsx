import * as React from "react"
import {
  ImageBackground,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
 // todo replace hardcorded variables

import { Text } from "./Text"
import { useState } from "react"

export interface ArticleCardProps {
  style?: StyleProp<ViewStyle>
  item: any
}

export const ArticleCard = observer(function ArticleCard(props: ArticleCardProps) {
  const [articleVisible, setArticleVisible] = useState(true)
  const toggleContent = () => {
    setArticleVisible(!articleVisible)
  }
  const { item } = props

  return (
    <TouchableOpacity
      key={item.id}
      onPress={toggleContent}
      activeOpacity={0.1}
      // on Press of any selector sending the selector value to
      // setSections function which will expand the Accordion accordingly
    >
      <ImageBackground source={{ uri: item.image }} resizeMode="cover" style={$image}>
        <View style={$overlay}></View>
        <View style={$cardtext}>
          <Text style={$editorialText}>Editorial</Text>
          <Text style={$nameText}>{item.name}</Text>
          <Text style={$bottomTex}>{articleVisible ? null : item.description}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
})

const $overlay: ViewStyle = {
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: "black",
  opacity: 0.5,
}

const $cardtext: ViewStyle = {
  alignItems: "baseline",
  position: "absolute",
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: "black",
  opacity: 0.3,
  marginHorizontal: 6,
}
const $image: ViewStyle = {
  flex: 1,
  width: "100%",
  height: "100%",
  marginBottom: 5,
  justifyContent: "center",
}
const $bottomTex: TextStyle = {
  marginTop: 0,
  color: "#FFFFFF",

  fontSize: 12,
}
const $nameText: TextStyle = {
  marginBottom: 0,
  color: "#FFFFFF",
  fontWeight: "bold",

  fontSize: 18,
}
const $editorialText: TextStyle = {
  marginBottom: 0,
  color: "#FFFFFF",
  fontWeight: "bold",
  fontSize: 12,
}
