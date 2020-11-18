import React, { useState } from 'react'

import UserRole, { ROLE } from '../../js/user-role'

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
  const [isUserAuthored, setAuthorized] = useState(
    allowedRoles.includes(UserRole.role)
  )
  UserRole.onRoleChange((role) => {
    if (allowedRoles.includes(role)) setAuthorized(true)
  })
  return <>{isUserAuthored ? <>{children}</> : <UnAuthorizedComponent />}</>
}

export default AuthorizedView
