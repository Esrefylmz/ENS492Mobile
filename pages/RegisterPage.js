import { View, StyleSheet, ScrollView, StatusBar, TextInput, Text, TouchableOpacity} from "react-native";
import React, {useState, useEffect} from "react";

import Input from "../components/Input";
import Header from "../components/Header";
import Button from "../components/Button";
import TextButton from "../components/TextButton";
import SignupInformation from "../components/SignupInformation";
import { getCompanyByDomain } from "../Backend/companyServices";

function RegisterPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const [companies, setCompanies] = useState([]);
  const [companyId, setCompanyId] = useState('');

  const goLogin = async () => {
    // Extract the company name from the email input
    const company = email.split('@')[1];

    // Here you can send the company, email, and password to the backend
    console.log('Company:', company, 'Email:', email, 'Password:', password);
    await getCompanyByDomain(company).then((companies) => {
      setCompanies(companies);
      console.log('Companies', companies);
      console.log('COMPANYID', companies.companyId);
      setCompanyId(companies.companyId)
    }).catch((error) => {
      console.log("api call error");
    });

    navigation.navigate('Login', { company });
  }

  console.log("Email:", email, 'Password:', password, companyId);

  return (
    <>
      <StatusBar style="auto"/>
      <View style={styles.mainContainer}>
      <View style={styles.bodyContainer}>
        <ScrollView alwaysBounceVertical={false}>
          <Header headerText={"Company Signup"} />
          <SignupInformation />
          <TextInput style={styles.inputText} placeholder={"Full Name"} value={name} onChangeText={setName} />
          <TextInput style={styles.inputText} placeholder={"Company E-mail"} value={email} onChangeText={setEmail} />
          <TextInput style={styles.inputText} placeholder={"Password"} value={password} onChangeText={setPassword} secureTextEntry={true} />
          <TextInput style={styles.inputText} placeholder={"Confirm password"} value={password}  onChangeText={setPassword} secureTextEntry={true} />
          <TouchableOpacity style={styles.button} onPress={goLogin}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
          <TextButton title={"Do you already have an account?"}/>
          
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
  button: {
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 20,
    marginTop: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputText:{
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    color: '#000000',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
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
