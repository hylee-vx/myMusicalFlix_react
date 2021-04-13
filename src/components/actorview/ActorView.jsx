import React from 'react';
import { Link } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import './ActorView.scss';

const ActorView = props => {
    const { actor } = props;

    const actorBirthYear = new Date(actor.BirthYear).getFullYear();
    const actorDeathYear = new Date(actor.DeathYear).getFullYear();

    return (
        <Card>
            <Card.Img variant="top" src={actor.ImagePath} />
            <Card.Body>
                <Card.Title>
                    <h2 className="actor-name">{actor.Name}</h2>
                </Card.Title>
                <Card.Subtitle>
                    <h5 className="actor-birth-death">
                        {`${actorBirthYear} - 
                    ${(actorDeathYear ? actorDeathYear : '')}`}
                    </h5>
                </Card.Subtitle>
                <Card.Text className="value">{actor.Bio}</Card.Text>
                <Link to={"/"}>
                    <Button className="back-button float-right" variant="primary">Back to movies</Button>
                </Link>
            </Card.Body>
        </Card>
    );
};

export default ActorView;