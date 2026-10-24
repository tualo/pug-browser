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
    html: '<p>Bitte Zeit anfragen...</p>'
});