import testCaseDetailsPanel from './testCaseDetailsPanel'
import testCaseForm from './testCaseForm'

function main () {
  Ext.create('Ext.Viewport', {
    padding: 10,
    layout: 'fit',
    items: {
      title: 'JSTS validation suite',
      items: [testCaseForm, testCaseDetailsPanel]
    }
  })
}

Ext.onReady(main)
