import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

export const DateComponent = () => {
  const dayOfWeek = new Date().toLocaleString('default', { weekday: 'long' });
  const day = new Date().getDate();
  const month = new Date().toLocaleString('default', { month: 'long' }).toUpperCase();
  const year = new Date().getFullYear().toString().slice(-2);
  return (
    <View style={styles.container}>
      <View style = {styles.containerA}>
      <Text style={styles.dayText}>{day}</Text>
      <Text style={styles.dateOfWeekText}>{dayOfWeek}</Text>
      </View>
      <Text style={styles.monthText}>{month}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    left: 25,
 // Align text to the start
  },
  containerA:{
    flex : 1,
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  dateOfWeekText: {
    fontSize: 16,
    color: '#7e6c6c', // Color for better visibility on yellow background
    top : 17,
  },

  dayText: {
    
    fontSize: 60,
    color: '#7e6c6c',
    fontWeight :'bold',
  },
  monthText: {
    top:-20,
    fontSize: 50,
    color: '#7e6c6c',
    fontWeight : 'bold',
  },
});
