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

    return {
        datasets: datasets
    };
})();
