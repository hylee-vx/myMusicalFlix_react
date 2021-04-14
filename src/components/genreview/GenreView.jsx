import React from 'react';
import { useHistory } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './GenreView.scss';

const GenreView = props => {
    const { genre } = props;
    const history = useHistory();

    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    <h2 className="genre-name">{genre.Name}</h2>
                </Card.Title>
                <Card.Text>
                    <p className="value">{genre.Description}</p>
                </Card.Text>
                <Button
                    className="back-button float-right"
                    variant="primary"
                    onClick={() => history.goBack()}
                >
                    Back to movies
                </Button>
            </Card.Body>
        </Card>
    );
};

export default GenreView;
