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
    
    // Create a ref to track clicks outside of the task card
    const taskCardRef = useRef<View | null>(null);

    // Add Task
    const addTask = () => {
        if (taskText.trim() === '') return; // Prevent adding tasks with empty titles
        setTasks([...tasks, { text: taskText, description: taskDescription, labels: [], checked: false, expanded: false }]);
        setTaskText('');
        setTaskDescription('');
        setModalVisible(false);
    };

    // Delete Task
    const deleteTask = (index: number) => {
        setTasks(tasks.filter((_, i) => i !== index));
        setSelectedTaskIndex(null);
    };

    // Update Task Title
    const updateTitle = (index: number, newText: string) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, text: newText } : task
        );
        setTasks(updatedTasks);
    };

    // Update Task Description
    const updateDescription = (index: number, newDescription: string) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, description: newDescription } : task
        );
        setTasks(updatedTasks);
    };

    // Toggle checkbox status
    const toggleCheckbox = (index: number) => {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, checked: !task.checked } : task
        );
        setTasks(updatedTasks);
    };

    // Toggle card expansion
    const toggleExpand = (index: number) => {
        if (selectedTaskIndex === index) {
            setSelectedTaskIndex(null);
        } else {
            setSelectedTaskIndex(index);
        }
    };

    // Handle clicks outside of expanded card to collapse it
    const handleOutsideClick = useCallback((event: any) => {
        if (taskCardRef.current && !taskCardRef.current.contains(event.target)) {
            setSelectedTaskIndex(null);
        }
    }, []);

    // Add event listener for clicks outside of task card
    React.useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick);
        return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, [handleOutsideClick]);

    return (
        <TouchableWithoutFeedback>
            <View style={styles.container1}>
                <DateComponent />
                <View style={styles.content}>
                    <ScrollView style={styles.scrollContainer}>
                        <View style={styles.items}>
                            {tasks.map((task, index) => (
                                <View
                                    key={index}
                                    style={[styles.taskCard, task.checked && styles.checkedTaskCard]}
                                    ref={taskCardRef} // Attach ref to the task card
                                >
                                    <TouchableOpacity
                                        style={styles.taskContent}
                                        onPress={() => toggleExpand(index)}
                                        activeOpacity={1} // Prevents opacity change on touch
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
                                                    placeholderTextColor="#aaa" // Gray placeholder text
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

                                    {/* Show the description, and make it editable only when expanded */}
                                    <View>
                                        {selectedTaskIndex === index ? (
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="Add description"
                                                placeholderTextColor="#aaa" // Gray placeholder text
                                                value={task.description}
                                                onChangeText={(text) => updateDescription(index, text)}
                                            />
                                        ) : (
                                            <Text style={[styles.taskDescription, task.checked && styles.checkedText]}>
                                                {task.description || "No description"}
                                            </Text>
                                        )}
                                    </View>

                                    {/* Always show delete button */}
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

                {/* Modal to create a new task */}
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

// Styles for your component
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
        position: 'relative', // Enable positioning of delete button
        paddingRight: 40, // Add space for delete button
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
        backgroundColor: 'white', 
        flex: 1,
        flexDirection: 'row',
    },
    taskText: { fontSize: 16, fontWeight: 'bold', top: 7 },
    checkedText: {
        textDecorationLine: 'line-through',
        color: '#aaa', // Optional: change text color for checked state
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
        color: '#666', 
        backgroundColor: '#f9f9f9', 
        padding: 10
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
    addButtonText: { color: '#fff', fontSize: 16, marginLeft: 10},

    // Modal styles
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
});
