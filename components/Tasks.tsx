import React from 'react';
import {View, Text, StyleSheet,TouchableOpacity, ViewBase} from 'react-native';
interface TaskProps{
    text : string;
}

const Task: React.FC<TaskProps> = (props) =>{
    
    return(
     <View style = {styles.TaskContainer}>
        <View style = {styles.TaskLeft}>
            <TouchableOpacity style = {styles.square}></TouchableOpacity>
            <Text style = {styles.Tasktext}>{props.text}</Text>
        </View>
        
     </View>
    )
}

const styles = StyleSheet.create({
    Tasktext : {
        color : 'white',
        width : ('80%'),
    },
    TaskContainer:{
        padding : 15,
        borderRadius:15,
        backgroundColor : 'lightblue',
        marginBottom: 15,
        width : '90%',
        flexDirection:'row',
        justifyContent : 'space-between',
    },
    TaskLeft:{
        flexDirection : 'row',
        alignItems : 'center',
        flexWrap : 'wrap',
    },
    square:{
        width:40,
        height : 24,
        backgroundColor : 'white',
        borderRadius : 40,
        marginRight : 10,
    },
    
});

export default Task;