import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from 'firebase';
import LoaderHoc from '../loading';
import LoginView from '../login-view';
import { loginWithEmail, signupWithEmail } from '../../js/firebase-auth';

const AuthenticatingUser = () => (
  <LoaderHoc>
    <h1>Authenticating user</h1>
  </LoaderHoc>
)

const DefaultLoginMechanism = () => (
  <>
    <LoginView onLogin={loginWithEmail} onSignup={signupWithEmail} />
  </>
)

const AuthenticatedView = ({
  children,
  Loader = AuthenticatingUser,
  NonLoggedIn = DefaultLoginMechanism,
}) => {
  const [user, loading, error] = useAuthState(auth());
  const isNonLoggedIn = !(user || loading || error)
  return (
    <>
      {loading && <><Loader /></>}
      {error && console.log('error while auth', error)}
      {user && <>{children}</>}
      {isNonLoggedIn && <><NonLoggedIn /></>}
    </>
  )
}


export default AuthenticatedView;
