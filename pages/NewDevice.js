import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';

const LocationSelectionScreen = () => {
  const [selectedBuilding, setSelectedBuilding] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');
  const [buildingDropdownOpen, setBuildingDropdownOpen] = useState(false);
  const [roomDropdownOpen, setRoomDropdownOpen] = useState(false);

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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.doneButton}>
          <Text style={styles.buttonText}>Done</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.goBack()}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
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
      color: '#495579',
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#495579',
    },
    textInput: {
      borderWidth: 1,
      borderColor: '#495579',
      borderRadius: 5,
      padding: 10,
      backgroundColor: 'white',
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
      backgroundColor: 'red',
      padding: 10,
      borderRadius: 5,
      marginTop: 25,
    },
    doneButton: {
      backgroundColor: '#495579',
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
