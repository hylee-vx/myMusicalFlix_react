import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibilityfilterinput/VisibilityFilterInput';
import MovieCard from '../moviecard/MovieCard';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

const MoviesList = props => {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div className="main-view" />;

    return (
        <Container className="movies-list">
            <Row>
                <VisibilityFilterInput visibilityFilter={visibilityFilter} />
            </Row>
            <Row>
                {filteredMovies.map(m => (
                    <Col sm="6" md="3" xl="2" key={m._id}>
                        <MovieCard movie={m} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default connect(mapStateToProps)(MoviesList);