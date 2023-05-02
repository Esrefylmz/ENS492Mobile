import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions , ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { GetDataByMacId, deleteSensor } from "../Backend/sensorServices";
import { LineChart } from 'react-native-chart-kit';
import { loadMeasurementType } from '../Backend/measurementTypeServices';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Greenbutton from "../components/Greenbutton";
import Redbutton from "../components/Redbutton";
import { Alert } from 'react-native';
import Snackbar from 'react-native-snackbar';
import { colors } from "../components/Colors";

function SensorDetails({ route, navigation }) {
  const { sensor , room, user_data } = route.params;
  console.log('Sensor Details: ', sensor)
  console.log("room", room);
  const [sensorData, setSensorData] = useState([]);
  const [measurementTypes, setMeasurementTypes] = useState([]);
  const [selectedMeasurementType, setSelectedMeasurementType] = useState(null);

  const goRoomGraph = () => {
    console.log("Device icon pressed");
    navigation.navigate("Room Graph");
  };

  const navigation3 = useNavigation();
  React.useLayoutEffect(() => {
    navigation3.setOptions({
      title: `Sensor Detail`,
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: `${colors.primary}`,
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
      if (sensor["macId"][2] === ":") { 
        const sensorData = await GetDataByMacId(sensor["macId"]);
        setSensorData(sensorData)        
      }
    };
    fetchSensorData(sensor);
  }, [sensor]);
  
  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes}`;
  };

  const [selectedDataPoint, setSelectedDataPoint] = useState(null);

  const handleDataPointClick = (data) => {
    // Update the state with the clicked data point
    setSelectedDataPoint(data);
    console.log("data", data);
  };
  const renderLineChart = (data) => {
    const  chartConfig={
      backgroundGradientFrom: `${colors.background}`,
      backgroundGradientFromOpacity: 0.5,
      backgroundGradientTo: `${colors.background}`,
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `${colors.primary}`,
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
        <ActivityIndicator size="large" color="black" />
      ) : (
        <View>
          <LineChart
            data={{
              labels: data.map((item) => formatTimestamp(item.timestamp)),
              datasets: [
                {
                  data: data.map((item) => item.measurementValue),
                  color: (opacity = 1) => `${colors.chart_title}`,
                },
              ],
            }}
            width={Dimensions.get('window').width + 250}
            height={400}
            chartConfig={chartConfig}
            onDataPointClick={handleDataPointClick} // Add onDataPointClick event handler
          />
          {selectedDataPoint && ( // Render the small box with info if a data point is selected
            <View
              style={{
                position: 'absolute',
                top: selectedDataPoint.y, // Position the box based on the selected data point
                left: selectedDataPoint.x, // Position the box based on the selected data point
                backgroundColor: 'white',
                padding: 10,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: `${colors.primary}`,
              }}
            >
              <Text style={{
                fontWeight: "bold",
                color: `${colors.primary}`,
              }}>{`${selectedDataPoint.value}`}</Text>
            </View>
          )}
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
      <View style={styles.pickerContainer} >
        <Picker
          onBlur={handleScreenTouch}
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
    navigation3.navigate('Edit Device', { sensor, user_data , room});
  };
  const onPressRemove = async (sensor) => {
    // Show confirmation alert
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this sensor?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            try {
              // Call deleteSensor function
              const response = await deleteSensor(sensor["softId"]);
              console.log(response);
              
              if (response) {
                Snackbar.show({
                  text: 'Sensor deleted successfully!',
                  backgroundColor: `${colors.success_msg}`,
                  duration: Snackbar.LENGTH_SHORT,
                });
              } else {
                Snackbar.show({
                  text: 'Failed to delete sensor!',
                  backgroundColor: `${colors.error_msg}`,
                  duration: Snackbar.LENGTH_SHORT,
                });
              }
              
            } catch (error) {
              Snackbar.show({
                text: 'Failed: ' + error.toString(),
                backgroundColor: `${colors.error_msg}`,
                duration: Snackbar.LENGTH_SHORT,
              });
            } finally {
              // Navigate to Home screen after deletion
              navigation.navigate('Home', { user_data });
            }
          },
        },
        {
          text: 'No',
          onPress: () => {
            Snackbar.show({
              text: 'Sensor deletion is cancelled!',
              backgroundColor: `${colors.error_msg}`,
              duration: Snackbar.LENGTH_SHORT,
            });
          },
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  };

  /*const onPressRemove = async (sensor) => {
    await deleteSensor(sensor["softId"]).then(response => {
      console.log(response);
      if (response) {
        // Handle successful response
        console.log('Sensor deleted successfully');
      } else {
        // Handle error response
        console.error('Failed to delete sensor');
      }
    })
    .catch(error => {
      // Handle fetch error
      console.error('Failed to fetch:', error);
    }).then(() => { 
      navigation.navigate('Home', {user_data});
    });
    
  };*/
  const openInfo = () => {
    console.log("open info is pressed");
  }
  const handleScreenTouch = () => {
    setSelectedDataPoint(null);
  };
  return (
    <View style={styles.container} >
      <View style={styles.roomInfo} onTouchEnd={handleScreenTouch}>
        <View style={styles.rowContainer}>
          <Text style={styles.title}>{room.name}</Text>
          <Text style={styles.detailsLabel}>Location : {sensor.locationInfo}</Text>
        </View>
        <TouchableOpacity onPress={openInfo}>
          <Image
            style={styles.icon}
            source={require("../assets/icons/info2.png")}
          />
        </TouchableOpacity>
  </View>
      <ScrollView style={styles.scrollViewContainer} >
        {renderMultipleLineCharts(sensorData, measurementTypes)}
      </ScrollView>
      {user_data.userType === 'admin' && <View style={styles.buttons} onTouchEnd={handleScreenTouch}>
        <Greenbutton
          title="Edit Device" // Pass the props as needed
          onPressFunction={() => onPressEdit(sensor)}
        />
        <Redbutton
          title="Remove Device"
          onPressFunction={() => onPressRemove(sensor)}
        />
      </View>}
      <TouchableOpacity onPress={goRoomGraph}>
          <Image
            style={styles.icon}
            source={require("../assets/icons/info2.png")}
          />
        </TouchableOpacity>
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
    backgroundColor: `${colors.primary}`,
    marginBottom: 10,
    width: '100%',
    flexDirection: 'row', // Set flex direction to row
    justifyContent: 'space-between', // Align children to start and end of the view
    alignItems: 'center',
  },
  rowContainer: {
    flex: 1, // Allow the container to take up remaining space
  },
  container: {
    alignItems: 'center',
    paddingBottom: 80,
  },
  chartTitle:{
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: `${colors.chart_title}`,
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 5,
  },
  detailsLabel: {
    fontSize: 14,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomColor: `${colors.primary}`,
    paddingBottom: 8,
  },
  chartContainer: {
    marginTop: 20,
  },
  pickerContainer: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: 'white',
  },
  icon: {
    width: 30,
    height: 30,
    marginLeft: 5,
    marginRight: 15,
  },
});

export default SensorDetails;
