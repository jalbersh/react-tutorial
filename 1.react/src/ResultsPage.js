import React, {Component} from 'react'
import lingua from './lingua'
import ResultsTable from './ResultsTable'

function handleChange(component,event) {
    console.log('got value=',event.target.value)
    // call function to get language based on this phrase
    console.log("returned data= ", lingua(event.target.value))

    component.setState({
        data: lingua(event.target.value)
    })
}

const ResultsPage = React.createClass({
    getInitialState() {
        return {
            data: []
        }
    },
    render() {
        return (
            <div>
                <label name="input">Enter Phrase</label>
                <input type="text" name="input" onChange={event => handleChange(this,event)}/>
                <ResultsTable data={this.state.data}/>
            </div>
        );
    }
})

export default ResultsPage