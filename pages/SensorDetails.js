import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions , TouchableOpacity , ActivityIndicator } from 'react-native';
import { GetDataByMacId } from "../Backend/sensorServices";
import { LineChart } from 'react-native-chart-kit';
import { loadMeasurementType } from '../Backend/measurementTypeServices';
import { ScrollView } from 'react-native-gesture-handler';


function SensorDetails({ route }) {
  const { sensor } = route.params;
  console.log('Sensor Details: ', sensor)
  const [sensorData, setSensorData] = useState([]);

  const [measurementTypes, setMeasurementTypes] = useState([]);

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

  
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{sensor.softId}</Text>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsLabel}>Location : {sensor.locationInfo}</Text>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.detailsLabel}>MACID : {sensor.macId}</Text>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {filteredData.length === 0 ? (
        <ActivityIndicator size="large" color="#000000" />
      ) : (
        <View>
          
          <LineChart
            data={{
              labels: filteredData.map((item) => formatTimestamp(item.timestamp)), // Use formatTimestamp to format timestamps
              datasets: [
                {
                  data: filteredData.map((item) => item.measurementValue),
                  color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                },
              ],
            }}
            width={Dimensions.get('window').width + 250} // Increase width to allow for horizontal scrolling
            height={220}
            chartConfig={{
              backgroundGradientFrom: 'white',
              backgroundGradientTo: 'white',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            onDataPointClick={({ value }) => {
              }
            }
          />
        </View>
      )}
    </ScrollView>
    </View>);
}

const styles = StyleSheet.create({
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

export default SensorDetails;
