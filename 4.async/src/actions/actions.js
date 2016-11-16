import ajax from '../utils/ajax'

export const GET_LANGUAGES = 'GET_LANGUAGES'
export const RECEIVE_LANGUAGES = 'RECEIVE_LANGUAGES'
export const GET_LIKELIHOOD = 'GET_LIKELIHOOD'
export const RECEIVE_LIKELIHOOD = 'RECEIVE_LIKELIHOOD'

export const getLanguages = phrase => dispatch => {
  dispatch({ type: GET_LANGUAGES, phrase })
  return ajax.getLanguages(phrase).then(({ data }) => {
    dispatch({ type: RECEIVE_LANGUAGES, languages: data })
  })
}

export const getLikelihood = (phrase, language) => dispatch => {
  dispatch({ type: GET_LIKELIHOOD, phrase, language })
  return ajax.getLikelihood(phrase, language).then(({ data }) => {
    dispatch({ type: RECEIVE_LIKELIHOOD, likelihood: data, language, phrase })
  })
}

export default {
  getLanguages, getLikelihood
}
