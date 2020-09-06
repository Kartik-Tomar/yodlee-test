import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
} from 'reactstrap';

import { addExpense, updateExpense } from '../redux/actions/expense';

const ExpenseForm = (props) => {
  const { addExpenseStatus } = useSelector((state) => ({
    addExpenseStatus: state.expense.addExpenseStatus,
  }));
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(null);
  const [amount, setAmount] = useState(null);

  const resetClose = () => {
    setDescription('');
    setAmount(null);
    setDate(null);
    setModal(false);
  };

  useEffect(() => {
    if (addExpenseStatus === 'SUCCESS') {
      dispatch({ type: 'ADD_EXPENSE_RESET' });
      resetClose();
    }
  }, [addExpenseStatus]);

  useEffect(() => {
    if (props.exp) {
      setDescription(props.exp.description);
      setAmount(props.exp.amount);
      setDate(props.exp.date.slice(0, 10));
    }
  }, [props.exp]);

  const toggle = () => setModal(!modal);

  const handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      description,
      date,
      amount: parseInt(amount),
    };
    if (props.exp) {
      dispatch(updateExpense({ ...data, id: props.exp._id }));
    } else {
      dispatch(addExpense(data));
    }
  };

  return (
    <div>
      {props.button === 'add' ? (
        <Button
          outline
          size='lg'
          color='secondary'
          className='mx-3'
          onClick={toggle}
        >
          Add Expenses
        </Button>
      ) : (
        <Button outline color='primary' onClick={toggle}>
          Edit
        </Button>
      )}
      <Modal isOpen={modal} toggle={toggle}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>{props.heading}</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for='exampleText' sm={2}>
                Description
              </Label>
              <Input
                value={description}
                type='textarea'
                name='text'
                id='exampleText'
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for='exampleDate'>Date</Label>
              <Input
                value={date}
                type='date'
                name='date'
                id='exampleDate'
                onChange={(e) => setDate(e.target.value)}
                placeholder='date placeholder'
                required
              />
            </FormGroup>

            <FormGroup>
              <Label for='exampleAmount'>Amount</Label>
              <InputGroup>
                <InputGroupAddon addonType='prepend'>₹</InputGroupAddon>
                <Input
                  value={amount}
                  placeholder='00000'
                  type='number'
                  id='exampleAmount'
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </InputGroup>
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button type='submit' color='primary'>
              {props.exp ? 'Edit' : 'Add'}
            </Button>{' '}
            <Button color='secondary' onClick={resetClose}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default ExpenseForm;
