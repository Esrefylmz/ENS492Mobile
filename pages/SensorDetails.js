import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions , ActivityIndicator } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { GetDataByMacId } from "../Backend/sensorServices";
import { LineChart } from 'react-native-chart-kit';
import { loadMeasurementType } from '../Backend/measurementTypeServices';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Greenbutton from "../components/Greenbutton";
import Redbutton from "../components/Redbutton";

function SensorDetails({ route }) {
  const { sensor , room } = route.params;
  console.log('Sensor Details: ', sensor)
  console.log("room", room);
  const [sensorData, setSensorData] = useState([]);
  const [measurementTypes, setMeasurementTypes] = useState([]);
  const [selectedMeasurementType, setSelectedMeasurementType] = useState(null);


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
      .then((data) => {
        setMeasurementTypes(data);
        if (data.length > 0) {
          setSelectedMeasurementType(data[0]);
        }
      })
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
    const  chartConfig={
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
    } 

    return (
      <ScrollView horizontal showsHorizontalScrollIndicator={true}>
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
              height={400}
              chartConfig={chartConfig}     
            />
          </View>
        )}
      </ScrollView>
    );
  }

  const renderMultipleLineCharts = (dataMultiple, measurementTypesData) => {
    const selectedData = dataMultiple.filter(
      (data) => data.measurementTypeId === selectedMeasurementType?.measurementTypeId
    );
    return (
      <View style={styles.pickerContainer}>
        <Picker
          style={styles.picker}
          selectedValue={selectedMeasurementType}
          onValueChange={(itemValue, itemIndex) => setSelectedMeasurementType(itemValue)}
        >
          {measurementTypesData.map((measurementType) => (
            <Picker.Item
              key={measurementType.measurementTypeId}
              label={`${measurementType.measurementType1} (${measurementType.unit})`}
              value={measurementType}
            />
          ))}
        </Picker>
        <View>
          {renderLineChart(selectedData)}
        </View>
      </View>
    );
  };
  
  const onPressEdit = (sensor) => {
    console.log(`onPressEditpressed`);
    navigation3.navigate('Edit Device', { sensor });
  };
  return (
    <View style={styles.container}>
      <View style={styles.roomInfo}>
        <Text style={styles.title}>{room.name}</Text>
        <Text style={styles.detailsLabel}>Location : {sensor.locationInfo}</Text>
      </View>
      <ScrollView style={styles.scrollViewContainer}>
        {renderMultipleLineCharts(sensorData, measurementTypes)}
      </ScrollView>
      <View style={styles.buttons}>
      <Greenbutton
        title="Edit Device" // Pass the props as needed
        onPressFunction={() => onPressEdit(sensor)}
      />
      <Redbutton
        title="Remove Device"
        onPressFunction={() => {
          console.log("Button pressed");
        }}
      />
      </View>
    </View>
  );  
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: "row",
  },
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

export default SensorDetails;
