import React, { useState } from 'react';

const Login = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = event => {
        event.preventDefault();
        props.onLoggedIn(username);
    };

    // switches account state to false to render Registration view
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
                Password:
                <input
                    type="password"
                    value={password}
                    onChange={event => setPassword(event.target.value)}
                />
            </label>
            <button type="submit" onClick={handleSubmit}>Sign in</button>
            <p>New to MyMusicalFlix?<span style={{ color: "teal" }} onClick={handleToggle}>     Sign up here     </span></p>
        </form>
    );
}

export default Login;