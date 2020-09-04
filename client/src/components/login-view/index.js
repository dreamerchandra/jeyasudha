import React, { useState, useEffect } from 'react'
import './index.css'
import Input from '../input'
import { loginWithEmail, signupWithEmail } from '../../js/firebase-auth';

const useToLogin = ({ onLogin, onSignup }) => {
  const [email, _setEmail] = useState('');
  const [password, _setPassword] = useState('');
  const loginCb = () => {
    onLogin({ email, password });
  }
  const signupCb = () => {
    onSignup({ email, password });
  }
  useEffect(() => console.log(email), [email])
  const setEmail = () => (event) => _setEmail(event.target.value);
  const setPassword = () => (event) => _setPassword(event.target.value);
  return { setEmail: setEmail, setPassword: setPassword, loginCb, signupCb }
}

function LoginView ({ onSignup = signupWithEmail, onLogin = loginWithEmail }) {
  const { setEmail, setPassword, loginCb, signupCb } = useToLogin({ onSignup, onLogin });
  return (
    <section className="login-page">
      <div className="login-wrapper">
        <Input title="Email" inputType="email" onChange={setEmail} />
        <Input title="Password" inputType="password" onChange={setPassword} />
        <div className="login-page-button-wrapper">
          <button className="btn paper lp-button" onClick={signupCb}>Signup</button>
          <button className="btn paper lp-button" onClick={loginCb}>Login</button>
        </div>
      </div>
    </section >
  )
}

export default LoginView;