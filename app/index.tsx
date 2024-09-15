import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import moment from 'moment'; 
import { Checkbox } from 'react-native-paper'; 
import { Swipeable } from 'react-native-gesture-handler'; 

const DateComponent = () => {
    return (
        <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{moment().format('MMMM DD')}</Text>
        </View>
    );
};

export default function HomeScreen() {
    const [tasks, setTasks] = useState<{ text: string; description: string; labels: string[]; checked: boolean; expanded: boolean }[]>([]);
    const [selectedTaskIndex, setSelectedTaskIndex] = useState<number | null>(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedDescription, setEditedDescription] = useState('');

    // Add Task
    const addTask = () => {
        setTasks([...tasks, { text: '', description: '', labels: [], checked: false, expanded: false }]);
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
            // If the clicked card is already expanded, collapse it
            setSelectedTaskIndex(null);
        } else {
            // Collapse the currently expanded card (if any) and expand the new one
            setSelectedTaskIndex(index);
        }
    };

    // Handle clicks outside of expanded card to collapse it
    const handleOutsideClick = () => {
        if (selectedTaskIndex !== null) {
            setSelectedTaskIndex(null);
        }
    };

    // Swipeable render left
    const renderLeftActions = (index: number) => (
        <TouchableOpacity
            style={styles.swipeAction}
            onPress={() => deleteTask(index)}
        >
            <Text style={styles.swipeActionText}>Delete</Text>
        </TouchableOpacity>
    );

    return (
        <TouchableWithoutFeedback onPress={handleOutsideClick}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <DateComponent />
                    <ScrollView style={styles.scrollContainer}>
                        <View style={styles.items}>
                            {tasks.map((task, index) => (
                                <Swipeable
                                    key={index}
                                    renderLeftActions={() => renderLeftActions(index)}
                                >
                                    <View style={styles.taskCard}>
                                        <TouchableOpacity
                                            style={styles.taskContent}
                                            onPressIn={() => toggleExpand(index)}
                                            activeOpacity={1} // Prevents opacity change on touch
                                        >
                                            <View style={styles.textContainer}>
                                                {selectedTaskIndex === index ? (
                                                    <TextInput
                                                        style={styles.textInput}
                                                        placeholder="Take a note"
                                                        placeholderTextColor="#aaa" // Gray placeholder text
                                                        value={task.text}
                                                        onChangeText={(text) => updateTitle(index, text)}
                                                        onBlur={() => setEditedTitle('')} // Clear editedTitle on blur
                                                        onFocus={() => setEditedTitle(task.text)} // Set editedTitle on focus
                                                    />
                                                ) : (
                                                    <Text style={styles.taskText}>{task.text || "Take a note"}</Text>
                                                )}
                                            </View>

                                            {/* Add the Checkbox on the right side */}
                                            <Checkbox
                                                status={task.checked ? 'checked' : 'unchecked'}
                                                onPress={() => toggleCheckbox(index)}
                                            />
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
                                                    onBlur={() => setEditedDescription('')} // Clear editedDescription on blur
                                                    onFocus={() => setEditedDescription(task.description)} // Set editedDescription on focus
                                                />
                                            ) : (
                                                <Text style={styles.taskDescription}>{task.description || "No description"}</Text>
                                            )}
                                        </View>
                                    </View>
                                </Swipeable>
                            ))}
                        </View>
                    </ScrollView>
                </View>
                <TouchableOpacity style={styles.addButton} onPress={addTask}>
                    <Icon name="add" size={24} color="#ffffff" />
                    <Text style={styles.addButtonText}>Create a new task</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

// Styles for your component
const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1 },
    dateContainer: { paddingTop: 10, alignItems: "center" },
    dateText: { fontSize: 18, fontWeight: 'bold' },
    scrollContainer: { flex: 1 },
    items: { margin: 10 },
    taskCard: { 
        marginBottom: 10, 
        borderRadius: 10, 
        overflow: 'hidden', 
        backgroundColor: '#f9f9f9' 
    },
    taskContent: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        padding: 10, 
        backgroundColor: '#f9f9f9' 
    },
    textContainer: { flex: 1 },
    taskText: { fontSize: 16, fontWeight: 'bold' },
    textInput: { 
        padding: 10, 
        borderColor: '#ddd', 
        borderWidth: 1, 
        borderRadius: 5, 
        marginVertical: 5 
    },
    taskDescription: { 
        fontSize: 14, 
        color: '#666', 
        backgroundColor: '#f9f9f9', 
        padding: 10
    },
    modalButton: { 
        backgroundColor: '#e74c3c', 
        padding: 10, 
        borderRadius: 5 
    },
    modalButtonText: { color: '#fff', textAlign: 'center' },
    addButton: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        backgroundColor: '#007bff', 
        padding: 10, 
        borderRadius: 5, 
        margin: 10 
    },
    addButtonText: { color: '#fff', fontSize: 16, marginLeft: 10 },
    swipeAction: { 
        backgroundColor: '#e74c3c', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flex: 1 
    },
    swipeActionText: { color: '#fff', padding: 20, fontSize: 16 }
});
