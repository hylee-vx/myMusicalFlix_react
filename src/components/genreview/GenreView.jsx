import React from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const GenreView = props => {
    const { genre } = props;

    return (
        <Card>
            <Card.Body>
                <Card.Title className="genre-name">{genre.Name}</Card.Title>
                <Card.Text className="genre-description">{genre.Description}</Card.Text>
                <Link to={'/'}>
                    <Button className="back-btn">Back to movies</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default GenreView;
