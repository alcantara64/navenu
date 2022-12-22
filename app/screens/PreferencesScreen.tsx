import React, { FC, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { AppButton, Screen } from "../components"
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
    const [selectedPreference, setSelectedPreference] = useState({
      do: false,
      eat: false,
      drink: false,
      stay: false,
      shop: false,
      fit: false,
    })
    const [selectedCategorySubItem, setSelectedCategorySubItem] = useState<Array<string>>([])
    const navigation = useNavigation()
    const carousel = React.createRef<typeof Carousel>()

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
    const Pages = useMemo(
      () => [
        {
          items: ["NATURE", "GALLERIES", "SIGHTSEEING", "MUSEUMS", "TASTINGS", "ADVENTURE"],
          type: "DO",
          image: DOW,
        },
        {
          items: ["VEGAN", "GLUTEN FREE", "HEALTHY", "THAI", "PIZZA", "MEAT", "SUSHI", "BRUNCH"],
          type: "EAT",
          image: EatW,
        },
        {
          items: ["BAR", "PUB", "COCKTAIL", "BEER", "MUSIC"],
          type: "DRINK",
          image: DRINKW,
        },
        {
          items: ["HOTEL", "HOSTEL", "APARTMENTS", "VILLAS", "SHARED", "BOUTIQUE"],
          type: "STAY",
          image: STAYW,
        },
        {
          items: ["VINTAGE", "FLEA MARKET", "HIGH END", "LUXURY", "FASHION", "GIFT"],
          type: "SHOP",
          image: SHOPW,
        },
        {
          items: ["GYM", "FOOTBALL", "GOLF", "YOGA", "TENNIS", "RUNNING"],
          type: "FIT",
          image: FITW,
        },
      ],
      [],
    )
    const onSelectAll = (type) => {
      const categoryItemSelected = Pages.find((page) => page.type === type)
      if (categoryItemSelected) {
        setSelectedCategorySubItem([...selectedCategorySubItem, ...categoryItemSelected.items])
      }
    }
    const filterSelectedPreference = () => {
      return Pages.filter((page) => selectedPreference[page.type.toLowerCase()] === true)
    }
    function onToggleSubItem(item: string) {
      if (selectedCategorySubItem.includes(item)) {
        setSelectedCategorySubItem(selectedCategorySubItem.filter((subItem) => subItem !== item))
      } else {
        setSelectedCategorySubItem([...selectedCategorySubItem, item])
      }
    }
    const onPagePress = (index: number) => {
      if (carousel && carousel.current) {
        carousel.current.goToPage(index, true)
      }
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
            bottom: 30,
          },
        }}
        pageControlPosition={Carousel.pageControlPositions.OVER}
      >
        {filterSelectedPreference().map(({ items, type, image }, i) => {
          const backgroundStyle = { backgroundColor: Colors[type.toLowerCase()] }

          return (
            <View padding-4 key={i} flex style={backgroundStyle}>
              <View marginT-50 row spread marginB-20 style={$headerController}>
                <TouchableOpacity onPress={goBAckToPreviousPage}>
                  <Entypo name="chevron-left" size={24} color="white" />
                </TouchableOpacity>
                <Text subHeader white>
                  PREFERENCES
                </Text>
                <Text white>Skip</Text>
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
                        backgroundColor: items.every((item) =>
                          selectedCategorySubItem.includes(item),
                        )
                          ? Colors.white
                          : Colors[type.toLowerCase()],
                      },
                    ]}
                  >
                    <Text
                      center
                      header
                      white={!items.every((item) => selectedCategorySubItem.includes(item))}
                      style={$subItemText}
                    >
                      ALL
                    </Text>
                  </View>
                </TouchableOpacity>
                <View row marginT-10 style={$subCategoryItemContainer}>
                  {items.map((item) => {
                    const $selectedItem = {
                      backgroundColor: !selectedCategorySubItem.includes(item)
                        ? Colors[type.toLowerCase()]
                        : "white",
                    }
                    return (
                      <TouchableOpacity
                        onPress={() => onToggleSubItem(item)}
                        key={item}
                        center
                        marginT-10
                        style={[$preferenceItemSubItem, $subItem2Rows, $selectedItem]}
                      >
                        <Text
                          header
                          white={!selectedCategorySubItem.includes(item)}
                          style={$subItemText}
                        >
                          {item}
                        </Text>
                      </TouchableOpacity>
                    )
                  })}
                </View>
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
  position: "absolute",
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
const $subCategoryItemContainer: ViewStyle = { justifyContent: "space-between", flexWrap: "wrap" }
