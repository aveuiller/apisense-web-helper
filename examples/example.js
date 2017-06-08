var lineCanvas = document.getElementById("line").getContext('2d');
var barCanvas = document.getElementById("bar").getContext('2d');
var pieCanvas = document.getElementById("pie").getContext('2d');

let crop = new Apisense.Crop('kQB5ODNeqYt9w5P6BWjB');

let records = crop.getRecords().then((records) => {
    //datasets
    let upload = [];
    let download = [];
    let ping = [];
    let dns = [];
    let traceroute = [];
    let events = {
        upload: 0,
        download: 0,
        dns: 0,
        ping: 0,
        traceroute: 0
    };
    let successful = {
        upload: 0,
        download: 0,
        dns: 0,
        ping: 0,
        traceroute: 0
    };

    for (let record of records) {
        if ('tcpUpload' in record) {
            events.upload++;
            if ('speed' in record.tcpUpload) {
                upload.push({
                    x: record.tcpUpload.timestamp,
                    y: record.tcpUpload.speed
                });
                successful.upload++;
            }
        }
        if ('tcpDownload' in record) {
            events.download++;
            if ('speed' in record.tcpDownload) {
                download.push({
                    x: record.tcpDownload.timestamp,
                    y: record.tcpDownload.speed
                });
                successful.download++;
            }
        }
        if ('dns' in record) {
            events.dns++;
            if ('duration' in record.dns) {
                dns.push({
                    x: record.dns.timestamp,
                    y: record.dns.duration
                });
                successful.dns++;
            }
        }
        if ('ping' in record) {
            events.ping++;
            if ('duration' in record.ping) {
                ping.push({
                    x: record.ping.timestamp,
                    y: record.ping.duration
                });
                successful.ping++;
            }
        }
        if ('traceroute' in record) {
            events.traceroute++;
            if ('duration' in record.traceroute) {
                traceroute.push({
                    x: record.traceroute.timestamp,
                    y: record.traceroute.duration
                });
                successful.traceroute++;
            }
        }
    }

    let linePromise = Apisense.Visualization.addLineChart(lineCanvas, crop, 'Line: Average transfer rates', (chart, data) => {
        // data and records are the same object
        // data === records
        chart.setData({
            'upload': upload,
            'download': download
        });
        chart.setLabels({
            'xAxis': 'DATE_FORMAT',
            'upload': 'Upload speed',
            'download': 'Download speed'
        });
        chart.setColors({
            'upload': '#2196F3',
            'download': '#7CB342'
        });
    });

    linePromise.then((chart) => {
        console.log('Line Chart ready');
    });

    let barPromise = Apisense.Visualization.addBarChart(barCanvas, crop, 'Bar: Events', (chart, data) => {
        chart.setData({
            total: {
                1: events.upload,
                2: events.download,
                3: events.dns,
                4: events.ping,
                5: events.traceroute
            },
            successful: {
                1: successful.upload,
                2: successful.download,
                3: successful.dns,
                4: successful.ping,
                5: successful.traceroute
            }
        });
        chart.setLabels({
            xAxis: {
                1: 'Upload',
                2: 'Download',
                3: 'DNS',
                4: 'Ping',
                5: 'Traceroute'
            },
            total: 'Total',
            successful: 'Successful'
        });
        chart.setColors({
            total: '#7CB342',
            successful: '#2196F3'
        });
    });

    barPromise.then((chart) => {
        chart.options.scales.yAxes[0].ticks.beginAtZero = true;
        chart.update();
        console.log('Bar Chart ready');
    });

    let piePromise = Apisense.Visualization.addPieChart(pieCanvas, crop, 'Pie: Events', (chart, data) => {
        chart.setData({
            successful: {
                1: successful.upload,
                2: successful.download,
                3: successful.dns,
                4: successful.ping,
                5: successful.traceroute
            }
        });
        chart.setLabels({
            xAxis: {
                1: 'Upload',
                2: 'Download',
                3: 'DNS',
                4: 'Ping',
                5: 'Traceroute'
            }
        });
        chart.setColors({
            successful: {
                1: '#FFEE58',
                2: '#81C784',
                3: '#4FC3F7',
                4: '#7986CB',
                5: '#BA68C8'
            }
        });
    });

    piePromise.then((chart) => {
        console.log('Pie Chart ready');
    });

});
