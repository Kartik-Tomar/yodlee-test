import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import SignUp from '../components/SignUp';
import Login from '../components/Login';
import { withRouter } from 'react-router-dom';

const LandingPage = (props) => {
  const { isAuthenticated } = useSelector((state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  }));
  useEffect(() => {
    if (isAuthenticated) {
      props.history.replace('/expense');
    }
  }, [isAuthenticated]);
  return (
    <Container>
      <Row>
        <Col md='6'>
          <SignUp />
        </Col>
        <Col>
          <Login />
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(LandingPage);
