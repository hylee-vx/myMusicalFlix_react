import React from 'react';
import { useHistory } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './DirectorView.scss';

const DirectorView = props => {
    const { director } = props;

    const directorBirthYear = new Date(director.BirthYear).getFullYear();
    const directorDeathYear = new Date(director.DeathYear).getFullYear();

    const history = useHistory();

    return (
        <Card>
            <Card.Img variant="top" src={director.ImagePath} />
            <Card.Body>
                <Card.Title>
                    <h2 className="director-name">{director.Name}</h2>
                </Card.Title>
                <Card.Subtitle>
                    <h5 className="director-birth-death">
                        {`${directorBirthYear} - 
                    ${(directorDeathYear ? directorDeathYear : '')}`}
                    </h5>
                </Card.Subtitle>
                <Card.Text className="value">{director.Bio}</Card.Text>
                <Button
                    className="back-button float-right"
                    variant="primary"
                    onClick={() => history.goBack()}
                >
                    Back
                    </Button>
            </Card.Body>
        </Card>
    );
};

export default DirectorView;