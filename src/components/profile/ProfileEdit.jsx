import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import NavLink from 'react-bootstrap/NavLink';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';

import './Profile.scss';

const ProfileEdit = props => {
    const [user, setUser] = useState(props.user);
    if (!user) return null;
    // const [favouriteMovies, setFavouriteMovies] = useState(props.favouriteMovies);
    const { movies, favouriteMovies = [] } = props;

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
                DateOfBirth: user.dateOfBirth,
                FavouriteMovies: user.favouriteMovies
            }
        })
            .then(response => {
                const data = response.data;
                setUser({
                    username: data.Username,
                    email: data.Email,
                    dateOfBirth: data.DateOfBirth.slice(0, 10),
                    favouriteMovies: data.FavouriteMovies
                });
            })
            .catch(error => console.log(error + ` error updating user ${user.username}`));
    };

    const favouriteMovieData = movies.filter(m =>
        favouriteMovies.find(f =>
            f === m._id));

    return (
        <Container className="profile">
            <Row>
                <Col sm={{ span: 8, offset: 2 }}>
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
                            <NavLink as={Link} to={`/users/${user.id}`} className="active" onClick={() => props.setEditOn()}>
                                Edit
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink as={Link} to={`/users/${user.id}/password`}>
                                Password
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink as={Link} to={`/users/${user.id}/delete`}>
                                Account
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                </Col>
            </Row>

            <Row>
                <Col sm={{ span: 8, offset: 2 }}>
                    <Form className="profile-form">
                        <Form.Group controlId="formUsername">
                            <Form.Label className="profile-form-label">Username:</Form.Label>
                            <Form.Control
                                className="profile-form-value"
                                type="text"
                                name="username"
                                value={user.username}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label className="profile-form-label">Email:</Form.Label>
                            <Form.Control
                                className="profile-form-value"
                                type="email"
                                name="email"
                                value={user.email}
                                onChange={handleInputChange}
                            />
                        </Form.Group>

                        <Form.Group controlId="formDateOfBirth">
                            <Form.Label className="profile-form-label">Date of Birth:</Form.Label>
                            <Form.Control
                                className="profile-form-value"
                                type="date"
                                name="dateOfBirth"
                                value={user.dateOfBirth}
                                onChange={handleInputChange}
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
                    ? <Col sm={{ span: 8, offset: 2 }}>
                        <p className="no-favourites-text">You have no favourite movies</p>
                    </Col>
                    : favouriteMovieData.map(m => {
                        return (
                            <Col sm={6} md={4} lg={3}>
                                <Card>
                                    <Card.Img variant="top" src={m.ImagePath} />
                                    <Card.Body className="favourites-body">
                                        <Card.Title className="favourites-title">{m.Title}</Card.Title>
                                        <Card.Subtitle className="favourites-release-year">{new Date(m.ReleaseYear).getFullYear()}</Card.Subtitle>
                                    </Card.Body>
                                    <Card.Footer className="border-top-0">
                                        <Button
                                            block
                                            className="favourites-button"
                                            variant="primary"
                                            onClick={() => props.handleDeleteFavourite(user, m._id)}
                                        >
                                            Remove
                                        </Button>
                                    </Card.Footer>
                                </Card>
                            </Col>
                        );
                    })
                }
            </Row>

            <Row className="justify-content-center">
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
            </Row>
        </Container >
    );
};

export default ProfileEdit;