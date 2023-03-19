import { View, StyleSheet, ScrollView, StatusBar} from "react-native";
import Input from "../components/Input";
import Header from "../components/Header";
import Button from "../components/Button";
import TextButton from "../components/TextButton";
import SignupInformation from "../components/SignupInformation";

function RegisterPage() {
  return (
    <>
      <StatusBar style="auto"/>
      <View style={styles.mainContainer}>
      <View style={styles.bodyContainer}>
        <ScrollView alwaysBounceVertical={false}>
          <Header headerText={"Company Signup"} />
          <SignupInformation />
          <Input placeholder={"Full Name"} />
          <Input placeholder={"Company E-mail"} />
          <Input placeholder={"Password"} />
          <Input placeholder={"Confirm password"} />
          <Button title={"Signup as a viewer"} />
          <TextButton title={"Do you already have an account?"} />
          
        </ScrollView>
      </View>
    </View>
    </>
  );
}

export default RegisterPage;

const styles = StyleSheet.create({
  mainContainer: {
    justifyContent: "center",
    flex: 1,
    backgroundColor: "white",
  },
  bodyContainer: {
    height: 'auto',
    borderRadius: 15,
    margin: 10,
    flexDirection: "column",
    backgroundColor: "#495579",
    justifyContent: "center",
    alignItems: "stretch",
  },
  topContainer: {
    flex: 1,
  },
  scrollContainer: {
    flex: 5,
  },
});
