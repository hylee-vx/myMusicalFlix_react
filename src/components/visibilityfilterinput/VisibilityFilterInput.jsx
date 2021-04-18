import React from 'react';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions';

const VisibilityFilterInput = props => {
    return (
        <Form.Control
            onChange={event => props.setFilter(event.target.value)}
            value={props.visibilityFilter}
            placeholder="Search movies"
        />
    );
};

export default connect(null, { setFilter })(VisibilityFilterInput);