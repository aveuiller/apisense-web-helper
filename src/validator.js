'use strict';

module.exports = (function() {
    let Validator = {};

    let validFormatters = ['DATE_FORMAT'];

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

    function sortByX(a, b) {
        return a.x - b.x;
    }

    // Formats  {dataSetId: [{x:value, y:value}], ...}
    //          {dataSetId: {xValue:yValue, ...}, ...}"
    Validator.validateData = function(data) {
        if (typeof(data) != 'object') {
            throw new Error('Invalid data format');
        }
        let validatedDatasets = [];
        Object.keys(data).forEach(function(key) {
            let dataset = data[key];
            if (Array.isArray(dataset)) {
                for (let i = 0; i < dataset.length; i++) {
                    let obj = data[key][i];
                    if (typeof(obj) != 'object' || !('x' in obj) ||
                        !('y' in obj) || obj.x === undefined ||
                        obj.y === undefined || !isNumeric(obj.x) ||
                        !isNumeric(obj.y)) {
                        throw new Error('Invalid data format');
                    }
                }
                validatedDatasets.push({
                    id: key,
                    data: dataset.sort(sortByX)
                });
            } else {
                let _dataset = [];
                let keys = Object.keys(dataset);

                for (let i = 0; i < keys.length; i++) {
                    let x = keys[i];
                    let y = dataset[x];
                    if (y === undefined ||
                        !isNumeric(x) || !isNumeric(y)) {
                        throw new Error('Invalid data format');
                    }
                    _dataset.push({
                        x: x,
                        y: y
                    });
                }

                validatedDatasets.push({
                    id: key,
                    data: _dataset.sort(sortByX)
                });
            }
        });

        return validatedDatasets;
    };

    Validator.validateLabels = function(labels) {
        let validatedLabels = {};

        if (typeof(labels) != 'object') {
            throw new Error('Invalid data format');
        }

        for (let key in labels) {
            if (key == 'xAxis') {
                if ((typeof(labels.xAxis) == 'string' && validFormatters.includes(labels.xAxis)) ||
                    (typeof(labels.xAxis) == 'object')) {
                    validatedLabels.xAxis = labels.xAxis;
                } else {
                    throw new Error('Invalid data format');
                }
            } else if (key == 'yAxis') {
                if ((typeof(labels.yAxis) == 'string' && validFormatters.includes(labels.yAxis)) ||
                    (typeof(labels.yAxis) == 'object')) {
                    validatedLabels.yAxis = labels.yAxis;
                } else {
                    throw new Error('Invalid data format');
                }
            } else if (typeof(labels[key]) == 'string') {
                validatedLabels[key] = labels[key];
            } else {
                throw new Error('Invalid data format');
            }
        }

        return validatedLabels;
    };

    Validator.validateColors = function(colors) {
        let colorPattern = /(^#?[0-9A-F]{6}$)|(^#?[0-9A-F]{8}$)|(^#?[0-9A-F]{3}$)/i;
        let validatedColors = {};

        if (typeof(colors) != 'object') {
            throw new Error('Invalid data format');
        }

        for (let key in colors) {
            let datasetColor = colors[key];
            if (typeof(datasetColor) == 'string' && colorPattern.test(datasetColor)) {
                validatedColors[key] = datasetColor;
            } else if (typeof(datasetColor) == 'object') {
                validatedColors[key] = {};
                for (let value in datasetColor) {
                    if (colorPattern.test(datasetColor[value])) {
                        validatedColors[key][value] = datasetColor[value];
                    } else {
                        throw new Error('Invalid data format');
                    }
                }
            } else {
                throw new Error('Invalid data format');
            }
        }

        return validatedColors;
    };

    return Validator;
})();
