import {App} from '../../src/components/App'
import TestUtils, {Simulate} from 'react-addons-test-utils'
import React from 'react'
import actions from '../../src/actions/actions'

describe('App', ()=> {
  beforeEach(() => {
    spyOn(actions, 'getLanguages')
    spyOn(actions, 'getLikelihood')
  })

  const renderApp = ({languages, likelihood}) => {
    const dispatchSpy = jasmine.createSpy('dispatchSpy')
    const output = TestUtils.renderIntoDocument(
      <App languages={languages || []} likelihood={likelihood || {}} dispatch={dispatchSpy} />
    )
    return {output, dispatchSpy}
  }

  it('renders', () => {
    const {output} = renderApp({})
    const app = TestUtils.scryRenderedDOMComponentsWithClass(output, 'app')

    expect(app).toBeDefined()
  })

  it('renders a form with an input box', () => {
    const {output} = renderApp({})
    const forms = TestUtils.findAllInRenderedTree(output, ({tagName}) => tagName === 'FORM')
    const inputs = TestUtils.findAllInRenderedTree(output, ({name, tagName}) => name === 'phrase' && tagName === 'INPUT')
    expect(forms.length).toEqual(1)
    expect(inputs.length).toEqual(1)
  })

  it('prevents default action on form submit', () => {
    const {output} = renderApp({})
    const form = TestUtils.findAllInRenderedTree(output, ({tagName}) => tagName === 'FORM')[0]
    const preventDefault = jasmine.createSpy('preventDefault')
    Simulate.submit(form, { preventDefault })

    expect(preventDefault).toHaveBeenCalled()
  })

  it('dispatches getLanguages on submit', () => {
    const {output, dispatchSpy} = renderApp({})
    const form = TestUtils.findAllInRenderedTree(output, ({tagName}) => tagName === 'FORM')[0]
    const input = TestUtils.findAllInRenderedTree(output, ({name, tagName}) => name === 'phrase' && tagName === 'INPUT')[0]
    actions.getLanguages.and.returnValue('actionSpy')

    input.value = 'test phrase'
    Simulate.submit(form)

    expect(dispatchSpy).toHaveBeenCalledWith('actionSpy')
    expect(actions.getLanguages).toHaveBeenCalledWith('test phrase')
  })

  it('sets the entered phrase on the component\'s state', () => {
    const {output} = renderApp({})
    const form = TestUtils.findAllInRenderedTree(output, ({tagName}) => tagName === 'FORM')[0]
    const input = TestUtils.findAllInRenderedTree(output, ({name, tagName}) => name === 'phrase' && tagName === 'INPUT')[0]
    spyOn(output, 'setState')

    input.value = 'user entered phrase'
    Simulate.submit(form)

    expect(output.setState).toHaveBeenCalledWith({ phrase: 'user entered phrase' })
  })

  it('renders a list of languages', () => {
    const languages = ['Pig Latin', 'Sign Language', 'Klingon']
    const {output} = renderApp({languages})
    const lis = TestUtils.findAllInRenderedTree(output, ({tagName}) => tagName === 'LI')

    expect(lis.length).toEqual(3)
    expect(lis[0].textContent).toContain('Pig Latin')
    expect(lis[1].textContent).toContain('Sign Language')
    expect(lis[2].textContent).toContain('Klingon')
  })

  it('dispatches getLikelihood on link click', () => {
    const languages = ['Pig Latin', 'Sign Language', 'Klingon']
    const {output, dispatchSpy} = renderApp({languages})
    const klingon = TestUtils.findAllInRenderedTree(output, ({innerText, tagName}) => {
      return tagName === 'LI' && innerText.match(/Klingon/)
    })[0]
    actions.getLikelihood.and.returnValue(0.987)
    output.state = {phrase: 'ka pla'}

    expect(klingon).toBeDefined()
    Simulate.click(klingon)

    expect(actions.getLikelihood).toHaveBeenCalledWith('ka pla', 'Klingon')
    expect(dispatchSpy).toHaveBeenCalledWith(0.987)
  })

  it('formats a number as a percentage', () => {
    const app = new App
    expect(app.formatPercentage()).toEqual('')
    expect(app.formatPercentage(0.11223344)).toEqual('11.22 %')
  })

  it('renders the likelihood to the page', () => {
    const languages = ['Pig Latin', 'Sign Language', 'Klingon']
    const likelihood = {Klingon: 0.1235432}
    const {output} = renderApp({languages, likelihood})
    const klingon = TestUtils.findAllInRenderedTree(output, ({innerText, tagName}) => {
      return tagName === 'LI' && innerText.match(/Klingon/)
    })[0]

    expect(klingon.innerText).toContain('12.35 %')
  })

  it('sorts languages by percentage if percentage is known', () => {
    const languages = ['Pig Latin', 'Sign Language', 'Klingon', 'Gibberish']
    const likelihood = {Klingon: 0.1235432, 'Sign Language': 0.5454547}
    const {output} = renderApp({languages, likelihood})
    const lis = TestUtils.findAllInRenderedTree(output, ({tagName}) => tagName === 'LI')

    expect(lis[0].innerText).toContain('Sign Language')
    expect(lis[0].innerText).toContain('54.55 %')
    expect(lis[1].innerText).toContain('Klingon')
    expect(lis[1].innerText).toContain('12.35 %')
    expect(lis[2].innerText).toContain('Pig Latin')
    expect(lis[3].innerText).toContain('Gibberish')
  })
})
