import * as React from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Colors } from "../../app/theme"
import { RadioGroup, View, Text, TouchableOpacity } from "react-native-ui-lib"
import { useRef } from "react"

enum QUESTION_FORMAT {
  radio = "radio",
  checkbox = "checkbox",
  type = "select",
}
export interface DynamicFormProps {
  /**
   * An optional style override useful for padding & margin.
   */

  questions: Array<{
    question: string
    name: string
    formType: string
    format: QUESTION_FORMAT
    options: Array<{ text: string; value: string }>
    intro: string
  }>
  selections: any
  style?: StyleProp<ViewStyle>
  onValueSelected: (
    key: string,
    value: string,
    requestType: string,
    text: string,
    optionIndex?: number,
  ) => void
  currentQuestion: number
  setCurrentQuestion: (value: number) => void
  selectedCategory: "DO" | "STAY" | "DRINK" | "EAT" | "FIT" | "SHOP"
}

/**
 * Describe your component here
 */
export const DynamicForm = observer(function DynamicForm(props: DynamicFormProps) {
  const {
    style,
    questions,
    onValueSelected,
    selections,
    setCurrentQuestion,
    currentQuestion,
    selectedCategory,
  } = props
  const $styles = [$container, style]

  const questionLength = useRef(questions.length - 1)
  const onNext = () => {
    setCurrentQuestion(currentQuestion + 1)
  }
  const onPrevious = () => {
    setCurrentQuestion(currentQuestion - 1)
  }
  return (
    <View>
      <View>
        {questions
          .slice(currentQuestion, currentQuestion + 1)
          .map(({ name, question, options, format, formType, intro }) => (
            <View key={name}>
              {format === QUESTION_FORMAT.radio && (
                <RadioGroup
                  initialValue={selections?.[name]?.answeredQuestions?.[0]?.value}
                  onValueChange={(value) => onValueSelected(name, value, "", formType)}
                >
                  <View marginB-8 center>
                    <Text style={[$preferenceQuestionTitle, $titleStyle]}>{question}</Text>
                    <Text style={$chooseTitle}>{intro}</Text>
                  </View>
                  <View row center marginT-15 style={$formItemContainer}>
                    {options.map((option) => (
                      <TouchableOpacity
                        style={[
                          $buttonContainer,
                          {
                            backgroundColor:
                              option.value === selections?.[name]?.answeredQuestions?.[0]?.value
                                ? Colors[selectedCategory.toLowerCase()]
                                : Colors.faded,
                          },
                        ]}
                        key={option.value}
                        onPress={() => {
                          onValueSelected(name, option.value, formType, option.text)
                        }}
                      >
                        <Text style={$buttonSelectionText} center>
                          {option.text}
                        </Text>
                      </TouchableOpacity>
                      // <RadioButton key={option.value} value={option.value} label={option.text} />
                    ))}
                  </View>
                </RadioGroup>
              )}
              {format === QUESTION_FORMAT.checkbox && (
                <View>
                  <View marginB-8>
                    <Text sectionHeader>{question}</Text>
                  </View>
                  <View row style={$formItemContainer}>
                    {options.map((option, index) => (
                      <TouchableOpacity
                        style={[
                          $buttonContainer,
                          {
                            backgroundColor:
                              option.value ===
                              selections?.[name]?.answeredQuestions?.find(
                                (x) => x.optionIndex === index,
                              )?.value
                                ? Colors[selectedCategory.toLowerCase()]
                                : Colors.faded,
                          },
                        ]}
                        key={option.value}
                        onPress={() => {
                          onValueSelected(name, option.value, formType, option.text, index)
                        }}
                      >
                        <Text style={$buttonSelectionText} center>
                          {option.text}
                        </Text>
                      </TouchableOpacity>
                      // <Checkbox
                      //   key={option.value}
                      //   label={option.text}
                      //   value={
                      //     selections?.[name]?.answeredQuestions?.find(
                      //       (x) => x.optionIndex === index,
                      //     )?.value === option.value
                      //   }
                      //   onValueChange={() => onValueSelected(name, option.value, formType, index)}
                      // />
                    ))}
                  </View>
                </View>
              )}
            </View>
          ))}
      </View>
      <View row bottom marginT-60 center spread style={$controlContainer}>
        {currentQuestion > 0 && (
          <TouchableOpacity onPress={onPrevious}>
            <Text link>Previous</Text>
          </TouchableOpacity>
        )}
        {currentQuestion < questionLength.current && (
          <TouchableOpacity onPress={onNext}>
            <Text link>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
}

const $formItemContainer: ViewStyle = {
  gap: 8,
  flexWrap: "wrap",
  justifyContent: "space-between",
}
const $controlContainer: ViewStyle = {
  gap: 8,
}
const $preferenceQuestionTitle: TextStyle = {
  fontSize: 32,
  textTransform: "capitalize",
}
const $chooseTitle: TextStyle = {
  fontFamily: "Inter",
  fontSize: 14,
  fontStyle: "normal",
  fontWeight: "400",
  marginTop: 10,
}
const $titleStyle: TextStyle = {
  fontStyle: "normal",
  fontWeight: "400",
  fontFamily: "BourtonBase",
  fontSize: 22,
  textAlign: "center",
  color: "#333",
}
const $buttonContainer: ViewStyle = {
  backgroundColor: Colors.faded,
  borderRadius: 8,
  padding: 14,
  minWidth: "48%",
}
const $buttonSelectionText: TextStyle = {
  fontSize: 12,
  fontFamily: "BourtonBase",
  textTransform: "uppercase",
  fontWeight: "400",
  color: Colors.white,
}
