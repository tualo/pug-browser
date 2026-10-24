Ext.define('Tualo.routes.pugBrowser.LiveView', {
    statics: {
        load: async function () {
            return [
                {
                    name: 'LiveView',
                    path: '#pug-browser-liveview'
                }
            ]
        }
    },
    url: 'pug-browser-liveview(/:{type}/:{reportnumber})',
    handler: {
        action: function (values) {

            /*
            Ext.getApplication().addView('Tualo.pugBrowser.lazy.LiveView', {
                type: values.type,
                reportnumber: values.reportnumber
            });
            */

        },
        before: function (values, action) {
            console.log('Tualo.routes.pugBrowser.LiveView', 'Before action called');
            action.resume();
        }

    }
});