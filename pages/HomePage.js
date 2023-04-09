import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getCompanySensorsById } from "../Backend/sensorServices";

function HomePage({ navigation, route }) {
  const { user_data } = route.params;
  console.log("data homepage: ", user_data)
  const goNewDevice = () => {
    console.log("Configure a new device button pressed");
    navigation.navigate("WifiSearch");
  };

  const goProfile = () => {
    console.log("Profile icon pressed");
    navigation.navigate("Profile", {user_data});
  };

  const goLogin = () => {
    console.log("Logout icon pressed");
    navigation.navigate("Login");
  };

  const [searchText, setSearchText] = useState("");
  const [filteredSensors, setFilteredSensors] = useState([]);
  const [sensors, setSensors] = useState([]);

  useEffect(() => {
    const fetchSensors = async (user_data) => {
      console.log("HERE")
      console.log(user_data)
      if (user_data["companyId"]) { // Check if data and companyId are defined
        const sensors = await getCompanySensorsById(user_data["companyId"]);
        console.log("sensors", sensors);
        setSensors(sensors);
        setFilteredSensors(sensors);
      }
    };
    fetchSensors(user_data);
  }, [user_data]);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = sensors.filter((sensor) => {
      const searchStr = `${sensor.buildingName} - ${sensor.roomName}`.toLowerCase();
      return searchStr.includes(text.toLowerCase());
    });
    setFilteredSensors(filtered);
  };
  
  useEffect(() => {
    const sortSensors = () => {
      const sortedSensors = [...sensors].sort((a, b) => {
        const buildingNameA = a.buildingName.toLowerCase();
        const buildingNameB = b.buildingName.toLowerCase();
        const roomNameA = a.roomName.toLowerCase();
        const roomNameB = b.roomName.toLowerCase();
  
        if (buildingNameA === buildingNameB) {
          return roomNameA.localeCompare(roomNameB);
        }
        return buildingNameA.localeCompare(buildingNameB);
      });
  
      setFilteredSensors(sortedSensors);
    };
  
    sortSensors();
  }, [sensors]);

  const Sensor = ({ sensor }) => {
    const onPress = () => {
      console.log(`Sensor ${sensor.roomName} pressed`);
      navigation.navigate('Sensor Detail', { sensor: sensor });
    };
    return (
      <TouchableOpacity
        style={homePageStyles.buildingRow}
        onPress={onPress}
        key={sensor.softId}
      >
        <View>
        <Text style={homePageStyles.buildingName}>{sensor.buildingName} - {sensor.roomName} </Text>
        <Text style={homePageStyles.locationName}>{sensor.locationInfo}</Text>
        </View>

      </TouchableOpacity>
    );
  };

  const renderSensor = ({ item }) => <Sensor sensor={item} />;

  return (
    <>
      <StatusBar style="dark"/>
        <View style={homePageStyles.bodyContainer}>
          <View style={homePageStyles.appBar}>
            <View style={homePageStyles.iconPosition}>
            <View>
              <Text style={homePageStyles.appBarText}>MY DEVICES</Text>
            </View>
            <View style={{ width: 100 }}/>
              <TouchableOpacity onPress={goProfile}>
                <Image
                  style={homePageStyles.icon}
                  source={require("../assets/icons/profile-user.png")}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={goLogin}>
                <Image
                  style={homePageStyles.icon}
                  source={require("../assets/icons/logout.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={homePageStyles.configureButton}>
          {user_data.userType === 'admin' && (
                <TouchableOpacity style={homePageStyles.button} onPress={goNewDevice}>
                  <Text style={homePageStyles.buttonText}>Configure a new device</Text>
                </TouchableOpacity>
              )}
          </View>
          <View style={homePageStyles.homePageBody}>
            <View style={homePageStyles.searchBoxContainer}>
              <TextInput
                style={homePageStyles.searchBox}
                placeholder="Search"
                value={searchText}
                onChangeText={handleSearch}
                />
                <Image
                  style={homePageStyles.searchIcon}
                  source={require("../assets/icons/search.png")}
                />
              </View>
              <FlatList
                data={filteredSensors}
                renderItem={renderSensor}
                keyExtractor={(sensor) => sensor.softId}
                ListHeaderComponent={
                  <View style={homePageStyles.buildingsContainer}>
                    {filteredSensors.length > 0 ? (
                      null
                    ) : (
                      <Text>No sensors found</Text>
                    )}
                  </View>
                }
                contentContainerStyle={{ paddingBottom: 100 }}
              />
            </View>
          </View>
        
      </>
      );
    }
    
    const homePageStyles = StyleSheet.create({
      bodyContainer: {
        flex: 1,
        flexDirection: "column",
        alignItems: "stretch",
        backgroundColor: "#fff",
        padding: 10,
      },
      appBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 10,
      },
      iconPosition: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      },      
      icon: {
        width: 30,
        height: 30,
        marginLeft: 5,
        marginRight: 15,
      },
      appBarText: {
        fontSize: 32,
        lineHeight: 36,
        fontWeight: "bold",
        letterSpacing: 0.2,
        color: "#263159",
      },  
      configureButton: {
        marginTop: 10,
        marginBottom: 20,
      },
      button: {
        backgroundColor: "#495579",
        borderRadius: 16,
        padding: 10,
      },
      buttonText: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
        letterSpacing: 0.3,
        textAlign: "center",
      },
      homePageBody: {
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "center",
      },
      searchBoxContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 2,
        borderColor: "#495579",
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,
        marginBottom: 20,
      },
      searchBox: {
        flex: 1,
        fontSize: 16,
        height: 40,
        color: "#000",
        paddingLeft: 5,
      },
      searchIcon: {
        width: 20,
        height: 20,
      },
      buildingsContainer: {
        flex: 1,
        alignItems: "stretch",
        justifyContent: "center",
      },
      buildingRow: {
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: "#495579",
        borderRadius: 10,
        marginBottom: 15,
      },
      buildingName: {
        color: "#495579",
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
      },
      locationName: {
        color: "#495579",
        fontSize: 16,
        fontWeight: "400",
        textAlign: "center",
      },
           
    });
    
    export default HomePage;
