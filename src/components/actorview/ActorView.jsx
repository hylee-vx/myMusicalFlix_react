import React from 'react';
import { useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './ActorView.scss';

const ActorView = props => {
    const { actor } = props;

    const actorBirthYear = new Date(actor.BirthYear).getFullYear();
    const actorDeathYear = new Date(actor.DeathYear).getFullYear();
    const actorBirthDeath = `${actorBirthYear} - ${(actorDeathYear ? actorDeathYear : '')}`;

    const history = useHistory();


    return (
        <Container className="actor view border rounded" fluid>
            <Row>
                <Col xs="12" sm="6">
                    <img className="actor-image" src={actor.ImagePath} alt={`photo of ${actor.Name}`} />
                </Col>

                <Col xs="12" sm="6">
                    <h2 className="actor-name">{actor.Name}</h2>
                    <h3 className="actor-birth-death">{actorBirthDeath}</h3>
                    <p className="actor-bio">{actor.Bio}</p>
                </Col>
            </Row>

            <Row className="float-right">
                <Col className="buttons">
                    <Button
                        block
                        className="back-button d-block"
                        variant="primary"
                        onClick={() => history.goBack()}
                    >
                        Back
                        </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ActorView;