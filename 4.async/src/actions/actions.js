import ajax from '../utils/ajax'

export const GET_LANGUAGES = 'GET_LANGUAGES'
export const RECEIVE_LANGUAGES = 'RECEIVE_LANGUAGES'

export const getLanguages = phrase => dispatch => {
  dispatch({ type: GET_LANGUAGES, phrase })
  return ajax.getLanguages(phrase).then(({ data }) => {
    dispatch({ type: RECEIVE_LANGUAGES, languages: data })
  })
}

export default {
  getLanguages
}
