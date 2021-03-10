import React from 'react';
import axios from 'axios';

import Login from '../login/Login';
import Registration from '../registration/Registration';
import MovieCard from '../moviecard/MovieCard';
import MovieView from '../movieview/MovieView';

class MainView extends React.Component {
    state = {
        movies: [],
        selectedMovie: null,
        user: null,
        account: true
    };

    componentDidMount() {
        axios.get('https://mymusicalflix.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onMovieClick(movie) {
        this.setState({
            selectedMovie: movie
        });
    }

    // allows automatic login with any user credentials for testing
    onLoggedIn(user) {
        this.setState({
            user
        });
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
            <div className="main-view">
                {selectedMovie
                    ? <MovieView
                        movie={selectedMovie}
                        onClick={() => this.onMovieClick(null)}
                    />
                    : movies.map(movie => (
                        <MovieCard
                            key={movie._id}
                            movie={movie}
                            onClick={movie => this.onMovieClick(movie)}
                        />
                    ))
                }
            </div >
        );
    }
}

export default MainView;