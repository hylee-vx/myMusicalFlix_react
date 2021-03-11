import React from 'react';
import PropTypes from 'prop-types';

class MovieCard extends React.Component {
    render() {
        //data from main-view connection to database via movies endpoint of API
        const { movie, onClick } = this.props;

        return (
            <div onClick={() => onClick(movie)} className="movie-card">{movie.Title}</div>
        );
    }
}

MovieCard.propTypes = {
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
        Featured: PropTypes.bool
    }).isRequired,
    onClick: PropTypes.func.isRequired
};

export default MovieCard;