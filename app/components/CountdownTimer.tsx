import * as React from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { colors, typography } from "../theme"
import CountDown from 'react-native-countdown-component';


export interface CountdownTimerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  time: string;
}

/**
 * Describe your component here
 */
export const CountdownTimer = observer(function CountdownTimer(props: CountdownTimerProps) {
  const {time} = props
 
  const date = new Date(time);
  const seconds = date.getTime() / 1000; //1440516958
  return (
    <CountDown
      size={9}
      until={seconds}
      digitStyle={{ backgroundColor: '#1CC625' }}
      digitTxtStyle={{ color: '#000000' }}
      timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
      separatorStyle={{ color: '#FFFFFF' }}
      timeToShow={['D', 'H', 'M', 'S']}
      timeLabels={{ m: null, s: null }}
      showSeparator
    />
  );
})

