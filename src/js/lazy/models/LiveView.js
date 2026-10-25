Ext.define('Tualo.pugBrowser.lazy.models.LiveView', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.tualo_pugbrowser_liveview',
    data: {
        template: 'receipt',
        id: null,
        rendered: null
    },
    formulas: {

        html: function (get) {
            var rendered = get('rendered');
            return '<p>Einen Moment bitte...</p>';
        }
    }

});