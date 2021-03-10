import React, { useState } from 'react';

const Registration = props => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        props.onLoggedIn(username);
    };

    // switches account state to true to render Login view
    const handleToggle = event => {
        props.onToggleLoginRegistration();
    }

    return (
        <form>
            <label>
                Username:
                <input
                    type="text"
                    value={username}
                    onChange={event => setUsername(event.target.value)}
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    value={email}
                    onChange={event => setEmail(event.target.value)}
                />
            </label>
            <label>
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
            </label>
            <label>
                Date of Birth:
                <input
                    type="date"
                    value={dateOfBirth}
                    onChange={event => setDateOfBirth(event.target.value)}
                />
            </label>

            <button type="submit" onClick={handleSubmit}>Sign up</button>
            <p>I have an account<span style={{ color: "teal" }} onClick={handleToggle}>     Sign in     </span></p>
        </form>
    );
}

export default Registration;