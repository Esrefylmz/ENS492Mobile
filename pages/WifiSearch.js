import React from 'react';
import { View, Text, Button, PermissionsAndroid } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission is required for WiFi connections',
        message:
          'This app needs location permission as this is required ' +
          'to scan for wifi networks.',
        buttonNegative: 'DENY',
        buttonPositive: 'ALLOW',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Location permission approved3');
      return true;
    } else {
      console.log('Location permission denied34');
      return false;
    }
  } catch (error) {
    console.log('Error requesting location permission345:', error);
    return false;
  }
}

function WifiSearch() {
  const [networks, setNetworks] = React.useState([]);

  const scanNetworks = async () => {
    const hasLocationPermission = await requestLocationPermission();
    if (hasLocationPermission) {
      try {
        const data = await WifiManager.loadWifiList();
        setNetworks(data);
      } catch (error) {
        console.log('Error scanning networks:', error);
      }
    }
  };

  return (
    <View>
      <Text>Available networks:</Text>
      {networks.map((network, index) => (
        <Text key={index}>{network.SSID}</Text>
      ))}
      <Button title="Scan networks" onPress={scanNetworks} />
    </View>
  );
}

export default WifiSearch;
