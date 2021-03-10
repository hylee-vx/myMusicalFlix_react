import React from 'react';
import axios from 'axios';

import MovieCard from '../moviecard/MovieCard';
import MovieView from '../movieview/MovieView';

class MainView extends React.Component {
    constructor() {
        //call superclass constructor so React can initialise it
        super();

        //initialises state to an empty object for destructuring later
        this.state = {
            movies: [],
            selectedMovie: null
        };
    }

    componentDidMount() {
        axios.get('https://mymusicalflix.herokuapp.com/movies')
            .then(response => {
                //assigns the result to the state
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

    render() {
        //if no state initialised, this will throw an exception on runtime
        //before the data is initially loaded
        const { movies, selectedMovie } = this.state;

        //before the movies have been loaded
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