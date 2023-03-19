import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const ProfileScreen = ({navigation}) => {
  const handleResetPassword = () => {
    // TODO: implement reset password functionality
  };

  const goLogin = () => {
    console.log('Logout button pressed');
    navigation.navigate('Login');
  }

  return (
    <View style={styles.container}>
        <Text style={styles.titleText}>YOUR ACCOUNT</Text>
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
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
      backgroundColor: '#495579',
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