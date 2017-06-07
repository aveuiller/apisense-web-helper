# [APISENSE](https://apisense.io/) Web Helper

This project is a library to easily generate web charts of data collected by APISENSE crops.

It uses [Chart.js](http://www.chartjs.org/) to draw the charts

## Build

To build the library it is required to have [Node.js](https://nodejs.org/en/download/) installed

Clone and navigate to repo

```bash
git clone https://github.com/Inria-Chile/apisense-web-helper.git
cd apisense-web-helper
```

Install dependencies

```bash
npm install
```

Building

```bash
npm run-script gulp build
```

This command will generate four files in the build folder.

The `apisense.js` and `apisense.min.js` files contains the library. If this version is used, the Chart.js library will need to be included before apisense.js

The `apisense.bundle.js` and `apisense.bundle.min.js` builds include Chart.js and [Moment.js](http://momentjs.com/) (required by Chart.js for time format) in a single file.

## Usage

```html
<canvas id="myChart" width="400" height="400"></canvas>
<script>
var ctx = document.getElementById("myChart").getContext('2d');

var crop = new Apisense.Crop("cropId");

var title = 'Chart title';

var initCallback = function(chart, data) {
    // data will be your raw data json array

    // Generate datasets
    var dataset1 = [];
    var dataset2 = [];

    for (var i = 0; i < data.length; i++) {
        var record = data[i];
    }

    // setData(data)
    // Valid formats:
    //      {datasetId: [{x:value, y:value}], ...}
    //      {datasetId: {xValue:yValue, ...}, ...}
    chart.setData({
        dataset1: dataset1,
        dataset2: dataset2
    });

    // setLabels(labels)
    // Set axis format and/or dataset legend
    // Valid formats
    //      {xAxis: {xValue:yValue, ...}, ...}
    //      {xAxis: 'DATE_FORMAT', ...}
    //      {datasetId: <legend text>, ...}
    chart.setLabels({
        xAxis: 'DATE_FORMAT',
        dataset1: 'Legend dataset1',
        dataset1: 'Legend dataset2'
    });

    // setColors(colors)
    // Set dataset colors
    // Valid format
    //      {datasetId: <hex color code>, ...}
    chart.setColors({
        dataset1: '#2196F3',
        dataset2: '7CB342'
    });
};

// Currently available addLineChart, addBarChart, addPieChart
// This methods will return a promise for a Chart object
var lineChartPromise = Apisense.Visualization.addLineChart(ctx, crop, title, initCallback);

lineChartPromise.then(function(chart) {
    // chart will be a Chart.js object
});

</script>
```
