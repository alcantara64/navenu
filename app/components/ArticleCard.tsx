import * as React from "react"
import {
  ImageBackground,
  ImageStyle,
  StyleProp,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native"
import { observer } from "mobx-react-lite"
import { FontAwesome5 } from "@expo/vector-icons"

import { View, Text } from "react-native-ui-lib"
import { IArticle } from "../interface/venues"
import { typography } from "../theme"
import { useNavigation } from "@react-navigation/native"
import { isItemInUserList } from "../utils/transform"
import { IUserList } from "../interface/user"

export interface ArticleCardProps {
  style?: StyleProp<ViewStyle>
  item: IArticle
  isFeed?: boolean
  onBookMark?: (feed: any) => void
  userListData?: IUserList,
  onRemoveFromUserList?: (feed:any) => void
  isUserList?:boolean;
}

export const ArticleCard = observer(function ArticleCard(props: ArticleCardProps) {
  const { item, isFeed, onBookMark, userListData, onRemoveFromUserList, isUserList} = props
  const navigation = useNavigation()
  const onCardPressed = () => {
    navigation.navigate("Article", {
      article: item,
    })
  }
  const saveDrop = () => {
    onBookMark(item)
  }
  const removeFromUserList = () => {
    onRemoveFromUserList(item)

  }

  return (
    <TouchableOpacity
      key={item.id}
      onPress={onCardPressed}
      style={$cardContainer}
      activeOpacity={0.1}
    >
      <ImageBackground
        source={{ uri: item.image }}
        imageStyle={$backgroundImage}
        resizeMode="cover"
        style={$image}
      >
        <View style={$imageFilter} />
        <View paddingL-4>
          <View row marginH-6>
            <View flex-7>
              <Text style={$topText}>{item.name}</Text>
              <Text numberOfLines={1}  style={$belowText}>{item.intro}</Text>
              <Text bottom style={$bottomText}>
                {item.owner}
              </Text>
            </View>
            {isFeed && (
              <View flex-1 right>
                <TouchableOpacity onPress={saveDrop}>
                  <FontAwesome5 solid={isItemInUserList(item.id, userListData)} name="bookmark" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            )}
            {isUserList && (
              <View flex-1 right>
                <TouchableOpacity onPress={removeFromUserList}>
                  <FontAwesome5 solid name="times-circle" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
})
const $backgroundImage: ImageStyle = {
  borderRadius: 6,
}
const $cardContainer: ViewStyle = {
  minHeight: 100,
}
const $imageFilter: ViewStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}
const $topText: TextStyle = {
  marginBottom: 4,
  color: "#FFFFFF",
  textTransform: "uppercase",
  fontSize: 10,
  lineHeight: 9,
  fontFamily: typography.primary.normal,
}

const $belowText: TextStyle = {
  marginBottom: 4,
  color: "#FFFFFF",
  textTransform: "uppercase",
  fontWeight: "bold",

  fontSize: 18,
}
const $image: ViewStyle = {
  flex: 1,
  width: "100%",
  marginBottom: 5,
  justifyContent: "center",
  borderRadius: 6,
}
const $bottomText: TextStyle = {
  marginTop: 0,
  color: "#FFFFFF",
  fontSize: 11,
}
