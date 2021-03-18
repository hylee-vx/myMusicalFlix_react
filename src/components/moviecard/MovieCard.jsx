import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './MovieCard.scss';

class MovieCard extends React.Component {
    render() {
        const { movie, onClick } = this.props;
        const movieReleaseYear = new Date(movie.ReleaseYear).getFullYear();

        return (
            <Card>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                    <Card.Title className="title">{movie.Title}</Card.Title>
                    <Card.Subtitle className="release-year">{movieReleaseYear}</Card.Subtitle>
                    <Card.Text className="description line-clamp">{movie.Description}</Card.Text>
                    <Button className="more-details-btn float-right" onClick={() => onClick(movie)} variant="primary">More</Button>
                </Card.Body>
            </Card>
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