import React, {Component} from 'react'
import lingua from '../lib/lingua'
import actions from '../actions/actions'

function handleChange(dispatch,event) {
    dispatch(actions.getLanguages(lingua.lingua(event.target.value)))
}

const TextInput = React.createClass({
    render() {
        const { dispatch } = this.props;
        return (
            <div>
                <label name="input">Enter Phrase</label>
                <input type="text" name="input" onChange={event => handleChange(dispatch, event)}/>
            </div>
        )
    }
})

export default TextInput