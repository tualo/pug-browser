Ext.define('Tualo.pugBrowser.lazy.controller.LiveView', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tualo_pugbrowser_liveview',
    mixins: [
        'Tualo.pugBrowser.lazy.mixins.LiveViewFunctions'
    ],
    onBoxReady: function () {
        console.log('onBoxReady');
        let me = this;
        me.initFunctions(window);
        me.initFrameLoad();
        me.initializePUGFiles();
    },
    initFrameLoad: function () {
        let me = this,
            view = me.getView();

        const iframe = view.getComponent('frame').getEl().dom;
        iframe.addEventListener('load', () => {
            me.onFramedLoaded();
            view.fireEvent('frameLoaded');
        });
    },

    onFramedLoaded: function () {
        let me = this,
            doc = me.getView().getFrameDocument();

        doc.querySelectorAll(".editable").forEach(function (element) {
            element.addEventListener("input", me.frameContentChanged.bind(me), false);
        });
    },
    frameContentChanged: function (event) {
        console.log('LiveView.frameContentChanged', event);
        this.getView().fireEvent('frameContentChanged', event);
    },

    initializePUGFiles: async function () {
        let me = this,
            view = me.getView(),
            files = await fetch('./pugbrowser/files').then(res => res.json()).then(res => res.files);


        view.setLoading('Laden...');

        fs.mkdirSync('/templates', { recursive: true });
        files.forEach(file => {
            fs.writeFileSync(`/templates/${file.id}.pug`, file.template);
        });

        // me.selfTest();
        me.getView().fireEvent('pugInitialized', view);
        view.setLoading(false);
        // me.onRefresh();

    },

    update: async function () {
        let me = this,
            view = me.getView(),
            model = me.getViewModel(),
            template = model.get('template'),
            data = model.get('data');

        console.log('Updating with template:', template, 'and data:', data);
        if (template && data) {
            me.renderPug(data);
            view.fireEvent('pugUpdated', view);
        }
    },

    renderPug: async function (data) {
        console.log('Rendering Pug with data:', data);
        let me = this,
            view = me.getView(),
            model = me.getViewModel(),
            template = model.get('template');
        view.setLoading('Aufbereiten...');
        fs.mkdirSync('/templates', { recursive: true });
        let pug = window.require('pug');
        let filename = `/templates/${template}.pug`;
        let options = {
            filename,
            basedir: '/templates',
            plugins: [{
                read(path) {
                    return fs.readFileSync(path, 'utf8');
                }
            }]
        };
        // merge data into options
        options = Object.assign(data, options);
        console.log('Rendering Pug with options:', options);

        try {
            let html = pug.render(fs.readFileSync(filename, 'utf8'), options);
            model.set('rendered', html);
            console.log('Rendered HTML set in iframe', view.getId() + '-iframe');

            const iframe = view.getComponent('frame').getEl().dom;
            const scrollY = me.scrollRestorePending && Number.isFinite(me.savedScrollY)
                ? me.savedScrollY
                : iframe.contentWindow.scrollY;
            const generation = me.renderGeneration = (me.renderGeneration || 0) + 1;
            me.savedScrollY = scrollY;
            me.scrollRestorePending = true;

            iframe.addEventListener('load', async () => {
                if (generation !== me.renderGeneration) return;

                const doc = iframe.contentDocument;
                await doc.fonts?.ready;
                await Promise.all(
                    Array.from(doc.images, image => image.decode().catch(() => { }))
                );

                if (generation !== me.renderGeneration) return;

                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        if (generation !== me.renderGeneration) return;
                        iframe.contentWindow.scrollTo(0, scrollY);
                        me.savedScrollY = iframe.contentWindow.scrollY;
                        me.scrollRestorePending = false;
                    });
                });
            }, { once: true });

            iframe.srcdoc = html;
            /*
            const doc = iframe.contentDocument;

            doc.open();
            doc.write(html);
            doc.close();
            */
        } catch (e) {
            console.error('Error rendering Pug template:', e);
            Ext.toast({
                html: 'Error rendering Pug template: ' + e.message,
                title: 'Error',
                width: 300,
                align: 't'
            });
        }
        // let html = pug.render(fs.readFileSync(filename, 'utf8'), options);
        // model.set('rendered', html);
        // console.log('Rendered HTML set in iframe', view.getId() + '-iframe');
        // view.getComponent('frame').getEl().dom.srcdoc = html;
        view.setLoading(false);
    }

}); console.log('LiveView.loaded');