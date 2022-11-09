import { observer } from "mobx-react-lite"
import React, {
  FC,
} from "react"
import { Image, ImageStyle, TextStyle, View, ViewStyle,StyleSheet, ImageBackground, TouchableOpacity  } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { TextInput, Logo, Button, FormErrorMessage} from "../components"
import { isRTL } from "../i18n"
import { colors, spacing } from "../theme"
import { Text, View, Image } from 'react-native-ui-lib';
import { Formik } from 'formik';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import PagerView from 'react-native-pager-view';
import { Images, Colors, auth } from '../../config';
import { useTogglePasswordVisibility } from '../../hooks';
import { loginValidationSchema } from '../../utils';

const slider01 = {
  uri: 'https://media.navenu.com/skins/front/default/images/onboarding/slider/slider01.jpg',
};
const slider02 = {
  uri: 'https://media.navenu.com/skins/front/default/images/onboarding/slider/slider02.jpg',
};
const slider03 = {
  uri: 'https://media.navenu.com/skins/front/default/images/onboarding/slider/slider03.jpg',
};
const slider04 = {
  uri: 'https://media.navenu.com/skins/front/default/images/onboarding/slider/login.jpg',
};


export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
) {

  return (
    const [errorState, setErrorState] = useState('');
  const { passwordVisibility, handlePasswordVisibility, rightIcon } = useTogglePasswordVisibility();

  const handleLogin = (values) => {
    const { email, password } = values;
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      setErrorState(error.message)
    );
  };
  return (
    <>
      <View style={{ flex: 1 }}>
        <PagerView style={styles.viewPager} initialPage={0}>
          <View style={styles.container} key="1">
            <ImageBackground source={slider01} style={styles.image}>
              <View flex center>
                <Image source={Images.headerLogo} style={styles.himage} />
                <Text text30BL white>
                  CONNECT
                </Text>
                <Text text70B white>
                  WITH THE VERY BEST LOCATIONS. LIFESTYLES, AND COMMUNITY LEADERS
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.container} key="2">
            <ImageBackground source={slider02} style={styles.image}>
              <View flex center>
                <Image source={Images.headerLogo} style={styles.himage} />
                <Text text30BL white>
                  DISCOVER
                </Text>
                <Text text70B white>
                  YOUR PICK OF TRUSTED INSIDER RECOMMENDATIONS, ON-DEMAND
                </Text>
              </View>
            </ImageBackground>
          </View>
          <View style={styles.container} key="3">
            <ImageBackground source={slider03} style={styles.image}>
              <View flex center>
                <Image source={Images.headerLogo} style={styles.himage} />
                <Text text40BL white>
                  TAKE ADVANTAGE
                </Text>
                <Text text70BL white>
                  OF DYNAMIC WEEKLY DROPS
                </Text>
                <Text text70BL white>
                  EVENTS,EXPIERENCES,ITEMS
                </Text>
              </View>
            </ImageBackground>
          </View>
          <KeyboardAwareScrollView enableOnAndroid={true}>
            <View isSafe style={styles.container} key="4">
              <ImageBackground source={slider04} style={styles.image}>
                <View flex center>
                  <View style={styles.logoContainer}>
                    <Image source={Images.headerLogo} style={styles.himage} />
                  </View>
                </View>
                <Formik
                  initialValues={{
                    email: '',
                    password: '',
                  }}
                  validationSchema={loginValidationSchema}
                  onSubmit={(values) => handleLogin(values)}>
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
                      {errorState !== '' ? (
                        <FormErrorMessage error={errorState} visible={true} />
                      ) : null}
                      {/* Login button */}
                      <Button style={styles.button} onPress={handleSubmit}>
                        <Text style={styles.buttonText}>Login</Text>
                      </Button>
                    </>
                  )}
                </Formik>
                {/* Button to navigate to SignupScreen to create a new account */}
                <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                  <View style={styles.borderlessButtonContainer}>
                    <Text style={styles.buttonText}> Create a new account?</Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                  <View style={styles.borderlessButtonContainer}>
                    <Text style={styles.buttonText}>Forgot Password?</Text>
                  </View>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          </KeyboardAwareScrollView>
        </PagerView>
      </View>
    </>
  );
  )
})

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
}

const $bottomContentContainer: ViewStyle = {
  flex: 1,
  paddingHorizontal: spacing.large,
  justifyContent: "space-around",
}

const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.huge,
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}

const $welcomeHeading: TextStyle = {
  marginBottom: spacing.medium,
}
