'use strict';

module.exports = (function() {
    let Validator = {};

    function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
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
                    data: dataset
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
                    data: _dataset
                });
            }
        });
        return validatedDatasets;
    };

    Validator.validateLabels = function(labels) {
        let validatedLabels = {};
        return labels;
        // return validatedLabels;
    };

    Validator.validateColors = function(colors) {
        let validatedColors = {};
        return colors;
        // return validatedColors;
    };

    return Validator;
})();
