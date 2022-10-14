import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import { Platform, TextInput, TextStyle, ViewStyle } from "react-native"
import * as Location from 'expo-location';
import { Button, Icon, LoadingIndicator, Screen, Text, TextField, TextFieldAccessoryProps } from "../components"
import { useStores} from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

interface LoginScreenProps extends AppStackScreenProps<"Login"> {}

export const LoginScreen: FC<LoginScreenProps> = observer(function LoginScreen(_props) {
  const authPasswordInput = useRef<TextInput>()
  const [isAuthPasswordHidden, setIsAuthPasswordHidden] = useState(true)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attemptsCount, setAttemptsCount] = useState(0)
  const [errorMsg, setErrorMsg] = useState('');
  const [userInfo, setUserInfo] = useState<any>(null);
  const {
    authenticationStore: {
      authEmail,
      authPassword,
      setAuthEmail,
      setAuthPassword,
      validationErrors,
      login,
      isLoading,
      setLongitudeAndLatitude
    },
  } = useStores()

  useEffect(() => {
    // todo refactor this
    GoogleSignin.configure({
      webClientId: '533893697678-ljabp27a97lgkbb9l4emj9gnkmjqu6qv.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      forceCodeForRefreshToken: true,
    });
  }, [])

  useEffect(() => {
    (async () => {
      const  { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      const location = await Location.getLastKnownPositionAsync({});
      console.log('location ==>', location);
     if(location){
      setLongitudeAndLatitude(location.coords.longitude, location.coords.latitude);

     }else{
      setErrorMsg('We could not fetch your location data');
     }
    })();
  }, []);

  useEffect(() => {
    // Here is where you could fetch credientials from keychain or storage
    // and pre-fill the form fields.\
    setAuthEmail("navenuteam@navenu.com")
    setAuthPassword("Gonavenu")
  }, [])

  const errors: typeof validationErrors = isSubmitted ? validationErrors : ({} as any)
  const googleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  async function onLogin() {
    setIsSubmitted(true)
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
  }

  const PasswordRightAccessory = useMemo(
    () =>
      function PasswordRightAccessory(props: TextFieldAccessoryProps) {
        return (
          <Icon
            icon={isAuthPasswordHidden ? "view" : "hidden"}
            color={colors.palette.neutral800}
            containerStyle={props.style}
            onPress={() => setIsAuthPasswordHidden(!isAuthPasswordHidden)}
          />
        )
      },
    [isAuthPasswordHidden],
  )

  useEffect(() => {
    return () => {
      setAuthPassword("")
      setAuthEmail("")
    }
  }, [])

  return (
    <Screen
      preset="auto"
      contentContainerStyle={$screenContentContainer}
      safeAreaEdges={["top", "bottom"]}
    >
      <Text testID="login-heading" tx="loginScreen.signIn" preset="heading" style={$signIn} />
      <Text tx="loginScreen.enterDetails" preset="subheading" style={$enterDetails} />
      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}

      <TextField
        value={authEmail}
        onChangeText={setAuthEmail}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect={false}
        keyboardType="email-address"
        labelTx="loginScreen.emailFieldLabel"
        placeholderTx="loginScreen.emailFieldPlaceholder"
        helper={errors?.authEmail}
        status={errors?.authEmail ? "error" : undefined}
        onSubmitEditing={() => authPasswordInput.current?.focus()}
      />

      <TextField
        ref={authPasswordInput}
        value={authPassword}
        onChangeText={setAuthPassword}
        containerStyle={$textField}
        autoCapitalize="none"
        autoComplete="password"
        autoCorrect={false}
        secureTextEntry={isAuthPasswordHidden}
        labelTx="loginScreen.passwordFieldLabel"
        placeholderTx="loginScreen.passwordFieldPlaceholder"
        helper={errors?.authPassword}
        status={errors?.authPassword ? "error" : undefined}
        onSubmitEditing={onLogin}
        RightAccessory={PasswordRightAccessory}
      />
     {  <GoogleSigninButton  onPress={googleSignIn}/>}
      <Button
        testID="login-button"
        tx="loginScreen.tapToSignIn"
        style={$tapButton}
        preset="reversed"
        onPress={onLogin}
      />
      
      {isLoading && <LoadingIndicator />}
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.huge,
  paddingHorizontal: spacing.large,
}

const $signIn: TextStyle = {
  marginBottom: spacing.small,
}

const $enterDetails: TextStyle = {
  marginBottom: spacing.large,
}

const $hint: TextStyle = {
  color: colors.tint,
  marginBottom: spacing.medium,
}

const $textField: ViewStyle = {
  marginBottom: spacing.large,
}

const $tapButton: ViewStyle = {
  marginTop: spacing.extraSmall,
}

// @demo remove-file
