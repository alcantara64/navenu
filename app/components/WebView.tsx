import * as React from "react"
import { Dimensions, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import {WebViewMessageEvent, WebViewNavigation} from 'react-native-webview/lib/WebViewTypes';
import {WebView, WebViewProps} from 'react-native-webview';
import { useRef } from "react";
import { LoadingIndicator } from "./LoadingIndicator";
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

export interface WebCompProps extends WebViewProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  url: string;
  isDocument?: boolean;
  headers?: any;
  isWebURL?: boolean;
  back?: boolean;
  onClose: () => {}


}

/**
 * Describe your component here
 */
export const Web = observer(function Web(props: WebCompProps) {
  const { style, url, headers, isWebURL, onClose, ...rest } = props
  const $styles = [$container, style];
  const webview = useRef<WebView>(null);

  const onMessage = (event: WebViewMessageEvent) => {
    console.log(event)

};
const handleWebViewNavigationStateChange = (newNavState: WebViewNavigation) => {
  console.log(newNavState.url)
}


  return (
    <View style={$styles}>
      <View style={backButtonStyle}>
      <TouchableOpacity onPress={onClose} ><Ionicons name="chevron-back-circle-sharp"  size={35} color="white" /></TouchableOpacity>
      </View>
      <WebView

                    originWhitelist={['http*://*', 'redirect://*']}
                    onNavigationStateChange={handleWebViewNavigationStateChange}
                    domStorageEnabled
                    startInLoadingState
                    javaScriptEnabled
                    sharedCookiesEnabled
                    mixedContentMode="always"
                    source={{uri: url, headers}}
                    geolocationEnabled
                    renderLoading={() => (
                      <LoadingIndicator />
                    )}
                    onMessage={onMessage}
                   
                    {...rest}
                />

    </View>
  )
})

const $container: ViewStyle = {
  justifyContent: "center",
  flex: 1,
  height: Dimensions.get('window').height,
}
const backButtonStyle:ViewStyle ={
  top: 40,
  left:15,
  zIndex:1,
}

