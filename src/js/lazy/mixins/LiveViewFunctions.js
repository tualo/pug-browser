Ext.define('Tualo.pugBrowser.lazy.mixins.LiveViewFunctions', {

    initFunctions: function (toGlobal) {
        this.user_signatures = new Ext.util.MixedCollection();
        let liveViewFunctions = this.liveViewFunctions;
        if (toGlobal) {
            toGlobal.count = liveViewFunctions.count;
            toGlobal.empty = liveViewFunctions.empty;
            toGlobal.base64file = liveViewFunctions.base64file;
            toGlobal.ltrim = liveViewFunctions.ltrim;
            toGlobal.rtrim = liveViewFunctions.rtrim;
            toGlobal.trim = liveViewFunctions.trim;
            toGlobal.json_decode = liveViewFunctions.json_decode;
            toGlobal.print_r = liveViewFunctions.print_r;
            toGlobal.date_create = liveViewFunctions.date_create;
            toGlobal.date_format = liveViewFunctions.date_format;
            toGlobal.distinctList = liveViewFunctions.distinctList;
            toGlobal.filterKeyValue = liveViewFunctions.filterKeyValue;
            toGlobal.isset = liveViewFunctions.isset;
            toGlobal.user_signature = liveViewFunctions.user_signature.bind(this);
            toGlobal.number_format = liveViewFunctions.number_format;
        }
    },

    liveViewFunctions: {
        count: function (list) {
            if (Ext.isEmpty(list)) return 0;
            return list.length;
        },
        empty: function (element) {
            return Ext.isEmpty(element);
        },
        base64file: function (table, file, field) {
            // "reportfiles","WVD_Logo_RGB_positiv.svg","__file_name"
            return "";
        },
        ltrim: function (str) {
            if (typeof str !== 'string') return str;
            return str.replace(/^\s+/, '');
        },
        rtrim: function (str) {
            if (typeof str !== 'string') return str;
            return str.replace(/\s+$/, '');
        },
        trim: function (str) {
            if (typeof str !== 'string') return str;
            return str.replace(/^\s+|\s+$/g, '');
        },
        date_create: function (str) {
            const date = new Date(str);
            return isNaN(date.getTime()) ? null : date;
        },
        date_format: function (date, format) {
            return Ext.util.Format.date(date, format || 'Y-m-d H:i:s');
        },
        distinctList: function (data, key, nullAsEmptyString = false) {
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
        },

        filterKeyValue: function (data, key, value, nullAsEmptyString = false) {
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
        },
        isset: function (element) {
            return typeof element !== 'undefined' && element !== null;
        },
        number_format: function (number, decimals = 0, decPoint = '.', thousandsSep = ',') {
            number = parseFloat(number);
            if (isNaN(number)) return '';
            const fixedNumber = number.toFixed(decimals);
            const parts = fixedNumber.split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSep);
            return parts.join(decPoint);
        },
        user_signature: function (login) {
            let result = null,
                baseUrl = '.',
                hasError = false,
                _warnings = [],
                _moreResults = [],
                errorMessage = '';

            if (this.user_signatures.containsKey(login)) {
                return this.user_signatures.get(login);
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
                this.user_signatures.add(login, result.result);
                return result.result;
            } catch (error) {
                _hasError = true;
                _errorMessage = error.message;
                throw error;
            }

            return result;
        },
        json_decode: JSON.parse,
        print_r: JSON.stringify
    }

});