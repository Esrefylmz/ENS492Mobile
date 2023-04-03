import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, PermissionsAndroid, StyleSheet } from 'react-native';
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
      console.log('Location permission approved');
      return true;
    } else {
      console.log('Location permission denied');
      return false;
    }
  } catch (error) {
    console.log('Error requesting location permission:', error);
    return false;
  }
}

function WifiSearch({navigation}) {
  const [networks, setNetworks] = useState([]);
  const [currentWifi, setCurrentWifi] = useState(null);

  useEffect(() => {
    WifiManager.getCurrentWifiSSID()
      .then(ssid => setCurrentWifi(ssid))
      .catch(error => console.log('Error getting current wifi:', error));
  }, []);

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

  async function connectToWifi(ssid) {
    try {
      const isConnected = await WifiManager.connectToProtectedSSID(ssid, '', false);
      console.log('Connected to network:', ssid);
      navigation.navigate('New Device');
      console.log('Going to New Device page');
  
    } catch (error) {
      console.log('Error connecting to network:', ssid, error);
    }
  }
  // TO DO: Do not display other wifis around
  return (
    <>
      {currentWifi ? (
        <View style={homePageStyles.currentWifiContainer}>
          <Text style={homePageStyles.currentWifiText}>Currently connected: {currentWifi}</Text>
        </View>
      ) : (
        <View style={homePageStyles.currentWifiContainer}>
          <Text style={homePageStyles.currentWifiText}>Not connected to any WiFi networks</Text>
        </View>
      )}
      <View style={homePageStyles.bodyContainer}>
        <Text style={homePageStyles.bodyText}>Available networks</Text>
        {networks.map((network, index) => (
          <View style={homePageStyles.networkContainer} key={index}>
            <Text style={homePageStyles.wifiText}>   {network.SSID}</Text>
            <TouchableOpacity style={homePageStyles.connectButton} onPress={() => connectToWifi(network.SSID)}>
              <Text style={homePageStyles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={homePageStyles.buttonContainer}>
        <TouchableOpacity style={homePageStyles.button} onPress={scanNetworks}>
          <Text style={homePageStyles.buttonText}>Scan Networks</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default WifiSearch;

const homePageStyles = StyleSheet.create({
  currentWifiContainer: {
    backgroundColor: '#495579',
    padding: 10,
  },
  currentWifiText: {
    color: 'white',
    fontSize: 16,
  },
  bodyContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
  },
  bodyText: { 
    fontSize: 40,
    lineHeight: 45,
    fontWeight: "bold",
    letterSpacing: 0.3,
    color: "#495579",
    marginTop: 10,
  },
  wifiText: { 
    fontSize: 20,
    lineHeight: 45,
    color: "#495579",
    marginLeft: 10,
  },
  networkContainer:{
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  connectButton: {
    backgroundColor: '#495579',
    borderRadius: 10,
    padding: 8,
    width: 70,
    marginBottom: 242,
    marginTop: 6,
  },
  connectButtonText:{
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  button: {
    backgroundColor: '#495579',
    borderRadius: 50,
    padding: 20,
    marginVertical: 10,
    width: 350,
    marginBottom: 50,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});