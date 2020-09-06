import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classnames from 'classnames';
import PhoneInput from 'react-phone-input-2';
import { withRouter } from 'react-router-dom';

import { register } from '../redux/actions/auth';

import './SignUp.scss';

const SignUp = () => {
  const [data, setData] = useState({
    mobileNumber: '',
    email: '',
    password: '',
    password2: '',
  });
  const [errors, setErrors] = useState({});
  // Redux Actions and State
  const { signupErrors } = useSelector((state) => ({
    signupErrors: state.auth.signupErrors,
  }));
  const dispatch = useDispatch();

  useEffect(() => {
    if (signupErrors) {
      setErrors(signupErrors);
    }
  }, [signupErrors]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (data.mobileNumber === '') {
      setErrors({
        mobileNumber: 'Mobile Number is mandatory',
      });
    } else if (data.password !== data.password2) {
      setErrors({
        password2: "Confirm Password doesn't match's",
      });
    } else {
      let data1 = {
        mobileNumber: parseInt(data.mobileNumber),
        email: data.email,
        password: data.password,
      };
      console.log(data1);
      setErrors({});
      dispatch(register(data1));
    }
  };

  const handleChange = (event) => {
    let newData = { ...data };
    const { name, value } = event.target;
    newData[name] = value;
    setData(newData);
  };

  return (
    <div className='card-body p-5'>
      <h5 className='card-title display-4'>SIGN UP</h5>
      <form noValidate onSubmit={handleSubmit}>
        <div className='form-group'>
          <PhoneInput
            value={data.mobileNumber}
            onChange={(phone) => {
              let newData = { ...data };
              newData.mobileNumber = phone;
              setData(newData);
            }}
            placeholder='Enter phone number'
            required
          />
          {errors.mobileNumber && (
            <small className='text-left text-danger'>
              {errors.mobileNumber}
            </small>
          )}
        </div>
        <div className='form-group'>
          <input
            type='email'
            className={classnames('form-control', {
              'is-invalid': errors.email,
            })}
            placeholder='Email Address'
            name='email'
            value={data.email}
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
            value={data.password}
            onChange={handleChange}
          />
          {errors.password && (
            <div className='invalid-feedback text-left'>{errors.password}</div>
          )}
        </div>
        <div className='form-group'>
          <input
            type='password'
            className={classnames('form-control', {
              'is-invalid': errors.password2,
            })}
            placeholder='Confirm Password'
            name='password2'
            value={data.password2}
            onChange={handleChange}
          />
          {errors.password2 && (
            <div className='invalid-feedback text-left'>{errors.password2}</div>
          )}
        </div>
        <input type='submit' className='btn btn-info btn-block mt-4' />
      </form>
    </div>
  );
};

export default withRouter(SignUp);
