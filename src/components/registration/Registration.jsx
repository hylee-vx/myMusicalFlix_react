import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import './Registration.scss';

const Registration = props => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const handleRegistration = event => {
        event.preventDefault();

        axios.post('https://mymusicalFlix.herokuapp.com/users', {
            Username: username,
            Password: password,
            Email: email,
            DateOfBirth: dateOfBirth
        })
            .then(() => {
                console.log(`successfully registered user`);
                props.onRegistration();
            })
            .catch(error => console.log(`Error registering the user: ${error}`));
    };

    return (
        <Container>
            <Row className="login-reg-heading">
                <Col sm={{ span: 6, offset: 3 }}>
                    <h1>Welcome to myMusicalFlix!</h1>
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
                        <Form.Group controlId="formEmail">
                            <Form.Label className="login-reg-form-label">Email:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={event => setEmail(event.target.value)}
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
                        <Form.Group controlId="formDateOfBirth">
                            <Form.Label className="login-reg-form-label">Date of Birth:</Form.Label>
                            <Form.Control
                                type="date"
                                value={dateOfBirth}
                                onChange={event => setDateOfBirth(event.target.value)}
                            />
                        </Form.Group>
                        <Button
                            className="login-reg-button"
                            variant="primary"
                            block type="submit"
                            onClick={handleRegistration}
                        >
                            Sign up
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col sm={{ span: 6, offset: 3 }}>
                    <p className="login-reg-toggle-text">I have an account!<span className="login-reg-toggle-click">
                        <Link to={"/login"}>
                            <Button className="link-to-login" variant="link">
                                Sign in
                            </Button>
                        </Link>
                    </span></p>
                </Col>
            </Row>
        </Container>
    );
};

// triggers warning at initial render: no user details
Registration.propTypes = {
    onRegistration: PropTypes.func.isRequired,
};

export default Registration;