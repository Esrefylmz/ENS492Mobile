import { View, StyleSheet, ScrollView, StatusBar, TextInput, Text, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import Snackbar from 'react-native-snackbar';
import Header from "../components/Header";
import { colors } from "../components/Colors";
import SignupInformation from "../components/SignupInformation";
import { getCompanyByDomain } from "../Backend/companyServices";

function RegisterPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [companies, setCompanies] = useState([]);

  const goLoginSimple = () => {
    navigation.navigate('Login');
  }

  const goLogin = async () => {
    // Extract the company name from the email input
    const company = email.split('@')[1];

    if (!email || !password || !confirmPassword) {
      Snackbar.show({
        text: 'Please fill in all fields',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: `${colors.error_msg}`,
      });
      return;
    }

    if (password !== confirmPassword) {
      Snackbar.show({
        text: 'Passwords do not match',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: `${colors.error_msg}`,
      });
      return;
    }

    // Here you can send the company, email, and password to the backend
    console.log('Company:', company, 'Email:', email, 'Password:', password);
    await getCompanyByDomain(company).then((companies) => {
      setCompanies(companies);
      console.log('Companies', companies);
      console.log('COMPANYID', companies["companyId"]); // Access the first company's companyId

      fetch('http://uskumru.sabanciuniv.edu:5063/api/CompanyUserAuth/RegisterCompanyUser', {
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
          Snackbar.show({
            text: 'Registration successful',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: `${colors.success_msg}`,
          });
          navigation.navigate('Login', { company })
        }
         else {
          console.log("data: ",data)
          Snackbar.show({
            text: 'Registration failed. Unable to register.',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: `${colors.error_msg}`,
          });
        }
      })
      .catch(error => {
        console.log('Error:', error);
        Snackbar.show({
          text: 'Registration failed. Error occurred',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: `${colors.error_msg}`,
        });
      });
    }).catch((error) => {
      console.log("api call error", error);
      Snackbar.show({
        text: 'Registration failed. Error occurred',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: `${colors.error_msg}`,
      });
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
            <TextInput 
              style={styles.inputText} 
              placeholder={"Full Name"} 
              value={name} 
              onChangeText={setName} 
            />
            <TextInput 
              style={styles.inputText} 
              placeholder={"Company E-mail"} 
              value={email} 
              onChangeText={setEmail} 
            />
            <TextInput 
              style={styles.inputText} 
              placeholder={"Password"} 
              value={password} 
              onChangeText={setPassword} 
              secureTextEntry={true} 
            />
            <TextInput 
              style={styles.inputText} 
              placeholder={"Confirm password"} 
              value={confirmPassword}  
              onChangeText={setConfirmPassword} 
              secureTextEntry={true} 
            />
            <TouchableOpacity style={styles.button} onPress={goLogin}>
              <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={goLoginSimple}>
              <Text style={styles.accountText}>Do you already have an account?</Text> 
            </TouchableOpacity>
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
    backgroundColor: `${colors.background}`,
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
    color: `${colors.primary}`,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputText:{
    backgroundColor: 'white',
    borderRadius: 10,
    color: `${colors.primary}`,
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
    backgroundColor: `${colors.primary}`,
    justifyContent: "center",
    alignItems: "stretch",
  },
  accountText: {
    textAlign: 'center',
    borderRadius: 10,
    color: 'white',
    fontSize: 16,
    marginVertical: 20,
  }
});
