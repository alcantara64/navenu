import * as React from "react"
import { ImageBackground, ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import { Text } from "./Text"
import { TouchableOpacity, View } from "react-native-ui-lib"
import { ICurator, IUserList } from "../interface/user"
import { FontAwesome5 } from "@expo/vector-icons"
import { isItemInUserList } from "../utils/transform"
import { useNavigation } from "@react-navigation/native"

export interface CuratorCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  curator: ICurator,
  isFeed?:boolean,
  onBookMark:(item:ICurator) => void
  userListData?: IUserList,
  onRemoveFromUserList?: (feed:any) => void
  isUserList?:boolean;
  hideRemove?:boolean;
}

/**
 * Describe your component here
 */
export const CuratorCard = observer(function CuratorCard(props: CuratorCardProps) {
  const { style, curator, isFeed, onBookMark, userListData, isUserList, onRemoveFromUserList,hideRemove } = props
  const $styles = [$container, style]
  const navigation = useNavigation()

  const onCuratorPressed = (curator:ICurator) => {
    navigation.navigate("CuratorProfileScreen", {
      curator,
    })
  }
  const saveDrop = () => {
    onBookMark(curator)
  }
  const removeFromUserList = () => {
    onRemoveFromUserList(curator)

  }
  return (
    <TouchableOpacity style={$dropCardContainer} key={curator.id} onPress={() => onCuratorPressed(curator)} activeOpacity={0.1}>
      <ImageBackground
        source={{ uri: curator.image }}
        imageStyle={$imageBackground}
        resizeMode="cover"
        style={$image}
      >
        <View style={$imageFilter} />
        <View paddingL-4 marginT-15 flex >
          <View row style={$cardTextContainer}>
            <View flex-7>
              <Text numberOfLines={2} style={$belowText}>
                {curator.name}
              </Text>
            </View>
            {isFeed && <View flex-1 right>
              <TouchableOpacity onPress={saveDrop}>
                <FontAwesome5
                  solid={isItemInUserList(curator.id, userListData)}
                  name="bookmark"
                  size={20}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>}
            {isUserList && removeFromUserList && !isFeed && !hideRemove && <View flex-1 right>
              <TouchableOpacity onPress={removeFromUserList}>
                <FontAwesome5
                  solid
                  name="times-circle"
                  size={20}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>}
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $dropCardContainer:ViewStyle = {
  minHeight: 100,
}
const $cardTextContainer: TextStyle = {
  marginHorizontal: 6,
}
const $imageFilter: ViewStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
}

const $belowText: TextStyle = {
  marginBottom: 0,
  color: "#FFFFFF",
  fontFamily: "bourtonbase",
  textTransform: "uppercase",
  fontSize: 22,
  letterSpacing: 1.76,
}

const $image: ImageStyle = {
  flex: 1,
  width: "100%",
  marginBottom: 5,
  justifyContent: "center",
}
const $imageBackground: ImageStyle = {
  borderRadius: 6,
}