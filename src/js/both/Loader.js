Ext.define('Tualo.Blueprint.Loader', {
    singleton: true,

    constructor: function () {
        Ext.Loader.setPath('Tualo.Blueprint.lazy', './jsblueprint');
    }
});
