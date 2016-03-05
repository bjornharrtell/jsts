import generate from './generate'

const suites = [
  'TestBoundary',
  'TestBuffer',
  'TestCentroid',
  'TestConvexHull',
  'TestEqualsExact',
  'TestFunctionAA',
  'TestFunctionLA',
  'TestFunctionLL',
  'TestFunctionPA',
  'TestFunctionPL',
  'TestFunctionPP',
  'TestRelateAA',
  'TestRelateAC',
  'TestRelateLA',
  'TestRelateLC',
  'TestRelateLL',
  'TestRelatePA',
  'TestRelatePL',
  'TestRelatePP',
  'TestSimple',
  'TestValid'
]

var count = 0

suites.forEach(xml => {
  count++
  const suite = Mocha.Suite.create(mocha.suite, xml)

  const fileName = '../../../testxml/general/' + xml + '.xml'

  const parser = new DOMParser() // eslint-disable-line
  fetch(fileName)  // eslint-disable-line
    .then(response =>
      response.text()
    .then(text => {
      generate(parser.parseFromString(text, 'application/xml'), xml, suite)
      count--
      if (count === 0) {
        mocha.checkLeaks()
        mocha.globals(['jQuery'])
        mocha.run()
      }
    }))
})
