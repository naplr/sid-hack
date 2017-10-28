import apiClient from '../api'

const SET_USER_ID = 'SET_USER_ID'

export function setUserId(userId) {
    return dispatch => {
      dispatch({
        type: SET_USER_ID,
        userId: userId
      })
    }
}

const ACTION_HANDLERS = {
    [SET_USER_ID]: handleSetUserId,
}

function handleSetUserId(state, action) {
    return { ...state, userId: action.userId }
}

const INITIAL_STATE = {
    userId: 1,
}

export default function(state = INITIAL_STATE, action) {
    const handler = ACTION_HANDLERS[action.type]
    return handler ? handler(state, action) : state
}