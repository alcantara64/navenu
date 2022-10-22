import * as React from "react"
import { StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Colors, colors, typography } from "../theme"
import CountDown from 'react-native-countdown-component';
import { formatDate, isValidDate } from "../utils/formatDate";


export interface CountdownTimerProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  time: string;
  showSeparator?: boolean 
}

/**
 * Describe your component here
 */
export const CountdownTimer = observer(function CountdownTimer(props: CountdownTimerProps) {
  const {time, showSeparator} = props
  
  if(!isValidDate(time)) return null

 const formattedDate =  formatDate(time)
  const date = new Date(formattedDate);
  
  const seconds = date.getTime() / 1000; //1440516958
  
  return (
    <CountDown
      size={9}
      until={seconds}
      digitStyle={$digitStyle}
      digitTxtStyle={$digitTextStyle}
      timeLabelStyle={$timeLabelStyle}
      separatorStyle={$separatorStyle}
      timeToShow={['D', 'H', 'M', 'S']}
      timeLabels={{ m: null, s: null }}
      showSeparator={showSeparator}
    
    />
  );
})

const $digitStyle:ViewStyle = { backgroundColor: Colors.orange }
const $digitTextStyle:TextStyle = { color: '#FFFF', fontWeight: 'bold', fontSize:16 }
const $timeLabelStyle:TextStyle = { color: 'red', fontWeight: 'bold' }
const $separatorStyle:TextStyle = { color: '#FFFFFF' }
