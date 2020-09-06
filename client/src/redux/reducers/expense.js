const initialState = {
  addExpenseStatus: '',
  getExpenseStatus: '',
  myExpense: [],
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case 'ADD_EXPENSE_PENDING':
      return {
        ...state,
        addExpenseStatus: 'PENDING',
      };
    case 'ADD_EXPENSE_FAILURE':
      return {
        ...state,
        addExpenseStatus: 'FAILURE',
      };
    case 'ADD_EXPENSE_SUCCESS':
      return {
        ...state,
        addExpenseStatus: 'SUCCESS',
      };
    case 'ADD_EXPENSE_RESET':
      return {
        ...state,
        addExpenseStatus: '',
      };
    case 'GET_EXPENSE_PENDING':
      return {
        ...state,
        getExpenseStatus: 'PENDING',
      };
    case 'GET_EXPENSE_FAILURE':
      return {
        ...state,
        getExpenseStatus: 'FAILURE',
      };
    case 'GET_EXPENSE_SUCCESS':
      return {
        ...state,
        getExpenseStatus: 'SUCCESS',
        myExpense: payload,
      };
    default:
      return state;
  }
}
