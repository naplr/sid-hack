import { getRequest, postRequest } from '../common/util'
import { store } from '../store'

export function getCampaignInfo(campaignId) {
  return getRequest(`/campaigns/${campaignId}`)
}

export function getCampaignPages(campaignId) {
  return getRequest(`/campaigns/${campaignId}/pages`)
}

export function getUserCampaigns(userId) {
  return getRequest('/campaigns/', { userid: userId })
}

export function createCampaign(userId, campaignName) {
  const data = {
    name: campaignName,
    user: userId, 
  }

  return postRequest('/campaigns/', data)
}