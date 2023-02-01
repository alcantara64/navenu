import React, { FC, useEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { AppButton, Screen, ToastLoader } from "../components"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { View, Text, TouchableOpacity, Image, Carousel } from "react-native-ui-lib"
import { Entypo } from "@expo/vector-icons"
import { Dimensions, TextStyle, ViewStyle } from "react-native"
import DO from "../../assets/icons/preferences/bigDo.svg"
import DOW from "../../assets/icons/preferences/bigDoW.svg"
import Eat from "../../assets/icons/preferences/bigEat.svg"
import EatW from "../../assets/icons/preferences/bigEatW.svg"
import DRINK from "../../assets/icons/preferences/bigDrink.svg"
import DRINKW from "../../assets/icons/preferences/bigDrinkW.svg"
import STAY from "../../assets/icons/preferences/bigStay.svg"
import STAYW from "../../assets/icons/preferences/bigStayW.svg"
import SHOP from "../../assets/icons/preferences/bigShop.svg"
import SHOPW from "../../assets/icons/preferences/bigShopW.svg"
import FIT from "../../assets/icons/preferences/bigFit.svg"
import FITW from "../../assets/icons/preferences/bigFitW.svg"
import { Colors, spacing, typography } from "../theme"

import { useNavigation } from "@react-navigation/native"
import { UserService } from "../services/userService"
import { IUserPreference } from "../interface/user"
import { useStores } from "../models"
// import { useStores } from "../models"

const PREFERENCE_CARDS = [
  {
    image: DO,
    text: "DO",
    color: Colors.do,
    imageWhite: DOW,
  },
  {
    image: Eat,
    text: "EAT",
    color: Colors.eat,
    imageWhite: EatW,
  },
  {
    image: DRINK,
    text: "DRINK",
    color: Colors.drink,
    imageWhite: DRINKW,
  },
  {
    image: STAY,
    text: "STAY",
    color: Colors.stay,
    imageWhite: STAYW,
  },
  {
    image: SHOP,
    text: "SHOP",
    color: Colors.shop,
    imageWhite: SHOPW,
  },
  {
    image: FIT,
    text: "FIT",
    color: Colors.fit,
    imageWhite: FITW,
  },
]

export const PreferencesScreen: FC<StackScreenProps<AppStackScreenProps, "Settings">> = observer(
  function PreferencesScreen() {
    const [activeStage, setActiveStage] = useState(0)
    const { userStore, } = useStores()
    const [selectedPreference, setSelectedPreference] = useState({
      do: false,
      eat: false,
      drink: false,
      stay: false,
      shop: false,
      fit: false,
    })
    const [selectedCategorySubItem, setSelectedCategorySubItem] = useState<
      Array<{ type: any; id: string; name: string }>
    >([])
    const [loading, setLoading] = useState<boolean>(false)
    const [errMessage, setErrMessage] = useState("")
    const navigation = useNavigation()
    const carousel = React.createRef<typeof Carousel>()
    const Pages = useMemo(
      () => [
        {
          items: [
            { id: "292", name: "NATURE" },
            { id: "287", name: "GALLERIES" },
            { id: "288", name: "SIGHTSEEING" },
            { id: "289", name: "MUSEUMS" },
            { id: "291", name: "ADVENTURE" },
            { id: "314", name: "SPA" },
          ],
          type: "DO",
          image: DOW,
        },
        {
          items: [
            { id: "270", name: "SUSHI" },
            { id: "277", name: "GASTROPUB" },
            { id: "268", name: "HEALTHY" },
            { id: "274", name: "INDIAN" },
            { id: "280", name: "SPANISH" },
            { id: "272", name: "CHINESE" },
          ],
          type: "EAT",
          image: EatW,
        },
        {
          items: [
            { id: "328", name: "WINE" },
            { id: "330", name: "JUICE" },
            { id: "331", name: "BAR" },
            { id: "329", name: "BREWERY" },
          ],
          type: "DRINK",
          image: DRINKW,
        },
        {
          items: [
            { id: "55", name: "HOTEL" },
            { id: "56", name: "HOSTEL" },
            { id: "295", name: "Boutique" },
          ],
          type: "STAY",
          image: STAYW,
        },
        {
          items: [
            { id: "299", name: "VINTAGE" },
            { id: "300", name: "BOUTIQUE" },
            { id: "44", name: "LUXURY" },
            { id: "297", name: "HIGH STREET" },
            { id: "321", name: "STREET WEAR" },
            { id: "298", name: "MARKET" },
          ],
          type: "SHOP",
          image: SHOPW,
        },
        {
          items: [
            { id: "41", name: "YOGA" },
            { id: "304", name: "GYM" },
            { id: "320", name: "HEALTH" },
            { id: "306", name: "GOLF" },
            { id: "303", name: "MEDITATION" },
          ],
          type: "FIT",
          image: FITW,
        },
      ],
      [],
    )

    useEffect(() => {
      setLoading(false);
      const selectedPreferenceintial= {
        do: false,
        eat: false,
        drink: false,
        stay: false,
        shop: false,
        fit: false,
      }
      if(userStore?.userPreference){
      for (const key of Object.keys(selectedPreference)){
        if (userStore?.userPreference[key.toUpperCase()].length > 0) {
          selectedPreferenceintial[key] = true;
          userStore?.userPreference[key.toUpperCase()].forEach((preferenceId) => {
            Pages.forEach((subCategory) => {  
            const foundSelectedItem = subCategory.items.find((item) => item.id === preferenceId)
              if (foundSelectedItem) {
            selectedCategorySubItem.push( { type: key.toUpperCase(), id: foundSelectedItem.id, name: foundSelectedItem.name })
              }
            })
          })
        }
      }
    }
      setSelectedPreference(selectedPreferenceintial)
    }, [])

    //
    const onBackPress = () => {
      navigation.goBack()
    }
    const onSelectedPreferenceType = (preferenceType: string) => {
      setSelectedPreference({
        ...selectedPreference,
        [preferenceType.toLowerCase()]: !selectedPreference[preferenceType.toLowerCase()],
      })
    }
    const onNextStage = () => {
      setActiveStage(activeStage + 1)
    }
    const goBAckToPreviousPage = () => {
      setActiveStage(activeStage - 1)
    }

    const onSelectAll = (type) => {
      const categoryItemSelected = Pages.find((page) => page.type === type)
      if (categoryItemSelected) {
        const mappedCategoryItemWithType = categoryItemSelected.items.map((item) => ({
          ...item,
          type: categoryItemSelected.type,
        }))
        setSelectedCategorySubItem([...selectedCategorySubItem, ...mappedCategoryItemWithType])
      }
    }
    const filterSelectedPreference = () => {
      return Pages.filter((page) => selectedPreference[page.type.toLowerCase()] === true)
    }
    function onToggleSubItem(item: { id: string; name: string }, type: string) {
      const itemInContention = { ...item, type }
      if (
        selectedCategorySubItem.some(
          (categorySubitem) => categorySubitem.id === itemInContention.id,
        )
      ) {
        setSelectedCategorySubItem(
          selectedCategorySubItem.filter((subItem) => subItem.id !== item.id),
        )
      } else {
        setSelectedCategorySubItem([...selectedCategorySubItem, itemInContention])
      }
    }
    const onPagePress = (index: number) => {
      if (carousel && carousel.current) {
        carousel.current.goToPage(index, true)
      }
    }
    const onFinish = async () => {
      setLoading(true)
      const userService = new UserService()
      const payload: IUserPreference = {
        DO: [],
        EAT: [],
        DRINK: [],
        SHOP: [],
        STAY: [],
        FIT: [],
      }
      selectedCategorySubItem.forEach((subCategory) => {
        payload[subCategory.type].push(subCategory.id)
      })
      const response = await userService.saveUserPreference(payload)
      if (response.kind === "ok") {
        await userStore.getUser();
        gotoFeedScreen()
      } else {
        setErrMessage("Failed to save preference Data")
      }
      setLoading(false)
    }
    function onNextSLide(index: number) {
      if (filterSelectedPreference().length - 1 === index) {
        onFinish()
      } else {
        onPagePress(index + 1)
      }
    }
    function gotoFeedScreen() {
      navigation.navigate("Home")
    }
    const CardsElementsScreen = () => (
      <Carousel
        ref={carousel}
        containerStyle={$carouselContainer}
        loop
        pageControlProps={{
          size: 10,
          color: Colors.white,
          inactiveColor: Colors.ash,
          onPagePress,
          containerStyle: {
            alignSelf: "center",
            position: "absolute",
            bottom: 100,
          },
        }}
        pageControlPosition={Carousel.pageControlPositions.OVER}
      >
        {filterSelectedPreference().map(({ items, type, image }, i) => {
          const backgroundStyle = { backgroundColor: Colors[type.toLowerCase()] }

          return (
            <View padding-4 key={type} flex style={backgroundStyle}>
              <View marginT-50 row spread marginB-20 style={$headerController}>
                <TouchableOpacity onPress={goBAckToPreviousPage}>
                  <Entypo name="chevron-left" size={24} color="white" />
                </TouchableOpacity>
                <Text subHeader white>
                  PREFERENCES
                </Text>
                <TouchableOpacity onPress={gotoFeedScreen}>
                  <Text white>Skip</Text>
                </TouchableOpacity>
              </View>
              <View center marginB-50>
                <View marginB-20>
                  <Image source={image} />
                </View>
                <View>
                  <Text header white>
                    {type}
                  </Text>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() => {
                    onSelectAll(type)
                  }}
                >
                  <View
                    style={[
                      $preferenceItemSubItem,
                      {
                        backgroundColor: items.every((subItem) =>
                          selectedCategorySubItem.some(
                            (selSubItem) => selSubItem.id === subItem.id,
                          ),
                        )
                          ? Colors.white
                          : Colors[type.toLowerCase()],
                      },
                    ]}
                  >
                    <Text
                      center
                      header
                      white={
                        !items.every((item) =>
                          selectedCategorySubItem.some((selSubItem) => selSubItem.id === item.id),
                        )
                      }
                      style={$subItemText}
                    >
                      ALL
                    </Text>
                  </View>
                </TouchableOpacity>
                <View row marginT-10 style={$subCategoryItemContainer}>
                  {items.map((item, i) => {
                    const $selectedItem = {
                      backgroundColor: !selectedCategorySubItem.some(
                        (subCategoryItem) => subCategoryItem.id === item.id,
                      )
                        ? Colors[type.toLowerCase()]
                        : "white",
                    }
                    return (
                      <TouchableOpacity
                        onPress={() => onToggleSubItem(item, type)}
                        key={item.id}
                        center
                        marginT-10
                        style={[$preferenceItemSubItem, $subItem2Rows, $selectedItem]}
                      >
                        <Text
                          header
                          white={
                            !selectedCategorySubItem.some(
                              (subCategoryItem) => subCategoryItem.id === item.id,
                            )
                          }
                          style={$subItemText}
                        >
                          {item.name}
                        </Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
              </View>
              <View padding-10 bottom style={$nextButtonContainer}>
                <AppButton
                  onPress={() => {
                    onNextSLide(i)
                  }}
                  bigButton
                  title={filterSelectedPreference().length - i === 1 ? "Finish" : "Next"}
                ></AppButton>
              </View>
            </View>
          )
        })}
      </Carousel>
    )
    const BigCardItemScreen = () => (
      <View marginT-50 padding-10 flex-1>
        <View row spread marginB-20 style={$headerController}>
          <TouchableOpacity onPress={onBackPress}>
            <Entypo name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <Text subHeader>PREFERENCES</Text>
          <Text>Skip</Text>
        </View>

        <View row style={$cardContainer} spread>
          {PREFERENCE_CARDS.map((item) => (
            <TouchableOpacity
              key={item.text}
              onPress={() => {
                onSelectedPreferenceType(item.text)
              }}
            >
              <View
                style={[
                  $preferenceItem,
                  { borderColor: item.color },
                  {
                    backgroundColor:
                      selectedPreference[item.text.toLowerCase()] === true
                        ? item.color
                        : Colors.white,
                  },
                ]}
              >
                <View center margin-35 marginT-20>
                  <Image
                    source={
                      selectedPreference[item.text.toLowerCase()] === true
                        ? item.imageWhite
                        : item.image
                    }
                  />
                  <Text
                    style={[
                      $preferenceTitle,
                      {
                        color:
                          selectedPreference[item.text.toLowerCase()] === true
                            ? Colors.white
                            : item.color,
                      },
                    ]}
                  >
                    {item.text}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <AppButton
          onPress={onNextStage}
          disabled={isNexButtonDisabled}
          title="NEXT"
          bigButton={true}
        />
      </View>
    )

    const isNexButtonDisabled =
      activeStage === 0 && !Object.values(selectedPreference).some((item) => item === true)
    return (
      <Screen preset="auto">
        <ToastLoader
          isLoading={loading}
          hasError={!loading && !!errMessage}
          errorMessage={errMessage}
          clearError={() => setErrMessage("")}
        ></ToastLoader>
        {activeStage === 0 && BigCardItemScreen()}
        {activeStage === 1 && CardsElementsScreen()}
      </Screen>
    )
  },
)

const $headerController: ViewStyle = {
  alignContent: "center",
  alignItems: "center",
}
const $preferenceItem: ViewStyle = {
  borderWidth: 4,
  borderRadius: 10,
  marginTop: 10,
}
const $preferenceTitle: TextStyle = {
  margin: 5,
  fontFamily: typography.primary.normal,
  fontSize: 28,
}
const $cardContainer: ViewStyle = {
  flexBasis: "50%",
  flexWrap: "wrap",
}
const $carouselContainer: ViewStyle = {
  zIndex: -1,
  height: Dimensions.get("screen").height,
}

const $preferenceItemSubItem: ViewStyle = {
  borderRadius: 8,
  borderWidth: 2,
  borderColor: Colors.white,
  padding: 10,
}
const $subItemText: TextStyle = {
  fontSize: spacing.medium,
  padding: spacing.extraSmall,
}
const $subItem2Rows: ViewStyle = {
  flexBasis: "49%",
}
const $subCategoryItemContainer: ViewStyle = {
  justifyContent: "space-between",
  flexWrap: "wrap",
  zIndex: 1000,
}
const $nextButtonContainer: ViewStyle = {
  bottom: 15,
  zIndex: 0,
  position: "absolute",
  width: "100%",
}
