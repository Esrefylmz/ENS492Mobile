import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";

function SignupInformation() {
  return (
    <View style={signupInfoStyles.inputContainer}>
      <View style={signupInfoStyles.textContainer}>
        <Text style={signupInfoStyles.signupInfoText}>Your registration request is going to be assessed by your company administrator. Therefore, be sure that you are registering with your company e-mail to be directed to your company!</Text>
      </View>
    </View>
  );
}

export default SignupInformation;

const signupInfoStyles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    margin: 5,
    borderWidth: 1,
    borderColor: '#25995c',
    backgroundColor: '#25995c',
    borderRadius: 10,
  },
  signupInfoText: {
    fontSize: 13,
    fontWeight: 'bold',
    lineHeight: 21,
    letterSpacing: 0.25,
    color: "white",
  },
  textContainer: {
    borderColor: "#25995c",
    borderWidth: 1,
    borderRadius: 10,
    padding: 6,
    width: '100%',
    backgroundColor: "#25995c",
  }
});
