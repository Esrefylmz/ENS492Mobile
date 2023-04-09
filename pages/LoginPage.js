import {useState} from "react";
import { View, StyleSheet, Text, StatusBar, TouchableOpacity, TextInput, Alert} from "react-native";
import Header from "../components/Header";

function LoginPage({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goHome = () => {
    // Here you can send the company, email, and password to the backend
    console.log('Email:', email, 'Password:', password);
    
    fetch('http://10.0.2.2:5063/api/CompanyUserAuth/LoginCompanyUser', {
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
    .then(data => {
      if (data && !data.errors) {
        console.log("data: ", data )
        Alert.alert(
          'Login successful',
          'You have successfully logged in!',
          [
            {
              text: 'OK',
              onPress: () => navigation.navigate('Home', {data}),
              style: 'default',
            },
          ],
          { cancelable: false }
        );
      } else {
        console.log("data: ",data)
        Alert.alert('Login failed', 'Unable to Login. Please try again.');
      }
    })
    .catch(error => {
      console.log('Error:', error);
      Alert.alert('Login failed', 'ERROR HAPPENED.');
    });
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
    backgroundColor: 'white',
    alignItems: "stretch",
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
    marginTop: 10,
    marginVertical: 5,
    width: 350,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
