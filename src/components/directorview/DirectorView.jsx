import React from 'react';
import { useHistory } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import './DirectorView.scss';

const DirectorView = props => {
    const { director } = props;

    const directorBirthYear = new Date(director.BirthYear).getFullYear();
    const directorDeathYear = new Date(director.DeathYear).getFullYear();
    const directorBirthDeath = `${directorBirthYear} - ${(directorDeathYear ? directorDeathYear : '')}`;

    const history = useHistory();

    return (
        <Container className="director-view border rounded" fluid>
            <Row>
                <Col xs="12" sm="6">
                    <img className="director-image" src={director.ImagePath} alt={`photo of ${director.Name}`} />
                </Col>

                <Col xs="12" sm="6">
                    <h2 className="director-name">{director.Name}</h2>
                    <h3 className="director-birth-death">{directorBirthDeath}</h3>
                    <p className="director-bio">{director.Bio}</p>
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

export default DirectorView;