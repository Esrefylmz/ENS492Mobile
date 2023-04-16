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

  useEffect(() => {
    loadMeasurementType()
      .then((data) => setMeasurementTypes(data))
      .catch((error) => console.log(error));
  }, []);

  //console.log("measurement types", measurementTypes);

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

  //console.log("SENSOR DATA", sensorData)

  
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };


  const renderLineChart = (data) => {
    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.length === 0 ? (
          <ActivityIndicator size="large" color="#000000" />
        ) : (
          <View>
            <LineChart
              data={{
                labels: data.map((item) => formatTimestamp(item.timestamp)),
                datasets: [
                  {
                    data: data.map((item) => item.measurementValue),
                    color: (opacity = 1) => `rgba(255, 125, 0, ${opacity})`,
                  },
                ],
              }}
              width={Dimensions.get('window').width + 250}
              height={300}
              chartConfig={{
                backgroundGradientFrom: "#F8F8F8",
                backgroundGradientFromOpacity: 0.5,
                backgroundGradientTo: "#F8F8F8",
                backgroundGradientToOpacity: 0.5,
                color: (opacity = 1) => `rgba(255, 25, 0, ${opacity})`,
                strokeWidth: 5,
                barPercentage: 0.5,
                useShadowColorFromDataset: true,
                decimalPlaces: 2,
                propsForBackgroundLines: {
                  strokeWidth: 0
                }
              }}     
            />
          </View>
        )}
      </ScrollView>
    );
  }

  const renderMultipleLineCharts = (dataMultiple, measurementTypesData) => {
    return measurementTypesData.map((measurementType) => {
      const { measurementTypeId, measurementType1 , unit } = measurementType;
      console.log("test", measurementType)
      console.log("measurementTypeId", measurementTypeId)
      console.log("measurementType1", measurementType1)
      const filteredData = dataMultiple.filter(data => data.measurementTypeId === measurementTypeId);
      return (
        <View key={measurementTypeId}>
          <Text style={styles.chartTitle}>{measurementType1} ({unit})</Text>
          <View>
            {renderLineChart(filteredData)}
          </View>
        </View>
      );
    });
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
      <ScrollView >
        {renderMultipleLineCharts(sensorData, measurementTypes )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  chartTitle:{
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#F09B28',
    padding: 10,
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
