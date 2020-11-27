import { useState } from 'react'
import UserRole from '../js/user-role'

export function useRole() {
  const [role, setRole] = useState(UserRole.role)
  UserRole.onRoleChange(setRole)
  return role
}
