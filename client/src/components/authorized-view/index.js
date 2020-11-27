import React from 'react'
import { useRole } from '../../common-hoooks/use-role'
import { ROLE } from '../../js/user-role'

const DefaultUnAuthorizedComponent = () => {
  return (
    <div className="s-center" style={{ width: '100%', height: '100%' }}>
      <h1>You aren&apos;t authorized to view this page</h1>
    </div>
  )
}

const AuthorizedView = ({
  children,
  UnAuthorizedComponent = DefaultUnAuthorizedComponent,
  allowedRoles = [ROLE.OWNER],
}) => {
  const role = useRole()
  const isUserAuthored = allowedRoles.includes(role)
  return <>{isUserAuthored ? <>{children}</> : <UnAuthorizedComponent />}</>
}

export default AuthorizedView
