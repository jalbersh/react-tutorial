import {combineReducers} from 'redux'
import {SOME_ACTION,GET_LANGUAGES} from '../actions/actions'

function someSpecializedReducer(state = false, action) {
  switch (action.type) {
    case SOME_ACTION:
      console.log('SOME_ACTION called in someSpecializedReducer')
      return true
    default:
      return state
  }
}

function getLanguagesReducer(state = [], action) {
  switch (action.type) {
    case GET_LANGUAGES:
      return action.input
    default:
      return state
  }
}

// Put all your specialized reducers in here
const rootReducer = combineReducers({
  someSpecializedReducer,
  getLanguagesReducer
})

export default rootReducer