import { useContext, useLayoutEffect, useState } from 'react';
import { View, StyleSheet} from 'react-native'
import IconButton from '../components/UI/iconButton';
import { GlobalStyles } from '../constants/styles';
import { ExpensesContext } from '../store/expense-context';
import ExpenseForm from '../components/manageExpense/ExpenseForm';
import { storeExpense, updateExpense, deleteExpense } from '../utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';


function ManageExpenses({route, navigation}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState();
    const expenseCtx = useContext(ExpensesContext);

    const editedExpenseId = route.params?.expenseId;
    const isEditing = !!editedExpenseId;

    const selectedExpense = expenseCtx.expenses.find((expense) => expense.id === editedExpenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        });
    }, [navigation, isEditing]);

    async function deleteExpenseHandler() {
        setIsSubmitting(true);
        setError(null);
        try {
            await deleteExpense(editedExpenseId);
            expenseCtx.deleteExpese(editedExpenseId);
            navigation.goBack();
        } catch (error) {
            setError('Could not delete expense - Please try again!')
        } finally {
            setIsSubmitting(false);
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        setError(null);
        try {
            if (isEditing){
                expenseCtx.updateExpense(editedExpenseId, expenseData);
                await updateExpense(editedExpenseId, expenseData);
            } else {
                const id = await storeExpense(expenseData);
                expenseCtx.addExpense({...expenseData, id:id});
            }
            navigation.goBack();
        } catch (error) {
            setError('Could not save expense - Please try again!');
        } finally {
            setIsSubmitting(false);
        }
    }

    function errorHandler() {
        setError(null);
    }
    if (error && !isSubmitting) {
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }

    if (isSubmitting){
        return <LoadingOverlay />
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