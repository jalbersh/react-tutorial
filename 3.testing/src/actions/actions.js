export const SOME_ACTION = 'SOME_ACTION'
export const SOME_OTHER_ACTION = 'SOME_OTHER_ACTION'
export const GET_LANGUAGES = 'GET_LANGUAGES'

export function someAction() {
  return {
    type: SOME_ACTION
  }
}

export function someOtherAction() {
  return {
    type: SOME_OTHER_ACTION
  }
}

export function getLanguages(input) {
  return {
    type: GET_LANGUAGES,
    input
  }
}

export default {
  someAction,
  someOtherAction,
  getLanguages
}