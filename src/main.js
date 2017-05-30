//Check if dependencies are included before apisense
// Required in Crop, Visualization
var $ = require('jquery');
if (typeof($) !== 'function' && !window.jQuery) {
    throw new Error('Apisense - jQuery could not be found! You must include it before Apisense');
}

// Required in Visualization
var Chart = require('chart.js');
if (typeof(Chart) !== 'function' && !window.Chart) {
    throw new Error('Apisense - Chart.js could not be found! You must include it before Apisense');
}

module.exports = {
    Crop: require('crop.js'),
    Visualization: require('visualization.js')
};
