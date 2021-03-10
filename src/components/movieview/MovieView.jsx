import React from 'react';

class MovieView extends React.Component {
    constructor() {
        super();

        this.state = {};
    }

    render() {
        const { movie, onClick } = this.props;

        if (!movie) return null;

        return (
            <div className="movie-view">
                <img className="movie-poster" src={movie.ImagePath} />
                <div className="movie-title">
                    <span className="label">Title: </span>
                    <span className="value">{movie.Title}</span>
                </div>

                <div className="movie-year">
                    <span className="label">Release Year: </span>
                    <span className="value">{movie.ReleaseYear}</span>
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

export default MovieView;