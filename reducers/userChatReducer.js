import {
  GET_CHAT_POSTS,
  JOIN_PRIVATE_CHAT,
  GET_CHAT_POST
} from '../actions/action_types'

const initialState = {
  currentChatId: '',
  post: {},
  loading: false,
  postAdded: false,
  chat: []
}

const chat = (state = initialState, action) => {
  switch (action.type) {
    case JOIN_PRIVATE_CHAT:
      return {
        ...state,
        currentChatId: action.id
      }
    case GET_CHAT_POSTS:
      return {
        ...state,
        chat: action.payload
      }

    default:
      return state
  }
}
export default chat
