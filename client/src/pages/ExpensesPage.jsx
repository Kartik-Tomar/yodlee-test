import React, { useState, useEffect } from 'react';
import { Container, Row, Badge, Button, Table } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ExpenseForm from '../components/ExpenseForm';
import { getExpense, deleteExpense } from '../redux/actions/expense';

const ExpensesPage = (props) => {
  const { isAuthenticated, user, myExpense } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user,
    myExpense: state.expense.myExpense,
  }));
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (!isAuthenticated) {
      props.history.replace('/');
    } else {
      dispatch(getExpense());
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  const deleteEx = (e) => {
    dispatch(deleteExpense({ id: e.target.id }));
  };

  return (
    <Container>
      <Row className='my-5'>
        <h2 className='col-md-9'>
          <Badge color='secondary'>{userData.email}</Badge>
        </h2>
        <ExpenseForm button='add' heading='Add Expense' />
      </Row>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Date (YYYY-MM-DD)</th>
            <th>Amount</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {myExpense.map((item, ind) => (
            <tr key={ind}>
              <th scope='row'>{ind + 1}</th>
              <td>{item.description}</td>
              <td>{item.date.slice(0, 10)}</td>
              <td>₹ {item.amount}</td>
              <td>
                <ExpenseForm button='edit' heading='Edit Expense' exp={item} />
              </td>
              <td>
                <Button outline color='danger' id={item._id} onClick={deleteEx}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default withRouter(ExpensesPage);
