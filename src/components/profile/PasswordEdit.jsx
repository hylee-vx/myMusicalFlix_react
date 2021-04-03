import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const PasswordEdit = props => {
    const [password, setPassword] = useState('');

    const handleInputChange = event => {
        setPassword(event.target.value);
    };

    const handleUpdatePassword = () => {
        let accessToken = localStorage.getItem('token');

        axios({
            method: 'put',
            url: `https://mymusicalflix.herokuapp.com/users/${props.user.id}/password`,
            headers: { Authorization: `Bearer ${accessToken}` },
            data: { Password: password }
        })
            .then(() => {
                console.log('password successfully changed');
            })
            .catch(error => console.log(error + ` error updating password`));
    };

    return (
        <Container>
            <Row className="profile-heading">
                <Col sm={{ span: 6, offset: 3 }}>
                    <h1>Change Password</h1>
                </Col>
            </Row>

            <Row>
                <Col sm={{ span: 6, offset: 3 }}>
                    <Form className="profile-form">
                        <Form.Group controlId="formUsername">
                            <Form.Label className="profile-form-label">New password:</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={password}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Button
                            className="profile-button"
                            variant="primary"
                            onClick={() => {
                                handleUpdatePassword();
                                props.setEditOff();
                            }}
                        >
                            Update password
                        </Button>

                        <Link to={`/users/${props.user.id}`}>
                            <Button
                                className="profile-button"
                                variant="primary"
                                onClick={() => props.setEditOff()}
                            >
                                Cancel
                            </Button>
                        </Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );

};

export default PasswordEdit;