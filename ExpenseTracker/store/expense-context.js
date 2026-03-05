import { createContext, useReducer } from "react";


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
    },
    {
        id: 'e7',
        description: 'a pair of shoes',
        amount: 59.99,
        date:new Date('2026-2-14')
    },
    {
        id: 'e8',
        description: 'a pair of shoes',
        amount: 59.99,
        date:new Date('2026-2-14')
    },
    {
        id: 'e9',
        description: 'a pair of shoes',
        amount: 59.99,
        date:new Date('2026-2-14')
    },
    {
        id: 'e10',
        description: 'a pair of shoes',
        amount: 59.99,
        date:new Date('2026-2-14')
    }
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) => {},
    deleteExpese: (id) => {},
    updateExpense: (id, {description, amount, date}) => {}
});

function expensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString()
            return [{...action.payload, id:id}, ...state]

        case 'UPDATE':
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense = state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.data}
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] = updatedItem;
            return updatedExpenses;

        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload);
        
            default:
                return state;
    }
}


function ExpenseContextProvider({children}) {
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expensesData) {
        dispatch({type: 'ADD', payload: expensesData});
    }

    function deleteExpese(id) {
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense(id, expensesData) {
        dispatch({type: 'UPDATE', payload: {id: id, data: expensesData} });
    }
    
    const value ={
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpese: deleteExpese,
        updateExpense: updateExpense
    };

    return(
        <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
    )
}
export default ExpenseContextProvider;