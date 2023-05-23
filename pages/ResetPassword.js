import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { colors } from "../components/Colors";
import { resetPassword } from "../Backend/userServices";
import Snackbar from 'react-native-snackbar';

const ResetPasswordScreen = ({ route }) => {
  const { user_data } = route.params;
  console.log("user data reset password page: ", user_data)
  const navigation = useNavigation();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleResetPassword = () => {

    if(currentPassword == '' || newPassword == '' || confirmPassword == ''){
      Snackbar.show({
        text: 'Please fill all of the fields!',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: `${colors.error_msg}`,
      });
    }else{
      if(currentPassword !=  user_data["password"]){
        Snackbar.show({
          text: 'Current password is not correct!',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor: `${colors.error_msg}`,
        });
      }else{
        if(newPassword !=  confirmPassword){
          Snackbar.show({
            text: 'Passwords does not match! (new password and confirm password)',
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: `${colors.error_msg}`,
          });
        }else{
          if(currentPassword == newPassword){
            Snackbar.show({
              text: 'Bad Request!',
              duration: Snackbar.LENGTH_SHORT,
              backgroundColor: `${colors.error_msg}`,
            });
          }else{
            const user = {
              userId: user_data["userId"], // Add the necessary user ID
              usermail: user_data["usermail"], // Add the necessary user email
              password: newPassword,
              userType: user_data["userType"], // Add the necessary user type
              username: user_data["username"], // Add the necessary username
              CompanyId: user_data["companyId"], // Add the necessary company ID
            };
  
            resetPassword(user)
            .then((response) => {
              console.log(response);
              if(response){
                Snackbar.show({
                  text: 'Password is updated succesfully!',
                  duration: Snackbar.LENGTH_SHORT,
                  backgroundColor: `${colors.success_msg}`,
                });
                navigation.navigate('Login');
              }else{
                Snackbar.show({
                  text: 'Error: Something went wrong!',
                  duration: Snackbar.LENGTH_SHORT,
                  backgroundColor: `${colors.error_msg}`,
                });
              }
              
            })
            .catch((error) => {
              console.log("Reset password error:", error);
            });
          }
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Current Password</Text>
        <TextInput
          style={styles.textInput}
          value={currentPassword}
          onChangeText={setCurrentPassword}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Password</Text>
        <TextInput
          style={styles.textInput}
          value={newPassword}
          onChangeText={setNewPassword}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.textInput}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.doneButton} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.navigate("Home", {user_data})}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 20,
      paddingVertical: 40,
    },
    title: {
      fontSize: 40,
      fontWeight: 'bold',
      marginBottom: 20,
      color: `${colors.primary}`,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: `${colors.primary}`,
    },
    textInput: {
      borderWidth: 1,
      borderColor: `${colors.primary}`,
      borderRadius: 5,
      padding: 10,
      backgroundColor: 'white',
    },
    buttonWrapper: {
      flex: 1,
    },
    buttonContainer: {   
      bottom: 10,
      left: 0,
      right: 0,
      paddingVertical: 60,
      paddingHorizontal: 20,
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'flex-end',
    },    
    cancelButton: {
      backgroundColor: `${colors.cancel_button}`,
      padding: 10,
      borderRadius: 5,
      marginTop: 25,
    },
    doneButton: {
      backgroundColor: `${colors.primary}`,
      padding: 10,
      borderRadius: 5,
    },
    buttonText: {
      fontSize: 24,
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
  
export default ResetPasswordScreen;
