import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ImageBackground, View, Dimensions, ViewStyle, TextStyle } from "react-native"
import { Text } from "react-native-ui-lib"
import { FontAwesome5 } from "@expo/vector-icons"

import { AppStackScreenProps } from "../../navigators"
import { typography, Colors } from "../../theme"
import { AppButton } from "../../components/AppButton"
import { useNavigation } from "@react-navigation/native"

import { GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from "@env"

import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"

const authImage = require("../../../assets/images/auth/auth-start-image.png")

interface SignUpStartScreenProps extends AppStackScreenProps<"SignUpStart"> {}

WebBrowser.maybeCompleteAuthSession()

export const SignUpStartScreen: FC<SignUpStartScreenProps> = observer(function SignUpStartScreen(
  _props,
) {
  const navigation = useNavigation()
  const goToFormPage = () => {
    navigation.navigate("SignUpForm")
  }

  const [accessToken, setAccessToken] = React.useState(null)
  const [user, setUser] = React.useState(null)
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

  async function fetchUserInfo() {
    const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const useInfo = await response.json()
    setUser(useInfo)

    // todo: send user info to backend and register the user
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
            <AppButton style={$button}>
              <FontAwesome5 name="apple" size={24} color="#FFFFFF" />
              <Text style={$buttonText}>Continue with Apple</Text>
            </AppButton>
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
