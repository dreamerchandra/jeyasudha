import React, { useState } from 'react'
import './index.css'
import Input from '../input'
import { loginWithEmail, signupWithEmail, sendPasswordResetEmail } from '../../js/firebase-auth';

const useToLogin = ({ onLogin, onSignup, sendPasswordReset }) => {
  const [email, _setEmail] = useState('');
  const [password, _setPassword] = useState('');
  const loginCb = () => {
    onLogin({ email, password });
  }
  const signupCb = () => {
    onSignup({ email, password });
  }
  const setEmail = (event) => _setEmail(event.target.value);
  const setPassword = (event) => _setPassword(event.target.value);
  const onResetPassword = () => sendPasswordReset({ email });
  return { setEmail: setEmail, setPassword: setPassword, loginCb, signupCb, onResetPassword }
}

function LoginView ({ onSignup = signupWithEmail, onLogin = loginWithEmail, sendPasswordReset = sendPasswordResetEmail }) {
  const { setEmail, setPassword, loginCb, signupCb, onResetPassword } = useToLogin({ onSignup, onLogin, sendPasswordReset });
  return (
    <section className="login-page">
      <div className="login-wrapper">
        <Input title="Email" inputType="email" onChange={setEmail} />
        <Input title="Password" inputType="password" onChange={setPassword} />
        <div className="login-page-button-wrapper">
          <button className="btn paper lp-button" onClick={signupCb}>Signup</button>
          <button className="btn paper lp-button" onClick={loginCb}>Login</button>
        </div>
        <a className="password-reset" onClick={onResetPassword}>Reset my password</a>
      </div>
    </section >
  )
}

export default LoginView;