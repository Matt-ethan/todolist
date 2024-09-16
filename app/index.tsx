import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Checkbox } from 'react-native-paper';
import { DateComponent } from '@/components/date';

export default function HomeScreen() {
    const [tasks, setTasks] = useState<{ text: string; description: string; labels: string[]; checked: boolean }[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [taskText, setTaskText] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const addOrUpdateTask = () => {
        if (taskText.trim() === '') return;

        if (editingIndex !== null) {
            // Update existing task
            const updatedTasks = tasks.map((task, i) =>
                i === editingIndex ? { ...task, text: taskText, description: taskDescription } : task
            );
            setTasks(updatedTasks);
        } else {
            // Add new task
            setTasks([...tasks, { text: taskText, description: taskDescription, labels: [], checked: false }]);
        }

        setTaskText('');
        setTaskDescription('');
        setEditingIndex(null);
        setModalVisible(false);
    };

    const deleteTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
    };

    const toggleCheckbox = (index: number) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, checked: !task.checked } : task
        );
        setTasks(updatedTasks);
    };

    const handleOutsidePress = (task: { text: string; description: string }, index: number) => {
        setTaskDescription(task.description);
        setEditingIndex(index);
        setModalVisible(true);
    };

    return (
        <Pressable style={styles.container1}>
            <View style={styles.DateandTaskContainer}>
                <DateComponent />
                <View style={styles.taskContainer}>
                    <ScrollView style={styles.scrollContainer}>
                        <View style={styles.items}>
                            {tasks.map((task, index) => (
                                <View
                                    key={index}
                                    style={[styles.taskCard, task.checked && styles.checkedTaskCard]}
                                >
                                    <View style={styles.taskContent}>
                                        <Checkbox
                                            status={task.checked ? 'checked' : 'unchecked'}
                                            onPress={() => toggleCheckbox(index)}
                                        />
                                        <Pressable onPress={() => handleOutsidePress(task, index)} style={styles.editableContainer}>
                                            <Text style={[styles.taskText, task.checked && styles.checkedText]}>
                                                {task.text || "Take a note"}
                                            </Text>
                                        </Pressable>
                                    </View>

                                    <Text style={[styles.taskDescription, task.checked && styles.checkedText]}>
                                        {task.description || "No description"}
                                    </Text>

                                    <Pressable
                                        style={styles.deleteButton}
                                        onPress={() => deleteTask(index)}
                                    >
                                        <Icon name="delete" size={16} color="midred" />
                                    </Pressable>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </View>
            </View>
            <Pressable style={styles.addButton} onPress={() => {
                setTaskText('');
                setTaskDescription('');
                setEditingIndex(null);
                setModalVisible(true);
            }}>
                <Icon name="add" size={24} color="#ffffff" />
                <Text style={styles.addButtonText}>Create a new task</Text>
            </Pressable>

            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <View style={styles.Container4}>
                            <Text style={styles.modalTitle}>{editingIndex !== null ? 'Edit Task' : 'Create New Task'}</Text>
                            <Pressable style={styles.modalButtonX} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalButtonTextX}>x</Text>
                            </Pressable>
                        </View>
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
                            <Pressable style={styles.modalButton} onPress={addOrUpdateTask}>
                                <Text style={styles.modalButtonText}>{editingIndex !== null ? 'Update Task' : 'Add Task'}</Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container1: {
        backgroundColor: '#252525',
        flex: 1,
    },
    DateandTaskContainer: {
        flex: 1,
    },
    taskContainer: {
        flex: 1,
    },
    scrollContainer: {
        flex: 1,
        top: 220,
        height: 100,
    },
    items: {
        margin: 10,
    },
    taskCard: { 
        marginBottom: 10, 
        borderRadius: 15, 
        overflow: 'hidden', 
        position: 'relative',
        borderWidth: 1,
        backgroundColor: 'black',
        borderColor: 'white',
    },
    checkedTaskCard: {
        opacity: 0.5,
    },
    taskContent: { 
        flexDirection: 'row', 
        alignItems: 'center', 
    },
    textContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    taskText: { 
        fontSize: 16, 
        fontWeight: 'bold', 
        top: -2,
        color: 'white',
    },
    checkedText: {
        textDecorationLine: 'line-through',
        color: '#aaa',
    },
    taskDescription: { 
        top: -10,
        fontSize: 12, 
        color: '#666', 
        padding: 10,
        left: 30,
        color: 'white',
        width: '85%',
    },
    addButton: { 
        justifyContent: 'center',
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: 'grey', 
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
    deleteButton: { 
        position: 'absolute', 
        right: 10, 
        top: 15,
    },
    modalContainer: { 
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0,0,0,0.5)' 
    },
    modalContent: { 
        width: '80%', 
        backgroundColor: '#fff', 
        padding: 20, 
        borderRadius: 10,
    },
    modalTitle: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        marginBottom: 10,
    },
    modalTextInput: {
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
        height: 30,
        top: 6,
        borderRadius: 5,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalButtonText: {
        color: 'white',
    },
    Container4:{
        flexDirection: 'row',
        height: 30,
        marginBottom: 10,
        justifyContent: 'space-between',
    },
    modalButtonX:{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    modalButtonTextX: {
        top: -20,
        left: 8,
        fontSize: 18,
        color: 'grey',
    },
});
