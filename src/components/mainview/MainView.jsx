import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import Login from '../login/Login';
import Registration from '../registration/Registration';
import MovieCard from '../moviecard/MovieCard';
import MovieView from '../movieview/MovieView';
import GenreView from '../genreview/GenreView';
import DirectorView from '../directorview/DirectorView';
import ActorView from '../actorview/ActorView';
import './MainView.scss';

class MainView extends React.Component {
    state = {
        movies: [],
        user: null
    };

    getMovies(token) {
        axios.get('https://mymusicalflix.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });

            this.getMovies(accessToken);
        }
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                token: localStorage.removeItem('token'),
                user: localStorage.removeItem('user')
            });
        }
    }

    render() {
        const { movies, user } = this.state;
        console.log(user);

        if (!movies) return <div className="main-view" />;

        return (
            <Router>
                <Container fluid>
                    <Navbar>
                        <Navbar.Brand as={Link} to="/">myMusicalFlix</Navbar.Brand>
                        <Link to={`/users/${user}`}>
                            <Button className="link-to-profile" variant="link">{user}</Button>
                        </Link>
                        <Button className="sign-out-button" variant="outline-primary" onClick={() => this.onLoggedOut()}>Sign Out</Button>
                    </Navbar>

                    <Row className="main-view justify-content-md-center">
                        <Route exact path='/' render={() => {
                            if (!user) return <Login onLoggedIn={user => this.onLoggedIn(user)} />
                            return movies.map(m =>
                                <Col md={3} key={m._id}>
                                    <MovieCard movie={m} />
                                </Col>
                            )
                        }} />

                        <Route exact path="/login" render={() =>
                            <Login onLoggedIn={user => this.onLoggedIn(user)} />} />

                        <Route exact path="/users" render={() =>
                            <Registration />} />

                        <Route exact path='/movies/:movieId' render={({ match }) =>
                            <Col md={9}>
                                <MovieView movie={movies.find(m => m._id === match.params.movieId)} />
                            </Col>
                        } />

                        <Route exact path='/genres/:name' render={({ match }) =>
                            <Col md={9}>
                                <GenreView genre={movies.find(m => m.Genre.Name === match.params.name).Genre} />
                            </Col>
                        } />

                        <Route exact path="/directors/:name" render={({ match }) =>
                            <Col md={9}>
                                <DirectorView director={movies.reduce((director, movie) => !director ? movie.Directors.find(d =>
                                    d.Name === match.params.name) : director, null)} />
                            </Col>
                        } />

                        <Route exact path="/actors/:name" render={({ match }) =>
                            <Col md={9}>
                                <ActorView actor={movies.reduce((actor, movie) =>
                                    !actor ? movie.Actors.find(a =>
                                        a.Name === match.params.name) : actor, null)} />
                            </Col>
                        } />
                    </Row >
                </Container>
            </Router>
        );
    }
}

// triggers warning at initial render: empty movies array, no user details
MainView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ReleaseYear: PropTypes.string,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }).isRequired,
        Directors: PropTypes.array.isRequired,
        Actors: PropTypes.array,
        ImagePath: PropTypes.string.isRequired,
        Featured: PropTypes.bool,
    }).isRequired,
    user: PropTypes.string,
    account: PropTypes.bool,
    onLoggedIn: PropTypes.func.isRequired,
    onToggleLoginRegistration: PropTypes.func.isRequired
};

export default MainView;