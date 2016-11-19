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

  getKey(map,value) {
      let keys = Object.keys(map)
      for (let i=0;i<keys.length;i++) {
          let k = keys[i]
          if (map[k] == value) {
              return k
          }
      }
  }

  sortLanguages(languages) {
      console.log("likelihood: ", this.props.likelihood)

      // let map = new Map()
      let map = {}

      if (!languages) return {}
      for (let i=0; i < languages.length; i++) {
          const likelihood = this.formatPercentage(this.props.likelihood[languages[i]])
          if (likelihood) {
              console.log('adding likelihood of ',likelihood,' for ', languages[i])
              map[languages[i]] = likelihood
          } else {
              if (!map[languages[i]]) {
                  map[languages[i]] = -1
              }
          }
      }
      console.log('got map=',map)
      if (Object.values(map).length>0) {
          console.log('new unsorted map=',map)
          let values = Object.values(map)
          console.log('values=',values)
          let sortedLanguages = []
          let sortedLikelihoods = []
          values = values.sort()
          console.log('after sort, values=',values)
          for (let i=values.length; i >= 0; i--) {
              let v = values[i]
              console.log('v=',v)
              let key = this.getKey(map, v)
              console.log('key=',key)
              sortedLanguages[i] = key
              if (key) {
                  sortedLikelihoods[i] = v
              } else {
                  sortedLikelihoods[i] = -1
              }
          }
          return sortedLanguages
      }
      return languages
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

