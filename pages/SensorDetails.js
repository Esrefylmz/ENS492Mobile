import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { GetDataByMacId } from "../Backend/sensorServices";
import { LineChart } from 'react-native-chart-kit';
import { loadMeasurementType } from '../Backend/measurementTypeServices';

function BuildingDetails({ route }) {
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
    // Fetch data from backend service when component mounts
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

  // Check if sensorData has been populated, otherwise return null
  if (!sensorData.length) {
    return (
      <View>
        <Text>annen</Text>
      </View>
    );
  } else {
    const xValues = filteredData.map(data => data.timestamp);
    const yValues = filteredData.map(data => data.measurementValue);
    // Define chart data
    const chartData = {
      labels: xValues,
      datasets: [
        {
          data: yValues,
        },
      ],
      // Map measurement types data to chart config
      ...measurementTypes.reduce((acc, type) => {
        return {
          ...acc,
          [type.measurementKey]: {
            color: () => `rgba(${type.displayOrder * 30}, 113, 135, 1)`, // Use displayOrder property to dynamically generate color
            label: type.measurementType1, // Use measurementType1 property as label
            strokeWidth: 2, // Set desired strokeWidth
            withDots: false, // Set desired dots property
          },
        };
      }, {}),
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
        <View style={styles.chartContainer}>
          <LineChart
            data={chartData}
            width={Dimensions.get('window').width - 40} // Use window width with padding of 20 on each side
            height={220}
            chartConfig={chartConfig}
          />
        </View>
      </View>
    );
  }
}

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(7, 113, 135, ${opacity})`,
  style: {
    borderRadius: 16,
  },
  xAxis: {
    valueFormatter: (value, index) => {
      const timestamp = value[index];
      return moment(timestamp).format('HH:mm');
    },
    labelStyle: {
      color: 'rgba(7, 113, 135, 1)',
    },
    labelRotation: 10, // Set rotation for x-axis labels to -90 degrees
  },
};

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

export default BuildingDetails;
