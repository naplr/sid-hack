import { getRequest, postRequest } from '../common/util'

export function getCampaignInfo(campaignId) {
    return getRequest(`/campaigns/${campaignId}`)
}

export function getCampaignPages(campaignId) {
    return getRequest(`/campaigns/${campaignId}/pages`)
}