import { getRequest, postRequest } from '../common/util'

export function getAllPages() {
  return getRequest('/pages/')
}

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

export function getRecommenedPages(pageIds) {
  return postRequest('/pages_recommendation/', { pageIds })
}

export function updateStatus(pageId, campaignId, status) {
  return postRequest('/action/update-campaigned-page-status/', {
    pageId,
    campaignId,
    status
  })
}

export function claimPage(pageId, token) {
  const data = {
    pageId,
    access_token: token
  }

  return postRequest('/action/claim-page/', data)
}