import { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { ExpensesContext } from '../store/expense-context';
import { getDataMinusDays } from '../utils/date';
import { fetchExpenses } from '../utils/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';
import ErrorOverlay from '../components/UI/ErrorOverlay';


function RecentExpenses() {
    const expenseCtx = useContext(ExpensesContext);
    const [isFetching, setIsFetching] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                expenseCtx.setExpenses(expenses);
            } catch (error) {
                setError('Could not fetch expenses');
            }
            setIsFetching(false);
        }
        getExpenses();
    }, []);

    function errorHandler() {
        setError(null);
    }

    if (error && !isFetching) {
        return <ErrorOverlay message={error} onConfirm={errorHandler}/>
    }

    if (isFetching) {
        return <LoadingOverlay />
    }
    const recentExpenses = expenseCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDataMinusDays(today, 7);

        return expense.date > date7DaysAgo;
    })


    return <ExpensesOutput expenses={recentExpenses} expensePeriod="Last 7 days" fallbackText="no expenses registered"/>
}
export default RecentExpenses;