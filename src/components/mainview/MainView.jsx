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
import ProfileView from '../profile/ProfileView';
import './MainView.scss';

class MainView extends React.Component {
    state = {
        movies: [],
        user: null,
        username: null,
        id: null
    };

    onRegistration(regData) {
        this.setState({
            username: regData.Username
        });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            username: authData.user.Username,
            id: authData.user._id
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('userID', authData.user._id);
        this.getMovies(authData.token);
        this.getUser(authData.user._id, authData.token);
    }

    onLoggedOut() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                movies: [],
                user: null,
                username: null,
                id: null
            });
            localStorage.clear();
        }
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        let accessID = localStorage.getItem('userID');

        if (accessToken !== null && accessID !== null) {
            this.getMovies(accessToken);
            this.getUser(accessID, accessToken);
        }
    }

    getMovies(token) {
        axios.get('https://mymusicalflix.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => console.log(error + ` error fetching movie list`));
    }

    getUser(userID, token) {
        axios.get(`https://mymusicalflix.herokuapp.com/users/${userID}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                const data = response.data;
                this.setState({
                    user: {
                        id: data._id,
                        username: data.Username,
                        email: data.Email,
                        dateOfBirth: data.DateOfBirth.slice(0, 10),
                        favouriteMovies: data.FavouriteMovies
                    }
                });
            })
            .catch(error => console.log(error + ` error fetching user`));
    }

    render() {
        const { movies, user, username, id } = this.state;
        if (!movies) return <div className="main-view" />;

        return (
            <Router>
                <Container fluid>
                    <Navbar>
                        <Navbar.Brand as={Link} to="/">myMusicalFlix</Navbar.Brand>
                        <Link to={`/users/${id}`}>
                            <Button
                                className="link-to-profile"
                                variant="link"
                            >
                                {username}
                            </Button>
                        </Link>
                        <Button
                            className="sign-out-button"
                            variant="outline-primary"
                            onClick={() => this.onLoggedOut()}
                        >
                            Sign Out
                        </Button>
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

                        <Route exact path="/login" render={() => {
                            if (!user) return <Login onLoggedIn={user => this.onLoggedIn(user)} />
                            return movies.map(m =>
                                <Col m={3} key={m._id}>
                                    <MovieCard movie={m} />
                                </Col>
                            )
                        }} />

                        <Route exact path="/users" render={() => {
                            if (!username) return <Registration onRegistration={newUser => this.onRegistration(newUser)} />
                            return <Login onLoggedIn={user => this.onLoggedIn(user)} />
                        }} />

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

                        <Route exact path="/users/:ID" render={() =>
                            <ProfileView user={user} onLoggedOut={this.onLoggedOut} />
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
    onLoggedIn: PropTypes.func.isRequired
};

export default MainView;