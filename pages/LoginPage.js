import { View, StyleSheet, Text, StatusBar, TouchableOpacity } from "react-native";
import Input from "../components/Input";
import Header from "../components/Header";

function LoginPage({ navigation }) {
  const goHome = () => {
    navigation.navigate('Home');
  }

  const goRegister = () => {
    navigation.navigate('Register');
  }

  return (
    <>
      <StatusBar />
      <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
          <Header headerText={"NEFEX"} />
      </View>
        <View style={styles.bodyContainer}>
          <Header headerText={"Company Login"} />
          <Input placeholder={"Email"} />
          <Input placeholder={"Password"} secureTextEntry={true} />
          <View style={styles.buttonPlace}>
            <TouchableOpacity style={styles.button} onPress={goHome}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={goRegister}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent:"center",
    flex: 1,
    backgroundColor: 'white',
    alignItems: "stretch",
  },
  bodyContainer: {
    height: 500,
    borderRadius: 15,
    margin: 10,
    flexDirection: "column",
    backgroundColor: "#495579",
    alignItems: "stretch",
  },
  headerContainer: {
    height: 100,
    borderRadius: 15,
    margin: 10,
    flexDirection: "column",
    backgroundColor: "#495579",
    alignItems: "stretch",
  },
  buttonPlace: {
    margin: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 20,
    marginVertical: 5,
    width: 370,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
