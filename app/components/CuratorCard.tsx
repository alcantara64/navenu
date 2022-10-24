import * as React from "react"
import { ImageBackground, StyleProp, TextStyle, TouchableWithoutFeedback, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity, View, Text, TabController } from "react-native-ui-lib"
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons"
import { ICurator } from "../interface/user"

export interface CuratorCardProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  curator: ICurator
}

/**
 * Describe your component here
 */
export const CuratorCard = observer(function CuratorCard(props: CuratorCardProps) {
  const { style, curator } = props
  const $styles = [$container, style]
  const navigation = useNavigation();
  const  goBack = () => {
    navigation.goBack()
  }

  return (
    <>
    <ImageBackground source={{ uri: curator.avatar }} resizeMode="cover" style={styles.imagetop}>
    <View style={styles.closeBtn}>
      <TouchableOpacity
        onPress={goBack }
        style={{
          marginRight: 10,
        }}>
        <FontAwesome5 name="times-circle" size={27} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
    <View style={styles.cardtext}>
      <Text
        text80BL
        style={{
          marginBottom: 0,
          color: '#FFFFFF',
          textTransform: 'uppercase',
        }}>
        {user.profession}
      </Text>
      <Text
        text60BL
        white
        style={{
          marginBottom: 15,
          textTransform: 'uppercase',
        }}>
        {user.name}
      </Text>
    </View>
    <View style={styles.functionBtns}>
      <TouchableWithoutFeedback>
        <TouchableOpacity onPress={() => console.log('Button 1')}>
          <FontAwesome5 name="bell" size={27} color="#FFFFFF" />
        </TouchableOpacity>
      </TouchableWithoutFeedback>
      {/*  <FavouriteButton venue={venue.venue} /> */}
    </View>
  </ImageBackground>
  <View flex>
  {curator.bio && <Text text80>{curator.bio}</Text>}
  <View style={{ height: 300 }} flex>
    <TabController items={[{ label: 'Info' }, { label: 'Drops' }]}>
      <TabController.TabBar enableShadows />

      <TabController.TabPage index={0}>
        <View style={{ height: 280, paddingTop: 65 }}>
          <View style={{ justifyContent: 'space-evenly' }} flex row>
            <FontAwesome5 name="clock" size={50} color="black" />

            <MaterialIcons name="restaurant-menu" size={50} color="black" />
          </View>
          <View style={{ justifyContent: 'space-evenly' }} flex row>
            <FontAwesome5 name="map-marked" size={50} color="black" />

            <FontAwesome5 name="calendar-plus" size={50} color="black" />

            <FontAwesome5 name="uber" size={50} color="black" />
          </View>
          <View style={{ justifyContent: 'space-evenly' }} flex row>
            <FontAwesome5 br100 name="phone-alt" size={50} color="black" />

            <FontAwesome5 br100 name="share-alt" size={50} color="black" />
          </View>
        </View>
      </TabController.TabPage>
      <TabController.TabPage index={1} lazy>
        <View style={{ height: 200, paddingTop: 65 }} center>
          <Text>No Drops Yet</Text>
        </View>
      </TabController.TabPage>
    </TabController>
  </View>
</View>
</>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

