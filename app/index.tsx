import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { View ,Text } from 'react-native';
import { DateComponent } from '@/components/date';
import Task from '@/components/Tasks';
export default function HomeScreen() {
  return (
    <View style = {styles.container}>
      <View style = {styles.TaskWrapper}></View>
      <DateComponent />
      <View style = {styles.items}>
          {/*Where to put the tasks*/}
          <Task text='this is a task'/>
          <Task text='this is a task'/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    TaskWrapper:{
      padding: 80,
      paddingHorizontal:20,
      
    },
    container: {
      flex : 1,
      justifyContent: 'center',
      alignItems :'center', 
      
    },
    items : {
      
      width :"100%",
      alignItems : 'center',
    },
});
