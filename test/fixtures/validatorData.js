module.exports = (() => {
    function getRandom() {
        let max = 10000;
        let min = -10000;
        return Math.floor(Math.random() * (max - min)) + min;
    }

    // Data Formats
    // {dataSetId: [{x:value, y:value}], ...}
    // {dataSetId: {xValue:yValue, ...}, ...}"

    let dataList1 = [];
    let dataList2 = [];
    let dataMap1 = {};
    let dataMap2 = {};

    for (let i = 0; i < 100; i++) {
        dataList1.push({
            x: getRandom(),
            y: getRandom()
        });
        dataList2.push({
            x: getRandom(),
            y: getRandom()
        });
        dataMap1[i] = getRandom();
        dataMap2[i] = getRandom();
    }

    let datasets = {
        list: {
            dataList1: dataList1
        },
        multipleLists: {
            dataList2: dataList1,
            dataList3: dataList2
        },
        map: {
            dataMap4: dataMap1
        },
        multipleMaps: {
            dataMap5: dataMap1,
            dataMap6: dataMap2
        },
        mixListMap: {
            dataList7: dataList1,
            dataList8: dataList2,
            dataMap9: dataMap1,
            dataMap10: dataMap2
        }
    };

    let labels = {
        timeFormatterX: {
            'xAxis': 'DATE_FORMAT'
        },
        timeFormatterY: {
            'yAxis': 'DATE_FORMAT'
        },
        invalidFormat: [
            'error',
            1234,
            true,
            {
                'xAxis': 'error'
            }, {
                'xAxis': 1234
            }, {
                'xAxis': true
            }
        ],
        byValue: {
            'xAxis': {
                1: 'a',
                2: 'b',
                3: 'c',
                4: 'd'
            }
        },
        datasetLabel: {
            dataSet1: 'dataSetLabel1'
        }
    };

    let colors = {
        valid: [{
                datasetId: '#aabbcc'
            },
            {
                datasetId: '#ffffff'
            },
            {
                datasetId: 'aabbcc'
            },
            {
                datasetId: 'ffffff'
            },
            {
                datasetId: '#AABBCC'
            },
            {
                datasetId: '#FFFFFF'
            },
            {
                datasetId: '#FFF'
            },
            {
                datasetId: '#fff'
            },
            {
                datasetId: 'FFF'
            },
            {
                datasetId: 'fff'
            },
            {
                datasetId: 'AABBCC'
            },
            {
                datasetId: 'FFFFFF'
            },
            {
                datasetId: '#000000',
                datasetId2: '#ffffff'
            },
            {
                datasetId: '000000',
                datasetId2: 'ffffff'
            },
            {
                datasetId: '#000000',
                datasetId2: 'ffffff'
            },
            {
                datasetId: '#012def'
            },
            {
                datasetId: '012def'
            },
            {
                datasetId: '#012def00'
            },
            {
                datasetId: '012defff'
            }
        ],
        invalid: [
            '012defff',
            true,
            12345,
            {
                datasetId: '#JKLLKJ'
            },
            {
                datasetId: 'blue'
            },
            {
                datasetId: {}
            },
            {
                datasetId: 43122
            }
        ]
    };

    return {
        labels: labels,
        colors: colors,
        datasets: datasets
    };
})();
