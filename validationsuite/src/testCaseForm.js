import testCaseDetailsPanel from './testCaseDetailsPanel'

const files = [[0, 'TestRelatePP.xml'], [1, 'TestRelatePL.xml'],
  [2, 'TestRelatePA.xml'], [3, 'TestRelateLL.xml'],
  [4, 'TestRelateLC.xml'], [5, 'TestRelateLA.xml'],
  [6, 'TestRelateAC.xml'], [7, 'TestRelateAA.xml']]

const groups = Ext.create('Ext.data.ArrayStore', {
  id: 0,
  fields: ['id', 'filename'],
  data: files
})

Ext.define('Case', {
  extend: 'Ext.data.Model',
  proxy: {
    type: 'ajax',
    reader: 'xml'
  },
  fields: ['desc', 'a', 'b']
})

const cases = Ext.create('Ext.data.Store', {
  model: 'Case',
  proxy: {
    type: 'ajax',
    url: '../testxml/validate/TestRelatePP.xml',
    reader: {
      type: 'xml',
      record: 'case'
    }
  },
  autoLoad: true
})

function onGroupSelect (combo, record, index) {
  cases.getProxy().setUrl('../testxml/validate/' + record.data.filename)
  cases.reload()
  testCaseDetailsPanel.reset()
}

function onCaseSelect (combo, record, index) {
  testCaseDetailsPanel.showTestCase(record)
}

const combo = Ext.create('Ext.form.ComboBox', {
  width: 450,
  xtype: 'combo',
  fieldLabel: 'Case',
  name: 'case',
  ref: '../case',
  store: cases,
  triggerAction: 'all',
  lazyRender: true,
  displayField: 'desc',
  listeners: {
    'select': onCaseSelect
  }
})

cases.on('load', (store, records) => {
  const record = records[0]
  combo.select(record)
  testCaseDetailsPanel.showTestCase(record)
})

export default Ext.create('Ext.panel.Panel', {
  layout: 'form',
  items: [{
    width: 150,
    xtype: 'combo',
    fieldLabel: 'Group',
    name: 'group',
    ref: 'group',
    store: groups,
    triggerAction: 'all',
    lazyRender: true,
    mode: 'local',
    valueField: 'id',
    displayField: 'filename',
    value: 0,
    listeners: {
      'select': onGroupSelect
    }
  }, combo]

})
