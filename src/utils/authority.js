import {getLocalstorage, removeLocalstorage, setLocalstorage} from './index'

const key = 'HR-Cloud-Authority';

export function getAuthority() {
  return getLocalstorage(key)
}

export function setAuthority(au) {
  return setLocalstorage(key, au)
}

export function removeAuthority() {
  return removeLocalstorage(key)
}
