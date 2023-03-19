import { Pressable, View, StyleSheet, Text } from "react-native";

function TextButton(props) {
  return (
    <View style={textButtonStyles.textButtonContainer}>
      <Text style={textButtonStyles.textButtonText} onPress={props.textButtonFunction}>{props.title}</Text>
    </View>
  );
}

export default TextButton;

const textButtonStyles = StyleSheet.create({
  textButtonContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    margin: 6,
    marginBottom: 20,
  },
  textButtonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: '600',
    fontStyle: 'italic',
    letterSpacing: 0.25,
    color: "white",
  },
});
