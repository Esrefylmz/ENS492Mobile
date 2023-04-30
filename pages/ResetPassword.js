import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { colors } from "../components/Colors";

const LocationSelectionScreen = () => {

  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Current Password</Text>
        <TextInput style={styles.textInput} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>New Password</Text>
        <TextInput style={styles.textInput} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirm Password</Text>
        <TextInput style={styles.textInput} />
      </View>
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.doneButton}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate("Home")}>
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
      position: 'absolute',
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
  
export default LocationSelectionScreen;
