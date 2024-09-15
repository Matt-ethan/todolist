import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    content: {
        flex: 1,
        paddingHorizontal: 20,
    },
    dateContainer: {
        paddingTop: 20,
        alignItems: 'center',
    },
    dateText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    scrollContainer: {
        flex: 1,
        marginTop: 10,
    },
    items: {
        marginTop: 10,
    },
    taskCard: {
        backgroundColor: '#f8f8f8',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    taskContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    taskText: {
        fontSize: 16,
        fontWeight: '500',
    },
    taskDescription: {
        color: '#888',
        marginTop: 5,
    },
    checkboxContainer: {
        padding: 0,
        margin: 0,
    },
    addButton: {
        backgroundColor: '#6200ee',
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',
        marginBottom: 30,
    },
    addButtonText: {
        color: '#ffffff',
        marginLeft: 10,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    textInput: {
        backgroundColor: '#ffffff',
        width: '80%',
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
    },
    modalButton: {
        backgroundColor: '#f44336',
        padding: 10,
        borderRadius: 8,
        marginTop: 10,
    },
    modalButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
});

export default styles;
