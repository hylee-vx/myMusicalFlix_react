import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './Login.scss';

const Login = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        props.onLoggedIn(username);
    };

    // switches account state to false to render Registration view
    const handleToggle = () => {
        props.onToggleLoginRegistration();
    }

    return (
        <Container>
            <Row className="login-reg-heading">
                <Col sm={{ span: 6, offset: 3 }}>
                    <h1>Welcome back to myMusicalFlix!</h1>
                </Col>
            </Row>
            <Row>
                <Col sm={{ span: 6, offset: 3 }}>
                    <Form className="login-reg-form">
                        <Form.Group controlId="formUsername">
                            <Form.Label className="login-reg-form-label">Username:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={event => setUsername(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label className="login-reg-form-label">Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={event => setPassword(event.target.value)}
                            />
                        </Form.Group>
                        <Button className="login-reg-button" variant="primary" block type="submit" onClick={handleSubmit}>Sign in</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col sm={{ span: 6, offset: 3 }}>
                    <p className="login-reg-toggle-text">New to MyMusicalFlix?<span className="login-reg-toggle-click" onClick={handleToggle}>Sign up</span></p>
                </Col>
            </Row>
        </Container >
    );
}

// triggers warning at initial render: no user details, toggle function not called
Login.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    onLoggedIn: PropTypes.func.isRequired,
    onToggleLoginRegistration: PropTypes.func.isRequired
};

export default Login;