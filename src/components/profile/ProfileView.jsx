import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

const ProfileView = props => {
    const { user, movies, favouriteMovies } = props;

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
                props.onLoggedOut();
            })
            .catch(error => error + ` error deleting user ${user.username}`);
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
                            onClick={() => props.setEditOn()}
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

            <Row>
                {favouriteMovies.length === 0
                    ? <h5>You have no favourite movies</h5>
                    : favouriteMovieData.map(m => {
                        return (
                            <Col md={3}>
                                <Card>
                                    <Card.Img variant="top" src={m.ImagePath} />
                                    <Card.Title>{m.Title}</Card.Title>
                                    <Card.Subtitle>{new Date(m.ReleaseYear).getFullYear()}</Card.Subtitle>
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