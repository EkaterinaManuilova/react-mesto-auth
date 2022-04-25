import React from 'react';
import { Link } from 'react-router-dom';

function Register({onRegister}) {
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
      onRegister(email, password);
   }

   return (
       <form className="form" onSubmit={handleSubmit}>
          <h2 className="form__title">Регистрация</h2>
          <input type="email" className="form__input" value={email} onChange={handleEmailChange}
                 placeholder="Email" required />
          <input type="password" className="form__input" value={password} onChange={handlePasswordChange}
                 placeholder={password} required />
          <button type="submit" className="form__button">Зарегистрироваться</button>
           <p className="form__text"><Link className="form__link" to="/sign-in">Уже зарегистрированы? Войти</Link></p>
          </form>
   )
}

export default Register;