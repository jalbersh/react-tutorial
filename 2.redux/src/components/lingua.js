import franc from 'franc'
import iso639 from 'iso-639-3'

const languageMap = iso639.reduce((object, language) => {
  object[language.iso6393] = language.name
  return object
}, {})

export default function lingua(phrase) {
  const francResults = franc.all(phrase)

  return francResults.map(result => {
    return {
      language: languageMap[result[0]],
      likelihood: result[1]
    }
  })
}