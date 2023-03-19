import { useState } from "react";
import { TextInput, View, StyleSheet } from "react-native";

function Input(props) {
  return (
    <View style={inputStyles.inputContainer}>
      <TextInput
        style={inputStyles.inputBox}
        onChangeText={props.onChangeFunction}
        placeholder={props.placeholder}
      />
    </View>
  );
}

export default Input;

const inputStyles = StyleSheet.create({
  inputBox: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    width: '100%',
    backgroundColor: "white",
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    margin: 10,
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: 'white',
    borderRadius: 10,
  }
});
