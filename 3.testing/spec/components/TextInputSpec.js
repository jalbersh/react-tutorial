import TestUtils, {Simulate} from 'react-addons-test-utils'
import React from 'react'
import lingua from '../../src/lib/lingua'
import actions from '../../src/actions/actions'

import TextInput from '../../src/components/TextInput'

var mockPhrase = "This is a test phrase"

describe('TextInput', ()=> {
    it('renders', () => {
        const dispatch = jasmine.createSpy('dispatch')
        const output = TestUtils.renderIntoDocument(
            <TextInput dispatch={dispatch} />
        )
        spyOn(lingua, 'lingua').and.returnValue([1, 2, 3])
        spyOn(actions, 'getLanguages').and.returnValue({
            type: 'GET_LANGUAGES',
            input: 'input'
        })

        const Label = TestUtils.findRenderedDOMComponentWithTag(output, 'Label')
        expect(Label).toBeDefined()
        const Input = TestUtils.findRenderedDOMComponentWithTag(output, 'input')
        expect(Input).toBeDefined()
        Input.value = mockPhrase
        Simulate.change(Input)
        expect(lingua.lingua).toHaveBeenCalledWith(mockPhrase)
        expect(actions.getLanguages).toHaveBeenCalledWith([1, 2, 3])
        expect(dispatch).toHaveBeenCalledWith({
            type: 'GET_LANGUAGES',
            input: 'input'
        })
    })
})

