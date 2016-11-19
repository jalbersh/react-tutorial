import React, {Component} from 'react'
import {connect} from 'react-redux'
import actions from '../actions/actions'

export class App extends Component {
  render() {
    return (
      <div className="app">
        <form onSubmit={event => this.submit(this, event)}>
          <div><input name="phrase" placeholder="enter a phrase" /></div>
          <div><input type="submit" /></div>
        </form>
        <ul>
          {this.mapLanguages(this.sortLanguages(this.props.languages))}
        </ul>
      </div>
    )
  }

  getLanguageFromLikelihood(languages,value) {
      for (let i=0; i < languages.length; i++) {
          const likelihood = this.formatPercentage(this.props.likelihood[languages[i]])
          if (likelihood == value) {
              return languages[i]
          }
      }
      return null
  }

  sortLanguages(languages) {
      let sorted = []
      if (!languages) return {}
      for (let i=0; i < languages.length; i++) {
          const likelihood = this.formatPercentage(this.props.likelihood[languages[i]])
          if (likelihood) {
              //console.log('adding likelihood of ',likelihood,' for ', languages[i])
              sorted.push(likelihood)
          }
      }
      sorted = sorted.sort()
      let sortedLanguages = []
      for (let i=sorted.length; i >= 0; i--) {
          let language = this.getLanguageFromLikelihood(languages,sorted[i])
          //console.log('language=',language)
          if (language) {
             sortedLanguages.push(language)
          }
      }
      for (let i=0; i < languages.length; i++) {
          let language = languages[i];
          if (!sortedLanguages.includes(language)) {
              sortedLanguages.push(language)
          }
      }
      return sortedLanguages
      //return languages
  }

  mapLanguages(languages) {
    return languages.map((language, key) => {
        const likelihood = this.formatPercentage(this.props.likelihood[language])
        return <li key={key} onClick={event => this.click(language, this)}>{language} {likelihood}</li>
    })
  }

  formatPercentage(number) {
      if (number === undefined) {
          return ''
      }
      return (number*100).toFixed(2) + ' %'
  }

  click(language, component) {
      this.props.dispatch(actions.getLikelihood(this.state.phrase,language))
  }

  submit(component, event) {
      event.preventDefault()
      const phrase = event.target.phrase.value
      component.setState({phrase: phrase});
      this.props.dispatch(actions.getLanguages(phrase))
  }
}

export default connect(store => store)(App)

