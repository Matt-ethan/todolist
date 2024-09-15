import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f5f5f5', 
    },
    content: {
        flex: 1,
        width: '100%',
        paddingHorizontal: 20,
        paddingTop: 20, 
    },
    dateContainer: {
        alignItems: 'center',
        marginBottom: 16, 
    },
    dateText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333', 
    },
    items: {
        width: '100%',
        alignItems: 'center',
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333333', 
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ffffff', 
        marginBottom: 16,
    },
    addButtonText: {
        color: '#ffffff', 
        marginLeft: 8,
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
    },
    taskCard: {
        width: '90%',
        backgroundColor: '#ffffff', 
        padding: 16,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#dddddd', 
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    taskText: {
        fontSize: 16,
        color: '#000000', 
    },
    taskDescription: {
        fontSize: 14,
        color: '#666666', 
        marginTop: 4,
    },
    labelsContainer: {
        position: 'absolute',
        bottom: 16,
        left: 16,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    label: {
        backgroundColor: '#dddddd', 
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginRight: 4,
        fontSize: 12,
        color: '#333333', 
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)', 
        padding: 20,
    },
    modalButton: {
        backgroundColor: '#ffffff', 
        padding: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#333333', 
        marginBottom: 12,
        width: '100%', 
    },
    modalButtonText: {
        fontSize: 18,
        color: '#333333', 
        textAlign: 'center', 
    },
    addLabelContainer: {
        marginBottom: 12,
    },
    textInput: {
        height: 40,
        width: 200,
        borderColor: '#cccccc', 
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 8,
        marginBottom: 8,
        backgroundColor: '#ffffff', 
    },
});

export default styles;
