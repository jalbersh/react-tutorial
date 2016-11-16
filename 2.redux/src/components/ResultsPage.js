import React, {Component} from 'react'
import {connect} from 'react-redux'
import ResultsTable from './ResultsTable'
import TextInput from './TextInput'

const ResultsPage = React.createClass({
  render() {
    return (
        <div className="resultsPage">
          <TextInput dispatch={this.props.dispatch} />
          <ResultsTable data={this.props.getLanguagesReducer} />
        </div>
    );
  },

})

export default connect((state) => state)(ResultsPage)