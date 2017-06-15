var lineCanvas = document.getElementById("line").getContext('2d');
var barCanvas = document.getElementById("bar").getContext('2d');
var pieCanvas = document.getElementById("pie").getContext('2d');

let crop = new Apisense.Crop('ez81v5w8aoSKYae6ezkJ');

let records = crop.getRecords().then((records) => {
    //datasets
    let upload = [];
    let download = [];
    let ping = [];
    let dns = [];
    let events = {
        upload: 0,
        download: 0,
        dns: 0,
        ping: 0
    };
    let successful = {
        upload: 0,
        download: 0,
        dns: 0,
        ping: 0
    };

    for (let record of records) {
        let success = 0;
        if (record.success) {
            success = 1;
        }
        switch (record.type) {
            case 'upload':
                events.upload++;
                upload.push(record);
                successful.upload += success;
                break;
            case 'download':
                events.download++;
                download.push(record);
                successful.download += success;
                break;
            case 'dns':
                events.dns++;
                dns.push(record);
                successful.dns += success;
                break;
            case 'ping':
                events.ping++;
                ping.push(record);
                successful.ping += success;
                break;
        }
    }

    let linePromise = Apisense.Visualization.addLineChart(lineCanvas, crop, 'Average transfer rates', (chart, data) => {
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

    let barPromise = Apisense.Visualization.addBarChart(barCanvas, crop, 'Test executed by type', (chart, data) => {
        chart.setData({
            total: {
                1: events.upload,
                2: events.download,
                3: events.dns,
                4: events.ping
            },
            successful: {
                1: successful.upload,
                2: successful.download,
                3: successful.dns,
                4: successful.ping
            }
        });
        chart.setLabels({
            xAxis: {
                1: 'Upload',
                2: 'Download',
                3: 'DNS',
                4: 'Ping'
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

    let piePromise = Apisense.Visualization.addPieChart(pieCanvas, crop, 'Tests executed', (chart, data) => {
        let success = successful.upload +
            successful.download +
            successful.dns +
            successful.ping;

        let total = events.upload +
            events.download +
            events.dns +
            events.ping;

        chart.setData({
            tests: {
                1: success,
                2: total - success
            }
        });
        chart.setLabels({
            xAxis: {
                1: 'Successfuly',
                2: 'Failed'
            }
        });
        chart.setColors({
            tests: {
                1: '#4FC3F7',
                2: '#7986CB'
            }
        });
    });

    piePromise.then((chart) => {
        console.log('Pie Chart ready');
    });

});
