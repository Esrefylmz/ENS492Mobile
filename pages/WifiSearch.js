import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, PermissionsAndroid, StyleSheet, ScrollView } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import Snackbar from 'react-native-snackbar';
import { colors } from "../components/Colors";

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
  const [IPAdress, setIPAdress] = useState(null);

  useEffect(() => {
    WifiManager.getCurrentWifiSSID()
      .then(ssid => setCurrentWifi(ssid))
      .catch(error => console.log('Error getting current wifi:', error));
  }, []);

  useEffect(() => {
    WifiManager.getIP()
      .then(IP => setIPAdress(IP))
      .catch(error => console.log('Error getting IP Adress:', error));

  }, []);

  const scanNetworks = async () => {
    const hasLocationPermission = await requestLocationPermission();
    if (hasLocationPermission) {
      try {
        const data = await WifiManager.loadWifiList()
        //const espNetworks = data.filter(network => network.SSID.includes('NEFEX'));
        setNetworks(data);
      } catch (error) {
        console.log('Error scanning networks:', error);
        Snackbar.show({
          
          text: error.toString(),
  
        });
      }
    }
  };

  async function sendWifiCredentials() {
    // Assuming ESP8266 is set up as a server and accepts POST requests at /setup
    const url = 'http://192.168.4.1/';
  
    // Your parameters
    const data = {
      ssid: "SU-IoT",
      password: "",
      brokerIP: "uskumru.sabanciuniv.edu"
    };
  
    // Options for the fetch function
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
  
    try {
      const response = await fetch(url, options);
      const json = await response.json();
  
      // Do something with the response
      console.log(json);
      Snackbar.show({
          
        text: json.toString(),

      });
    } catch (error) {
      Snackbar.show({
          
        text: error.toString(),

      });
    }
  }
  
  

  async function connectToWifi(ssid) {
    try {
      
      const isConnected = await WifiManager.connectToProtectedSSID(ssid, '', false);
      
      console.log('Connected to network:', ssid);
      await sendWifiCredentials();
      navigation.navigate('New Device');
      console.log('Going to New Device page');
  
    } catch (error) {
      console.log('Error connecting to network:', ssid, error);
      Snackbar.show({
          
        text: error.toString(),

      });
    }
  }
  // TO DO: Do not display other wifis around
  return (
    <>
      {currentWifi ? (
        <View style={homePageStyles.currentWifiContainer}>
          <Text style={homePageStyles.currentWifiText}>Currently connected: {currentWifi}</Text>
          <Text style={homePageStyles.currentWifiText}>IP Adress: {IPAdress}</Text>
        </View>
      ) : (
        <View style={homePageStyles.currentWifiContainer}>
          <Text style={homePageStyles.currentWifiText}>Not connected to any WiFi networks</Text>
        </View>
      )}
      
      <View style={homePageStyles.bodyContainer}>
        <Text style={homePageStyles.bodyText}>Available networks</Text>
        <ScrollView>
        {networks.map((network, index) => (
          <View style={homePageStyles.networkContainer} key={index}>
            <Text style={homePageStyles.wifiText}>  {network.SSID.length > 15 ? `${network.SSID.slice(0, 15)}...` : network.SSID}</Text>
            <TouchableOpacity style={homePageStyles.connectButton} onPress={() => connectToWifi(network.SSID)}>
              <Text style={homePageStyles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          </View>
        ))}
          </ScrollView>
      </View>

      <View >
        <Text style={homePageStyles.bodyText}>Denemee234</Text>
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
    backgroundColor: `${colors.primary}`,
    padding: 10,
  },
  currentWifiText: {
    color: 'white',
    fontSize: 16,
  },
  bodyContainer: {
    flex: 4,
    flexDirection: "column",
    backgroundColor: "white",
  },
  bodyText: { 
    fontSize: 40,
    lineHeight: 45,
    fontWeight: "bold",
    letterSpacing: 0.3,
    color: `${colors.primary}`,
    marginTop: 10,
  },
  wifiText: {
    fontSize: 20,
    lineHeight: 30,
    color: `${colors.primary}`,
    marginLeft: 10,
    maxWidth: 200,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  networkContainer:{
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: `${colors.border_bottom}`,
    paddingVertical: 10,
    maxHeight: 60,
    minHeight: 60,
  },
  connectButton: {
    backgroundColor: `${colors.primary}`,
    borderRadius: 10,
    padding: 8,
    width: 70,
    marginRight: 10
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
    backgroundColor: `${colors.primary}`,
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