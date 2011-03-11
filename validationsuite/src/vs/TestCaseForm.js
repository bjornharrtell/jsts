/**
 * @constructor
 */
jsts.vs.TestCaseForm = Ext.extend(Ext.Panel,
    {
      initComponent: function() {

        this.groups = new Ext.data.ArrayStore({
          id: 0,
          fields: ['id', 'filename'],
          data: this.files
        }),

        this.cases = new Ext.data.Store();

        Ext.apply(this, {
          layout: 'fit',
          items: {
            layout: 'form',
            items: [{
              xtype: 'combo',
              fieldLabel: 'Group',
              name: 'group',
              store: this.groups,
              triggerAction: 'all',
              lazyRender: true,
              mode: 'local',
              valueField: 'id',
              displayField: 'filename',
              value: 0
            }, {
              xtype: 'combo',
              fieldLabel: 'Case',
              name: 'case',
              store: this.cases
            }]
          }
        });

        jsts.vs.TestCaseForm.superclass.initComponent.apply(this, arguments);
      },
      files: [[0, 'TestRelatePP.xml'], [1, 'TestRelatePL.xml'],
          [2, 'TestRelatePA.xml'], [3, 'TestRelateLL.xml'],
          [4, 'TestRelateLC.xml'], [5, 'TestRelateLA.xml'],
          [6, 'TestRelateAC.xml']],
      groups: null,
      cases: null
    });