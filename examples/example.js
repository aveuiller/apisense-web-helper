var crop = new Apisense.Crop("kQB5ODNeqYt9w5P6BWjB", {});

var initTransferRate = function(chart, data) {
    var upload = [];
    var download = [];

    for (var i = 0; i < data.length; i++) {
        var record = data[i];
        if ("tcpUpload" in record && "duration" in record.tcpUpload) {
            upload.push({
                x: record.tcpUpload.timestamp,
                y: record.tcpUpload.duration
            });
        }
        if ("tcpDownload" in record && "duration" in record.tcpDownload) {
            download.push({
                x: record.tcpDownload.timestamp,
                y: record.tcpDownload.duration
            });
        }
    }

    chart.setData({
        'upload': upload,
        'download': download
    });
    chart.setLabels({
        'xAxis': 'DATE_FORMAT',
    });
    chart.setColors({
        'upload': '#2196F3',
        'download': '#7CB342'
    });
};

var lineChartPromise = Apisense.Visualization.addLineChart($('#testLineChart'), crop, 'Transfer Rate', initTransferRate);

lineChartPromise.then(function(chart) {
    console.log("Line Chart ready", chart);
});
