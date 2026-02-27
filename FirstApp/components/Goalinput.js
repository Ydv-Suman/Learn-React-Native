import { View, Button, TextInput, StyleSheet, Modal, Image} from "react-native";
import { useState } from "react";

function Goalinput(props){
    const [enteredGoalText, setEnteredGoalText] = useState('');

    function goalInputHandler(enteredText) {
        setEnteredGoalText(enteredText);
      }

      function addGoalhandler() {
        props.onAddGoal(enteredGoalText);
        setEnteredGoalText('');
      }

    return(
        <Modal visible={props.visible} animationType="slide">
          <View style={styles.inputContainer}>
            <Image style={styles.image} source={require('../assets/images/goal.png')} />
            <TextInput 
                style={styles.textInput} 
                placeholder='You course goal!'
                value={enteredGoalText}
                onChangeText={goalInputHandler}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <Button title='Add Goal' onPress={addGoalhandler} color='#b180f0'/>
              </View>
              <View style={styles.button}>
                <Button title='Cancel' onPress={props.onCancel} color='#f31282'/>
              </View>
            </View>
          </View>
        </Modal>
    )
}
export default Goalinput;

const styles = StyleSheet.create({
    inputContainer: {
        flex:1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding:8,
        backgroundColor: '#311b6b'
    },
    image: {
      width:100,
      height:100,
      margin: 20
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#e4d0ff',
        backgroundColor: '#e4d0ff',
        color:'#120438',
        borderRadius: 6,
        width: '100%',
        padding: 16,
      },
      buttonContainer: {
        marginTop: 8,
        flexDirection: 'row'
      },
      button: {
        width:'30%',
        marginHoorizontal: 8
      }
})