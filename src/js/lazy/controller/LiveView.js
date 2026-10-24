Ext.define('Tualo.pugBrowser.lazy.controller.LiveView', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tualo_pugbrowser_liveview',
    mixins: [
    ],
    onBoxReady: function () {
        console.log('onBoxReady');

        let me = this;
        me.initializePUGFiles();

    },
    initializePUGFiles: function () {
        let me = this;
        console.log('initializePUGFiles');

        fs.mkdirSync('/templates', { recursive: true });

        fs.writeFileSync('/templates/index.pug', `
h1= titel
include footer.pug
`);

        fs.writeFileSync('/templates/footer.pug', `
footer Gerendert mit Pug und ZenFS
`);

        console.log('Initializing PUG with filename');
        let pug = window.require('pug');
        console.log(pug);

        let filename = '/templates/index.pug';
        console.log('Rendering PUG with filename:', filename, fs.readFileSync(filename, 'utf8'));
        let html = pug.render(fs.readFileSync(filename, 'utf8'), {
            filename,
            basedir: '/templates',
            titel: 'Hallo Thomas',

            plugins: [{
                read(path) {
                    return fs.readFileSync(path, 'utf8');
                }
            }]
        });
        console.log(html);
        me.getView().setHtml(html);

    }

});