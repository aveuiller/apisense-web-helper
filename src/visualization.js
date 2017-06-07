'use strict';

module.exports = (function() {

    var Chart = require('chart.js');
    Chart = typeof(Chart) === 'function' ? Chart : window.Chart;

    if (!Chart) {
        throw new Error('Apisense - Chart.js could not be found! You must include it before Apisense');
    }

    var visMod = {};

    let Validator = require('validator.js');

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

    var getChartConfig = function(_type, _datasets, _colors, _labels, title) {
        let ret = {
            type: _type,
            data: {},
            options: {
                scales: {
                    xAxes: [{
                        type: 'linear'
                    }],
                    yAxes: [{
                        type: 'linear'
                    }]
                }
            }
        };

        if (title) {
            ret.options.title = {
                display: true,
                text: title
            };
        }

        let xValues;

        if ('xAxis' in _labels) {
            if (_labels.xAxis == 'DATE_FORMAT') {
                ret.options.scales.xAxes = [{
                    type: 'time',
                    position: 'bottom'
                }];
            }
            if (typeof(_labels.xAxis) == 'object') {
                let labels = [];
                let xSet = new Set();
                for (let i = 0; i < _datasets.length; i++) {
                    let dataset = _datasets[i].data;
                    for (let j = 0; j < dataset.length; j++) {
                        xSet.add(dataset[j].x);
                    }
                }

                xValues = Array.from(xSet).sort();

                for (let item of xValues) {
                    let label = _labels.xAxis[item];
                    labels.push(label ? label : item);
                }

                ret.data.labels = labels;
                ret.options.scales.xAxes = undefined;
            }
        }

        let datasets = [];

        for (let i = 0; i < _datasets.length; i++) {
            let dataset = _datasets[i];
            let data = _datasets[i].data.sort(sortByX);

            let options = {
                label: dataset.id,
                backgroundColor: getRGBAColor("", 0.2),
                borderColor: getRGBAColor("", 1),
                borderWidth: 1
            };

            if (xValues) {
                let dataByLabel = [];
                let index = 0;
                for (let j = 0; j < xValues.length; j++) {
                    if (index < data.length && data[index].x == xValues[j]) {
                        dataByLabel.push(data[index].y);
                        index++;
                    } else {
                        dataByLabel.push(null);
                    }
                }
                options.data = dataByLabel;
                options.spanGaps = true;
            } else {
                options.data = data;
            }

            if (dataset.id in _labels) {
                options.label = _labels[dataset.id];
            }

            if (dataset.id in _colors) {
                options.backgroundColor = getRGBAColor(_colors[dataset.id], 0.2);
                options.borderColor = getRGBAColor(_colors[dataset.id], 1);
            }

            datasets.push(options);
        }

        ret.data.datasets = datasets;
        ret.options.showLines = true;

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
            data = Validator.validateData(_data);
        };
        // LABELS
        wrapper.getLabels = function() {
            return labels;
        };
        wrapper.setLabels = function(_labels) {
            labels = Validator.validateLabels(_labels);
        };
        // COLORS
        wrapper.getColors = function() {
            return colors;
        };
        wrapper.setColors = function(_colors) {
            colors = Validator.validateColors(_colors);
        };
        return wrapper;
    };

    //visible to mock in test
    visMod._newChart = function(ctx, config) {
        return new Chart(ctx, config);
    };

    var getChartPromise = function(type, ctx, crop, title, initCallback) {
        return new Promise((resolve, reject) => {
            crop.getRecords().then(function(cropData) {
                var wrapper = ChartWrapper();
                initCallback(wrapper, cropData);
                var config = getChartConfig(type, wrapper.getData(), wrapper.getColors(), wrapper.getLabels(), title);
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
