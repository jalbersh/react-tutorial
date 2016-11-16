import React, {Component} from 'react'

const ResultsTable = React.createClass({
    render() {
        var mappedarray = this.props.data.map(function (data) {
            return (

                <tr>
                    <td>{data.language}</td>
                    <td>{data.likelihood}</td>
                </tr>
            )
        })
        return (
            <div>
                <table>
                    <thead>Data</thead>
                    <tr>
                        <td>language</td>
                        <td>likelihood</td>
                    </tr>
                    {mappedarray}
                </table>
            </div>
        );
    }
})

export default ResultsTable