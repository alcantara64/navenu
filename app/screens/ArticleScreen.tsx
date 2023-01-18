import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { ErrorMessage, LoadingIndicator, Screen } from "../components"
import { useArticle } from "../hooks/useArticles"
import { View, TouchableOpacity, Text } from "react-native-ui-lib"
import { Colors, typography } from "../theme"
import { TextStyle, ViewStyle, ImageBackground } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons"
import { getStyleByCategory } from "../utils/transform"

// @ts-ignore
export const ArticleScreen: FC<StackScreenProps<AppStackScreenProps, "Article">> = observer(
  function ArticleScreen({ route }) {
    const itemId = route.params.article.id
    const { data, isLoading, error } = useArticle(itemId)
    const navigation = useNavigation()
    const goBack = () => {
      navigation.goBack()
    }
    if (error) return <ErrorMessage message={"Error occurred"}></ErrorMessage>
    if (isLoading) return <LoadingIndicator />
    return (
      <Screen preset="auto">
        <ImageBackground source={{ uri: data.image }} resizeMode="cover" style={$imagetop}>
          <View style={$imageFilter} />
          <View marginT-10 style={$closeBtn}>
            <TouchableOpacity onPress={goBack}>
              <FontAwesome5 solid name="times-circle" size={27} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View marginB-40 style={$functionBtns}>
            <View flex-1 center spread>
              <TouchableOpacity marginV-10 onPress={() => console.log("Button 1")}>
                <MaterialIcons name="ios-share" size={30} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity marginV-5>
                <FontAwesome5 name="bookmark" size={30} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={{ ...$contentContainer, ...getStyleByCategory(data.category || "EAT") }}>
          <View flex padding-15 style={$articleContent}>
            <View marginT-10>
              <Text style={getStyleByCategory(data.category || "EAT",true)}>{data.category}</Text>
            </View>
            <View marginT-10>
              <Text header>{data.title}</Text>
            </View>
            <View marginT-10>
              <Text subheader itemId>{data.description}</Text>
            </View>
          </View>
        </View>
      </Screen>
    )
  },
)

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
const $imagetop: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  width: "100%",
  height: 300,
  justifyContent: "flex-end",
}
const $imageFilter: ViewStyle = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
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
const $articleContent: ViewStyle = {
  borderTopRightRadius: 15,
  backgroundColor: "#F2F2F2",
  borderTopLeftRadius: 15,
  padding: 8,
}
