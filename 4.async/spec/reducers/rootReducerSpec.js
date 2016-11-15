import {languages, likelihood} from '../../src/reducers/rootReducer'
import {
  GET_LANGUAGES, RECEIVE_LANGUAGES, GET_LIKELIHOOD, RECEIVE_LIKELIHOOD
} from '../../src/actions/actions'

describe('rootReducer', () => {
  describe('languages', () => {
    it('has a default state of an empty array', () => {
      const state = languages(undefined, {type: 'ANY_TYPE'})

      expect(state).toEqual([])
    })

    it('returns empty array when GET_LANGUAGES', () => {
      const state = languages(undefined, {type: GET_LANGUAGES})
      expect(state).toEqual([])
    })

    it('returns languages when RECEIVE_LANGUAGES', () => {
      const action = {type: RECEIVE_LANGUAGES, languages: ['only language']}
      const state = languages(['anything'], action)
      expect(state).toEqual(action.languages)
    })

    it('returns current state in all other cases', () => {
      const state = ['anything']
      expect(languages(state, {type: 'ANY_TYPE'})).toEqual(state)
    })
  })

  describe('likelihood', () => {
    it('has a default state of {}', () => {
      const state = likelihood(undefined, {type: 'ANY_TYPE'})

      expect(state).toEqual({})
    })

    it('returns empty object when GET_LANGUAGES', () => {
      const state = likelihood({a: 1}, {type: GET_LANGUAGES})
      expect(state).toEqual({})
    })

    it('returns likelihood with key of language added with value likelihood when RECEIVE_LIKELIHOOD', () => {
      const action = {type: RECEIVE_LIKELIHOOD, language: 'pig latin', likelihood: 1}
      const state = likelihood({a: 1}, action)
      expect(state).toEqual({ a: 1, 'pig latin': 1 })
    })

    it('returns current state in all other cases', () => {
      const state = {a: 1}
      expect(likelihood(state, {type: 'ANY_TYPE'})).toEqual(state)
    })

    it('does not mutate state', () => {
      const state = {a: 1}
      const newState = likelihood(state, {type: RECEIVE_LIKELIHOOD })
      expect(state).not.toEqual(newState)
    })
  })
})
