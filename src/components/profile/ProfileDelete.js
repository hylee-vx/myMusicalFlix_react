import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import './Profile.scss';

const ProfileDelete = props => {
    const { user } = props;
    if (!user) return null;

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleDeleteUser = () => {
        handleClose();

        let accessToken = localStorage.getItem('token');
        axios({
            method: 'delete',
            url: `https://mymusicalflix.herokuapp.com/users/${user.id}`,
            headers: { Authorization: `Bearer ${accessToken}` }
        })
            .then(() => {
                console.log('user deleted');
                props.onLoggedOut();
            })
            .catch(error => error + ` error deleting user ${user.username}`);
    };

    return (
        <Container className="profile">
            <Row>
                <Col sm={{ span: 6, offset: 3 }}>
                    <h1 className="profile-heading">Profile</h1>
                </Col>
            </Row>

            <Row className="profile-navbar">
                <Col sm={{ span: 10, offset: 1 }}>
                    <Nav fill variant="tabs">
                        <Nav.Item>
                            <NavLink as={Link} to={`/users/${user.id}`} onClick={() => props.setEditOff()}>
                                View
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink as={Link} to={`/users/${user.id}`} onClick={() => props.setEditOn()}>
                                Edit
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink as={Link} to={`/users/${user.id}/password`}>
                                Password
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink as={Link} to={`/users/${user.id}/delete`} className="active">
                                Account
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>

            <Row>
                <Col sm={{ span: 8, offset: 2 }} className="account-setting">
                    <h5 className="profile-form-label">Delete account</h5>
                    <p>
                        Delete your account and all your account data.
                    </p>
                    <Button className="profile-button" variant="primary" onClick={handleShow}>
                        Delete account
                    </Button>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Permanently delete account</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>We are very sad to see you go but we hope myMusicalFlix brought you some joy.
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Cancel</Button>
                            {/* Link below a stopgap */}
                            <Link to={"/"}>
                                <Button
                                    variant="primary"
                                    className="modal-button"
                                    onClick={handleDeleteUser}
                                >
                                    Confirm
                                </Button>
                            </Link>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
        </Container >
    );
};

export default ProfileDelete;