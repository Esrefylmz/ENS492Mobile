import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { colors } from "../components/Colors";
import { loadMeasurementType } from '../Backend/measurementTypeServices';
import { Picker } from '@react-native-picker/picker';
export default function App() {
    const [measurementTypes, setMeasurementTypes] = useState([]);
    const [selectedMeasurement, setSelectedMeasurement] = useState(null);
  
    useEffect(() => {
      loadMeasurementType()
        .then((data) => {
          setMeasurementTypes(data);
          setSelectedMeasurement(data[0] || null);
        })
        .catch((error) => {
          console.error('Error fetching measurement types:', error);
        });
    }, []);
  
    const companyId = 4;
    const roomName = 'cinema-hall';
    const roomName2 = 'Cinema_Hall';
    const buildingName = 'UC';
    const buildingName2 = 'University%20Center';
    const macId = 'All';
    const fromTime = '1682975164351';
    const toTime = '1683061564351';
    const grafanaIframeUrl = selectedMeasurement
      ? `http://ads.sabanciuniv.edu:3000/d-solo/qF3y8LV7i/${roomName}?orgId=${companyId}&var-bucket=%22bme680_20210823%22&var-room=%22${roomName2}%22&var-buildingShort=%22${buildingName}%22&var-buildingLong=%22${buildingName2}%22&var-sensorID=${macId}&var-measurement=All&from=${fromTime}&to=${toTime}&panelId=${selectedMeasurement.measurementTypeId}`
      : '';
    const apiKey = 'eyJrIjoiOXNOMWpDTmUzVFBLSzVEN3lqUHo1dFd2cU1kbzZTRUEiLCJuIjoiQ29tcGFueVZpZXdlciIsImlkIjo0fQ==';
  
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={selectedMeasurement ? selectedMeasurement.measurementKey : null}
          onValueChange={(itemValue) => {
            const selected = measurementTypes.find(
              (measurementType) => measurementType.measurementKey === itemValue
            );
            setSelectedMeasurement(selected);
          }}
          style={styles.picker}
        >
          {measurementTypes.map((measurementType) => (
            <Picker.Item
              key={measurementType.measurementTypeId}
              label={measurementType.measurementType1}
              value={measurementType.measurementKey}
            />
          ))}
        </Picker>
        {selectedMeasurement && (
          <WebView
            source={{
              uri: grafanaIframeUrl,
              headers: {
                'Authorization': `Bearer ${apiKey}`,
              },
            }}
            style={styles.webView}
            scalesPageToFit={false}
          />
        )}
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: `${colors.border_bottom}`,
    },
    webView: {
      marginBottom: 100,
    },
    picker: {
      height: 50,
      width: '100%',
    },
  });