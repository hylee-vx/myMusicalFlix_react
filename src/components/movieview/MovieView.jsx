import React from 'react';
import { Link, useHistory } from 'react-router-dom';

// import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './MovieView.scss';

const MovieView = props => {
    const { movie, user, favouriteMovies } = props;
    if (!movie) return null;

    // convert ISO format date to display full year only
    const movieReleaseYear = new Date(movie.ReleaseYear).getFullYear();
    const directors = movie.Directors;
    const actors = movie.Actors;

    const history = useHistory();

    return (
        <Container className="movie-view border rounded" fluid>
            <Row>
                <Col xs={12} className="movie-view-header">
                    <h2 className="movie-title d-block">{movie.Title}</h2>
                    <h3 className="movie-release-year d-block">{`(${movieReleaseYear})`}</h3>
                </Col>
            </Row>

            <Row className="movie-view-content">
                <Col xs={12} sm={6}>
                    <img className="movie-poster" src={movie.ImagePath} alt="" />


                </Col>

                <Col xs={12} sm={6} className="movie-details">
                    <div className="movie-description">
                        <h5 className="label">Description: </h5>
                        <p className="value">{movie.Description}</p>
                    </div>

                    <div className="movie-directors">
                        <h5 className="label">Directors:</h5>
                        {directors.map(d =>
                            <Link to={`/directors/${d.Name}`}>
                                <Button className="value d-block" variant="link">{d.Name}</Button>
                            </Link>
                        )}
                    </div>

                    <div className="movie-actors">
                        <h5 className="label">Actors</h5>
                        {actors.map(a =>
                            <Link to={`/actors/${a.Name}`}>
                                <Button className="value d-block" variant="link">{a.Name}</Button>
                            </Link>
                        )}
                    </div>

                    <div className="movie-genre">
                        <h5 className="label">Genre: </h5>
                        <Link to={`/genres/${movie.Genre.Name}`}>
                            <Button className="value genre-name" variant="link">{movie.Genre.Name}</Button>
                        </Link>
                    </div>
                </Col>
            </Row>

            <Row className="float-right">
                <Col className="buttons">
                    {!favouriteMovies.includes(movie._id)
                        ? <Button
                            block
                            className="favourite-movie-button add-movie d-block"
                            variant="primary"
                            onClick={() => {
                                props.handleAddFavourite(user, movie._id);
                            }}
                        >
                            Add to favourites
                        </Button>
                        : <Button
                            block
                            className="favourite-movie-button remove-movie d-block"
                            variant="primary"
                            onClick={() => {
                                props.handleDeleteFavourite(user, movie._id);
                            }}
                        >
                            Remove from favourites
                        </Button>
                    }
                    <Link to={'/'}>
                        <Button
                            block
                            className="back-button d-block"
                            variant="primary"
                            onClick={() => history.goBack()}
                        >
                            Back
                        </Button>
                    </Link>
                </Col>
            </Row>
        </Container >
    );
};

export default MovieView;

// MovieView.propTypes = {
    //     movie: PropTypes.shape({
    //         Title: PropTypes.string.isRequired,
    //         ReleaseYear: PropTypes.string,
    //         Description: PropTypes.string.isRequired,
    //         Genre: PropTypes.shape({
    //             Name: PropTypes.string.isRequired
    //         }).isRequired,
    //         Directors: PropTypes.arrayOf(PropTypes.shape({
    //             Name: PropTypes.string.isRequired
    //         })).isRequired,
    //         Actors: PropTypes.arrayOf(PropTypes.shape({
    //             Name: PropTypes.string
    //         })),
    //         ImagePath: PropTypes.string.isRequired
    //     }).isRequired,
    //     user: PropTypes.shape({
    //         _id: PropTypes.string.isRequired,
    //         Username: PropTypes.string.isRequired,
    //         Email: PropTypes.string.isRequired,
    //         FavouriteMovies: PropTypes.array.isRequired
    //     }).isRequired,
    //     favouriteMovies: PropTypes.array.isRequired,
    //     updateProfile: PropTypes.func.isRequired,
    //     handleAddFavourite: PropTypes.func.isRequired,
    //     handleDeleteFavourite: PropTypes.func.isRequired
    // };