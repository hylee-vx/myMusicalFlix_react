import React from 'react';
import PropTypes from 'prop-types';

class MovieView extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        const { movie, onClick } = this.props;

        if (!movie) return null;

        // convert ISO format date to display full year only
        const movieReleaseYear = new Date(movie.ReleaseYear).getFullYear();

        return (
            <div className="movie-view">
                <img className="movie-poster" src={movie.ImagePath} />
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>

                <div className="movie-year">
                    <span className="label">Release Year: </span>
                    <span className="value">{movieReleaseYear}</span>
                </div>

                <div className="movie-description">
                    <span className="label">Description: </span>
                    <span className="value">{movie.Description}</span>
                </div>

                <div className="movie-genre">
                    <span className="label">Genre: </span>
                    <span className="value">{movie.Genre.Name}</span>
                </div>

                <div className="movie-directors">
                    <span className="label">Directors: </span>
                    {movie.Directors.map((director) => {
                        return (<span className="value">{director.Name}</span>)
                    })}
                </div>

                <div className="movie-actors">
                    <span className="label">Actors: </span>
                    {movie.Actors.map((actor) => {
                        return (<span className="value">{actor.Name}</span>)
                    })}
                </div>

                <div className="back-button">
                    <button onClick={() => onClick()} className="back-button">
                        Back
                    </button>
                </div>
            </div >
        )
    }
}

MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ReleaseYear: PropTypes.string,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }).isRequired,
        Directors: PropTypes.array.isRequired,
        ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onClick: PropTypes.func.isRequired
};

export default MovieView;