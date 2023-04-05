import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

function BuildingDetails({ route }) {
  const { building } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{building.name}</Text>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Building ID: {building.buildingId}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>Company ID: {building.companyId}</Text>
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
    color: '#495579',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    borderBottomColor: "#495579",
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
