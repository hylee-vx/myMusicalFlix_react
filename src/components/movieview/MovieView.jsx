import React from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './MovieView.scss';

class MovieView extends React.Component {
    state = {};

    render() {
        const { movie, onClick } = this.props;

        if (!movie) return null;

        // convert ISO format date to display full year only
        const movieReleaseYear = new Date(movie.ReleaseYear).getFullYear();

        // separate actors/directors with comma and space
        const movieActors = movie.Actors.map(actor => actor.Name);
        const movieActorsFormatted = movieActors.join(', ');
        const movieDirectors = movie.Directors.map(director => director.Name);
        const movieDirectorsFormatted = movieDirectors.join(', ');

        return (
            <Container className="movie-view" fluid>
                <Row className="movie-view-header">
                    <h3 className="movie-title">{movie.Title}</h3>
                    <h3 className="movie-release-year">{`(${movieReleaseYear})`}</h3>
                </Row>
                <Row className="movie-view-content">
                    <Col className="movie-poster">
                        <img src={movie.ImagePath} />
                    </Col>
                    <Col className="movie-details">
                        <div className="movie-description">
                            <span className="label">Description: </span>
                            <span className="value">{movie.Description}</span>
                        </div>

                        <div className="movie-directors">
                            <span className="label">Directors: </span>
                            <span className="value">{movieDirectorsFormatted}</span>
                        </div>

                        <div className="movie-actors">
                            <span className="label">Actors: </span>
                            <span className="value">{movieActorsFormatted}</span>
                        </div>

                        <div className="movie-genre">
                            <span className="label">Genre: </span>
                            <span className="value">{movie.Genre.Name}</span>
                        </div>
                    </Col>
                </Row>
                <Row className="float-right">
                    <Button className="back-btn" onClick={() => onClick()} variant="primary">Back</Button>
                </Row>
            </Container>
        );
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