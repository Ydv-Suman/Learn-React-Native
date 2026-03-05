import { useContext, useLayoutEffect } from 'react';
import { View, StyleSheet} from 'react-native'
import IconButton from '../components/UI/iconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expense-context';
import ExpenseForm from '../components/manageExpense/ExpenseForm';


function ManageExpenses({route, navigation}) {

    const expenseCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expenseCtx.expenses.find((expense) => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        expenseCtx.deleteExpese(editedExpenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler(expenseData) {
        if (isEditing){
            expenseCtx.updateExpense(editedExpenseId, expenseData);
        } else {
            expenseCtx.addExpense(expenseData);
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                onCancel={cancelHandler}
                onSubmit={confirmHandler}
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                defaultValues={selectedExpense}
            />
            
            {isEditing && 
                <View style={styles.deleteContainer}>
                    <IconButton icon='trash' 
                                color={GlobalStyles.colors.error500} 
                                size={26} 
                                onPress={deleteExpenseHandler} 
                    />
                </View>
            }
        </View>
    )
}
export default ManageExpenses;

const styles =StyleSheet.create({
    container: {
        flex:1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800
    },
    deleteContainer: {
        marginTop:16,
        paddingTop:8,
        borderWidth:2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
  }  
})