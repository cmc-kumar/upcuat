/*
 * File: app/view/Payment.js
 *
 * This file was generated by Sencha Architect version 2.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Sencha Touch 2.0.x library, under independent license.
 * License of Sencha Architect does not include license for Sencha Touch 2.0.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('FlexMobile.view.Payment', {
  extend:'Ext.Container',
  alias:'widget.payment',

  config:{
    items:[
      {
        xtype:'titlebar',
        docked:'top',
        title:flexMobileAppRes.makePayment
      },
      {
        xtype:'formpanel',
        height:433,
        ui:'light',
        width:'',
        items:[
          {
            xtype:'fieldset',
            title:flexMobileAppRes.paymentInfomation,
            items:[
              {
                xtype:'numberfield',
                label:flexMobileAppRes.amount,
                name:'paymentAmount',
                value:flexMobileAppRes.vSuggestAmount,
                minValue:flexMobileAppRes.vMinAmount,
                maxValue:flexMobileAppRes.vBalance,
                required:true
              },
              {
                xtype:'datepickerfield',
                label:flexMobileAppRes.date,
                name:'paymentDate',
                value:new Date(),
                required:true,
                placeHolder:'mm/dd/yyyy',
                picker:{
                  value:{
                    year:2012,
                    month:10,
                    day:17
                  },
                  yearFrom:2012,
                  yearTo:2014
                },
                getValue:function(){
                  Ext.Date.format(this.getValue(), 'Y-m-d')
                }
              },
              {
                xtype:'selectfield',
                label:flexMobileAppRes.method,
                name:'fundingAccount',
                displayField:'methodName',
                valueField:'methodId',
                store:'FundingAccountStore',
                required:true
              }
            ]
          },
          {
            xtype:'fieldset',
            title:flexMobileAppRes.paymentReminder,
            items:[
              {
                xtype:'numberfield',
                label:flexMobileAppRes.reminderDays,
                name:'reminderDays',
                maxValue:20,
                minValue:0,
                stepValue:1
              },
              {
                xtype:'emailfield',
                height:43,
                label:flexMobileAppRes.email,
                name:'reminderEmail',
                placeHolder:'email@example.com'
              }
            ]
          },
          {
            xtype:'segmentedbutton',
            layout:{
              pack:'end',
              type:'hbox'
            },
            items:[
              {
                xtype:'button',
                text:flexMobileAppRes.submit,
                handler:function () {
                  var form = this.up('formpanel');

                  // Mask the form
                  form.setMasked({
                    xtype:'loadmask',
                    message:flexMobileAppRes.makePayment
                  });

                  form.submit({
                    url:flexMobileAppRes.urlCreatePayment,
                    method:'POST',
                    success:function (form, result) {
                      if (!result.message) {
                        form.setMasked(false);
                        Ext.Msg.alert('Success!');
                        form.reset();
                        Ext.getStore('HistoryPaymentStore').load();
                      } else {
                        form.setMasked(false);
                        Ext.Msg.alert(flexMobileAppRes.paymentFailed, result.message);
                      }
                    },
                    failure:function (result, request) {
                      form.setMasked(false);
                      Ext.Msg.alert(flexMobileAppRes.failed, flexMobileAppRes.internalError);
                    }
                  });
                }
//              },
//              {
//                xtype:'button',
//                text:flexMobileAppRes.cancel
              }
            ]
          }
        ]
      }
    ]
  }
});