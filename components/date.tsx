import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export const DateComponent = () => {
  const dayOfWeek = new Date().toLocaleString('default', { weekday: 'long' });
  const day = new Date().getDate();
  const month = new Date().toLocaleString('default', { month: 'long' }).toUpperCase();
  const year = new Date().getFullYear().toString().slice(-2);
  return (
    <View style={styles.container}>
      <Text style={styles.dateOfWeekText}>{dayOfWeek}</Text>
      <View style= {styles.dateContainer}>
      <Text style={styles.dayText}>{day}</Text>
      <Text style ={styles.yearText}>.{year}</Text>
      </View>
      <Text style={styles.monthText}>{month}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 70,
    left: 25,
    alignItems: 'flex-start', // Align text to the start
  },
  dateOfWeekText: {
    fontSize: 15,
    color: 'lightblue', // Color for better visibility on yellow background
  },
  dateContainer:{
    flexDirection:'row',
  },
  dayText: {
    
    fontSize: 60,
    color: 'white',
    fontWeight :'bold',
  },
  yearText:{
    fontSize:60,
    color : 'lightblue',
    fontWeight: 'bold',
  },
  monthText: {
    top:-20,
    fontSize: 50,
    color: 'white',
    fontWeight : 'bold',
  },
});
