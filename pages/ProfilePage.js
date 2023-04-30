import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from "../components/Colors";

const ProfileScreen = ({navigation, route}) => {
  const { user_data } = route.params;
  const handleResetPassword = () => {
    // TODO: implement reset password functionality
  };

  const goLogin = () => {
    console.log('Logout button pressed');
    navigation.navigate('Login');
  }


  return (
    <View style={styles.container}>
        <Text style={styles.titleText}>{user_data["username"]}</Text>
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText} onPress={() => navigation.navigate("Reset Password")}>Reset Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={goLogin}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginTop: 40, // Add margin top here
    },
    button: {
      backgroundColor: `${colors.primary}`,
      borderRadius: 50,
      padding: 20,
      marginVertical: 10,
      width: 300,
      alignItems: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    titleText: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom:50,
    }
  });
  
  export default ProfileScreen;