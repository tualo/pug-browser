Ext.define('Tualo.pugBrowser.lazy.models.LiveView', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tualo_pugbrowser_liveview',
    data: {
        template: 'receipt',
        id: null,
        rendered: null,
        data: null
    }
});