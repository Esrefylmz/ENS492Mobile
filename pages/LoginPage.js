import {useState} from "react";
import { View, StyleSheet, Image, Text, StatusBar, TouchableOpacity, TextInput} from "react-native";
import Snackbar from 'react-native-snackbar';
import Header from "../components/Header";
import { colors } from "../components/Colors";


function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goHome = () => {
    console.log('Email:', email, 'Password:', password);
    if (email === '' || password === '') {
      Snackbar.show({
        text: 'Please enter your authentication information first!',
        backgroundColor: `${colors.error_msg}`,
        duration: Snackbar.LENGTH_SHORT,
      });
    }
    else{
      fetch('http://uskumru.sabanciuniv.edu:5063/api/CompanyUserAuth/LoginCompanyUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          mail: email,
          password: password,
        })
      })
      .then(response => response.json())
      .then(user_data => {
        if (user_data && !user_data.errors) {
          if(user_data["userType"] == "pending"){
            Snackbar.show({
              text: 'Pending status. Your registration is not approved yet!',
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: `${colors.error_msg}`,
            });
          }
          else {
            console.log("data: ", user_data)
            Snackbar.show({
              text: 'You have successfully logged in!',
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: `${colors.success_msg}`,
            });
            navigation.navigate('Home', { user_data });
          }
        } else {
          console.log("data: ", user_data)
          Snackbar.show({
            text: 'Server does not response!',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: `${colors.error_msg}`,
          });
        }
      })
      .catch(error => {
        console.log('Error:', error);
        Snackbar.show({
          text: 'Wrong username or password!',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: `${colors.error_msg}`,
        });
      });
    }
  }

  const goRegister = () => {
    navigation.navigate('Register');
  }

  return (
    <>
      <StatusBar />
      <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
      <Image source={require('../assets/icons/nefex.png')} style={{ width: 180, height: 100 }}/>
      </View>
        <View style={styles.bodyContainer}>
          <TextInput style={styles.inputText} placeholder="Email" value={email} onChangeText={setEmail} />
          <TextInput style={styles.inputText} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={true} />
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
    backgroundColor: `${colors.background}`,
    alignItems: "stretch",
  },
  inputText:{
    backgroundColor: 'white',
    borderRadius: 10,
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderColor: "#25995c",
    borderWidth: 1,
  },
  bodyContainer: {
    height: 500,
    borderRadius: 15,
    margin: 10,
    flexDirection: "column",
    backgroundColor: "#F8F8F8",
    alignItems: "stretch",
  },
  headerContainer: {
    height: 100,
    borderRadius: 15,
    margin: 10,
    flexDirection: "column",
    backgroundColor: "#F8F8F8",
    alignItems: "center",
  },
  buttonPlace: {
    margin: 20,
    alignItems: 'center',
  },
  button: {
    backgroundColor: "#25995c",
    borderRadius: 50,
    padding: 20,
    marginTop: 10,
    marginVertical: 5,
    width: 350,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
