import {View, StyleSheet} from 'react-native'
import ExpensesSummary from './ExpensesSummary';
import ExpensesList from './ExpensesList';
import { GlobalStyles } from '../../constants/styles';

const DUMMY_EXPENSES =[
    {
        id: 'e1',
        description: 'a pair of shoes',
        amount: 59.99,
        date:new Date('2026-2-14')
    },
    {
        id: 'e2',
        description: 'books',
        amount: 9.39,
        date:new Date('2026-2-19')
    },
    {
        id: 'e3',
        description: 'grocery',
        amount: 19.89,
        date:new Date('2026-2-26')
    },
    {
        id: 'e4',
        description: 'a pair of clothes',
        amount: 79.99,
        date:new Date('2026-2-14')
    },
    {
        id: 'e5',
        description: 'mobile',
        amount: 1099.00,
        date:new Date('2026-1-14')
    },
    {
        id: 'e6',
        description: 'drinks',
        amount: 4.99,
        date:new Date('2025-12-14')
    }
]

function ExpensesOutput({expenses, expensePeriod}) {
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensePeriod}/>
            <ExpensesList expenses={DUMMY_EXPENSES} />
        </View>
    )
}

export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding:20,
        backgroundColor: GlobalStyles.colors.primary700
    }
})