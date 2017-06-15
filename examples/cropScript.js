// Load stings
var vis = require('visualization');
var timer = require('timer');
var log = require('log');
var recorder = require('recorder');

// Define
var spirals = {
    'lat': 50.60499,
    'lng': 3.14924
};

//Line chart
let lineCallback = function(chart, data) {
    let upload = [];
    var download = [];

    for each(let record in data) {
        switch (record.type) {
            case 'upload':
                upload.push(record);
                break;
            case 'download':
                download.push(record);
                break;
        }
    }

    chart.setData({
        upload: upload,
        download: download
    });
    chart.setLabels({
        xAxis: 'DATE_FORMAT',
        upload: 'Upload [kb/s]',
        download: 'Download [kb/s]'
    });
    chart.setColors({
        upload: '#2196F3',
        download: '#7CB342'
    });
};

let line = vis.addLineChart('Average transfer rates', lineCallback);

//Bar chart
let barCallback = function(chart, data) {
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

    for each(let record in data) {
        let success = 0;
        if (record.success) {
            success = 1;
        }
        switch (record.type) {
            case 'upload':
                events.upload++;
                successful.upload += success;
                break;
            case 'download':
                events.download++;
                successful.download += success;
                break;
            case 'dns':
                events.dns++;
                successful.dns += success;
                break;
            case 'ping':
                events.ping++;
                successful.ping += success;
                break;
        }
    }

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
        successful: 'Completed successfuly'
    });
    chart.setColors({
        total: '#7CB342',
        successful: '#2196F3'
    });
};
let bar = vis.addBarChart('Test executed by type', barCallback);

//Pie chart
let pieCallback = function(chart, data) {
    let tests = {
        Successful: 0,
        Fail: 0
    };

    for each(let record in data) {
        if (record.success) {
            tests.Successful++;
        } else {
            tests.Fail++;
        }
    }

    chart.setData({
        tests: tests
    });
    chart.setColors({
        tests: {
            Successful: '#7986CB',
            Fail: '#FFEE58'
        }
    });
};
let pie = vis.addPieChart('Tests executed', pieCallback);

//Map heatmap
let mapCallback = function(map, data) {
    // map.setCenter(spirals);
    map.addHeatmapOverlay('1', data);
};
let map = vis.addMap('Heatmap', mapCallback);

// random latlong from https://gist.github.com/mkhatib/5641004
function generateRandomPoint(center, radius) {
    let x0 = center.lng;
    let y0 = center.lat;
    // Convert Radius from meters to degrees.
    let rd = radius / 111300;

    let u = Math.random();
    let v = Math.random();

    let w = rd * Math.sqrt(u);
    let t = 2 * Math.PI * v;
    let x = w * Math.cos(t);
    let y = w * Math.sin(t);

    let xp = x / Math.cos(y0);

    // Resulting point.
    return {
        lat: y + y0,
        lng: xp + x0
    };
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomBoolean() {
    return Math.random() < 0.5;
}

function time(t) {
    return new Date(t).toISOString();
}

// Generate random data every minute
timer.every('1 minute', function(timestamp) {
    log.debug(time(timestamp.timestamp) + " - Adding random data");

    let ts = timestamp.timestamp;
    //20 milliseconds
    let delta = 20 * 1000;

    for (let i = 0; i < getRandomInt(1, 3); i++) {
        let download = {
            x: ts + i * delta,
            y: getRandomInt(3000, 5000),
            success: true,
            type: 'download'
        };

        line.store(download);
        bar.store(download);
        pie.store(download);
        recorder.save(download);
    }

    for (let i = 0; i < getRandomInt(1, 3); i++) {
        let upload = {
            x: ts + i * delta,
            y: getRandomInt(1000, 2000),
            success: true,
            type: 'upload'
        };

        line.store(upload);
        bar.store(upload);
        pie.store(upload);
        recorder.save(upload);
    }

    for (let i = 0; i < getRandomInt(1, 3); i++) {
        let ping = {
            type: 'ping',
            success: getRandomBoolean()
        };

        bar.store(ping);
        pie.store(ping);
        recorder.save(ping);
    }

    for (let i = 0; i < getRandomInt(1, 3); i++) {
        let dns = {
            type: 'dns',
            success: getRandomBoolean()
        };

        bar.store(dns);
        pie.store(dns);
        recorder.save(dns);
    }

    for (let i = 0; i < getRandomInt(3, 6); i++) {
        let randomPoint = generateRandomPoint(spirals, 1000);
        let location = {
            latitude: randomPoint.lat,
            longitude: randomPoint.lng,
            accuracy: getRandomInt(1, 50),
            timestamp: ts + i * delta,
            type: 'location'
        };
        map.store(location);
        recorder.save(location);
    }

    recorder.sync();
});
