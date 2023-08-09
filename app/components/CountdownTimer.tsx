import * as React from "react"
import { Text, StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import CountDown from "react-native-countdown-component"
import moment from "moment"

export interface CountdownTimerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  time: string
  showSeparator?: boolean
}

/**
 * Describe your component here
 */
export const CountdownTimer = observer(function CountdownTimer(props: CountdownTimerProps) {
  const { time, showSeparator } = props
  const countDownDate = moment(time, "YYYY/MM/DD HH:mm:ss")
  const currentTime = moment()
  const diff = countDownDate.diff(currentTime)

  const diffInDays = diff / (1000 * 60 * 60 * 24)
  const diffInSeconds = diff / 1000

  if (diffInDays > 1) {
    return <Text style={$countdownText}>{diffInDays.toFixed()} DAYS</Text>
  }

  return (
    <CountDown
      size={9}
      until={diffInSeconds}
      digitStyle={$countdownText}
      digitTxtStyle={$digitTextStyle}
      timeLabelStyle={$timeLabelStyle}
      separatorStyle={$separatorStyle}
      timeToShow={["D", "H", "M", "S"]}
      timeLabels={{ m: null, s: null }}
      showSeparator={showSeparator}
    />
  )
})

const $digitTextStyle: TextStyle = {
  color: "#FFFF",
  fontWeight: "bold",
  fontSize: 16,
  fontFamily: "bourtonbasedrop",
}
const $timeLabelStyle: TextStyle = { color: "red", fontWeight: "bold" }
const $separatorStyle: TextStyle = { color: "#FFFFFF" }
const $countdownText: TextStyle = {
  color: "#FFFFFF",
  marginRight: 4,
  fontFamily: "bourtonbasedrop",
}
