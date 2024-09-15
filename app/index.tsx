import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Modal, TextInput, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import moment from 'moment'; 
import styles from './styles'; 

const DateComponent = () => {
    return (
        <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{moment().format('MMMM DD')}</Text>
        </View>
    );
};

export default function HomeScreen() {
    
    const [tasks, setTasks] = useState<{ text: string; description: string }[]>([
        
    ]);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');

    
    const addTask = () => {
        setTasks([...tasks, { text: 'Take a note', description: '' }]);
    };

    
    const deleteTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
        setModalVisible(false);
    };

    
    const editTitle = () => {
        if (selectedTaskIndex !== null && editedTitle.trim()) {
            const updatedTasks = tasks.map((task, index) =>
                index === selectedTaskIndex ? { ...task, text: editedTitle } : task
            );
            setTasks(updatedTasks);
            setEditedTitle('');
        }
    };

    
    const editDescription = () => {
        if (selectedTaskIndex !== null && editedDescription.trim()) {
            const updatedTasks = tasks.map((task, index) =>
                index === selectedTaskIndex ? { ...task, description: editedDescription } : task
            );
            setTasks(updatedTasks);
            setEditedDescription('');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <DateComponent />
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.items}>
                        {tasks.map((task, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.taskCard}
                                onPress={() => {
                                    setSelectedTaskIndex(index);
                                    setModalVisible(true);
                                }}
                            >
                                <View>
                                    <Text style={styles.taskText}>{task.text}</Text>
                                    {task.description ? (
                                        <Text style={styles.taskDescription}>{task.description}</Text>
                                    ) : null}
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
            </View>
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
                <Icon name="add" size={24} color="#ffffff" />
                <Text style={styles.addButtonText}>Create a new task</Text>
            </TouchableOpacity>

            {/* Modal for More Options */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    {selectedTaskIndex !== null && (
                        <>
                            <TextInput
                                style={styles.textInput}
                                placeholder="Edit title"
                                value={editedTitle}
                                onChangeText={setEditedTitle}
                            />
                            <Button title="Update Title" onPress={editTitle} />

                            <TextInput
                                style={styles.textInput}
                                placeholder="Add description"
                                value={editedDescription}
                                onChangeText={setEditedDescription}
                            />
                            <Button title="Update Description" onPress={editDescription} />

                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => deleteTask(selectedTaskIndex)}
                            >
                                <Text style={styles.modalButtonText}>Delete Note</Text>
                            </TouchableOpacity>
                        </>
                    )}
                    <Button title="Close" onPress={() => setModalVisible(false)} />
                </View>
            </Modal>
        </View>
    );
}
