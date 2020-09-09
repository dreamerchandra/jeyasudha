import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import firebase from 'firebase/app'
import 'firebase/auth'
import LoaderHoc from '../loading'
import EmailLoginView from '../login-view'

const AuthenticatingUser = () => (
  <LoaderHoc>
    <h1>Authenticating user</h1>
  </LoaderHoc>
)

const ErrorView = ({ message }) => (
  <LoaderHoc>
    <h1>{message}</h1>
  </LoaderHoc>
)

const AuthenticatedView = ({
  children,
  Loader = AuthenticatingUser,
  NonLoggedIn = EmailLoginView,
}) => {
  const [user, loading, error] = useAuthState(firebase.auth())
  const isNonLoggedIn = !(user || loading || error)
  return (
    <>
      {loading && (
        <>
          <Loader />
        </>
      )}
      {error && <ErrorView message={error.message} />}
      {user && <>{children}</>}
      {isNonLoggedIn && (
        <>
          <NonLoggedIn />
        </>
      )}
    </>
  )
}

export default AuthenticatedView
