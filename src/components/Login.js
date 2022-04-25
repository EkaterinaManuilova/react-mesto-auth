import React from 'react';

function Login({onLogin}) {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    function handleEmailChange(event) {
        setEmail(event.target.value);
    }
    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }
    function handleSubmit(event) {
        event.preventDefault();
        onLogin(email, password);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <h2 className="form__title">Вход</h2>
            <input type="email" className="form__input" value={email} onChange={handleEmailChange}
                   placeholder="Email" required />
            <input type="password" className="form__input" value={password} onChange={handlePasswordChange}
                   placeholder={password} required />
            <button type="submit" className="form__button">Войти</button>
        </form>
    )
}

export default Login;