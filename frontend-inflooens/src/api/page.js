import { getRequest, postRequest } from '../common/util'

export function getPageInfo(pageId) {
    return getRequest(`/pages/${pageId}`)
}