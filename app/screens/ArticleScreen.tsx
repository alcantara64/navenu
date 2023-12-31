import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import {
  ErrorMessage,
  LoadingIndicator,
  RemoveAndAddToUserList,
  DropCard,
  VenueCard,
  Screen,
} from "../components"
import { useArticle } from "../hooks/useArticles"
import { View, TouchableOpacity, Text, Image } from "react-native-ui-lib"
import { Colors } from "../theme"
import { ViewStyle, ImageBackground, RefreshControl } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons"
import {
  getStyleByCategory,
  getUserListIdByItemId,
  isItemInUserList,
  shareLink,
} from "../utils/transform"
import { useUserList } from "../hooks/useUser"
import { UserService } from "../services/userService"
import { useStores } from "../models"
import { CuratorCard } from "../../app/components/CuratorCard"
import Config from "../../app/config"
import { DynamicLinkServices } from "../../app/services/firebase/dynamicLinkServices"

// @ts-ignore
export const ArticleScreen: FC<StackScreenProps<AppStackScreenProps, "Article">> = observer(
  function ArticleScreen({ route }) {
    const itemId = route.params.article.id
    const { data, isLoading, error, refetch, isRefetching } = useArticle(itemId)
    const [showListModal, setShowListModal] = useState(false)
    const navigation = useNavigation()
    const {
      authenticationStore: { latitude, longitude },
    } = useStores()
    const userList = useUserList()
    const goBack = () => {
      navigation.goBack()
    }
    const shareCuratorLink = async () => {
      const deepLink = `${Config.DEEP_LINK_URL}/article/${data.id}`
      const link = await DynamicLinkServices.buildLink(deepLink)
      shareLink(data.name, `Checkout ${data.name} on Navenu`, link)
    }

    const onBookMark = async () => {
      if (!isItemInUserList(data.id, userList.data)) {
        setShowListModal(true)
      } else {
        const userService = new UserService()
        const userListId = getUserListIdByItemId(data.id, userList.data)
        await userService.removeCardFromList({
          user_list_id: userListId,
          type: "Article",
          id: data.id as any,
        })
      }
      userList.refetch()
    }
    if (error) return <ErrorMessage message={"Error occurred"}></ErrorMessage>
    if (isLoading || isRefetching) return <LoadingIndicator />
    return (
      <Screen
        StatusBarProps={{}}
        preset="auto"
        ScrollViewProps={{
          refreshControl: <RefreshControl refreshing={isRefetching} onRefresh={refetch} />,
        }}
      >
        <ImageBackground source={{ uri: data.mainimage }} resizeMode="cover" style={$imagetop}>
          <View style={$imageFilter} />
          <View marginT-10 style={$closeBtn}>
            <TouchableOpacity onPress={goBack}>
              <FontAwesome5 solid name="times-circle" size={27} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View marginB-40 style={$functionBtns}>
            <View flex-1 center spread>
              <TouchableOpacity marginV-10 onPress={shareCuratorLink}>
                <MaterialIcons name="ios-share" size={30} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity marginV-5 onPress={onBookMark}>
                <FontAwesome5
                  name="bookmark"
                  solid={isItemInUserList(itemId, userList.data)}
                  size={30}
                  color="#FFFFFF"
                />
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
        <View style={{ ...$contentContainer, ...getStyleByCategory(data.category || "EAT") }}>
          <View flex padding-15 style={$articleContent}>
            <View marginT-10>
              <Text style={getStyleByCategory(data.category || "EAT", true)}>{data.category}</Text>
            </View>
            <View marginT-10>
              <Text header>{data.title}</Text>
            </View>
            <View marginT-10>
              {data.content.map((item, index) => (
                <View key={index} marginT-5>
                  {item.type === "subtitle" && (
                    <Text header itemId text>
                      {item.subtitle}
                    </Text>
                  )}
                  {item.type === "image" && <Image source={{ uri: item.image }}></Image>}
                  {item.type === "text" && <Text> {item.text}</Text>}
                  {item.type === "venue_card" && (
                    <VenueCard
                      item={item.venue}
                      key={"g" + item.venue.id}
                      isFeed={false}
                      currentUserLatitude={latitude}
                      currentUserLongitude={longitude}
                    />
                  )}
                  {item.type === "insert_drop_card" && (
                    <DropCard key={item.drop.id} item={item.drop} />
                  )}
                  {item.type === "insert_curator_card" && <CuratorCard curator={item.curators} />}
                </View>
              ))}
            </View>
          </View>
        </View>
        <RemoveAndAddToUserList
          showListModal={showListModal}
          setShowListModal={setShowListModal}
          selectedFeedItem={{ ...data, type: "article" }}
          queryKey={{ queryKey: ["article", data.id] }}
          onRefetch={refetch}
        />
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
