import apiClient from '../api'

const GET_USER_CAMPAIGNS = 'GET_USER_CAMPAIGNS'

export function getUserCampaigns(userId) {
    return dispatch => {
      apiClient.campaign.getUserCampaigns(userId)
        .then(campaigns => {
            dispatch({
                type: GET_USER_CAMPAIGNS,
                campaigns: campaigns
            })
        })
    }
}

const ACTION_HANDLERS = {
    [GET_USER_CAMPAIGNS]: handleGetUserCampaigns,
}

function handleGetUserCampaigns(state, action) {
    return { ...state, campaigns: action.campaigns }
}

const INITIAL_STATE = {
    campaigns: null,
}

export default function(state = INITIAL_STATE, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}