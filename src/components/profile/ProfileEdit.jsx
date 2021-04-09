import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Card } from 'react-bootstrap';

const ProfileEdit = props => {
    const [user, setUser] = useState(props.user);
    const [favouriteMovies, setFavouriteMovies] = useState(props.favouriteMovies);
    const movies = props.movies;

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

            <Row>
                {favouriteMovies.length === 0
                    ? <h5>You have no favourite movies</h5>
                    : favouriteMovieData.map(m => {
                        return (
                            <Col md={3}>
                                <Card>
                                    <Card.Img variant="top" src={m.ImagePath} />
                                    <Card.Body>
                                        <Card.Title>{m.Title}</Card.Title>
                                        <Card.Subtitle>{new Date(m.ReleaseYear).getFullYear()}</Card.Subtitle>
                                        <Button
                                            className="favourite-movie-btn float-right"
                                            variant="primary"
                                            onClick={() => props.handleDeleteFavourite(user, m._id)}
                                        >
                                            Remove
                                    </Button>
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

export default ProfileEdit;