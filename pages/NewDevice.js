import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Linking } from "react-native";
import { useNavigation } from '@react-navigation/native';

const LocationSelectionScreen = () => {

  const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Selection</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Building</Text>
        <TextInput style={styles.textInput} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Room</Text>
        <TextInput style={styles.textInput} />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Location</Text>
        <TextInput style={styles.textInput} />
      </View>
      <View style={styles.buttonWrapper}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.doneButton} onPress={() => Linking.openURL("http://192.168.4.1/")}>
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
      color: '#077187',
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#077187',
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#077187',
      borderRadius: 5,
      padding: 10,
      backgroundColor: 'white',
    },
    buttonWrapper: {
      flex: 1,
    },
    buttonContainer: {
      paddingVertical: 60,
      paddingHorizontal: 20,
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'flex-end',
    },    
    cancelButton: {
      backgroundColor: '#B91c17',
      padding: 10,
      borderRadius: 5,
      marginTop: 25,
    },
    doneButton: {
      backgroundColor: '#077187',
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
