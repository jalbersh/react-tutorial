import {
  GET_LANGUAGES, RECEIVE_LANGUAGES, GET_LIKELIHOOD, RECEIVE_LIKELIHOOD
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

export const likelihood = (state = {}, {type, language, likelihood}) => {
  switch (type) {
    case GET_LANGUAGES:
      return {}
    case RECEIVE_LIKELIHOOD:
      return Object.assign({}, state, { [language]: likelihood });
    default:
      return state
  }
}

export default {
  languages,likelihood
}
