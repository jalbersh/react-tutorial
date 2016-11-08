import {
  GET_LANGUAGES, RECEIVE_LANGUAGES
} from '../actions/actions'

export const languages = (state = [], {type, languages}) => {
  switch (type) {
    case GET_LANGUAGES:
      return []
    case RECEIVE_LANGUAGES:
      return languages
    default:
      return state
  }
}

export default {
  languages
}
