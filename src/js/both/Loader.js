Ext.define('Tualo.pugBrowser.Loader', {
    singleton: true,

    constructor: function () {
        Ext.Loader.setPath('Tualo.pugBrowser.lazy', './jspugbrowser/lazy');
    }
});
