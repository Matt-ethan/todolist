import React, { useState, useRef, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, TouchableWithoutFeedback, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Checkbox } from 'react-native-paper';
import { DateComponent } from '@/components/date';

export default function HomeScreen() {
    const [tasks, setTasks] = useState<{ text: string; description: string; labels: string[]; checked: boolean; expanded: boolean }[]>([]);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [taskText, setTaskText] = useState('');
    const [taskDescription, setTaskDescription] = useState('');

    const taskCardRef = useRef<View | null>(null);

    const addTask = () => {
        if (taskText.trim() === '') return;
        setTasks([...tasks, { text: taskText, description: taskDescription, labels: [], checked: false, expanded: false }]);
        setTaskText('');
        setTaskDescription('');
        setModalVisible(false);
    };

    const deleteTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
        setSelectedTaskIndex(null);
    };

    const updateTitle = (index: number, newText: string) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, text: newText } : task
        );
        setTasks(updatedTasks);
    };

    const updateDescription = (index: number, newDescription: string) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, description: newDescription } : task
        );
        setTasks(updatedTasks);
    };

    const toggleCheckbox = (index: number) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, checked: !task.checked } : task
        );
        setTasks(updatedTasks);
    };

    const toggleExpand = (index: number) => {
        if (selectedTaskIndex === index) {
            setSelectedTaskIndex(null);
        } else {
            setSelectedTaskIndex(index);
        }
    };

    const handleOutsideClick = useCallback((event: any) => {
        if (taskCardRef.current && !taskCardRef.current.contains(event.target)) {
            setSelectedTaskIndex(null);
        }
    }, []);

    return (
        <TouchableWithoutFeedback>
            <View style={styles.container1}>
                <DateComponent />
                <View style = {styles.container2}>
                <ScrollView style={styles.scrollContainer}>
                    <View style={styles.items}>
                        {tasks.map((task, index) => (
                            <View
                                key={index}
                                style={[styles.taskCard, task.checked && styles.checkedTaskCard]}
                                ref={taskCardRef}
                            >
                                <TouchableOpacity
                                    style={styles.taskContent}
                                    onPress={() => toggleExpand(index)}
                                    activeOpacity={1}
                                >
                                    <View style={styles.textContainer}>
                                        <Checkbox
                                            status={task.checked ? 'checked' : 'unchecked'}
                                            onPress={() => toggleCheckbox(index)}
                                        />
                                        {selectedTaskIndex === index ? (
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="Take a note"
                                                placeholderTextColor="#aaa"
                                                value={task.text}
                                                onChangeText={(text) => updateTitle(index, text)}
                                            />
                                        ) : (
                                            <Text style={[styles.taskText, task.checked && styles.checkedText]}>
                                                {task.text || "Take a note"}
                                            </Text>
                                        )}
                                    </View>
                                </TouchableOpacity>

                                <View>
                                    {selectedTaskIndex === index ? (
                                        <TextInput
                                            style={styles.textInput}
                                            placeholder="Add description"
                                            placeholderTextColor="#aaa"
                                            value={task.description}
                                            onChangeText={(text) => updateDescription(index, text)}
                                        />
                                    ) : (
                                        <Text style={[styles.taskDescription, task.checked && styles.checkedText]}>
                                            {task.description || "No description"}
                                        </Text>
                                    )}
                                </View>

                                <TouchableOpacity
                                    style={styles.deleteButton}
                                    onPress={() => deleteTask(index)}
                                >
                                    <Icon name="delete" size={24} color="#ff0000" />
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                </ScrollView>
                </View>
                <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
                    <Icon name="add" size={24} color="#ffffff" />
                    <Text style={styles.addButtonText}>Create a new task</Text>
                </TouchableOpacity>

                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Create New Task</Text>
                            <TextInput
                                style={styles.modalTextInput}
                                placeholder="Task Title"
                                placeholderTextColor="#aaa"
                                value={taskText}
                                onChangeText={setTaskText}
                            />
                            <TextInput
                                style={styles.modalTextInput}
                                placeholder="Task Description"
                                placeholderTextColor="#aaa"
                                value={taskDescription}
                                onChangeText={setTaskDescription}
                            />
                            <View style={styles.modalButtons}>
                                <TouchableOpacity style={styles.modalButton} onPress={addTask}>
                                    <Text style={styles.modalButtonText}>Add Task</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                    <Text style={styles.modalButtonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </TouchableWithoutFeedback>
    );
}

// Styles
const styles = StyleSheet.create({
    container1: {
        backgroundColor: '#252525',
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        marginTop: 20, // Add space between Date and Tasks
    },
    items: {
        top : 200,
        margin: 10,
        
    },
    taskCard: {
        marginBottom: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: 'white',
        position: 'relative',
        paddingRight: 40,
    },
    checkedTaskCard: {
        opacity: 0.5,
        textDecorationLine: 'line-through',
    },
    taskContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    taskText: {
        fontSize: 16,
        fontWeight: 'bold',
        top: 7,
    },
    checkedText: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
    textInput: {
        padding: 10,
        color: 'white',
        borderWidth: 1,
        borderRadius: 5,
        marginVertical: 5,
    },
    taskDescription: {
        fontSize: 14,
        color: 'black',
        backgroundColor: 'white',
        width: '100%',
        padding: 2,
        marginBottom: 10,
        left: 36,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 17,
        margin: 10,
        top: -5,
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        marginLeft: 10,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalTextInput: {
        padding: 10,
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        color: 'black',
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalButton: {
        backgroundColor: '#007bff',
        padding: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
    deleteButton: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    container2 :{
        flex : 1,

    },
});
