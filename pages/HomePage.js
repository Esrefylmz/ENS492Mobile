import {
  View,
  StatusBar,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Animated,
} from "react-native";
import React, { useState, useEffect } from "react";
import { getBuildingByCompanyId } from "../Backend/buildingServices";
import { getRoomsByBuildingId } from "../Backend/roomService";
import { useNavigation } from '@react-navigation/native';

function HomePage({ navigation, route }) {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: null
    });
  }, [navigation]);

  const { user_data } = route.params;
  console.log("data homepage: ", user_data)
  const goNewDevice = () => {
    console.log("Configure a new device button pressed");
    navigation.navigate("WifiSearch");
  };

  const goProfile = () => {
    console.log("Profile icon pressed");
    navigation.navigate("Profile", {user_data, sensors});
  };

  const goLogin = () => {
    console.log("Logout icon pressed");
    navigation.navigate("Login");
  };

  const [searchText, setSearchText] = useState("");
  const [buildings, setBuildings] = useState([]);
  const [filteredBuildings, setFilteredBuildings] = useState([]);


  useEffect(() => {
    const fetchBuilding = async (user_data) => {
      console.log("BUILDING HERE")
      console.log(user_data)
      if (user_data["companyId"]) { // Check if data and companyId are defined
        const buildings = await getBuildingByCompanyId(user_data["companyId"]);
        console.log("buildings", buildings);
        setBuildings(buildings);
        setFilteredBuildings(buildings);
      }
    };
    fetchBuilding(user_data);
  }, [user_data]);

  const handleSearch = (text) => {
    setSearchText(text);
    const filtered = buildings.filter((building) => {
      const searchStr = `${building.name} - ${building.buildingId}`.toLowerCase();
      return searchStr.includes(text.toLowerCase());
    });
    setFilteredBuildings(filtered);
  };
  

  const ExpandableView = ({ expanded = false, parameterBuildingId}) => {
    
    const [rooms, setRooms] = useState([]);
    const [filteredRooms, setFilteredRooms] = useState([]);
  
  
    useEffect(() => {
      const fetchRooms = async (id) => {
        console.log("room HERE")
        if (id) { // Check if id is defined
          const rooms = await getRoomsByBuildingId(id);
          console.log("rooms", rooms);
          setRooms(rooms);
          setFilteredRooms(rooms);
        }
      };
      fetchRooms(parameterBuildingId);
    }, [parameterBuildingId]);
    
    const [height, setHeight] = useState(new Animated.Value(0)); // Use state to manage height

    useEffect(() => {
      // Calculate height based on number of items in data
      const newHeight = expanded ? rooms.length *40 : 0;
      // Update height using state variable
      Animated.timing(height, {
        toValue: newHeight,
        duration: 100,
        useNativeDriver: false
      }).start();
    }, [expanded, rooms, height]);
    

    const onPressRoom = (room) => {
      console.log(`room ${room.name} pressed`);
      navigation.navigate('Room Detail', { room });
    };

    return (
      <Animated.View
        style={[homePageStyles.animatedView, { height, backgroundColor: '#5dadbc'}]}
      >
         {rooms.map(item => ( // Update data to use rooms
        <TouchableOpacity onPress={() => onPressRoom(item)} key={item.roomId} style={homePageStyles.roomsRows}>
          <View style={homePageStyles.roomRowContainer}>
          {expanded && // Conditionally render arrow image based on expandable view trigger
          <Image source={require('../assets/icons/blueDoor.png')} style={homePageStyles.arrowImage} />
        }
            <Text style={homePageStyles.rowsTextStyle}>{item.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
      </Animated.View>
    );
  };


  // useEffect(() => {
  //   const sortSensors = () => {
  //     const sortedSensors = [...sensors].sort((a, b) => {
  //       const buildingNameA = a.buildingName.toLowerCase();
  //       const buildingNameB = b.buildingName.toLowerCase();
  //       const roomNameA = a.roomName.toLowerCase();
  //       const roomNameB = b.roomName.toLowerCase();
  
  //       if (buildingNameA === buildingNameB) {
  //         return roomNameA.localeCompare(roomNameB);
  //       }
  //       return buildingNameA.localeCompare(buildingNameB);
  //     });
  
  //     setFilteredSensors(sortedSensors);
  //   };
  
  //   sortSensors();
  // }, [sensors]);

  // useEffect(() => {
  //   if (searchText === '') {
  //     const sortSensors = () => {
  //       const sortedSensors = [...sensors].sort((a, b) => {
  //         const buildingNameA = a.buildingName.toLowerCase();
  //         const buildingNameB = b.buildingName.toLowerCase();
  //         const roomNameA = a.roomName.toLowerCase();
  //         const roomNameB = b.roomName.toLowerCase();
  
  //         if (buildingNameA === buildingNameB) {
  //           return roomNameA.localeCompare(roomNameB);
  //         }
  //         return buildingNameA.localeCompare(buildingNameB);
  //       });
  
  //       setFilteredSensors(sortedSensors);
  //     };
  
  //     sortSensors();
  //   }
  // }, [searchText]);
  const navigation2 = useNavigation();
    React.useLayoutEffect(() => {
      navigation2.setOptions({
        title: `Home`,
        headerTintColor: 'white',
        headerStyle: {
          backgroundColor: '#077187',
        },
      });
    }, [navigation2]);
  const Building = ({ building }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const onPress = () => {
      console.log(`building ${building.name} pressed`);
      //navigation.navigate('Building Detail', { building: building });
      setIsExpanded(!isExpanded);
    };
    return (
      <View>
        <TouchableOpacity
        style={homePageStyles.buildingRow}
        onPress={onPress}
        key={building.buildingId}
      >
        <View>
        <Text style={homePageStyles.buildingName}>{building.name}</Text>
        </View>

      </TouchableOpacity>
      <ExpandableView expanded={isExpanded} parameterBuildingId={building.buildingId} />
      </View>
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
              <Text style={homePageStyles.appBarText}>MY BUILDINGS</Text>
            </View>
            <View style={{ width: 65 }}/>
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
                data={filteredBuildings}
                renderItem={renderBuilding}
                keyExtractor={(building) => building.buildingId}
                ListHeaderComponent={
                  <View style={homePageStyles.buildingsContainer}>
                    {filteredBuildings.length > 0 ? (
                      null
                    ) : (
                      <Text>No building found</Text>
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
        borderWidth: 2,
        borderColor: "#077187",
        borderRadius: 10,
        elevation: 5, // for Android
        shadowColor: '#000', // for iOS
        shadowOffset: { width: 0, height: 2 }, // for iOS
        shadowOpacity: 0.25, // for iOS
        shadowRadius: 4, 
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
      roomsRows: {
        padding: 10.5,
        alignItems: "stretch",
        justifyContent: "center",
        borderBottomWidth: 0.5,
      },
      rowsTextStyle: {
        color: "#fff",
        fontWeight: "500",
      },
      animatedView: {
        overflow: "hidden",
        borderRadius: 10,
        paddingHorizontal: 8,
        margin: 4,
      },
      roomRowContainer: {
        flexDirection: 'row', // Align children in a row
        alignItems: 'center', // Center align items vertically
      },
      arrowImage: {
        width: 16, // Set the width of the arrow image
        height: 16, // Set the height of the arrow image
        marginRight: 8, // Add margin to the right of the arrow image for spacing
        // Add any other styles for the arrow image here
      },
           
    });
    
    export default HomePage;
