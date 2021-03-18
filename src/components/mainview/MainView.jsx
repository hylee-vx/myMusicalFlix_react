import React from 'react';
import axios from 'axios';

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
import './MainView.scss';

class MainView extends React.Component {
    state = {
        movies: [],
        selectedMovie: null,
        user: null,
        account: true
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

    // toggles account state between true and false to switch between Login/Registration components
    onToggleLoginRegistration() {
        this.setState(previousState => ({
            account: !previousState.account
        }));
    }

    render() {
        const { movies, selectedMovie, user, account } = this.state;

        // if no user, renders either Login or Registration components based on whether account is true or false - default is Login
        if (!user) {
            return (
                account
                    ? <Login
                        onLoggedIn={user => this.onLoggedIn(user)}
                        onToggleLoginRegistration={account => this.onToggleLoginRegistration(account)}
                    />
                    : <Registration
                        onLoggedIn={user => this.onLoggedIn(user)}
                        onToggleLoginRegistration={account => this.onToggleLoginRegistration(account)}
                    />
            );
        }

        if (!movies) return <div className="main-view" />;

        return (
            <Container fluid>
                <Navbar>
                    <Navbar.Brand href="#home">myMusicalFlix</Navbar.Brand>
                    <Button variant="outline-primary" onClick={() => this.onLoggedOut()}>Sign Out</Button>
                </Navbar>
                <Row className="main-view justify-content-md-center">
                    {selectedMovie
                        ? <Col md={9}>
                            <MovieView
                                movie={selectedMovie}
                            // onClick={() => this.onMovieClick(null)}
                            />
                        </Col>
                        : movies.map(movie => (
                            <Col md={3}>
                                <MovieCard
                                    key={movie._id}
                                    movie={movie}
                                // onClick={movie => this.onMovieClick(movie)}
                                />
                            </Col>
                        ))
                    }
                </Row >
            </Container>
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