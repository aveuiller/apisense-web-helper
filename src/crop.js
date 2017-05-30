'use strict';

module.exports = (function() {

    var $ = require('jquery');
    $ = typeof($) === 'function' ? $ : window.jQuery;

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

    Crop.prototype = {
        getCropDataUrl: function() {
            return this.settings.honeycomb + "api/v1/crop/" + this.id + "/data";
        },
        getCropRecords: function(callback) {
            var crop = this;
            return $.Deferred(function(defer) {
                if (crop.cropData.length === 0) {
                    return $.getJSON(crop.getCropDataUrl(), {}, function(data) {
                        for (var i = 0; i < data.length; i++) {
                            var body = data[i].body;
                            for (var k = 0; k < body.length; k++) {
                                crop.cropData.push(body[k]);
                            }
                        }
                        defer.resolve(crop.cropData);
                    });
                } else {
                    defer.resolve(crop.cropData);
                }
            }).promise();
        }
    };

    return Crop;

})();
