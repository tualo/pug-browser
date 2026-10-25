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
    title: 'Live View',
    bodyPadding: 10,
    listeners: {
        boxready: 'onBoxReady'
    },
    tools: [
        {
            type: 'refresh',
            handler: 'onRefresh'
        },
        {
            type: 'gear',
            handler: 'onTest'
        }
    ],
    items: [
        {
            xtype: 'component',
            itemId: 'frame',
            autoEl: {
                tag: 'iframe',
                id: '{id}-iframe',
                style: 'width:100%;height:100%;',
                src: 'about:blank'
            }
        }
    ]
});