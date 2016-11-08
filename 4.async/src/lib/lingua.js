import franc from 'franc'
import iso639 from 'iso-639-3'

const languageMap = iso639.reduce((object, {iso6393, name}) => {
  object[iso6393] = name
  return object
}, {})

const getLikelihood = (phrase, language) => {
  const francResults = franc.all(phrase)
  return francResults.find(([lang]) => languageMap[lang] === language)[1]
}

const getLanguages = phrase => {
  const francResults = franc.all(phrase)
  return francResults.map(([language]) => languageMap[language]).sort()
}

export default {
  getLikelihood,
  getLanguages
}
