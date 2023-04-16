import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions , TouchableOpacity , ActivityIndicator } from 'react-native';
import { GetDataByMacId } from "../Backend/sensorServices";
import { LineChart } from 'react-native-chart-kit';
import { loadMeasurementType } from '../Backend/measurementTypeServices';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function SensorDetails({ route }) {
  const { sensor , room } = route.params;
  console.log('Sensor Details: ', sensor)
  console.log("room", room);
  const [sensorData, setSensorData] = useState([]);
  const [measurementTypes, setMeasurementTypes] = useState([]);

  const navigation3 = useNavigation();
  React.useLayoutEffect(() => {
    navigation3.setOptions({
      title: `Sensor Detail`,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: '#077187',
      },
    });
  }, [navigation3]);

  useEffect(() => {
    loadMeasurementType()
      .then((data) => setMeasurementTypes(data))
      .catch((error) => console.log(error));
  }, []);

  //console.log("measurement types", measurementTypes);

  useEffect(() => {
    const fetchSensorData = async (sensor) => {
      //console.log("HERE")
      //console.log(sensor)
      //console.log("MOM: ",sensor["macId"])
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
                    color: (opacity = 1) => '#F09B28',
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
                color: (opacity = 1) => '#077187',
                strokeWidth: 5,
                useShadowColorFromDataset: true,
                decimalPlaces: data.some((item) => Math.abs(item.measurementValue) >= 100000) ? 0 : 2,
                propsForBackgroundLines: {
                  strokeWidth: 0
                },
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
      //console.log("test", measurementType)
      //console.log("measurementTypeId", measurementTypeId)
      //console.log("measurementType1", measurementType1)
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
      <View style={styles.roomInfo}>
        <Text style={styles.title}>{room.name}</Text>
        <Text style={styles.detailsLabel}>Location : {sensor.locationInfo}</Text>
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        {renderMultipleLineCharts(sensorData, measurementTypes )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    padding: 10,
  },
  roomInfo: {
    backgroundColor: '#077187',
    marginBottom: 10,
    width: '100%',
  },
  container: {
    alignItems: 'center',
    paddingBottom: 80,
  },
  chartTitle:{
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#F09B28',
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomColor: "#077187",
    borderBottomWidth: 1,
    paddingTop: 4,
  },
  detailsLabel: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomColor: "#077187",
    paddingBottom: 8,
  },
  chartContainer: {
    marginTop: 20,
  },
});

export default SensorDetails;
