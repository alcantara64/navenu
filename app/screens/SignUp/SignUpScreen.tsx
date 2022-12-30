import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ImageBackground, View, Dimensions, ViewStyle, TextStyle } from "react-native"
import { Text } from "react-native-ui-lib"
import { FontAwesome5 } from "@expo/vector-icons"

import { AppStackScreenProps } from "../../navigators"
import { typography, Colors } from "../../theme"
import { AppButton } from '../../components/AppButton';

const authImage = require("../../../assets/images/auth/auth-start-image.png")

interface SignUpScreenProps extends AppStackScreenProps<"SignUp"> {}
export const SignUpScreen: FC<SignUpScreenProps> = observer(function LoginScreen(_props) {
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
            <AppButton style={$button}>
              <FontAwesome5 name="google" size={27} color="#FFFFFF" />
              <Text style={$buttonText}>Continue google</Text>
            </AppButton>
            <AppButton style={$button}>
              <FontAwesome5 name="apple" size={27} color="#FFFFFF" />
              <Text style={$buttonText}>Continue Apple</Text>
            </AppButton>
            <AppButton style={$button}>
              <FontAwesome5 solid name="envelope" size={27} color="#FFFFFF" />
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
  padding: 8
}

const $button: ViewStyle = {
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 8,
  backgroundColor: Colors.ash,
  padding: 10,
  borderRadius: 16,
  flexDirection: "row",
}
