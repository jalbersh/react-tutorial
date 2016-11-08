import rootReducer from '../../src/reducers/rootReducer'
import {
  GET_LANGUAGES, RECEIVE_LANGUAGES,
  GET_LIKELIHOOD, RECEIVE_LIKELIHOOD,
  getLanguages, getLikelihood
} from '../../src/actions/actions'
import ajax from '../../src/utils/ajax'

describe('actions', () => {
  describe('getLanguages', () => {
    const languages = ['language 1', 'language 2']

    beforeEach(() => {
      spyOn(ajax, 'getLanguages').and.returnValue(new Promise(resolve => {
        resolve({data: languages})
      }))
    })

    it('is a function', () => {
      expect(typeof getLanguages).toEqual('function');
    })

    it('returns a function', () => {
      expect(typeof getLanguages()).toEqual('function');
    })

    it('invokes the method passed to it', () => {
      const spy = jasmine.createSpy('spy')
      getLanguages()(spy)
      expect(spy).toHaveBeenCalled()
    })

    it('dispatches GET_LANGUAGES with the supplied phrase', () => {
      const spy = jasmine.createSpy('spy')
      const phrase = 'this is the song that never ends'
      getLanguages(phrase)(spy)
      expect(spy).toHaveBeenCalledWith({ type: GET_LANGUAGES, phrase })
    })

    it('fetches phrases asynchronously', done => {
      const spy = jasmine.createSpy('spy')
      const phrase = 'this is the song that never ends'
      getLanguages(phrase)(spy).then(() => {
        expect(ajax.getLanguages).toHaveBeenCalledWith(phrase)
      }).then(done)
    })

    it('dispatches RECEIVE_LANGUAGES when languages are received', done => {
      const spy = jasmine.createSpy('spy')
      getLanguages()(spy).then(() => {
        expect(spy).toHaveBeenCalledWith({ type: RECEIVE_LANGUAGES, languages })
      }).then(done)
    })
  })

  describe('getLikelihood', () => {
    const likelihood = 0.834

    beforeEach(() => {
      spyOn(ajax, 'getLikelihood').and.returnValue(new Promise(resolve => {
        resolve({data: likelihood})
      }))
    })

    it('is a function', () => {
      expect(typeof getLikelihood).toEqual('function');
    })

    it('returns a function', () => {
      expect(typeof getLikelihood()).toEqual('function');
    })

    it('invokes the method passed to it', () => {
      const spy = jasmine.createSpy('spy')
      getLikelihood()(spy)
      expect(spy).toHaveBeenCalled()
    })

    it('dispatches GET_LIKELIHOOD with the supplied phrase and language', () => {
      const spy = jasmine.createSpy('spy')
      const phrase = 'this is the song that never ends'
      const language = 'pig latin'
      getLikelihood(phrase, language)(spy)
      expect(spy).toHaveBeenCalledWith({ type: GET_LIKELIHOOD, phrase, language })
    })

    it('fetches likelihood of a language asynchronously', done => {
      const spy = jasmine.createSpy('spy')
      const phrase = 'this is the song that never ends'
      const language = 'pig latin'
      getLikelihood(phrase, language)(spy).then(() => {
        expect(ajax.getLikelihood).toHaveBeenCalledWith(phrase, language)
      }).then(done)
    })

    it('dispatches RECEIVE_LIKELIHOOD when likelihood is received', done => {
      const spy = jasmine.createSpy('spy')
      const phrase = 'phrase'
      const language = 'Swahili'
      getLikelihood(phrase, language)(spy).then(() => {
        expect(spy).toHaveBeenCalledWith({ type: RECEIVE_LIKELIHOOD, likelihood, language, phrase })
      }).then(done)
    })
  })
})
