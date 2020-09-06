import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import { withRouter } from 'react-router-dom';

import { login } from '../redux/actions/auth';

const Login = () => {
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  //Redux Actions and State
  const { loginErrors } = useSelector((state) => ({
    loginErrors: state.auth.loginErrors,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginErrors) {
      setErrors(loginErrors);
    }
  }, [loginErrors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({});
    console.log(data);

    dispatch(login(data));
  };

  const handleChange = (event) => {
    let newData = { ...data };
    const { name, value } = event.target;
    newData[name] = value;
    setData(newData);
  };

  return (
    <div className='card-body p-5'>
      <h5 className='card-title display-4'>LOG IN</h5>
      <form noValidate onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='email'
            className={classnames('form-control', {
              'is-invalid': errors.email,
            })}
            placeholder='Email Address'
            name='email'
            onChange={handleChange}
          />
          {errors.email && (
            <div className='invalid-feedback text-left'>{errors.email}</div>
          )}
        </div>
        <div className='form-group'>
          <input
            type='password'
            className={classnames('form-control', {
              'is-invalid': errors.password,
            })}
            placeholder='Password'
            name='password'
            onChange={handleChange}
          />
          {errors.password && (
            <div className='invalid-feedback text-left'>{errors.password}</div>
          )}
        </div>
        <input type='submit' className='btn btn-info btn-block mt-4' />
      </form>
    </div>
  );
};

export default withRouter(Login);
