'use strict';

module.exports = (function() {

    function Crop(id, options) {
        this.id = id;
        this.settings = {
            honeycomb: "https://honeycomb.apisense.io/",
            accessKey: ""
        };
        this.cropData = [];

        if (options !== undefined || options !== null) {
            if ('honeycomb' in options) {
                this.settings.honeycomb = options.honeycomb;
            }
            if ('accessKey' in options) {
                this.settings.accessKey = options.accessKey;
            }
        }
        return this;
    }

    var getCropData = function(url, callback) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
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
        getCropDataUrl: function() {
            return this.settings.honeycomb + "api/v1/crop/" + this.id + "/data";
        },
        getCropRecords: function(callback) {
            var crop = this;
            return new Promise((resolve, reject) => {
                if (crop.cropData.length === 0) {
                    return getCropData(crop.getCropDataUrl(), (data) => {
                        for (var i = 0; i < data.length; i++) {
                            var body = data[i].body;
                            for (var k = 0; k < body.length; k++) {
                                crop.cropData.push(body[k]);
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
