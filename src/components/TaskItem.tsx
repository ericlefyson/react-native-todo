import React, { useEffect, useRef, useState } from "react";
import {Image, TouchableOpacity, View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import penIcon from '../assets/icons/pen/pen.png';
import { Task } from '../components/TasksList';
import {editTaskData} from '../components/TasksList';
interface itemPropsI {
    itemProps: {
        index: number,
        item: Task,
        toggleTaskDone: (id: number) => void;
        removeTask: (id: number) => void;
        editTask: (editTaskData: editTaskData) => void;
    }
}

export function TaskItem ({itemProps} : itemPropsI) {
    const {index, item, toggleTaskDone, removeTask, editTask} = itemProps;
    const [isEditing, setIsEdit] = useState(false);
    const [editedValue, setEditedValue] = useState(item.title);
    const textInputRef = useRef<TextInput>(null);

    function handleStartEditing () {
        setIsEdit(true);
    }

    function handleCancelEditing () {
        setEditedValue(item.title);
        setIsEdit(false);
    }

    function handleSubmitEditing () {
        const editTaskData = {
            id: item.id, 
            newTaskTitle: editedValue
        };
        editTask(editTaskData);
        setIsEdit(false);
    }

    useEffect(() => {
        if (textInputRef.current) {
          if (isEditing) {
            textInputRef.current.focus();
          } else {
            textInputRef.current.blur();
          }
        }
      }, [isEditing])

    return (
        <>
        <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress= {() => toggleTaskDone(item.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={item.done === true ? styles.taskMarkerDone : styles.taskMarker}
          >
            { item.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            value={editedValue} onChangeText={setEditedValue}
            editable={isEditing} onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
            style={item.done === true? styles.taskTextDone : styles.taskText } 
          >
          </TextInput>
        </TouchableOpacity>
      </View>

       <View style={{flexDirection:"row"}}>
        {
            isEditing ? 
            <TouchableOpacity
            style={{paddingHorizontal: 24}}
            onPress={handleCancelEditing}>
             <Icon 
                name="x"
                size={24}
                color="#B2B2B2"
              />
            </TouchableOpacity>
            : <TouchableOpacity
                testID={`pen-${index}`}
                style={{paddingHorizontal: 24}}
                onPress={handleStartEditing}>
                    <Image source={penIcon}/>
            </TouchableOpacity>
        }

        <View style={styles.verticalBar}/>

       <TouchableOpacity
       disabled={isEditing}
        testID={`trash-${index}`}
        style={ [{paddingHorizontal: 24} , isEditing ? styles.disabledButton : styles.activeButton]}
        onPress = {() => removeTask(item.id)}
      >
        <Image source={trashIcon} />
      </TouchableOpacity>
       </View>

      </>
    )
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    verticalBar: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)'
    },
    activeButton: {
        opacity: 1,
    },
    disabledButton: {
        opacity: 0.2,
    }
  })