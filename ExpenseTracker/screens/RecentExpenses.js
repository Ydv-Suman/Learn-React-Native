import { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expense-context';
import { getDataMinusDays } from '../utils/date';


function RecentExpenses() {
    const expenseCtx = useContext(ExpensesContext);

    const recentExpenses = expenseCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDataMinusDays(today, 7);

        return expense.date > date7DaysAgo;
    })


    return <ExpensesOutput expenses={recentExpenses} expensePeriod="Last 7 days" fallbackText="no expenses registered"/>
}
export default RecentExpenses;