Ext.define('Tualo.pugBrowser.lazy.controller.LiveView', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.tualo_pugbrowser_liveview',
    mixins: [
    ],
    onBoxReady: function () {
        console.log('onBoxReady');

        let me = this;
        me.initFunctions(window);
        me.initializePUGFiles();

    },
    initFunctions: function (toGlobal) {
        var user_signatures = new Ext.util.MixedCollection();
        let count = function (list) {
            if (!list) return 0;
            return list.length;
        };
        let empty = function (element) {
            return Ext.isEmpty(element);
        };
        let base64file = function (table, file, field) {
            // "reportfiles","WVD_Logo_RGB_positiv.svg","__file_name"
            return "";
        };
        let ltrim = function (str) {
            if (typeof str !== 'string') return str;
            return str.replace(/^\s+/, '');
        };
        let rtrim = function (str) {
            if (typeof str !== 'string') return str;
            return str.replace(/\s+$/, '');
        };
        let trim = function (str) {
            if (typeof str !== 'string') return str;
            return str.replace(/^\s+|\s+$/g, '');
        };
        let date_create = function (str) {
            const date = new Date(str);
            return isNaN(date.getTime()) ? null : date;
        };
        let date_format = function (date, format) {
            return Ext.util.Format.date(date, format || 'Y-m-d H:i:s');
        };


        let distinctList = function (data, key, nullAsEmptyString = false) {
            const result = [];
            for (const item of data) {
                if (nullAsEmptyString && !item.hasOwnProperty(key)) {
                    item[key] = '';
                }
                if (!item.hasOwnProperty(key)) {
                    continue;
                }
                result.push(item[key]);
            }
            return Array.from(new Set(result));
        };

        let filterKeyValue = function (data, key, value, nullAsEmptyString = false) {
            const result = [];
            for (const item of data) {
                if (nullAsEmptyString && !item.hasOwnProperty(key)) {
                    item[key] = '';
                }
                if (item.hasOwnProperty(key) && item[key] == value) {
                    result.push(item);
                }
            }
            return result;
        };
        let isset = function (element) {
            return typeof element !== 'undefined' && element !== null;
        };
        let number_format = function (number, decimals = 0, decPoint = '.', thousandsSep = ',') {
            number = parseFloat(number);
            if (isNaN(number)) return '';
            const fixedNumber = number.toFixed(decimals);
            const parts = fixedNumber.split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep);
            return parts.join(decPoint);
        };
        let user_signature = function (login) {
            let result = null,
                baseUrl = '.',
                hasError = false,
                _warnings = [],
                _moreResults = [],
                errorMessage = '';

            if (user_signatures.containsKey(login)) {
                return user_signatures.get(login);
            }
            try {
                const response = new XMLHttpRequest();
                response.open(
                    'get',
                    baseUrl + '/usersignature/' + encodeURIComponent(login),
                    false
                );
                response.setRequestHeader('Accept', 'application/json');
                response.setRequestHeader('Content-Type', 'application/json');
                response.send();
                // Preserve HTTP errors even when a proxy returns HTML instead of JSON.
                if (response.status < 200 || response.status >= 300) {
                    const text = response.responseText;
                    let message = 'HTTP ' + response.status + ' ' + response.statusText;
                    try {
                        const result = JSON.parse(text);
                        if (result && typeof result === 'object') {
                            message = result.msg || result.message || message;
                        }
                    } catch (error) {
                        if (!(error instanceof SyntaxError)) throw error;
                    }
                    const error = new Error(message);
                    error.status = response.status;
                    throw error;
                }
                const result = JSON.parse(response.responseText);
                if (!result || typeof result !== 'object' || Array.isArray(result)) {
                    throw new Error('Invalid DS response');
                }
                if (Array.isArray(result.warnings)) {
                    _warnings.push(...result.warnings);
                }
                if (Array.isArray(result.moreResults)) {
                    _moreResults.push(...result.moreResults);
                }

                if (result.success !== true) {
                    throw new Error(result.msg || result.message || 'DS request failed');
                }
                user_signatures.add(login, result.result);
                return result.result;
            } catch (error) {
                _hasError = true;
                _errorMessage = error.message;
                throw error;
            }

            return result;
        };
        let json_decode = JSON.parse;
        let print_r = JSON.stringify;

        if (toGlobal) {
            toGlobal.count = count;
            toGlobal.empty = empty;
            toGlobal.base64file = base64file;
            toGlobal.ltrim = ltrim;
            toGlobal.rtrim = rtrim;
            toGlobal.trim = trim;
            toGlobal.date_create = date_create;
            toGlobal.date_format = date_format;
            toGlobal.distinctList = distinctList;
            toGlobal.filterKeyValue = filterKeyValue;
            toGlobal.isset = isset;
            toGlobal.user_signature = user_signature;
            toGlobal.number_format = number_format;
            toGlobal.json_decode = json_decode;
            toGlobal.print_r = print_r;
        }
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
        me.getView().fireEvent('pugInitialized');
        view.setLoading(false);;

    },
    onRefresh: async function () {
        let me = this,
            view = me.getView(),
            r = await fetch('./report/angebot/17')
                .then(res => res.json())
                .then(res => res);

        this.data = r.data;
        this.renderPug(r.data);
    },
    onTest: async function () {
        let me = this,
            view = me.getView();
        this.renderPug(this.data);
    },

    renderPug: async function (report) {
        let me = this,
            view = me.getView(),
            model = me.getViewModel(),
            template = model.get('template');
        fs.mkdirSync('/templates', { recursive: true });
        let pug = window.require('pug');
        let filename = `/templates/${template}.pug`;
        let html = pug.render(fs.readFileSync(filename, 'utf8'), {
            filename,
            basedir: '/templates',
            report: report,

            plugins: [{
                read(path) {
                    return fs.readFileSync(path, 'utf8');
                }
            }]
        });
        //console.log(html);
        model.set('rendered', html);


        console.log('Rendered HTML set in iframe', view.getId() + '-iframe');
        view.getComponent('frame').getEl().dom.srcdoc = html;
        //window.document.getElementById(view.getId() + '-iframe').srcdoc = html;
    }

});