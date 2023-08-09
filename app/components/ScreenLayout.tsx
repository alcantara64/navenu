import * as React from "react"
import { ImageBackground, StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { View, Text, TouchableOpacity } from "react-native-ui-lib"
import { HorizontalLine } from "./HorizontalLine"
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons"
import { Colors, typography } from "../theme"
import { useNavigation } from "@react-navigation/native"
import { getStyleByCategory } from "../utils/transform"

export interface ScreenLayoutProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  backgroundImageUri: string
  category: string
  title: string
  address: string
  onBookMarkPress: (currentBook: any) => void
  onShare: () => void
  screenContent: React.ReactNode
}

/**
 * Describe your component here
 */
export const ScreenLayout = observer(function ScreenLayout(props: ScreenLayoutProps) {
  const {
    style,
    backgroundImageUri,
    category,
    title,
    address,
    onBookMarkPress,
    onShare,
    screenContent,
  } = props
  const $styles = [$container, style]
  const navigation = useNavigation()

  const goBack = () => {
    navigation.goBack()
  }

  return (
    <View style={$styles}>
      <ImageBackground source={{ uri: backgroundImageUri }} resizeMode="cover" style={$imagetop}>
        <View marginT-10 style={$closeBtn}>
          <TouchableOpacity onPress={goBack}>
            <FontAwesome5 solid name="times-circle" size={27} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
        <View style={$cardtext}>
          <Text text80BL style={$categoryText}>
            {category}
          </Text>
          <Text text60BL white style={$venueNameText}>
            {title}
          </Text>
          <HorizontalLine />
          <Text text90 white marginB-5 style={$address}>
            {address}
          </Text>
        </View>
        <View marginB-40 style={$functionBtns}>
          <View flex-1 center spread>
            <TouchableOpacity marginV-10 onPress={onShare}>
              <MaterialIcons name="ios-share" size={30} color="#FFFFFF" />
            </TouchableOpacity>

            <TouchableOpacity onPress={onBookMarkPress} marginV-5>
              <FontAwesome5 name="bookmark" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={{ ...$contentContainer, ...getStyleByCategory(category) }}>
        <View flex padding-15 style={$screenContent}>
          {screenContent}
        </View>
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $imagetop: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  width: "100%",
  height: 300,
  justifyContent: "flex-end",
}

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
const $screenContent: ViewStyle = {
  borderTopRightRadius: 15,
  backgroundColor: "#F2F2F2",
  borderTopLeftRadius: 15,
  padding: 8,
}
const $address: TextStyle = {
  fontFamily: "inter",
  fontWeight: "400",
  fontStyle: "normal",
  marginBottom: 15,
}
