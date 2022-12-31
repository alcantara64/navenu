import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { ImageBackground, View, Dimensions, ViewStyle, TextStyle } from "react-native"
import { Text, Incubator } from "react-native-ui-lib"

import { AppStackScreenProps } from "../../navigators"
import { typography, Colors } from "../../theme"
import { AppButton } from '../../components/AppButton';
import { MIcon as Icon } from '../../components/MIcon';
import { useNavigation } from "@react-navigation/native"
import { TextInput } from "../../components"

const authImage = require("../../../assets/images/auth/auth-form.png")
const { TextField } = Incubator

interface SignUpFormScreenProps extends AppStackScreenProps<"SignUpForm"> {}
export const SignUpFormScreen: FC<SignUpFormScreenProps> = observer(function SignUpFormScreen(_props) {
  const navigation = useNavigation();
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
            <View style={$input} >
              <TextField 
                color="black" 
                placeholderTextColor={Colors.gray} 
                placeholder={'your@email.com'} 
                secureTextEntry={true}
                style={{fontSize: 18}}
              />
            </View>
            <View style={$input} >
              <TextField 
                color="black" 
                placeholderTextColor={Colors.gray} 
                placeholder={'Password'} 
                secureTextEntry={true}
                style={{fontSize: 18}}
              />
              <Icon 
                name="eye"
                size={22}
                color={Colors.mediumGray}
              />
            </View>
          </View>
          <View style={$buttonContainer}>
            <AppButton style={$button}>
              <Text style={$buttonText}>Sign Up</Text>
            </AppButton>
            <AppButton style={$button} onPress={() => navigation.navigate('Login')}>
              <Text style={$buttonText}>I have an account</Text>
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
  padding: 8

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

const $input: ViewStyle = {
  backgroundColor: Colors.white,
  borderRadius: 16,
  flexDirection: 'row',
  padding: 16,
  alignItems: 'center',
  width: '100%',
  justifyContent: 'space-between',
  marginVertical: 6,
}