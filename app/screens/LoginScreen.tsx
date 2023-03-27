import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useRef, useState } from "react"
import {
  TextStyle,
  ViewStyle,
  ImageBackground,
  Dimensions,
  KeyboardAvoidingView,
  Alert,
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
  Modal,
} from "../components"
import { useStores } from "../models"
import { AppStackScreenProps } from "../navigators"
import { Colors } from "../theme"
import { KeyboardAwareScrollView, TouchableOpacity, View } from "react-native-ui-lib"
import { Formik } from "formik"
import { loginValidationSchema } from "../utils/validations"
import { useTogglePasswordVisibility } from "../hooks"
import { useNavigation } from "@react-navigation/native"
import { typography } from "../theme/typography"
import { FontAwesome5 } from "@expo/vector-icons"
import jwtDecode from "jwt-decode"
import { Platform } from "expo-modules-core"
import { CloudMessaging } from "../services/cloudMessagingService"
const authImage = require("../../assets/images/auth/auth-login-image.png")

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}
WebBrowser.maybeCompleteAuthSession()

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const [errorMsg, setErrorMsg] = useState("")
  const [errorState, setErrorState] = useState("")
  const [showLocationPopUp, setShowLocationPopUp] = useState(false)
  const cloudMessagingRef = useRef<CloudMessaging>()
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
      latitude,
      longitude,
    },
  } = useStores()
  const { passwordVisibility, handlePasswordVisibility, rightIcon } = useTogglePasswordVisibility()

  const [accessToken, setAccessToken] = React.useState(null)
  const [_request, response, promptAsync] = Google.useAuthRequest({
    iosClientId: GOOGLE_IOS_CLIENT_ID,
    androidClientId: GOOGLE_ANDROID_CLIENT_ID,
  })

  useEffect(() => {
    cloudMessagingRef.current = new CloudMessaging()
  }, [])
  useEffect(() => {
    if (!longitude || !latitude) {
      if (Platform.OS === "android") {
        setShowLocationPopUp(true)
      } else {
        requestForPermission()
      }
    }
  }, [])

  useEffect(() => {
    setLoading(false)
  }, [])

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
      try {
        const deviceToken = await cloudMessagingRef.current.getDeviceToken()
        await socialRegister({
          email: useInfo.email,
          firstName: useInfo.given_name,
          lastName: useInfo.family_name,
          socialId: useInfo.id,
          authType: "google",
          avatar: useInfo.picture,
          deviceToken,
          deviceType: Platform.OS,
        })
      } catch (e) {
        setErrorMessage(e.message)
      }
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
          firstName: credential.fullName.givenName || "",
          lastName: credential.fullName.familyName || "",
          socialId: credential.user,
          authType: "apple",
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

  const requestForPermission = async () => {
    setShowLocationPopUp(false)
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
  }

  async function onLogin(values: { email: string; password: string }) {
    const { email, password } = values
    setLoading(true)
    setIsSubmitted(true)
    setAuthEmail(email)
    setAuthPassword(password)
    setAttemptsCount(attemptsCount + 1)

    try {
      const token = await cloudMessagingRef.current.getDeviceToken()
      await login(email, password, token, Platform.OS)
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
    <>
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
            {({ values, touched, errors, handleChange, handleSubmit, handleBlur, isValid }) => (
              <KeyboardAwareScrollView>
                <View style={$formContainer}>
                  {/* Input fields */}
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

                  {errorState !== "" ? (
                    <FormErrorMessage error={errorState} visible={true} />
                  ) : null}
                  <View style={$buttonContainer}>
                    <AppButton style={$button} onPress={handleSubmit} disabled={!isValid}>
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
                    {Platform.OS === "ios" && (
                      <AppButton style={$button} onPress={handleAppleSignin}>
                        <FontAwesome5 name="apple" size={24} color="#FFFFFF" />
                        <Text style={$buttonText}>Continue with Apple</Text>
                      </AppButton>
                    )}

                    <AppButton
                      style={$borderlessButtonContainer}
                      borderless
                      title={"Create a new account?"}
                      onPress={() => navigation.navigate("SignUpStart")}
                    />
                    {/* <AppButton
                  style={$borderlessButtonContainer}
                  borderless
                  title={"Forgot Password"}
                  onPress={() => navigation.navigate("ForgotPassword")}
                /> */}
                  </View>
                </View>
              </KeyboardAwareScrollView>
            )}
          </Formik>

          {isLoading && <LoadingIndicator />}
        </ImageBackground>
      </KeyboardAvoidingView>
      <Modal
        show={showLocationPopUp}
        body={
          <View center flex style={$centeredView}>
            <View style={$modalView}>
              <View marginT-20>
                <Text>
                Navenu collects and stores location data of your device in order to provide you with more accurate venue recommendations based on your current location. you will still see venues if you decline tracking but they may not be the closest to you
                </Text>
              </View>
              <View row spread>
                <TouchableOpacity
                  onPress={() => {
                    setShowLocationPopUp(false)
                  }}
                >
                  <Text style={{ color: Colors.red }} preset="bold">
                    DENY
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={requestForPermission}>
                  <Text style={{ color: Colors.fit }}>Accept</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        }
      ></Modal>
    </>
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
const $centeredView: ViewStyle = {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.9)",
}
const $modalView: ViewStyle = {
  backgroundColor: "#F2F2F2",
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  padding: 15,

  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowRadius: 8,
  elevation: 5,
  // borderTopWidth: 10,

  borderRadius: 8,
}
