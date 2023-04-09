import React from 'react';
import { View } from 'react-native';
import { LineChart } from 'react-native-svg-charts';

const measurementTypeLookup = {
  1: 'Temperature',
  2: 'Humidity',
  3: 'Pressure',
  4: 'CO2',
  5: 'TVOC',
  6: 'Light',
  7: 'Noise',
  8: 'Battery',
  9: 'Occupancy',
  10: 'Power',
  11: 'Energy',
};

const groupMeasurementsByType = (sensorData) => {
  const measurementsByType = {};

  sensorData.forEach((measurement) => {
    const { measurementTypeId, measurementValue, timestamp } = measurement;
    const measurementType = measurementTypeLookup[measurementTypeId];

    if (!measurementsByType[measurementType]) {
      measurementsByType[measurementType] = [];
    }

    measurementsByType[measurementType].push({
      x: new Date(timestamp),
      y: measurementValue,
    });
  });

  return Object.entries(measurementsByType).map(([key, data]) => ({
    key,
    data,
  }));
};

const TimeSeriesChart = ({ sensorData }) => {
  const chartData = groupMeasurementsByType(sensorData);

  const contentInset = { top: 20, bottom: 20 };

  const chartProps = {
    data: chartData,
    xAccessor: ({ item }) => item.x,
    yAccessor: ({ item }) => item.y,
    contentInset,
  };

  return (
    <View>
      <LineChart {...chartProps} />
    </View>
  );
};

export default TimeSeriesChart;
