Ext.define('Tualo.pugBrowser.lazy.LiveView', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.tualo_pugbrowser_liveview',


    requires: [
        'Tualo.pugBrowser.lazy.controller.LiveView',
        'Tualo.pugBrowser.lazy.models.LiveView'
    ],


    controller: 'tualo_pugbrowser_liveview',
    viewModel: {
        type: 'tualo_pugbrowser_liveview'
    },
    title: null,
    bodyPadding: 10,
    listeners: {
        boxready: 'onBoxReady'
    },
    /*
    tools: [
        {
            type: 'refresh',
            handler: 'onRefresh'
        }
    ],
    */
    config: {
        templateName: null,
        data: null
    },
    applyTemplateName: function (templateName) {
        console.log('Tualo.pugBrowser.lazy.LiveView', 'applyTemplateName', templateName);
        this.getViewModel().set('template', templateName);
        this.getController().update();
    },
    applyData: function (data) {
        console.log('Tualo.pugBrowser.lazy.LiveView', 'applyData', data);
        this.getViewModel().set('data', data);
        this.getController().update();
    },
    getStageElement: function () {
        let stage = this.getComponent('stage');
        return stage.getEl().dom;
    },
    getStageDocument: function () {
        console.log('Getting frame document');
        let frame = this.getComponent('stage');
        let iframe = frame.getEl().dom;
        return iframe.contentWindow.document;
    },
    items: [
        {
            xtype: 'component',
            itemId: 'stage',
            autoEl: {
                tag: 'iframe',
                id: '{id}-stage',
                //cls: 'pug-browser-stage',
                style: 'width:100%;height:100%;scroll-behavior: smooth; '
                //   scroll-behavior: smooth; overflow: scroll; box-sizing: border-box;',
                // src: 'about:blank'
            }
        }
    ]
});