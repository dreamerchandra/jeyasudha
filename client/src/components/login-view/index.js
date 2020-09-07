/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react'
import './index.css'
import Input from '../input'
import {
  loginWithEmail,
  signupWithEmail,
  sendPasswordResetEmail,
} from '../../js/firebase-auth'

const useToLogin = ({ onLogin, onSignup, sendPasswordReset }) => {
  const [email, _setEmail] = useState('')
  const [password, _setPassword] = useState('')
  const loginCb = () => {
    if (email && password) {
      onLogin({ email, password })
    }
  }
  const signupCb = () => {
    if (email && password) {
      onSignup({ email, password })
    }
  }
  const setEmail = (event) => _setEmail(event.target.value)
  const setPassword = (event) => _setPassword(event.target.value)
  const onResetPassword = () => sendPasswordReset({ email })
  return {
    setEmail,
    setPassword,
    loginCb,
    signupCb,
    onResetPassword,
  }
}

function LoginView({
  onSignup = signupWithEmail,
  onLogin = loginWithEmail,
  sendPasswordReset = sendPasswordResetEmail,
}) {
  const { setEmail, setPassword, loginCb, signupCb, onResetPassword } = useToLogin({
    onSignup,
    onLogin,
    sendPasswordReset,
  })
  return (
    <section className="login-page">
      <div className="login-wrapper">
        <Input title="Email" inputType="email" onChange={setEmail} />
        <Input
          title="Password"
          inputType="password"
          onChange={setPassword}
          errorComponent="Required"
        />
        <div className="login-page-button-wrapper">
          <button className="btn paper lp-button" onClick={signupCb} type="button">
            Signup
          </button>
          <button className="btn paper lp-button" onClick={loginCb} type="button">
            Login
          </button>
        </div>
        <a className="password-reset" onClick={onResetPassword} type="button">
          Reset my password
        </a>
      </div>
    </section>
  )
}

export default LoginView
