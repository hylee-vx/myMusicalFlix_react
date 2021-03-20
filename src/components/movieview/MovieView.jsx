import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './MovieView.scss';

const MovieView = props => {
    const { movie } = props;

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
                <Link to={'/'}>
                    <Button className="back-btn" variant="primary">Back</Button>
                </Link>
            </Row>
        </Container >
    );
}


MovieView.propTypes = {
    movie: PropTypes.shape({
        Title: PropTypes.string.isRequired,
        ReleaseYear: PropTypes.string,
        Description: PropTypes.string.isRequired,
        Genre: PropTypes.shape({
            Name: PropTypes.string.isRequired
        }).isRequired,
        Directors: PropTypes.arrayOf(PropTypes.shape({
            Name: PropTypes.string.isRequired
        })).isRequired,
        Actors: PropTypes.arrayOf(PropTypes.shape({
            Name: PropTypes.string
        })),
        ImagePath: PropTypes.string.isRequired
    }).isRequired
};

export default MovieView;