import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ProfileEdit = props => {
    const [user, setUser] = useState(props.user);

    const handleInputChange = event => {
        const { name, value } = event.target;

        setUser({ ...user, [name]: value });
        console.log(user.username, user.id);
    };

    const handleUpdateUser = () => {
        let accessToken = localStorage.getItem('token');

        axios({
            method: 'put',
            url: `https://mymusicalflix.herokuapp.com/users/${user.id}`,
            headers: { Authorization: `Bearer ${accessToken}` },
            data: {
                Username: user.username,
                Email: user.email,
                DateOfBirth: user.dateOfBirth
            }
        })
            .then(response => {
                const data = response.data;
                setUser({
                    username: data.Username,
                    email: data.Email,
                    dateOfBirth: data.DateOfBirth.slice(0, 10)
                });
            })
            .catch(error => console.log(error + ` error updating user ${user.username}`));
    };

    return (
        <Container>
            <Row className="profile-heading">
                <Col sm={{ span: 6, offset: 3 }}>
                    <h1>Profile</h1>
                </Col>
            </Row>

            <Row>
                <Col sm={{ span: 6, offset: 3 }}>
                    <Form className="profile-form">
                        <Form.Group controlId="formUsername">
                            <Form.Label className="profile-form-label">Username:</Form.Label>
                            <Form.Control
                                type="text"
                                name="username"
                                value={user.username}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label className="profile-form-label">Email:</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDateOfBirth">
                            <Form.Label className="profile-form-label">Date of Birth:</Form.Label>
                            <Form.Control
                                type="date"
                                name="dateOfBirth"
                                value={user.dateOfBirth}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Button
                            className="profile-button"
                            variant="primary"
                            onClick={() => {
                                handleUpdateUser();
                                props.updateProfile(user);
                            }}
                        >
                            Update profile
                        </Button>

                        <Link to={`/users/${user.id}/password`}>
                            <Button
                                className="profile-button"
                                variant="primary"
                            >
                                Update password
                            </Button>
                        </Link>

                        <Link to={"/"}>
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
    )
};

export default ProfileEdit;