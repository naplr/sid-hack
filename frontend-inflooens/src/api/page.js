import { getRequest, postRequest } from '../common/util'

export function getPageInfo(pageId) {
    return getRequest(`/pages/${pageId}/`)
}

export function getPageCampaigns(pageId, userId) {
  const params = {
    userId: userId
  }

  return getRequest(`/pages/${pageId}/campaigns/`, params)
}

export function addPageToCampaign(pageId, campaignId) {
  return postRequest('/action/add-page-to-campaign/', {
    pageId,
    campaignId
  })
}