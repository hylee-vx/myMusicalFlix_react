import React from 'react';

export class MovieCard extends React.Component {
    render() {
        //data from main-view connection to database via movies endpoint of API
        const { movie, onClick } = this.props;

        return (
            <div onClick={() => onClick(movie)} className="movie-card">{movie.Title}</div>
        );
    }
}