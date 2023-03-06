import * as React from "react"
import { Dimensions, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import {WebViewMessageEvent, WebViewNavigation} from 'react-native-webview/lib/WebViewTypes';
import {WebView, WebViewProps} from 'react-native-webview';
import { useRef } from "react";
import { LoadingIndicator } from "./LoadingIndicator";

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


}

/**
 * Describe your component here
 */
export const Web = observer(function Web(props: WebCompProps) {
  const { style, url, headers, isWebURL, ...rest } = props
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
  height: Dimensions.get('screen').height
}

