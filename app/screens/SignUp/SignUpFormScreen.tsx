import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ImageBackground, View, Dimensions, ViewStyle, TextStyle } from "react-native"
import { Text, Incubator } from "react-native-ui-lib"

import { AppStackScreenProps } from "../../navigators"
import { typography, Colors } from "../../theme"
import { AppButton } from "../../components/AppButton"
import { MIcon as Icon } from "../../components/MIcon"
import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { FormErrorMessage, ToastLoader } from "../../components"
import { Formik } from "formik"
import { signupValidationSchema } from "../../utils/validations"

const authImage = require("../../../assets/images/auth/auth-form.png")
const { TextField } = Incubator

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

  console.log(errorMessage)

  const handleSignUp = async (values: { email: string; password: string }) => {
    const { email, password } = values
    setAuthEmail(email)
    setAuthPassword(password)

    if (Object.values(validationErrors).some((v) => !!v))
      try {
        await register()
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
            {({ values, touched, errors, handleChange, handleSubmit, handleBlur }) => (
              <>
                <View style={$textContainer}>
                  <View style={$input}>
                    <TextField
                      name="email"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={handleBlur("email")}
                      color="black"
                      placeholderTextColor={Colors.gray}
                      placeholder={"your@email.com"}
                    />
                  </View>
                  <FormErrorMessage error={errors.email} visible={touched.email} />
                  <View style={$input}>
                    <TextField
                      name="password"
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      color="black"
                      placeholderTextColor={Colors.gray}
                      placeholder={"Password"}
                      secureTextEntry={true}
                    />
                    <Icon name="eye" size={22} color={Colors.mediumGray} />
                  </View>
                  <FormErrorMessage error={errors.password} visible={touched.password} />
                  
                </View>
                <View style={$buttonContainer}>
                  <AppButton style={$button} onPress={handleSubmit}>
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
  marginTop: 8,
  backgroundColor: Colors.ash,
  padding: 10,
  borderRadius: 16,
  flexDirection: "row",
}

const $input: ViewStyle = {
  backgroundColor: Colors.white,
  borderRadius: 16,
  flexDirection: "row",
  padding: 16,
  alignItems: "center",
  width: "100%",
  justifyContent: "space-between",
  marginVertical: 6,
}
