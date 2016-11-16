import TestUtils from 'react-addons-test-utils'
import React from 'react'
import ResultsTable from '../../src/components/ResultsTable'
import TextInput from '../../src/components/TextInput'

var mockData = [
    {
        language: 'Portuguese',
        likelihood: 1
    },
    {
        language: 'Logudorese Sardinian',
        likelihood: 0.8948665297741273
    },
    {
        language: 'Galician',
        likelihood: 0.8862422997946612
    },
    {
        language: 'Siona',
        likelihood: 0.8804928131416838
    },
    {
        language: 'Bosnian',
        likelihood: 0.8394250513347022
    },
    {
        language: 'Croatian',
        likelihood: 0.8336755646817249
    },
]

describe('ResultsTable', ()=> {
    it('renders', () => {
        const output = TestUtils.renderIntoDocument(
            <ResultsTable data={mockData} />
        )

        const Table = TestUtils.findRenderedDOMComponentWithTag(output, 'table')
        expect(Table).toBeDefined()
        const row = Table.getElementsByTagName('TR')[1]
        expect(row).toBeDefined()
        const col = row.getElementsByTagName('TD')[0]
        expect(col).toBeDefined()
        expect(col.textContent).toEqual('Portuguese')

    })
})

