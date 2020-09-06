import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';

const ExpensesPage = (props) => {
  const { isAuthenticated } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  }));
  useEffect(() => {
    if (!isAuthenticated) {
      props.history.replace('/');
    }
  }, [isAuthenticated]);
  return (
    <div>
      <h1>Expense Page</h1>
    </div>
  );
};

export default withRouter(ExpensesPage);
