import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo, useRef, useState } from "react"
import {TextInput, TextStyle, ViewStyle } from "react-native"
import * as Location from 'expo-location';
import { Button, FormErrorMessage, Icon, LoadingIndicator, Logo, Screen, Text, TextFieldAccessoryProps, View } from "../components"
import { useStores} from "../models"
import { AppStackScreenProps } from "../navigators"
import { colors, spacing } from "../theme"
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { Colors, KeyboardAwareScrollView } from "react-native-ui-lib";
import { Images } from "../theme/images";
import { Formik } from 'formik';
import { loginValidationSchema } from "../utils/validations";


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

  async function onLogin(values:{email:string, password:string}) {
    const { email, password } = values;
    setIsSubmitted(true)
    setAuthEmail(email);
    setAuthPassword(password);
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
      <View isSafe style={$container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
      <View style={$logoContainer}>
          <Logo uri={Images.logo} />
        </View>
      {attemptsCount > 2 && <Text tx="loginScreen.hint" size="sm" weight="light" style={$hint} />}

      <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => onLogin(values)}>
          {({ values, touched, errors, handleChange, handleSubmit, handleBlur }) => (
            <>
              {/* Input fields */}
              <TextInput
                name="email"
                leftIconName="email"
                placeholder="Enter email"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
              />
              <FormErrorMessage error={errors.email} visible={touched.email} />
              <TextInput
                name="password"
                leftIconName="key-variant"
                placeholder="Enter password"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType="password"
                rightIcon={rightIcon}
                handlePasswordVisibility={handlePasswordVisibility}
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
              />
              <FormErrorMessage error={errors.password} visible={touched.password} />
              {/* Display Screen Error Mesages */}
              {errorState !== '' ? <FormErrorMessage error={errorState} visible={true} /> : null}
              {/* Login button */}
              <Button style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Login</Text>
              </Button>
            </>
          )}
        </Formik>
     {  <GoogleSigninButton  onPress={googleSignIn}/>}
      <Button
        testID="login-button"
        tx="loginScreen.tapToSignIn"
        style={$tapButton}
        preset="reversed"
        onPress={onLogin}
      />
      
      {isLoading && <LoadingIndicator />}
      </KeyboardAwareScrollView>
      </View>
    </Screen>
  )
})

const $screenContentContainer: ViewStyle = {
  paddingVertical: spacing.huge,
  paddingHorizontal: spacing.large,
}
const $container: ViewStyle = {
  flex: 1,
  flexDirection: 'column',
  backgroundColor: Colors.white, // from config
}

const $logoContainer:ViewStyle =  {
  alignItems: 'center',
};


const $button: ViewStyle = {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: Colors.orange,
    padding: 10,
    borderRadius: 8,
};

const $buttonText: TextStyle = {
  fontSize: 20,
  color: Colors.white,
  fontWeight: '700',
}

const $borderlessButtonContainer: TextStyle = {
  marginTop: 16,
  color: Colors.white,
  alignItems: 'center',
  justifyContent: 'center',
}

const $tapButton: ViewStyle = {
  marginTop: spacing.extraSmall,
}


