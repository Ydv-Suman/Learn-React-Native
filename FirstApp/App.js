import { StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';
import { useState } from 'react';


export default function App() {
  const [enteredGoalText, setEnteredGoalText] = useState('');
  const[courseGoals, setCourseGoals] = useState([]);
  
  function goalInputHandler(enteredText) {
    setEnteredGoalText(enteredText);
  }

  function addGoalhandler() {
    setCourseGoals(currentCourseGoals => [...currentCourseGoals, enteredGoalText]);
  }


  return (
   <View style={styles.appContainer}>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.textInput} 
          placeholder='You course goal!'
          onChangeText={goalInputHandler}/>
        <Button title='Add Goal' onPress={addGoalhandler}/>
      </View>

      <View style={styles.goalContainer}>
        <Text style={styles.goalTitle}>List of Goals...</Text>
        <ScrollView alwaysBounceVertical={false}>
          {courseGoals.map((goal) => (
            <View style={styles.goalItem}>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
            ))}
        </ScrollView>
      </View>

   </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    padding: 60,
    backgroundColor: 'white',
  },
  inputContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc'
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    width: '80%',
    marginRight: 8,
    padding: 8,
  },
  goalContainer: {
    flex: 7,
  },
  goalTitle: {
    color:'Black'
  },
  goalItem: {
    margin: 8,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#5e0acc',
  },
  goalText: {
    color: 'white'
  }
});