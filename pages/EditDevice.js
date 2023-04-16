import React, { useState , useEffect } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import { Picker } from '@react-native-picker/picker';
import { getAllBuildingsByCompanyId, updateBuilding } from "../Backend/buildingServices";
import { getRoomsByBuildingId } from "../Backend/roomService";
import { updateSensor } from "../Backend/sensorServices";

const EditDevice = ({ route , navigation }) => {
  const { sensor , user_data } = route.params;
  console.log("edit device Sensor", sensor);
  const [buildingData, setBuildingData] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const [building, setBuilding] = useState(0);
  const [room, setRoom] = useState("");
  const [deviceLocation, setDeviceLocation] = useState("");
  
  useEffect(() => {
    const fetchBuildingData = async (sensor) => {
      if (sensor["companyId"]) { 
        const buildingData = await getAllBuildingsByCompanyId(sensor["companyId"]);
        setBuildingData(buildingData);    
      }
    };
    fetchBuildingData(sensor);
  }, [sensor]);

  console.log("selected building", building);

  useEffect(() => {
    if (building != null) {
      const fetchRoomData = async (building) => { // Remove `building` argument
        if (building) { 
          const roomData = await getRoomsByBuildingId(building);
          setRoomData(roomData);    
        }
      };
      fetchRoomData(building);
    }
  }, [building]);


  console.log("buildings of the company", buildingData);
  console.log("rooms of the selected building of the company", roomData);
  const handleSave = async () => {

    const requestBody = {
        SoftId: sensor["softId"],
        MacId: sensor["macId"],// Replace with the actual softId of the sensor you want to update
        CompanyId: sensor["companyId"],
        RoomId: room,
        LocationInfo: deviceLocation,
        BuildingId: building,
      };
    
    await updateSensor(requestBody).then(response => {
        console.log(response);
        if (response) {
          // Handle successful response
          console.log('Sensor updated successfully');
        } else {
          // Handle error response
          console.error('Failed to update sensor');
        }
      })
      .catch(error => {
        // Handle fetch error
        console.error('Failed to fetch:', error);
      }).then(() => { 
        navigation.navigate('Home', {user_data});
      });

    console.log("Device information saved:", {
      building,
      room,
      deviceLocation,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={building}
          onValueChange={(itemValue, itemIndex) => setBuilding(itemValue)}
        >
          <Picker.Item label="Select a building" value="" />
          {buildingData.map(building => (
            <Picker.Item key={building.buildingId} label={building.name} value={building.buildingId} />
          ))}
        </Picker>
      </View>
      {roomData != null && roomData.length > 0 && <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={room}
          onValueChange={(itemValue, itemIndex) => setRoom(itemValue)}
        >
          <Picker.Item label="Select a room" value="" />
          {roomData.map(room => (
            <Picker.Item key={room.buildingId} label={room.name} value={room.roomId} />
          ))}
        </Picker>
      </View>}
      <TextInput
        style={styles.input}
        placeholder="Device Location"
        value={deviceLocation}
        onChangeText={setDeviceLocation}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    paddingHorizontal: 8
  },
  pickerContainer: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
  },
});

export default EditDevice;
