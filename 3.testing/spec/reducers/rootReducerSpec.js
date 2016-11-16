import rootReducer from '../../src/reducers/rootReducer'
import {SOME_ACTION, GET_LANGUAGES} from '../../src/actions/actions'

describe('.rootReducer', () => {
  describe('.someSpecializedReducer', () => {
    it('has a default state of false', () => {
      const state = rootReducer(undefined, {type: 'ignored'})

      expect(state.someSpecializedReducer).toEqual(false)
    })

    it('flips boolean', () => {
      let state = rootReducer({'someSpecializedReducer': true}, {type: SOME_ACTION})
      expect(state.someSpecializedReducer).toEqual(false)

      state = rootReducer({'someSpecializedReducer': false}, {type: SOME_ACTION})
      expect(state.someSpecializedReducer).toEqual(true)
    })

    it('ignores unknown actions', () => {
      const state = rootReducer({'someSpecializedReducer': true}, {type: 'ignored'})
      expect(state.someSpecializedReducer).toEqual(true)
    })
  })

  describe('.getLanguagesReducer', () => {
    it ('does something with getLanguages', () => {
      let action = {type: GET_LANGUAGES, 'input':[{'Language':'Portuguese'},{'Likelihood':1.0}]}
      let state = rootReducer([], action)
      expect(state.getLanguagesReducer).toEqual([{'Language':'Portuguese'},{'Likelihood':1.0}])
    })
  })
})
