import { useState } from 'react';
import { 
  StyleSheet,  
  View, 
  Button, 
  Text,
  TextInput, 
  FlatList,
} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import GoalItem from './components/GoalItem';
import Goalinput from './components/Goalinput';


export default function App() {
  const[courseGoals, setCourseGoals] = useState([]);
  const[modalIsVisible, setModalIsVisible] = useState(false);

  function addGoalhandler(enteredGoalText) {
    setCourseGoals(currentCourseGoals => [
      ...currentCourseGoals, 
      {text: enteredGoalText, id:Math.random().toString()}
    ]);
    endAddGoalHandler();
  }

  function delteGoalHandler(id) {
    setCourseGoals(currentCourseGoals => {
      return currentCourseGoals.filter((goal) => goal.id !== id);
    });
  }

  function startAddGoalHandler () {
    setModalIsVisible(true);
  }

  function endAddGoalHandler () {
    console.log('Cancel pressed or modal closed');
    setModalIsVisible(false);
  }


  return (
    <>
      <StatusBar style='light' />
        <View style={styles.appContainer}>
          <Button title='Add New Goal' color={"#dca8e6ff"} onPress={startAddGoalHandler}/>
          <Goalinput visible={modalIsVisible} onAddGoal = {addGoalhandler} onCancel = {endAddGoalHandler}/>

            <View style={styles.goalContainer}>
              <Text style={styles.goalTitle}>List of Goals...</Text>
              <FlatList 
                data = {courseGoals}
                renderItem={itemData => {
                  return ( <GoalItem 
                    text={itemData.item.text} 
                    id={itemData.item.id}
                    onDeleteItem = {delteGoalHandler} />
                    );
                  }}
                />
            </View>
        </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 60,
    backgroundColor: 'white',
    backgroundColor: '#1e085a'
  },
  goalContainer: {
    flex: 7,
  },
  goalTitle: {
    color:'Black'
  }
});