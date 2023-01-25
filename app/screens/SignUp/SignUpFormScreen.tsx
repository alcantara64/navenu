import { observer } from "mobx-react-lite"
import React, { FC, useState } from "react"
import { ImageBackground, View, Dimensions, ViewStyle, TextStyle } from "react-native"
import { Text } from "react-native-ui-lib"

import { AppStackScreenProps } from "../../navigators"
import { typography, Colors } from "../../theme"
import { AppButton } from "../../components/AppButton"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { FormErrorMessage, ToastLoader, TextInput } from "../../components"
import { Formik } from "formik"
import { signupValidationSchema } from "../../utils/validations"
import { useTogglePasswordVisibility } from "../../hooks"

const authImage = require("../../../assets/images/auth/auth-form.png")

interface SignUpFormScreenProps extends AppStackScreenProps<"SignUpForm"> {}
export const SignUpFormScreen: FC<SignUpFormScreenProps> = observer(function SignUpFormScreen(
  _props,
) {
  const {
    authenticationStore: {
      register,
      setAuthEmail,
      setAuthPassword,
      validationErrors,
      isLoading,
      errorMessage,
      setErrorMessage,
    },
  } = useStores()
  const navigation = useNavigation()
  const { passwordVisibility, handlePasswordVisibility, rightIcon } = useTogglePasswordVisibility()
  const [errorState] = useState("")

  const handleSignUp = async (values: { email: string; password: string }) => {
    const { email, password } = values
    setAuthEmail(email)
    setAuthPassword(password)

      try {
        await register(email, password)
      } catch (e) {
        console.log("error", e)
      }
    setAuthPassword("")
    setAuthEmail("")
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
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={signupValidationSchema}
            onSubmit={(values) => handleSignUp(values)}
          >
            {({ values, touched, errors, isValid, handleChange, handleSubmit, handleBlur }) => (
              <>
                <View style={$textContainer}>
                  <View style={$formContainer}>
                    {/* Input fields */}
                    <View>
                      <TextInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        placeholder="Enter email"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                        autoFocus={true}
                        value={values.email}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                      />
                      <FormErrorMessage error={errors.email} visible={touched.email} />
                      <TextInput
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

                    {errorState !== "" ? (
                      <FormErrorMessage error={errorState} visible={true} />
                    ) : null}
                  </View>
                </View>
                <View style={$buttonContainer}>
                  <AppButton disabled={!isValid} style={$button} onPress={handleSubmit}>
                    <Text style={$buttonText}>Sign Up</Text>
                  </AppButton>
                  <AppButton style={$button} onPress={() => navigation.navigate("Login")}>
                    <Text style={$buttonText}>I have an account</Text>
                  </AppButton>
                </View>
              </>
            )}
          </Formik>
        </ImageBackground>
      </View>
    </>
  )
})

const $textContainer: ViewStyle = {
  alignItems: "center",
  marginTop: "70%",
  padding: 8,
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

const $formContainer: ViewStyle = {
  width: "100%",
  padding: 24,
}
