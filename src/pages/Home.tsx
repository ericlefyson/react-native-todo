import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

interface editTaskData {
  id: number,
  newTaskTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    var id = new Date().getTime();
    var done = false;
    var isRepeatedTask = tasks.find(element => element.title === newTaskTitle);
    if (isRepeatedTask) {
      Alert.alert(
        "Task já cadastrada",
      "Você não pode cadastrar uma task com o mesmo nome")
    } else {
      var newTask = {
        id: id,
        title: newTaskTitle,
        done: done
      }
      setTasks(oldState => [...oldState, newTask]);
    }

  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map(task => ({ ...task }));
    const foundItem = updatedTasks.find(element => element.id === id);

    if (!foundItem)
    return;

    foundItem.done = !foundItem.done;
    setTasks(updatedTasks);
  }

  function handleEditTask (editTaskData : editTaskData) {
    const {id, newTaskTitle} = editTaskData;
    const currentTasks = tasks.map(task => ({ ...task }));
    const foundItem = currentTasks.find(element => element.id === id);
    if (!foundItem) return;
    foundItem.title = newTaskTitle;
    setTasks(currentTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert (
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [{
        text:"Sim",
        onPress: () => {setTasks (tasks => tasks.filter (filter => filter.id !== id))}
      },{
        text: "Não"
      }]
    )

  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        editTask={handleEditTask}
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})