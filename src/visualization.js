'use strict';

module.exports = (function() {

    var Chart = require('chart.js');
    Chart = typeof(Chart) === 'function' ? Chart : window.Chart;

    if (!Chart) {
        throw new Error('Apisense - Chart.js could not be found! You must include it before Apisense');
    }

    var visMod = {};

    var sortByX = function(a, b) {
        return a.x - b.x;
    };

    var defaultR = '176';
    var defaultG = '190';
    var defaultB = '197';

    var getRGBAColor = function(hex, a) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        var pHex = result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : {
            r: defaultR,
            g: defaultG,
            b: defaultB
        };
        return 'rgba(' + pHex.r + ',' + pHex.g + ',' + pHex.b + ',' + a + ')';
    };

    var getChartConfig = function(_type, _datasets, _colors, _labels) {
        var datasets = [];
        for (var i = 0; i < _datasets.length; i++) {
            var dataset = _datasets[i];

            var options = {
                backgroundColor: getRGBAColor("", 0.2),
                borderColor: getRGBAColor("", 1),
                borderWidth: 1
            };

            options.data = dataset.data;
            options.label = dataset.id;

            datasets.push(options);
        }

        var ret = {
            type: _type,
            data: {
                datasets: datasets
            }
        };

        return ret;
    };

    var ChartWrapper = function() {
        var wrapper = {};
        var data = [];
        var labels = {};
        var colors = {};
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

    //visible to mock in test
    visMod._newChart = function(ctx, config) {
        return new Chart(ctx, config);
    };

    var getChartPromise = function(type, ctx, crop, title, initCallback) {
        return new Promise((resolve, reject) => {
            crop.getCropRecords().then(function(cropData) {
                var wrapper = ChartWrapper();
                initCallback(wrapper, cropData);
                var config = getChartConfig(type, wrapper.getData(), wrapper.getColors(), wrapper.getLabels());
                resolve(visMod._newChart(ctx, config));
            });
        });
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
