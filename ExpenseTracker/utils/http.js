import axios from 'axios'

const DB_URL = 'https://expense-tracker-343ab-default-rtdb.firebaseio.com'

export async function storeExpense(expenseData) {
    const response = await axios.post( DB_URL + '/expense.json',
        expenseData
    );
    const id =  response.data.name;
    return id;
} 

export async function fetchExpenses() {
    const response = await axios.get(DB_URL + '/expense.json');
    const expenses = []

    if (!response.data) {
        return expenses;
    }

    for (const key in response.data) {
        const expenseObject = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        };
        expenses.push(expenseObject)
    }
    return expenses;
}

export function updateExpense(id, expenseData) {
    return axios.put(DB_URL + `/expense/${id}.json`, expenseData);
}

export function deleteExpense(id) {
    return axios.delete(DB_URL + `/expense/${id}.json`)
}