import axios from 'axios';

// Get User Expenses
export const getExpense = () => async (dispatch) => {
  dispatch({ type: 'GET_EXPENSE_PENDING' });
  try {
    const res = await axios.get('api/expenses');
    dispatch({ type: 'GET_EXPENSE_SUCCESS', payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({ type: 'GET_EXPENSE_FAILURE' });
    console.log(errors);
    if (errors) {
      console.log(errors);
    }
  }
};

// Add Expense
export const addExpense = (data) => async (dispatch) => {
  dispatch({ type: 'ADD_EXPENSE_PENDING' });
  try {
    const res = await axios.post('api/expenses', data);
    dispatch({ type: 'ADD_EXPENSE_SUCCESS' });
    dispatch(getExpense());
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({ type: 'ADD_EXPENSE_FAILURE' });
    console.log(errors);
    if (errors) {
      console.log(errors);
    }
  }
};

// Update Expense
export const updateExpense = (data) => async (dispatch) => {
  dispatch({ type: 'ADD_EXPENSE_PENDING' });
  try {
    const res = await axios.put('api/expenses', data);
    dispatch({ type: 'ADD_EXPENSE_SUCCESS' });
    dispatch(getExpense());
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch({ type: 'ADD_EXPENSE_FAILURE' });
    console.log(errors);
    if (errors) {
      console.log(errors);
    }
  }
};

// delete Expense
export const deleteExpense = (data) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/expenses/?id=${data.id}`);
    console.log(res.data);
    dispatch(getExpense());
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(errors);
    if (errors) {
      console.log(errors);
    }
  }
};
