import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ProfileView = props => {
    const { user } = props;

    // add warning before delete request fulfulled
    const handleDeleteUser = () => {
        let accessToken = localStorage.getItem('token');
        axios({
            method: 'delete',
            url: `https://mymusicalflix.herokuapp.com/users/${user.id}`,
            headers: { Authorization: `Bearer ${accessToken}` }
        })
            .then(() => {
                console.log('user deleted');
            })
            .catch(error => error + ` error deleting user ${user.username}`);
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
                                readOnly
                                type="text"
                                name="username"
                                value={user.username}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label className="profile-form-label">Email:</Form.Label>
                            <Form.Control
                                readOnly
                                type="email"
                                name="email"
                                value={user.email}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDateOfBirth">
                            <Form.Label className="profile-form-label">Date of Birth:</Form.Label>
                            <Form.Control
                                readOnly
                                type="text"
                                name="date"
                                value={user.dateOfBirth}
                            />
                        </Form.Group>

                        <Button
                            className="profile-button"
                            variant="primary"
                        // onClick={() => props.logic for rendering profile edit}
                        >
                            Edit profile
                        </Button>

                        <Link to={"/"}>
                            <Button
                                className="profile-button"
                                variant="primary"
                                onClick={() => {
                                    handleDeleteUser();
                                    props.onLoggedOut();
                                }}
                            >
                                Delete account
                            </Button>
                        </Link>

                        <Link to={"/"}>
                            <Button
                                className="profile-button"
                                variant="primary"
                            >
                                Back to movies
                            </Button>
                        </Link>

                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileView;