import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions , TouchableOpacity , ActivityIndicator } from 'react-native';
import { GetDataByMacId } from "../Backend/sensorServices";
import { LineChart } from 'react-native-chart-kit';
import { loadMeasurementType } from '../Backend/measurementTypeServices';


function BuildingDetails({ route }) {
  const { sensor } = route.params;
  console.log('Sensor Details: ', sensor)
  const [sensorData, setSensorData] = useState([]);

  const [measurementTypes, setMeasurementTypes] = useState([]);

  

  const handleDataPointClick = (dataPoint) => {
    setSelectedValue(dataPoint);
  };
  const filterDataByMeasurementTypeId = (data, measurementTypeId) => {
    return data.filter(item => item.measurementTypeId === measurementTypeId);
  };
  const filteredData = filterDataByMeasurementTypeId(sensorData, 2);
  console.log("filtered data 7: ", filteredData);
  useEffect(() => {
    loadMeasurementType()
      .then((data) => setMeasurementTypes(data))
      .catch((error) => console.log(error));
  }, []);

  console.log("measurement types", measurementTypes);

  useEffect(() => {
    const fetchSensorData = async (sensor) => {
      console.log("HERE")
      console.log(sensor)
      console.log("MOM: ",sensor["macId"])
      if (sensor["macId"][2] === ":") { 
        const sensorData = await GetDataByMacId(sensor["macId"]);
        setSensorData(sensorData)        
      }
    };
    fetchSensorData(sensor);
  }, [sensor]);

  console.log("SENSOR DATA", sensorData)

  const [selectedValue, setSelectedValue] = useState(null);
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };

  const lastFilteredData = filteredData.filter((item, index) => {
    const currentDate = new Date();
    const itemDate = new Date(item.timestamp);
    return index % Math.ceil(filteredData.length / 10) === 0 || itemDate > currentDate;
  });
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{sensor.softId}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsLabel}>Location : {sensor.locationInfo}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsLabel}>MACID : {sensor.macId}</Text>
        </View>
        {lastFilteredData.length === 0 
        ? (
        <ActivityIndicator size="large" color="#000000" />) 
        : (
        <LineChart
          data={{
            labels: lastFilteredData.map((item) => formatTimestamp(item.timestamp)), // Format timestamp labels
            datasets: [
              {
                data: lastFilteredData.map((item) => item.measurementValue),
                color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
              },
            ],
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
          }}
          onDataPointClick={({ value, getColor }) => {
            handleDataPointClick(value);
          }}
        />
      )}
      {selectedValue && (
        <TouchableOpacity
          onPress={() => setSelectedValue(null)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        >
          <Text style={{ color: '#ffffff', fontSize: 24 }}>
            {selectedValue.toFixed(2)}
          </Text>
        </TouchableOpacity>
      )}
    </View>);
}

const styles = StyleSheet.create({
  dropdownContainer: {
    position: 'relative',
  },
  dropdownMenu: {
    backgroundColor: '#fff', // Set desired background color
    borderWidth: 1, // Set desired border width
    borderColor: '#ccc', // Set desired border color
    borderRadius: 4, // Set desired border radius
    padding: 8, // Set desired padding
    maxHeight: 200, // Set desired max height for dropdown menu
    overflowY: 'auto', // Add scrollbar for long dropdown menus
  },
  dropdownItem: {
    padding: 8, // Set desired padding for dropdown items
    cursor: 'pointer', // Add pointer cursor for clickable items
  },
  dropdownItemSelected: {
    backgroundColor: '#f0f0f0', // Set desired background color for selected item
  },
  dropdownItemText: {
    // Add additional styles for dropdown item text as needed
  },
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    color: '#077187',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    borderBottomColor: "#077187",
    borderBottomWidth: 1,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  detailsLabel: {
    fontSize: 20,
  },
  chartContainer: {
    marginTop: 20,
  },
});

export default BuildingDetails;
