import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './Profile.scss';

const ProfileView = props => {
    const { user, movies, favouriteMovies = [] } = props;
    if (!user) return null;

    const favouriteMovieData = movies.filter(m =>
        favouriteMovies.find(f =>
            f === m._id));

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
                            <NavLink as={Link} to={`/users/${user.id}`} className="active">
                                <Button
                                    className="profile-tab active"
                                    variant="link"
                                    onClick={() => props.setEditOff()}
                                >
                                    View
                                    </Button>
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink as={Link} to={`/users/${user.id}`}>
                                <Button
                                    className="profile-tab"
                                    variant="link"
                                    onClick={() => props.setEditOn()}
                                >
                                    Edit
                                    </Button>
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink as={Link} to={`/users/${user.id}/password`}>
                                <Button
                                    className="profile-tab"
                                    variant="link"
                                >
                                    Password
                                    </Button>
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink as={Link} to={`/users/${user.id}/delete`}>
                                <Button
                                    className="profile-tab"
                                    variant="link"
                                >
                                    Account
                                    </Button>
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>

            <Row>
                <Col sm={{ span: 8, offset: 2 }}>
                    <Form>
                        <Form.Group controlId="formUsername">
                            <Form.Label className="profile-form-label">Username:</Form.Label>
                            <Form.Control
                                readOnly
                                className="profile-form-value"
                                type="text"
                                name="username"
                                value={user.username}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label className="profile-form-label">Email:</Form.Label>
                            <Form.Control
                                readOnly
                                className="profile-form-value"
                                type="email"
                                name="email"
                                value={user.email}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDateOfBirth">
                            <Form.Label className="profile-form-label">Date of Birth:</Form.Label>
                            <Form.Control
                                readOnly
                                className="profile-form-value"
                                type="date"
                                name="date"
                                value={user.dateOfBirth}
                            />
                        </Form.Group>
                    </Form>
                </Col>
            </Row>

            <Row className="favourites">
                <Col sm={{ span: 8, offset: 2 }}>
                    <h3 className="subheading">Favourite Movies</h3>
                </Col>
            </Row>
            <Row>
                {favouriteMovies.length === 0
                    ? <h5>You have no favourite movies</h5>
                    : favouriteMovieData.map(m => {
                        return (
                            <Col sm={6} md={4} lg={3}>
                                <Card>
                                    <Card.Img variant="top" src={m.ImagePath} />
                                    <Card.Body>
                                        <Card.Title className="title">{m.Title}</Card.Title>
                                        <Card.Subtitle className="release-year">{new Date(m.ReleaseYear).getFullYear()}</Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            </Col>
                        );
                    })
                }
            </Row>
        </Container>
    );
};

export default ProfileView;