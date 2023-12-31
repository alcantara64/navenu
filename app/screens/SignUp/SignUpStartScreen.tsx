import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useRef } from "react"
import { ImageBackground, View, Dimensions, ViewStyle, TextStyle, Alert } from "react-native"
import { Text } from "react-native-ui-lib"
import { FontAwesome5 } from "@expo/vector-icons"

import { AppStackScreenProps } from "../../navigators"
import { typography, Colors } from "../../theme"
import { AppButton } from "../../components/AppButton"
import { useNavigation } from "@react-navigation/native"

import { GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from "@env"

import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import * as AppleAuthentication from "expo-apple-authentication"

import { useStores } from "../../models"
import { Platform } from "expo-modules-core"
import jwtDecode from "jwt-decode"
import { ToastLoader } from "../../components"
import { CloudMessaging } from "../../services/cloudMessagingService"

const authImage = require("../../../assets/images/auth/auth-start-image.png")

interface SignUpStartScreenProps extends AppStackScreenProps<"SignUpStart"> {}

WebBrowser.maybeCompleteAuthSession()

export const SignUpStartScreen: FC<SignUpStartScreenProps> = observer(function SignUpStartScreen(
  _props,
) {
  const navigation = useNavigation()
  const {
    authenticationStore: { socialRegister, setLoading, isLoading, errorMessage, setErrorMessage },
  } = useStores()
  const cloudMessagingRef = useRef<CloudMessaging>()

  useEffect(() => {
    setLoading(false)
  }, [])

  const goToFormPage = () => {
    navigation.navigate("SignUpForm")
  }

  const [accessToken, setAccessToken] = React.useState(null)
  const [_request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
  })

  React.useEffect(() => {
    if (response?.type === "success") {
      setAccessToken(response.authentication.accessToken)
      accessToken && fetchUserInfo()
    }
  }, [response, accessToken])

  useEffect(() => {
    cloudMessagingRef.current = new CloudMessaging()
  }, [])

  async function fetchUserInfo() {
    const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const useInfo = await response.json()
    const deviceToken = await cloudMessagingRef.current.getDeviceToken()
    if (useInfo && useInfo.email) {
      socialRegister({
        email: useInfo.email,
        firstName: useInfo.given_name,
        lastName: useInfo.family_name,
        socialId: useInfo.id,
        authType: "google",
        avatar: useInfo.picture,
        isSignUp: true,
        deviceToken,
        deviceType: Platform.OS,
      }).then(() => {
        navigation.navigate("PreferencesScreen")
      })
    }
  }

  const handleAppleSignin = async () => {
    try {
      const deviceToken = await cloudMessagingRef.current.getDeviceToken()
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })
      let decodeEmail = ""
      if (credential.identityToken) {
        const result = jwtDecode<{ email: string }>(credential.identityToken)
        decodeEmail = result.email
      }
      if (credential && (credential.email || decodeEmail)) {
        socialRegister({
          email: credential.email || decodeEmail,
          firstName: credential.fullName.givenName,
          lastName: credential.fullName.familyName,
          socialId: credential.user,
          authType: "apple",
          isSignUp: true,
          deviceToken,
          deviceType: Platform.OS,
        })
      }
    } catch (e) {
      console.log(e)
      if (e.code === "ERR_CANCELED") {
        Alert.alert("Sign in with Apple canceled")
      }
    }
  }

  return (
    <>
      <View>
        <ImageBackground
          source={authImage}
          style={{
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
          }}
        >
          <ToastLoader
            isLoading={isLoading}
            hasError={!!errorMessage}
            errorMessage={errorMessage}
            clearError={() => setErrorMessage("")}
          />
          <View style={$textContainer}>
            <Text style={$text}>GAIN ACCESS TO A</Text>
            <Text style={$text}>New World:</Text>
            <Text style={$text}>The navenu world!</Text>
          </View>
          <View style={$buttonContainer}>
            <AppButton
              style={$button}
              onPress={() => {
                promptAsync()
              }}
            >
              <FontAwesome5 name="google" size={24} color="#FFFFFF" />
              <Text style={$buttonText}>Continue with google</Text>
            </AppButton>
            {Platform.OS === "ios" && (
              <AppButton style={$button} onPress={handleAppleSignin}>
                <FontAwesome5 name="apple" size={24} color="#FFFFFF" />
                <Text style={$buttonText}>Continue with Apple</Text>
              </AppButton>
            )}
            <AppButton style={$button} onPress={goToFormPage}>
              <FontAwesome5 solid name="envelope" size={24} color="#FFFFFF" />
              <Text style={$buttonText}>Continue with email</Text>
            </AppButton>
          </View>
        </ImageBackground>
      </View>
    </>
  )
})

const $textContainer: ViewStyle = {
  alignItems: "center",
  marginTop: "70%",
}

const $text: TextStyle = {
  color: Colors.white,
  fontFamily: typography.fonts.bourtonbase.normal,
  textTransform: "uppercase",
  textAlign: "center",
  fontSize: 32,
}

const $buttonText: TextStyle = {
  ...$text,
  fontSize: 20,
  fontFamily: typography.fonts.bourtonbase.medium,
  padding: 4,
  marginLeft: 8,
}

const $buttonContainer: ViewStyle = {
  flex: 1,
  alignItems: "center",
  justifyContent: "flex-end",
  bottom: 0,
  padding: 8,
}

const $button: ViewStyle = {
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  marginVertical: 8,
  backgroundColor: Colors.ash,
  padding: 10,
  borderRadius: 16,
  flexDirection: "row",
}
