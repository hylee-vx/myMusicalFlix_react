import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import { setMovies, setUser } from '../../actions';

import MoviesList from '../movieslist/MoviesList';
import Login from '../login/Login';
import Registration from '../registration/Registration';
import MovieView from '../movieview/MovieView';
import GenreView from '../genreview/GenreView';
import DirectorView from '../directorview/DirectorView';
import ActorView from '../actorview/ActorView';
import ProfileView from '../profile/ProfileView';
import ProfileEdit from '../profile/ProfileEdit';
import PasswordEdit from '../profile/PasswordEdit';
import ProfileDelete from '../profile/ProfileDelete';

// import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './MainView.scss';

class MainView extends React.Component {
    state = {
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

        localStorage.setItem('token', authData.token);
        localStorage.setItem('userID', authData.user._id);
        this.getMovies(authData.token);
        this.getUser(authData.user._id, authData.token);
    }

    onLoggedOut = () => {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            localStorage.clear();
            this.props.setUser({});
            this.props.setMovies([]);
            this.setState({ favouriteMovies: [] });
        }
        // redirect below not working
        // return <Redirect to="/" />
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
                // sort movies by alphabetical order
                const sortedMovies = response.data.sort((a, b) => {
                    if (a.Title < b.Title) return -1;
                    if (a.Title > b.Title) return 1;
                    return 0;
                })
                this.props.setMovies(sortedMovies);
            })
            .catch(error => console.log(error + ` error fetching movie list`));
    }

    getUser(userID, token) {
        axios.get(`https://mymusicalflix.herokuapp.com/users/${userID}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                const data = response.data;
                const user = {
                    id: data._id,
                    username: data.Username,
                    email: data.Email,
                    dateOfBirth:
                        data.DateOfBirth ? data.DateOfBirth.slice(0, 10) : null,
                    favouriteMovies: data.FavouriteMovies
                };
                this.props.setUser(user);
                this.setState({
                    favouriteMovies: data.FavouriteMovies
                })
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
            onEdit: false,
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
        const { movies, user } = this.props;
        const { favouriteMovies, onEdit, hasAccount } = this.state;
        if (!movies) return <div className="main-view" />;

        return (
            <Router>
                <Container fluid className="main-view">
                    {Object.keys(user).length
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

                    <Route exact path='/' render={() => {
                        if (!Object.keys(user).length) return <Login onLoggedIn={user => this.onLoggedIn(user)} />

                        return <MoviesList movies={movies} key={movies._id} />
                    }} />

                    <Route exact path="/users" render={() => {
                        if (!hasAccount) return <Registration onRegistration={newUser => this.onRegistration(newUser)} />
                        return <Redirect to="/" />
                    }} />

                    <Route exact path='/movies/:movieId' render={({ match }) =>
                        <MovieView
                            movie={movies.find(m =>
                                m._id === match.params.movieId)}
                            user={user}
                            favouriteMovies={favouriteMovies}
                            updateProfile={updatedUser => this.updateProfile(updatedUser)}
                            handleAddFavourite={(user, movieID) => this.handleAddFavourite(user, movieID)}
                            handleDeleteFavourite={(user, movieID) => this.handleDeleteFavourite(user, movieID)}
                        />
                    } />

                    <Route exact path='/genres/:name' render={({ match }) =>
                        <GenreView genre={movies.find(m =>
                            m.Genre.Name === match.params.name).Genre} />
                    } />

                    <Route exact path="/directors/:name" render={({ match }) =>
                        <DirectorView director={movies.reduce((director, movie) => !director
                            ? movie.Directors.find(d =>
                                d.Name === match.params.name)
                            : director, null)} />
                    } />

                    <Route exact path="/actors/:name" render={({ match }) =>
                        <ActorView actor={movies.reduce((actor, movie) =>
                            !actor
                                ? movie.Actors.find(a =>
                                    a.Name === match.params.name)
                                : actor, null)} />
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

                    <Route exact path="/users/:ID/delete" render={() => {
                        if (!user) return <Redirect to="/" />
                        return <ProfileDelete
                            user={user}
                            setEditOn={this.setEditOn}
                            setEditOff={this.setEditOff}
                            onLoggedOut={this.onLoggedOut} />
                    }} />
                </Container>
            </Router>
        );
    }
}

let mapStateToProps = state => ({
    movies: state.movies, user: state.user
});

export default connect(mapStateToProps, { setMovies, setUser })(MainView);


// // triggers warning at initial render: empty movies array, no user details
// MainView.propTypes = {
//     movie: PropTypes.shape({
//         Title: PropTypes.string.isRequired,
//         ReleaseYear: PropTypes.string,
//         Description: PropTypes.string.isRequired,
//         Genre: PropTypes.shape({
//             Name: PropTypes.string.isRequired
//         }).isRequired,
//         Directors: PropTypes.array.isRequired,
//         Actors: PropTypes.array,
//         ImagePath: PropTypes.string.isRequired,
//         Featured: PropTypes.bool,
//     }).isRequired,
//     user: PropTypes.shape({
//         _id: PropTypes.string.isRequired,
//         Username: PropTypes.string.isRequired,
//         Email: PropTypes.string.isRequired
//     }).isRequired
// };