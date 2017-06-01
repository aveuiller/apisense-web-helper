module.exports = (() => {
    let initBase = function(chart, data) {
        var upload = [];
        var download = [];

        for (var i = 0; i < data.length; i++) {
            var record = data[i];
            if ("tcpUpload" in record && "duration" in record.tcpUpload) {
                upload.push({
                    x: record.tcpUpload.timestamp,
                    y: record.tcpUpload.speed
                });
            }
            if ("tcpDownload" in record && "duration" in record.tcpDownload) {
                download.push({
                    x: record.tcpDownload.timestamp,
                    y: record.tcpDownload.speed
                });
            }
        }

        chart.setData({
            'upload': upload,
            'download': download
        });
    };

    let initDataColors = function(chart, data) {
        initBase(chart, data);
        chart.setColors({
            'upload': '#2196F3',
            'download': '#7CB342'
        });
    };

    let initDataLabels = function(chart, data) {
        initBase(chart, data);
        chart.setLabels({
            'xAxis': 'DATE_FORMAT',
            'upload': 'Upload speed',
            'download': 'Download speed'
        });
    };

    let initAll = function(chart, data) {
        initBase(chart, data);
        chart.setColors({
            'upload': '#2196F3',
            'download': '#7CB342'
        });
        chart.setLabels({
            'xAxis': 'DATE_FORMAT',
            'upload': 'Upload speed',
            'download': 'Download speed'
        });
    };

    return {
        dataOnly: initBase,
        dataColors: initDataColors,
        dataLabels: initDataLabels,
        all: initAll
    };
})();
