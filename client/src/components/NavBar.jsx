import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar, Container } from 'reactstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  const { isAuthenticated } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  }));
  const dispatch = useDispatch();
  return (
    <Navbar className='navbar-expand-sm navbar-dark bg-dark sticky-top display'>
      <Container>
        {isAuthenticated ? (
          <React.Fragment>
            <div className='col-2'>
              <Link className='navbar-brand' to='/expense'>
                <h3>EXPENSELY</h3>
              </Link>
            </div>
            <div className='collapse navbar-collapse' id='navbar-menu'>
              <ul className='navbar-nav ml-auto'>
                <li className='nav-item'>
                  <Link
                    className='nav-link'
                    onClick={() => dispatch({ type: 'LOGOUT' })}
                    to='/'
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </React.Fragment>
        ) : (
          <Link className='navbar-brand col-12 text-center' to='/'>
            <h3>EXPENSELY</h3>
          </Link>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
