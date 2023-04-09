import { View, StyleSheet, ScrollView, StatusBar, TextInput, Text, TouchableOpacity, Alert} from "react-native";
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

  const goLogin = async () => {
    // Extract the company name from the email input
    const company = email.split('@')[1];
  
    // Here you can send the company, email, and password to the backend
    console.log('Company:', company, 'Email:', email, 'Password:', password);
    await getCompanyByDomain(company).then((companies) => {
      setCompanies(companies);
      console.log('Companies', companies);
      console.log('COMPANYID', companies["companyId"]); // Access the first company's companyId
      
      
      fetch('http://10.0.2.2:5063/api/CompanyUserAuth/RegisterCompanyUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          companyId: companies["companyId"], // Pass the companyId to the request body
          usermail: email,
          password: password,
          userType: "pending",
          username: name,
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data) {
          Alert.alert(
            'Registration successful',
            'You have successfully registered!',
            [
              {
                text: 'OK',
                onPress: () => navigation.navigate('Login', { company }),
                style: 'default',
              },
            ],
            { cancelable: false }
          );
        }
         else {
          
          console.log("data: ",data)
          Alert.alert('Registration failed', 'Unable to register. Please try again.');
        }
      })
      .catch(error => {
        console.log('Error:', error);
        Alert.alert('Registration failed', 'ERROR HAPPENED.');
      });
    }).catch((error) => {
      console.log("api call error", error);
      Alert.alert('Registration failed', 'Api call error.');
    });
  }

  console.log("Email:", email, 'Password:', password);

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
