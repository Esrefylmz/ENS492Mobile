import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import { loadBuildings } from "../Backend/buildingServices";

function HomePage({ navigation, route }) {
  const { data } = route.params;
  console.log("data homepage: ", data)
  const goNewDevice = () => {
    console.log("Configure a new device button pressed");
    navigation.navigate("WifiSearch");
  };

  const goProfile = () => {
    console.log("Profile icon pressed");
    navigation.navigate("Profile", {data});
  };

  const goLogin = () => {
    console.log("Logout icon pressed");
    navigation.navigate("Login");
  };

  const [searchText, setSearchText] = useState("");
  const [filteredBuildings, setFilteredBuildings] = useState([]);
  const [buildings, setBuildings] = useState([]);

  useEffect(() => {
    const fetchBuildings = async () => {
      const data = await loadBuildings();
      setBuildings(data);
      setFilteredBuildings(data);
    };
    fetchBuildings();
  }, []);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = buildings.filter((building) =>
      building.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBuildings(filtered);
  };

  const Building = ({ building }) => {
    const onPress = () => {
      console.log(`Building ${building.name} pressed`);
      navigation.navigate('Building Detail', { building: building });
    };
    return (
      <TouchableOpacity
        style={homePageStyles.buildingRow}
        onPress={onPress}
        key={building.id}
      >
        <Text style={homePageStyles.buildingName}>{building.name}</Text>
        <Text>{building.address}</Text>
      </TouchableOpacity>
    );
  };

  const renderBuilding = ({ item }) => <Building building={item} />;

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
          {data.userType === 'admin' && (
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
              <ScrollView>
              <View style={homePageStyles.buildingsContainer}>
                {filteredBuildings.length > 0 ? (
                  <FlatList
                    data={filteredBuildings}
                    renderItem={renderBuilding}
                    keyExtractor={(building) => building.id}
                  />
                ) : (
                  <Text>No buildings found</Text>
                )}
              </View>
              </ScrollView>
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
           
    });
    
    export default HomePage;
