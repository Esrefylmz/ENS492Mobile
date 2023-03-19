import { Pressable, View, StyleSheet, Text } from "react-native";

function Bluebutton(props) {
  return (
    <View style={buttonStyles.buttonContainer}>
      <Pressable android_ripple={{color: '#495579'}}  style={({pressed}) => pressed ? buttonStyles.pressedButton : buttonStyles.button} onPress={props.onPressFunction}>
        <Text style={buttonStyles.buttonText}>{props.title}</Text>
      </Pressable>
    </View>
  );
}

export default Bluebutton;

const buttonStyles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    elevation: 3,
    width: "100%",
    backgroundColor: "#495579",
  },
  pressedButton: {
    opacity: 0.5,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 50,
    elevation: 3,
    width: "100%",
    backgroundColor: "#251749",
  },
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 8,
    backgroundColor: "white",
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: 'white',
  },
});
