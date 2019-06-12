import {getLocalstorage, removeLocalstorage, setLocalstorage} from './index'

const key = 'HR-Cloud-Username'

export function getUsername() {
  return getLocalstorage(key)
}

export function setUsername(un) {
  return setLocalstorage(key, un)
}

export function removeUsername() {
  return removeLocalstorage(key)
}
