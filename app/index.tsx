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

    const handleOutsidePress = () => {
        setModalVisible(false);
    };

    const openModalForEditing = (index: number) => {
        const task = tasks[index];
        setTaskText(task.text);
        setTaskDescription(task.description);
        setEditingIndex(index);
        setModalVisible(true);
    };

    return (
        <Pressable onPress={handleOutsidePress} style={styles.container1}>
            <DateComponent />
            <View style={styles.content}>
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
                                    <Pressable onPress={() => openModalForEditing(index)} style={styles.editableContainer}>
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
                                    <Icon name="delete" size={24} color="#ff0000" />
                                </Pressable>
                            </View>
                        ))}
                    </View>
                </ScrollView>
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
                        <Text style={styles.modalTitle}>{editingIndex !== null ? 'Edit Task' : 'Create New Task'}</Text>
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
                            <Pressable style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalButtonText}>Cancel</Text>
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
    content: {
        flex: 1,
    },
    scrollContainer: { flex: 1 },
    items: { margin: 10 },
    taskCard: { 
        marginBottom: 10, 
        borderRadius: 10, 
        overflow: 'hidden', 
        backgroundColor: '#ffffff',
        position: 'relative',
        paddingRight: 40,
    },
    checkedTaskCard: {
        opacity: 0.5,
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
    taskText: { fontSize: 16, fontWeight: 'bold', top: 7 },
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
    editableContainer: {
        flex: 1,
    },
    taskDescription: { 
        fontSize: 14, 
        color: '#666', 
        backgroundColor: '#f9f9f9', 
        padding: 10
    },
    descriptionContainer: {
        maxHeight: 100,  // Set a maximum height for the description field
        minHeight: 40,   // Minimum height for a description field
    },
    descriptionInput: {
        padding: 10,
        color: '#000',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
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
    addButtonText: { color: '#fff', fontSize: 16, marginLeft: 10 },
    deleteButton: { position: 'absolute', right: 10, top: 10 },
    modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalContent: { width: '80%', backgroundColor: '#fff', padding: 20, borderRadius: 10 },
    modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
    modalTextInput: {
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
});
