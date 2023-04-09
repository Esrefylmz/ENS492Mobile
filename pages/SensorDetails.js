import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function BuildingDetails({ route }) {
  const { sensor } = route.params;
  console.log('Sensor Details: ', sensor)

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{sensor.softId}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Building : {sensor.buildingName}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Room : {sensor.roomName}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Location : {sensor.locationInfo}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>MACID : {sensor.macId}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    color: '#077187',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    borderBottomColor: "#077187",
    borderBottomWidth: 1,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  detailsLabel: {
    fontSize: 20,
  },
});

export default BuildingDetails;
