import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useState } from "react"
import {
  TextStyle,
  ViewStyle,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
} from "react-native"
import * as Location from "expo-location"
import { GOOGLE_ANDROID_CLIENT_ID, GOOGLE_IOS_CLIENT_ID } from "@env"
import * as WebBrowser from "expo-web-browser"
import * as Google from "expo-auth-session/providers/google"
import * as AppleAuthentication from "expo-apple-authentication"

import {
  AppButton,
  FormErrorMessage,
  TextInput,
  LoadingIndicator,
  Text,
  ToastLoader,
} from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { Colors } from "../theme"
import { View } from "react-native-ui-lib"
import { Formik } from "formik"
import { loginValidationSchema } from "../utils/validations"
import { useTogglePasswordVisibility } from "../hooks"
import { useNavigation } from "@react-navigation/native"
import { typography } from "../theme/typography"
import { FontAwesome5 } from "@expo/vector-icons"
const authImage = require("../../assets/images/auth/auth-login-image.png")

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}
WebBrowser.maybeCompleteAuthSession()

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const [errorMsg, setErrorMsg] = useState("")
  const [userInfo, setUserInfo] = useState<any>(null)
  const [errorState, setErrorState] = useState("")
  // const [loading, setLoading] = useState(false)
  const navigation = useNavigation()
  const {
    authenticationStore: {
      setAuthEmail,
      setAuthPassword,
      validationErrors,
      login,
      isLoading,
      setLoading,
      setLongitudeAndLatitude,
      errorMessage,
      setErrorMessage,
      socialRegister,
    },
  } = useStores()
  const { passwordVisibility, handlePasswordVisibility, rightIcon } = useTogglePasswordVisibility()

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

  async function fetchUserInfo() {
    const response = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
    const useInfo = await response.json()

    if (useInfo) {
      socialRegister({
        email: useInfo.email,
        firstName: useInfo.given_name,
        lastName: useInfo.family_name,
        socialId: useInfo.id,
        authType: "google",
        avatar: useInfo.picture,
      }).then(() => {
        navigation.navigate("PreferencesScreen")
      })
    }
  }

  const handleAppleSignin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      })

      if (credential) {
        socialRegister({
          email: credential.email,
          firstName: credential.fullName.givenName,
          lastName: credential.fullName.familyName,
          socialId: credential.user,
          authType: "apple",
        })
      }
    } catch (e) {
      console.log(e)
      if (e.code === "ERR_CANCELED") {
        Alert.alert("Sign in with Apple canceled")
      }
    }
  }

  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied")
        return
      }
      const location = await Location.getCurrentPositionAsync({})
      if (location) {
        setLongitudeAndLatitude(location.coords.longitude, location.coords.latitude)
      } else {
        setErrorMsg("We could not fetch your location data")
      }
    })()
  }, [])

  useEffect(() => {
    setLoading(false)
  }, [])

  async function onLogin(values: { email: string; password: string }) {
    const { email, password } = values
    setLoading(true)
    setIsSubmitted(true)
    setAuthEmail(email)
    setAuthPassword(password)
    setAttemptsCount(attemptsCount + 1)

    if (Object.values(validationErrors).some((v) => !!v)) return
    try {
      await login()
    } catch (e) {
      console.error(e)
    }

    // Make a request to your server to get an authentication token.
    // If successful, reset the fields and set the token.
    setIsSubmitted(false)
    setAuthPassword("")
    setAuthEmail("")
    setLoading(false)
  }

  useEffect(() => {
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  const clearErrorMessage = () => {
    setErrorMsg("")
    setErrorMessage("")
  }
  return (
    <KeyboardAvoidingView>
      <ImageBackground
        source={authImage}
        style={{
          height: Dimensions.get("window").height,
        }}
      >
        <ToastLoader
          isLoading={isLoading}
          hasError={!!errorMsg || !!errorMessage}
          errorMessage={errorMsg || errorMessage}
          clearError={clearErrorMessage}
        />

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => onLogin(values)}
        >
          {({ values, touched, errors, handleChange, handleSubmit, handleBlur }) => (
            <View style={$formContainer}>
              {/* Input fields */}
              <View>
                <TextInput
                  name="email"
                  placeholder="Enter email"
                  autoCapitalize="none"
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  autoFocus={true}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                />
                <FormErrorMessage error={errors.email} visible={touched.email} />
                <TextInput
                  name="password"
                  placeholder="Enter password"
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry={passwordVisibility}
                  textContentType="password"
                  rightIcon={rightIcon}
                  handlePasswordVisibility={handlePasswordVisibility}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                />
                <FormErrorMessage error={errors.password} visible={touched.password} />
              </View>

              {errorState !== "" ? <FormErrorMessage error={errorState} visible={true} /> : null}
              <View style={$buttonContainer}>
                <AppButton style={$button} onPress={handleSubmit} disabled={true}>
                  <Text style={$buttonText}>Login</Text>
                </AppButton>
                <AppButton
                  style={$button}
                  onPress={() => {
                    promptAsync()
                  }}
                >
                  <FontAwesome5 name="google" size={24} color="#FFFFFF" />
                  <Text style={$buttonText}>Continue with google</Text>
                </AppButton>
                <AppButton style={$button} onPress={handleAppleSignin}>
                  <FontAwesome5 name="apple" size={24} color="#FFFFFF" />
                  <Text style={$buttonText}>Continue with Apple</Text>
                </AppButton>

                <AppButton
                  style={$borderlessButtonContainer}
                  borderless
                  title={"Create a new account?"}
                  onPress={() => navigation.navigate("SignUpStart")}
                />
                <AppButton
                  style={$borderlessButtonContainer}
                  borderless
                  title={"Forgot Password"}
                  onPress={() => navigation.navigate("ForgotPassword")}
                />
              </View>
            </View>
          )}
        </Formik>

        {isLoading && <LoadingIndicator />}
      </ImageBackground>
    </KeyboardAvoidingView>
  )
})

const $formContainer: ViewStyle = {
  flex: 1,
  marginTop: "60%",
  padding: 24,
}

const $buttonContainer: ViewStyle = {
  justifyContent: "flex-end",
  alignContent: "flex-end",
  flex: 1,
}

const $button: ViewStyle = {
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 8,
  backgroundColor: Colors.ash,
  padding: 10,
  borderRadius: 8,
  flexDirection: "row",
  marginVertical: 8,

}

const $buttonText: TextStyle = {
  fontFamily: typography.fonts.bourtonbase.medium,
  textTransform: "uppercase",
  fontSize: 20,
  color: Colors.white,
  marginLeft: 8,
}

const $borderlessButtonContainer: TextStyle = {
  marginTop: 16,
  color: Colors.white,
  alignItems: "center",
  justifyContent: "center",
}
