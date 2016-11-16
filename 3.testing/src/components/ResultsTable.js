import React, {Component} from 'react'

const ResultsTable = React.createClass({
    render() {
        var mappedarray = this.props.data.map(function (data, key) {
            return (

                <tr key={key}>
                    <td>{data.language}</td>
                    <td>{data.likelihood}</td>
                </tr>
            )
        })
        return (
            <div>
                <table>
                    <thead key="thead">
                        <tr key="heading">
                            <td>language</td>
                            <td>likelihood</td>
                        </tr>
                    </thead>
                    <tbody key="tbody">
                        {mappedarray}
                    </tbody>
                </table>
            </div>
        );
    }
})

export default ResultsTable