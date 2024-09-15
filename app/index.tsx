import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import moment from 'moment'; 
import { Checkbox } from 'react-native-paper';  // Import Checkbox from react-native-paper

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
        setTasks([...tasks, { text: 'Take a note', description: '', labels: [], checked: false, expanded: false }]);
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
        // Collapse all other cards
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, expanded: !task.expanded } : { ...task, expanded: false }
        );
        setTasks(updatedTasks);
        setSelectedTaskIndex(task => (task !== index ? index : null));
    };

    // Handle click outside to collapse the task card
    const handleTouchOutside = () => {
        setTasks(tasks.map(task => ({ ...task, expanded: false })));
        setSelectedTaskIndex(null);
        Keyboard.dismiss(); // Dismiss keyboard when clicking outside
    };

    return (
        <TouchableWithoutFeedback onPress={handleTouchOutside}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <DateComponent />
                    <ScrollView style={styles.scrollContainer}>
                        <View style={styles.items}>
                            {tasks.map((task, index) => (
                                <View key={index} style={[styles.taskCard, { borderWidth: task.expanded ? 1 : 0 }]}>
                                    <TouchableOpacity
                                        style={styles.taskContent}
                                        onPressIn={() => toggleExpand(index)}
                                        activeOpacity={1} // Prevents opacity change on touch
                                    >
                                        <View style={styles.textContainer}>
                                            {task.expanded ? (
                                                <TextInput
                                                    style={styles.textInput}
                                                    placeholder="Edit title"
                                                    value={task.text}
                                                    onChangeText={(text) => updateTitle(index, text)}
                                                    onBlur={() => setEditedTitle('')} // Clear editedTitle on blur
                                                    onFocus={() => setEditedTitle(task.text)} // Set editedTitle on focus
                                                />
                                            ) : (
                                                <Text style={styles.taskText}>{task.text}</Text>
                                            )}
                                        </View>

                                        {/* Add the Checkbox on the right side */}
                                        <Checkbox
                                            status={task.checked ? 'checked' : 'unchecked'}
                                            onPress={() => toggleCheckbox(index)}
                                        />
                                    </TouchableOpacity>

                                    {/* Show the description, and make it editable only when expanded */}
                                    <View style={styles.descriptionContainer}>
                                        {task.expanded ? (
                                            <TextInput
                                                style={styles.textInput}
                                                placeholder="Add description"
                                                value={task.description}
                                                onChangeText={(text) => updateDescription(index, text)}
                                                onBlur={() => setEditedDescription('')} // Clear editedDescription on blur
                                                onFocus={() => setEditedDescription(task.description)} // Set editedDescription on focus
                                            />
                                        ) : (
                                            <Text style={styles.taskDescription}>{task.description || "No description"}</Text>
                                        )}
                                    </View>

                                    {task.expanded && (
                                        <TouchableOpacity
                                            style={styles.modalButton}
                                            onPress={() => deleteTask(index)}
                                        >
                                            <Text style={styles.modalButtonText}>Delete Note</Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
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
        borderColor: '#ddd', // Color of the border
        borderBottomWidth: 1,
    },
    taskContent: { flexDirection: 'row', alignItems: 'center', padding: 10, backgroundColor: '#f9f9f9' },
    textContainer: { flex: 1 },
    taskText: { fontSize: 16, fontWeight: 'bold' },
    textInput: { padding: 10, borderColor: '#ddd', borderWidth: 1, borderRadius: 5, marginVertical: 5 },
    descriptionContainer: { borderTopWidth: 1, borderColor: '#ddd', padding: 10 },
    taskDescription: { fontSize: 14, color: '#666' },
    modalButton: { backgroundColor: '#e74c3c', padding: 10, borderRadius: 5 },
    modalButtonText: { color: '#fff', textAlign: 'center' },
    addButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#007bff', padding: 10, borderRadius: 5, margin: 10 },
    addButtonText: { color: '#fff', fontSize: 16, marginLeft: 10 }
});
