import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import Login from '../login/Login';
import Registration from '../registration/Registration';
import MovieCard from '../moviecard/MovieCard';
import MovieView from '../movieview/MovieView';
import GenreView from '../genreview/GenreView';
import DirectorView from '../directorview/DirectorView';
import ActorView from '../actorview/ActorView';
import ProfileView from '../profile/ProfileView';
import ProfileEdit from '../profile/ProfileEdit';
import PasswordEdit from '../profile/PasswordEdit';
import ProfileDelete from '../profile/ProfileDelete';

import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './MainView.scss';

class MainView extends React.Component {
    state = {
        movies: [],
        user: null,
        favouriteMovies: [],
        onEdit: false,
        hasAccount: false
    };

    onRegistration() {
        this.setState({
            hasAccount: true
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
            localStorage.clear();
            this.setState({
                movies: [],
                user: null,
                favouriteMovies: []
            });
            // return <Redirect to="/" />; how do I add Redirect/Link to this function?
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
            // .then(() => {
            //     // try to sort movies by alphabetical order
            //     movies.sort((a, b) => {
            //         if (a.Title < b.Title) return -1;
            //         if (a.Title > b.Title) return 1;
            //         return 0;
            //     })
            // })
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
                        dateOfBirth:
                            data.DateOfBirth ? data.DateOfBirth.slice(0, 10) : null,
                        favouriteMovies: data.FavouriteMovies
                    },
                    favouriteMovies: data.FavouriteMovies
                });
            })
            .catch(error => console.log(error + ` error fetching user`));
    }

    setEditOn = () => {
        this.setState({
            onEdit: true
        });
    }

    setEditOff = () => {
        this.setState({
            onEdit: false
        });
    }

    updateProfile = updatedUser => {
        this.setState({
            user: updatedUser,
            favouriteMovies: updatedUser.FavouriteMovies
        });
        let accessID = localStorage.getItem('userID');
        let accessToken = localStorage.getItem('token');

        this.getUser(accessID, accessToken);
    }

    handleAddFavourite = (user, movieID) => {
        const accessToken = localStorage.getItem('token');

        axios({
            method: 'post',
            url: `https://mymusicalflix.herokuapp.com/users/${user.id}/movies/${movieID}`,
            headers: { Authorization: `Bearer ${accessToken}` },
            data: { FavouriteMovies: movieID }
        })
            .then(response => {
                this.updateProfile(response.data);
                this.setState({
                    favouriteMovies: response.data.FavouriteMovies
                });
                console.log(`successfully added to favourites`);
            })
            .catch(error => error + ` error removing from favourites`);
    }

    handleDeleteFavourite = (user, movieID) => {
        const accessToken = localStorage.getItem('token');

        axios({
            method: 'put',
            url: `https://mymusicalflix.herokuapp.com/users/${user.id}/movies/${movieID}`,
            headers: { Authorization: `Bearer ${accessToken}` },
            data: { FavouriteMovies: movieID }
        })
            .then(response => {
                this.updateProfile(response.data);
                this.setState({
                    favouriteMovies: response.data.FavouriteMovies
                });
                console.log(`successfully removed from favourites`);
            })
            .catch(error => error + ` error removing from favourites`);
    }

    render() {
        const { movies, user, favouriteMovies, onEdit, hasAccount } = this.state;
        if (!movies) return <div className="main-view" />;

        return (
            <Router>
                <Container fluid>
                    {user
                        ? <Navbar collapseOnSelect expand="sm" className="navbar">
                            <Navbar.Brand as={Link} to="/" onClick={() => this.setEditOff()}>myMusicalFlix</Navbar.Brand>
                            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                                <Nav className="nav justify-content-end">
                                    <Link to={"/"}>
                                        <Button
                                            className="home-link"
                                            variant="link"
                                            onClick={() => this.setEditOff()}
                                        >
                                            Home
                                        </Button>
                                    </Link>
                                    <Link to={`/users/${user.id}`}>
                                        <Button
                                            className="profile-link"
                                            variant="link"
                                        >
                                            Profile
                                        </Button>
                                    </Link>
                                    <Link to={"/"}>
                                        <Button
                                            className="sign-out-link"
                                            variant="link"
                                            onClick={() => this.onLoggedOut()}
                                        >
                                            Sign Out
                                        </Button>
                                    </Link>
                                </Nav>
                            </Navbar.Collapse>
                        </Navbar>
                        : null}

                    <Row className="main-view justify-content-md-center">
                        <Route exact path='/' render={() => {
                            if (!user) return <Login onLoggedIn={user => this.onLoggedIn(user)} />
                            return movies.map(m =>
                                <Col sm={6} md={3} xl={2} key={m._id}>
                                    <MovieCard movie={m} />
                                </Col>
                            )
                        }} />

                        <Route exact path="/users" render={() => {
                            if (!hasAccount) return <Registration onRegistration={newUser => this.onRegistration(newUser)} />
                            return <Redirect to="/" />
                        }} />

                        <Route exact path='/movies/:movieId' render={({ match }) =>
                            <Col sm={12} md={9}>
                                <MovieView
                                    movie={movies.find(m =>
                                        m._id === match.params.movieId)}
                                    user={user}
                                    favouriteMovies={favouriteMovies}
                                    updateProfile={updatedUser => this.updateProfile(updatedUser)}
                                    handleAddFavourite={(user, movieID) => this.handleAddFavourite(user, movieID)}
                                    handleDeleteFavourite={(user, movieID) => this.handleDeleteFavourite(user, movieID)}
                                />
                            </Col>
                        } />

                        <Route exact path='/genres/:name' render={({ match }) =>
                            <Col lg={9}>
                                <GenreView genre={movies.find(m =>
                                    m.Genre.Name === match.params.name).Genre} />
                            </Col>
                        } />

                        <Route exact path="/directors/:name" render={({ match }) =>
                            <Col lg={9}>
                                <DirectorView director={movies.reduce((director, movie) => !director
                                    ? movie.Directors.find(d =>
                                        d.Name === match.params.name)
                                    : director, null)} />
                            </Col>
                        } />

                        <Route exact path="/actors/:name" render={({ match }) =>
                            <Col lg={9}>
                                <ActorView actor={movies.reduce((actor, movie) =>
                                    !actor
                                        ? movie.Actors.find(a =>
                                            a.Name === match.params.name)
                                        : actor, null)} />
                            </Col>
                        } />

                        <Route exact path="/users/:ID" render={() => {
                            if (!onEdit) {
                                return <ProfileView
                                    user={user}
                                    movies={movies}
                                    favouriteMovies={favouriteMovies}
                                    setEditOn={this.setEditOn}
                                    setEditOff={this.setEditOff} />
                            } else {
                                return <ProfileEdit
                                    user={user}
                                    movies={movies}
                                    favouriteMovies={favouriteMovies}
                                    setEditOn={this.setEditOff}
                                    setEditOff={this.setEditOff}
                                    updateProfile={updatedUser => this.updateProfile(updatedUser)}
                                    handleDeleteFavourite={(user, movieID) => this.handleDeleteFavourite(user, movieID)}
                                />
                            }
                        }} />

                        <Route exact path="/users/:ID/password" render={() =>
                            <PasswordEdit user={user} setEditOn={this.setEditOn} setEditOff={this.setEditOff} />
                        } />

                        <Route exact path="/users/:ID/delete" render={() =>
                            <ProfileDelete user={user} setEditOn={this.setEditOn} setEditOff={this.setEditOff} onLoggedOut={this.onLoggedOut} />
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
    user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Username: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired
    }).isRequired
};

export default MainView;