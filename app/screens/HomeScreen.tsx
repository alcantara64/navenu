import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, ScrollView, TextStyle, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Ionicons } from "@expo/vector-icons"
import { View, Text, LoaderScreen, TouchableOpacity, SkeletonView } from "react-native-ui-lib"
// @ts-ignore
import Fit from "../../assets/icons/rec-engine/Fit.svg"
// @ts-ignore
import FitActive from "../../assets/icons/rec-engine/FitActive.svg"
// @ts-ignore
import Drink from "../../assets/icons/rec-engine/Drink.svg"
// @ts-ignore
import EAT from "../../assets/icons/rec-engine/Eat.svg"
// @ts-ignore
import DO from "../../assets/icons/rec-engine/Do.svg"
// @ts-ignore
import Shop from "../../assets/icons/rec-engine/Shop.svg"
// @ts-ignore
import Stay from "../../assets/icons/rec-engine/Stay.svg"
// @ts-ignore
import StayActive from "../../assets/icons/rec-engine/StayActive.svg"
// @ts-ignore
import EatActive from "../../assets/icons/rec-engine/EatActive.svg"
import DoActive from "../../assets/icons/rec-engine/DoActive.svg"
import DrinkActive from "../../assets/icons/rec-engine/DrinkActive.svg"
import ShopActive from "../../assets/icons/rec-engine/ShopActive.svg"
import { Colors, colors, typography } from "../../app/theme"
import { CardList, DynamicForm, EmptyState } from "../../app/components"
import { useQuestionnaires, useRecommendation, useSubcategories } from "../../app/hooks/useVenues"
import { useFocusEffect } from "@react-navigation/native"

type Category = "DO" | "DRINK" | "STAY" | "SHOP" | "EAT" | "FIT"

export const HomeScreen: FC<StackScreenProps<AppStackScreenProps, "Home">> = observer(
  function HomeScreen() {
    const [selectedCategory, setSelectedCategory] = useState<
      "DO" | "DRINK" | "STAY" | "SHOP" | "EAT" | "FIT"
    >(undefined)
    const [currentStep, setCurrentStep] = useState(0)
    const [distance, setDistance] = useState<"1k" | "2k" | "3k" | undefined>()
    const [time, setTime] = useState<{ value: string; text: string } | undefined>()
    const [subCategory, setSubCategory] = useState("")
    const [showRecommendation, setShowRecommendation] = useState(false)
    const [questionAnswered, setQuestionsAnswered] = useState({
      price_level: [],
      tags: [],
      subCategories: [],
    })
    const {
      isError: isRecommendationError,
      isLoading: isFetchingRecommendations,
      data: recommendations,
      refetch,
      isRefetching,
    } = useRecommendation(selectedCategory, subCategory, distance, time?.value, questionAnswered)
    const { data: questionnaire, isError, isLoading } = useQuestionnaires()
    const {
      isError: isSubCategoryError,
      isLoading: isSubCategoryLoading,
      data: subCategories,
      refetch: refetchSubCategory,
    } = useSubcategories()

    const [dynamicFormSelection, setDynamicFormSelection] = useState({})
    const [currentQuestion, setCurrentQuestion] = useState(0)

    useFocusEffect(
      React.useCallback(() => {
        clearRecommendation()
      }, []),
    )
    const clearRecommendation = () => {
      setShowRecommendation(false)
      onClearRecommendation()
      setDynamicFormSelection({})
    }

    function getTagsAndPriceLevel() {
      const priceLevelsAndTags = {
        price_level: [],
        tags: [],
        subCategories: [],
      }
      dynamicFormSelection &&
        Object.keys(dynamicFormSelection).forEach((key) => {
          dynamicFormSelection[key].answeredQuestions.forEach((answers) => {
            if (answers.requestType === "tags") {
              priceLevelsAndTags.tags = [...priceLevelsAndTags.tags, ...answers.value.split("-")]
            }
            if (answers.requestType === "price_levels") {
              priceLevelsAndTags.price_level = [
                ...priceLevelsAndTags.price_level,
                ...answers.value.split("-"),
              ]
            }
            if (answers.requestType === "subcategory") {
              priceLevelsAndTags.subCategories = [
                ...priceLevelsAndTags.subCategories,
                ...answers.value.split("-"),
              ]
            }
          })
        })
      return priceLevelsAndTags
    }

    useEffect(() => {
      setQuestionsAnswered(getTagsAndPriceLevel())
    }, [dynamicFormSelection])

    const CATEGORY_DESCRIPTIONS: Array<{ type: Category; text: string }> = [
      {
        type: "DO",
        text: "Find FUN activities and events.",
      },
      {
        type: "EAT",
        text: "Discover a new tasty restaurant OR  popular  food experience.",
      },
      {
        type: "DRINK",
        text: "Discover new beverages and places to enjoy them.",
      },
      {
        type: "SHOP",
        text: "Find the place where you're going to purchase your next favorite item.",
      },
      {
        type: "STAY",
        text: "Uncover the best places to rest and relax during your trip.",
      },
      {
        type: "FIT",
        text: "Explore a variety of fitness options tailored for you.",
      },
    ]

    const onToggleCategory = (category: Category) => {
      setSelectedCategory(category)
    }

    const onNextStep = () => {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1)
      }
    }

    const onClearRecommendation = () => {
      setSelectedCategory(undefined)
      setTime(undefined)
      setDistance(undefined)
      setSubCategory(undefined)
      setCurrentStep(0)
    }
    const mergeAllQuestions = (userSelection) => {
      let itemMarkedForFilter = []
      Object.values(userSelection).forEach(
        ({ answeredQuestions }: { answeredQuestions: Array<{ text: string }> }) => {
          itemMarkedForFilter = [...itemMarkedForFilter, ...answeredQuestions]
        },
      )
      return itemMarkedForFilter
    }
    const refresh = () => {
      setShowRecommendation(false)
    }
    const formatQuestion = (data) => {
      const currentCategoryQuestionItem = data.categories.find(
        (category) => category.name === selectedCategory,
      )
      const formattedQuestion = []
      if (currentCategoryQuestionItem) {
        currentCategoryQuestionItem.questions.forEach((question) => {
          const newQuestion = {
            question: question.question,
            name: question.fieldName,
            formType: question.key,
            format: question.format,
            options: [],
            intro: question.intro,
          }
          if (question.options.length > 0) {
            newQuestion.options = question.options.map((option) => ({
              value: option.values.join("-"),
              text: option.text,
            }))
          }
          formattedQuestion.push(newQuestion)
        })
      }
      return formattedQuestion
    }
    const onDynamicFormSelectionChang = (key, value, requestType, text, optionIndex) => {
      const newSelection = {
        ...dynamicFormSelection,
      }
      if (!newSelection[key]) {
        newSelection[key] = {
          answeredQuestions: [
            {
              value,
              requestType,
              optionIndex,
              text,
            },
          ],
        }
      } else {
        if (optionIndex !== undefined) {
          const isAlreadySelected = newSelection[key].answeredQuestions.some(
            (item) => item.optionIndex === optionIndex && !!item.value,
          )
          if (isAlreadySelected) {
            newSelection[key].answeredQuestions = newSelection[key].answeredQuestions.filter(
              (item) => item.optionIndex !== optionIndex,
            )
          } else {
            newSelection[key].answeredQuestions.push({
              value: isAlreadySelected ? "" : value,
              requestType,
              optionIndex,
              text,
            })
          }
        } else {
          newSelection[key].answeredQuestions = [
            {
              value,
              requestType,
              optionIndex,
              text,
            },
          ]
        }
      }
      setDynamicFormSelection(newSelection)
    }

    const StepFour = () => (
      <View>
        {isSubCategoryError && (
          <EmptyState
            preset="generic"
            heading="Sub Category Error"
            content="An error occurred while fetching subcategory "
            buttonOnPress={refetchSubCategory}
          />
        )}
        {isSubCategoryLoading && <LoaderScreen />}
        {!isSubCategoryError && subCategories && subCategories[selectedCategory] && (
          <ScrollView>
            {isLoading && <LoaderScreen></LoaderScreen>}
            {!isLoading && !isError && (
              <View>
                <TouchableOpacity left marginT-10 onPress={clearRecommendation}>
                  <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>

                <View center marginB-16>
                  <Text style={$titleStyle}>You Chose</Text>
                </View>
                <View center marginB-15>
                  {constIConByType(selectedCategory)}
                  <View marginT-8>
                    <Text header style={{ color: Colors[selectedCategory.toLowerCase()] }}>
                      {selectedCategory}
                    </Text>
                  </View>
                </View>
                <DynamicForm
                  selectedCategory={selectedCategory}
                  selections={dynamicFormSelection}
                  questions={formatQuestion(questionnaire)}
                  setCurrentQuestion={setCurrentQuestion}
                  currentQuestion={currentQuestion}
                  onValueSelected={onDynamicFormSelectionChang}
                />
              </View>
            )}
          </ScrollView>
        )}
      </View>
    )
    const RecommendationPage = () => (
      <View marginT-5 flex>
        {(isRecommendationError || recommendations?.length < 1) &&
          !isRefetching &&
          !isFetchingRecommendations &&
          recommendations?.length < 1 && (
            <View flex-1 center>
              <EmptyState
                preset="generic"
                heading="Could net get any recommendation"
                buttonOnPress={refresh}
              />
            </View>
          )}
        {!isRecommendationError && recommendations?.length > 0 && (
          <View>
            <View marginT-10 marginB-15>
              <Text style={$titleStyle}>Our recommendations for</Text>
              <View center row marginT-8>
                <Text style={[$titleStyle, { color: Colors[selectedCategory?.toLowerCase()] }]}>
                  {selectedCategory}
                </Text>
                {mergeAllQuestions(dynamicFormSelection).map(({ text }) => (
                  <>
                    <View key={text} marginL-8>
                      <Text
                        style={[$titleStyle, { color: Colors[selectedCategory?.toLowerCase()] }]}
                      >
                        |
                      </Text>
                    </View>
                    <View marginL-8>
                      <Text
                        style={[$titleStyle, { color: Colors[selectedCategory?.toLowerCase()] }]}
                      >
                        {text}
                      </Text>
                    </View>
                  </>
                ))}
              </View>
            </View>
            <SkeletonView
              height={100}
              width={Dimensions.get("window").width - 16}
              style={$skeletonViewStyle}
              times={6}
              borderRadius={8}
              renderContent={() => (
                <View style={{ maxHeight: Dimensions.get("window").height - 300 }}>
                  <CardList isFeed={false} data={recommendations || []} />
                </View>
              )}
              showContent={!isFetchingRecommendations && !isRefetching && !isRecommendationError}
            />
          </View>
        )}
      </View>
    )
    const constIConByType = (type: Category) => {
      switch (type) {
        case "DO":
          return selectedCategory === "DO" ? <DoActive /> : <DO />
        case "DRINK":
          return selectedCategory === "DRINK" ? <DrinkActive /> : <Drink />
        case "EAT":
          return selectedCategory === "EAT" ? <EatActive /> : <EAT />
        case "FIT":
          return selectedCategory === "FIT" ? <FitActive /> : <Fit />
        case "SHOP":
          return selectedCategory === "SHOP" ? <ShopActive /> : <Shop />
        case "STAY":
          return selectedCategory === "STAY" ? <StayActive /> : <Stay />
        default:
          return null
      }
    }

    const onRecommend = () => {
      setShowRecommendation(true)
      refetch()
    }

    const shouldDisableRecommendButton = !selectedCategory
    return (
      <View padding-8 flex style={$pageContainer}>
        <View flex-1>
          {currentStep === 0 && !showRecommendation && (
            <ScrollView>
              <View marginT-25>
                <View marginB-25 center>
                  <Text style={$titleStyle}>
                    To Provide the best recommendation. Please choose one of the following
                    categories.
                  </Text>
                </View>
                <View style={$categoryContainer}>
                  {CATEGORY_DESCRIPTIONS.map((item) => (
                    <TouchableOpacity
                      key={item.type}
                      onPress={() => {
                        onToggleCategory(item.type)
                        onNextStep()
                      }}
                      row
                    >
                      {constIConByType(item.type)}
                      <View centerV marginL-6 paddingR-70>
                        <Text header style={$categoryTitle}>
                          {item.type}
                        </Text>
                        <Text style={$categoryDescription}>{item.text}</Text>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </ScrollView>
          )}

          {currentStep === 1 && !showRecommendation && <StepFour />}
          {showRecommendation && <RecommendationPage />}
        </View>
        {!showRecommendation && (
          <View bottom marginB-10>
            <View centerH style={$buttonContainer}>
              {currentStep !== 0 && (
                <TouchableOpacity
                  br-15
                  onPress={onRecommend}
                  style={[
                    $actionButton,
                    {
                      backgroundColor: Colors[selectedCategory?.toLowerCase()],
                    },
                  ]}
                  disabled={shouldDisableRecommendButton}
                >
                  <Text style={$buttonText} center white>
                    Recommend
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
        {showRecommendation && (
          <View centerH style={$buttonContainer}>
            {currentStep !== 0 && (
              <TouchableOpacity
                br-15
                onPress={clearRecommendation}
                style={$actionButton}
                disabled={shouldDisableRecommendButton}
              >
                <Text style={$buttonText} center white>
                  New Recommendation
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    )
  },
)

const $categoryContainer: ViewStyle = {
  gap: 4,
  marginTop: 10,
}
const $categoryDescription: TextStyle = {
  textAlign: "justify",
  marginRight: 8,
  marginLeft: 8,
}
const $buttonContainer: ViewStyle = {
  justifyContent: "space-between",
  gap: 10,
  width: "100%",
}
const $pageContainer: ViewStyle = {
  backgroundColor: colors.palette.neutral200,
}
const $actionButton: ViewStyle = {
  backgroundColor: Colors.ash,
  alignSelf: "stretch",
  paddingTop: 16,
  paddingBottom: 16,
  paddingRight: 32,
  paddingLeft: 32,
  borderRadius: 10,
  width: "100%",
}
const $buttonText: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.normal,
  textTransform: "uppercase",
}
const $titleStyle: TextStyle = {
  fontStyle: "normal",
  fontWeight: "400",
  fontFamily: "BourtonBase",
  fontSize: 19,
  textAlign: "center",
  color: "#333",
}
const $skeletonViewStyle: ViewStyle = {
  marginVertical: 3,
}
const $categoryTitle: TextStyle = {
  textAlign: "justify",
  textTransform: "uppercase",
  marginRight: 8,
  marginLeft: 8,
}
