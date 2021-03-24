import React from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const DirectorView = props => {
    const { director } = props;

    const directorBirthYear = new Date(director.BirthYear).getFullYear();
    const directorDeathYear = new Date(director.DeathYear).getFullYear();

    return (
        <Card>
            <Card.Img variant="top" src={director.ImagePath} />
            <Card.Body>
                <Card.Title className="director-name">{director.Name}</Card.Title>
                <Card.Subtitle className="director-birth-death">
                    {`${directorBirthYear} - 
                    ${(directorDeathYear ? directorDeathYear : '')}`}
                </Card.Subtitle>
                <Card.Text className="director-bio">{director.Bio}</Card.Text>
                <Link to={`/`}>
                    <Button className="back-btn">Back to movies</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default DirectorView;