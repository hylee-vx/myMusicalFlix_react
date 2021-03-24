import React from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const ActorView = props => {
    const { actor } = props;

    const actorBirthYear = new Date(actor.BirthYear).getFullYear();
    const actorDeathYear = new Date(actor.DeathYear).getFullYear();

    return (
        <Card>
            <Card.Img variant="top" src={actor.ImagePath} />
            <Card.Body>
                <Card.Title className="actor-name">{actor.Name}</Card.Title>
                <Card.Subtitle className="actor-birth-death">
                    {`${actorBirthYear} - 
                    ${(actorDeathYear ? actorDeathYear : '')}`}
                </Card.Subtitle>
                <Card.Text className="actor-bio">{actor.Bio}</Card.Text>
                <Link to={`/`}>
                    <Button className="back-btn">Back to movies</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default ActorView;