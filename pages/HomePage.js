import { View, StatusBar, StyleSheet, Text, Image, TextInput, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import BuildingList from "../Backend/buildingServicesComponent/buildingList";

function HomePage({ navigation }) {
  const goNewDevice = () => {
    console.log('Configure a new device button pressed');
    navigation.navigate('WifiSearch');
  }

  const goProfile = () => {
    console.log('Profile icon pressed');
    navigation.navigate('Profile');
  }

  const goLogin = () => {
    console.log('Logout icon pressed');
    navigation.navigate('Login');
  }

  const [searchText, setSearchText] = useState("");
  const [filteredBoxes, setFilteredBoxes] = useState(["FENS0001", "FASS0001", "FASS0002", "FASS0003", "FASS0004",]);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = ["FENS0001", "FASS0001", "FASS0002", "FASS0003", "FASS0004"].filter((box) =>
      box.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBoxes(filtered);
  };

  return (
    <>
      <StatusBar style="dark"/>
      <ScrollView>
        <View style={homePageStyles.bodyContainer}>
          <View style={homePageStyles.appBar}>
            <View style={homePageStyles.iconPosition}>
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
            <View>
              <Text style={homePageStyles.appBarText}>MY DEVICES</Text>
            </View>
            <View style={{ width: 25 }}/>
          </View>
          <View style={homePageStyles.configureButton}>
          <TouchableOpacity style={homePageStyles.button} onPress={goNewDevice}>
              <Text style={homePageStyles.buttonText}>Configure a new device</Text>
            </TouchableOpacity>
          </View>
          <View style={homePageStyles.homePageBody}>
          <View style={homePageStyles.searchBoxContainer}>
              <TextInput
                style={homePageStyles.searchBox}
                placeholder="Search"
                value={searchText}
                onChangeText={handleSearch}
              />
            </View>

            <View>
              <Text>--------------------</Text>
              <BuildingList />
              <Text>--------------------</Text>
            </View>


            <View style={homePageStyles.staticBoxContainer}>
              {filteredBoxes.includes("FENS0001") && (
                <TouchableOpacity style={homePageStyles.staticBox}>
                  <Text style={homePageStyles.staticBoxText}>FENS0001</Text>
                </TouchableOpacity>
              )}
              {filteredBoxes.includes("FASS0001") && (
                <TouchableOpacity style={homePageStyles.staticBox}>
                  <Text style={homePageStyles.staticBoxText}>FASS0001</Text>
                </TouchableOpacity>
              )}
              {filteredBoxes.includes("FASS0002") && (
                <TouchableOpacity style={homePageStyles.staticBox}>
                  <Text style={homePageStyles.staticBoxText}>FASS0002</Text>
                </TouchableOpacity>
              )}
              {filteredBoxes.includes("FASS0003") && (
                <TouchableOpacity style={homePageStyles.staticBox}>
                  <Text style={homePageStyles.staticBoxText}>FASS0003</Text>
                </TouchableOpacity>
              )}
              {filteredBoxes.includes("FASS0004") && (
                <TouchableOpacity style={homePageStyles.staticBox}>
                  <Text style={homePageStyles.staticBoxText}>FASS0004</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
}

export default HomePage;

const homePageStyles = StyleSheet.create({
  bodyContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "stretch",
  },
  appBar: {
    flex: 1,
    backgroundColor: "white",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: 'flex-end',
    paddingBottom: 8,
  },  
  appBarText: {
    fontSize: 36,
    lineHeight: 45,
    fontWeight: "bold",
    letterSpacing: 0.3,
    color: "#263159",
    marginLeft: -120,
  },  
  button: {
    backgroundColor: '#495579',
    borderRadius: 50,
    padding: 20,
    marginVertical: 10,
    width: 350,
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  configureButton:{
    alignItems: 'center',
  },
  icon: {
    height: 25,
    width: 25,
    marginHorizontal: 10,
    marginBottom: 5,
  },
  iconPosition: {
    flexDirection: "row",
    alignItems: "flex-end",
  }, 
  homePageBody: {
    flex: 12,
    backgroundColor: "white",
  },
  searchBox: {
    height: 40,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  staticBoxContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  staticBox: {
    backgroundColor: "#495579",
    width: "95%",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    margin:10,
    marginVertical: 10,
  },
  staticBoxText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
  },
  searchBoxContainer: {
    marginHorizontal: 10,
  },
});
