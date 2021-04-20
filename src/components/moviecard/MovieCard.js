import React from 'react';
import { Link } from 'react-router-dom';

// import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import './MovieCard.scss';

const MovieCard = props => {
    const { movie } = props;
    const movieReleaseYear = new Date(movie.ReleaseYear).getFullYear();

    return (
        <Card>
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title className="title">{movie.Title}</Card.Title>
                <Card.Subtitle className="release-year">{movieReleaseYear}</Card.Subtitle>
                <Card.Text className="description line-clamp">{movie.Description}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                    <Button className="more-details-btn float-right" variant="primary">More</Button>
                </Link>
            </Card.Body>
        </Card>
    );
}

export default MovieCard;

// MovieCard.propTypes = {
//     movie: PropTypes.shape({
//         Title: PropTypes.string.isRequired,
//         ReleaseYear: PropTypes.string,
//         Description: PropTypes.string.isRequired,
//         Genre: PropTypes.shape({
//             Name: PropTypes.string.isRequired
//         }).isRequired,
//         Directors: PropTypes.array.isRequired,
//         Actors: PropTypes.array,
//         ImagePath: PropTypes.string.isRequired,
//         Featured: PropTypes.bool
//     }).isRequired
// };