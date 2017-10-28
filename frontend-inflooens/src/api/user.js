import { getRequest, postRequest } from '../common/util'

export function login(fbData) {
    return postRequest('/login/', fbData)
}