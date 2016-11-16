import ResultsPage from '../../src/components/ResultsPage'
import TestUtils from 'react-addons-test-utils'
import React from 'react'
import ResultsTable from '../../src/components/ResultsTable'
import TextInput from '../../src/components/TextInput'

const fakeStore = {
  getState() {
    return {
      getLanguagesReducer: []
    }
  },

  dispatch() {

  },

  subscribe() {

  }
}

describe('ResultsPage', ()=> {
  it('renders', () => {
    const output = TestUtils.renderIntoDocument(
      <ResultsPage store={fakeStore} />
    )

    const resultsPage = TestUtils.scryRenderedDOMComponentsWithClass(output, 'resultsPage')[0]
    expect(resultsPage).toBeDefined()
    const table = TestUtils.scryRenderedComponentsWithType(output, ResultsTable)[0]
    expect(table).toBeDefined()
    const input = TestUtils.scryRenderedComponentsWithType(output, TextInput)[0]
    expect(input).toBeDefined()
  })
})
