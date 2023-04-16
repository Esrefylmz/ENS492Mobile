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
  import { getCompanySensorsByRoomId } from "../Backend/sensorServices";
  import { useNavigation } from '@react-navigation/native';
  
  function HomePage({ navigation, route }) {
    const { room , user_data } = route.params;
    console.log("data homepage: ", room)
  
    const [searchText, setSearchText] = useState("");
    const [sensors, setSensors] = useState([]);
    const [filteredSensors, setFilteredSensors] = useState([]);
  
  
    useEffect(() => {
      const fetchSensors = async (room) => {
        console.log("room HERE")
        console.log(room)
        if (room["roomId"]) { // Check if data and companyId are defined
          const sensors = await getCompanySensorsByRoomId(room["roomId"]);
          console.log("sensors", sensors);
          setSensors(sensors);
          setFilteredSensors(sensors);
        }
      };
      fetchSensors(room);
    }, [room]);
  
    const handleSearch = (text) => {
      setSearchText(text);
      const filtered = sensors.filter((sensor) => {
        const searchStr = `${sensor.macID}`.toLowerCase();
        return searchStr.includes(text.toLowerCase());
      });
      setFilteredSensors(filtered);
    };
    
    const navigation2 = useNavigation();
    React.useLayoutEffect(() => {
      navigation2.setOptions({
        title: `Room Detail - ${room.name}`,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#077187',
        },
      });
    }, [navigation2, room.name]);
    const Sensor = ({ sensor }) => {
      const onPress = () => {
        console.log(`Sensor ${sensor.macId} pressed`);
        navigation.navigate('Sensor Detail', { sensor, room, user_data});
      };
      return (
        <TouchableOpacity
          style={homePageStyles.buildingRow}
          onPress={onPress}
          key={sensor.softId}
        >
          <View>
          <Text style={homePageStyles.buildingName}>{sensor.macId}</Text>
          
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
                <Text style={homePageStyles.appBarText}>{room.name}</Text>
              </View>
                <TouchableOpacity>
                  <Image
                    style={homePageStyles.icon}
                    source={require("../assets/icons/profile-user.png")}
                  />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={homePageStyles.icon}
                    source={require("../assets/icons/logout.png")}
                  />
                </TouchableOpacity>
              </View>
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
  
      HomePage.navigationOptions = {
        headerLeft: null,
      };
  
      const homePageStyles = StyleSheet.create({
        bodyContainer: {
          flex: 1,
          flexDirection: "column",
          alignItems: "stretch",
          backgroundColor: "#F8F8F8",
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
          justifyContent: "center",
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
          color: "#1D6E7F",
        },   
        configureButton: {
          marginTop: 10,
          marginBottom: 20,
        },
        button: {
          backgroundColor: "#077187",
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
          borderWidth: 2.5,
          borderColor: "#077187",
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
          backgroundColor: "#fff",
          height: 60,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          paddingHorizontal: 8,
          borderWidth: 1,
          borderColor: "#077187",
          borderRadius: 10,
          marginBottom: 15,
        },
        buildingName: {
          color: "#077187",
          fontSize: 20,
          fontWeight: "500",
          textAlign: "center",
        },
        locationName: {
          color: "#077187",
          fontSize: 16,
          fontWeight: "400",
          textAlign: "center",
        },
             
      });
      
      export default HomePage;
  