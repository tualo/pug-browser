Ext.define('Tualo.Blueprint.controller.classic.TimeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.blueprintClassicTimeController',

    init: function () {
        this.loadTime();
    },

    loadTime: function () {
        Ext.Ajax.request({
            url: '/blueprint/time',
            success: function (response) {
                var data = Ext.decode(response.responseText);
                this.getView().setHtml('<strong>Zeit:</strong> ' + data.datetime + '<br/>' +
                    '<strong>Zeitzone:</strong> ' + data.timezone + '<br/>' +
                    '<strong>Anfragen:</strong> ' + data.request_count);
            },
            scope: this
        });
    }
});
