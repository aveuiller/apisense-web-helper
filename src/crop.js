'use strict';

module.exports = (function() {

    function Crop(id, options = {}) {
        this.id = id;
        this.settings = {
            honeycomb: "https://honeycomb.apisense.io/"
        };
        this.cropData = [];

        if (options !== undefined || options !== null) {
            if ('honeycomb' in options) {
                this.settings.honeycomb = options.honeycomb;
            }
            if ('accessKey' in options) {
                this.settings.accessKey = options.accessKey;
            }
            if ('filter' in options) {
                this.settings.filter = options.filter;
            }
        }
        return this;
    }

    var getCropData = function(url, accessKey, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        if (accessKey) {
            xhr.setRequestHeader('Authorization', 'accessKey ' + accessKey);
        }
        xhr.onload = function(e) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                callback(data);
            }
        };
        xhr.onerror = function(e) {
            console.error(xhr.statusText);
        };
        xhr.send(null);
    };

    Crop.prototype = {
        getDataUrl: function() {
            if (this.settings.filter) {
                return this.settings.honeycomb + "api/v1/crop/" + this.id + "/data/" + this.settings.filter;
            } else {
                return this.settings.honeycomb + "api/v1/crop/" + this.id + "/data";
            }
        },
        getRecords: function(callback) {
            var crop = this;
            return new Promise((resolve, reject) => {
                if (crop.cropData.length === 0) {
                    return getCropData(crop.getDataUrl(), crop.settings.accessKey, (data) => {
                        if (this.settings.filter) {
                            //if filter: return data
                            crop.cropData = data;
                        } else {
                            //else: raw data => extract records
                            for (var i = 0; i < data.length; i++) {
                                var body = data[i].body;
                                for (var k = 0; k < body.length; k++) {
                                    crop.cropData.push(body[k]);
                                }
                            }
                        }
                        resolve(crop.cropData);
                    });
                } else {
                    resolve(crop.cropData);
                }
            });
        }
    };

    return Crop;
})();
