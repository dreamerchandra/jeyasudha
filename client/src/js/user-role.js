/* eslint-disable no-unused-expressions */
import { getCurrentUserId, ref } from './firebase-helper'

export const ROLE = {
  NA: 'na',
  OWNER: '0',
  STAFF: '1',
}

export default class UserRole {
  static role = ROLE.NA

  static roleChangeListeners = []

  static updateRole = async () => {
    const userId = getCurrentUserId()
    if (!userId) return
    const roleSnap = await ref().userRole.doc(userId).get()
    if (!roleSnap.exists) return
    const { role: newRole = ROLE.NA } = roleSnap.data() || {}
    this.updateListenersOnRoleChange(this.role, newRole)
    this.role = newRole
  }

  static updateListenersOnRoleChange = (oldRole, newRole) => {
    if (oldRole === newRole) return
    this.roleChangeListeners.forEach((listener) => {
      listener?.(newRole)
    })
  }

  static onRoleChange = (onChange) => {
    this.roleChangeListeners.push(onChange)
  }
}

window.UserRole = UserRole
