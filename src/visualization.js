'use strict';

module.exports = (function() {

    var $ = require('jquery');
    $ = typeof($) === 'function' ? $ : window.jQuery;

    var Chart = require('chart.js');
    Chart = typeof(Chart) === 'function' ? Chart : window.Chart;

    var visMod = {};

    var sortByX = function(a, b) {
        return a.x - b.x;
    };

    var getChartConfig = function(_type, _datasets, _colors, _labels) {
        var datasets = [];
        for (var i = 0; i < _datasets.length; i++) {
            var dataset = _datasets[i];
            var options = {
                backgroundColor: 'rgba(104,159,56,0.2)',
                borderColor: 'rgba(104,159,56,1)',
                borderWidth: 1
            };

            options.data = dataset.data;
            options.label = dataset.id;
            datasets.push(options);
        }

        return {
            type: _type,
            data: {
                datasets: datasets
            }
        };
    };

    var ChartWrapper = function() {
        var wrapper = {};
        var data;
        var labels;
        var colors;
        // DATA
        wrapper.getData = function() {
            return data;
        };
        wrapper.setData = function(_data) {
            //TODO
            data = [];
            Object.keys(_data).forEach(function(key) {
                var dataset = {
                    id: key,
                    data: _data[key]
                };
                data.push(dataset);
            });
        };
        // LABELS
        wrapper.getLabels = function() {
            return labels;
        };
        wrapper.setLabels = function(_labels) {
            //TODO
            labels = _labels;
        };
        // COLORS
        wrapper.getColors = function() {
            return colors;
        };
        wrapper.setColors = function(_colors) {
            //TODO
            colors = _colors;
        };
        return wrapper;
    };

    var getChartPromise = function(type, ctx, crop, title, initCallback) {
        return $.Deferred(function(defer) {
            crop.getCropRecords().then(function(cropData) {
                var wrapper = ChartWrapper();
                initCallback(wrapper, cropData);
                var config = getChartConfig(type, wrapper.getData(), wrapper.getColors(), wrapper.getLabels());
                defer.resolve(new Chart(ctx, config));
            });
        }).promise();
    };

    visMod.addLineChart = function(ctx, crop, title, initCallback) {
        return getChartPromise('line', ctx, crop, title, initCallback);
    };

    visMod.addBarChart = function(ctx, crop, title, initCallback) {
        return getChartPromise('bar', ctx, crop, title, initCallback);
    };

    visMod.addPieChart = function(ctx, crop, title, initCallback) {
        return getChartPromise('pie', ctx, crop, title, initCallback);
    };

    return visMod;
})();
