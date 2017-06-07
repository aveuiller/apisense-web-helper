require('jasmine-ajax');

describe("Validator:", function() {
    let Validator = require('validator.js');
    let Data = require('../fixtures/validatorData.js');

    it("Module is defined", function() {
        expect(Validator).toBeDefined();
    });

    describe("Data:", function() {
        // {dataSetId: [{x:value, y:value}, ...]}
        it("Single list", function() {
            let datasets = Data.datasets.list;
            let validated = Validator.validateData(datasets);
            expect(validated).toBeDefined();
            let keys = Object.keys(datasets);
            //Same number of datasets
            expect(validated.length).toBe(keys.length);
            //Validate that datasets contains same ids and number of entries
            for (let i = 0; i < keys.length; i++) {
                let setId = validated[i].id;
                let setData = validated[i].data;
                expect(setId).toBeDefined();
                expect(setData).toEqual(jasmine.any(Array));
                expect(setData.length).toEqual(datasets[setId].length);
                for (let j = 0; j < validated[i].data.length; j++) {
                    expect(validated[i].data[j].x).toBeDefined();
                    expect(validated[i].data[j].y).toBeDefined();
                }
            }
        });

        // {dataSetId1: [{x:value, y:value}, ...],
        //  dataSetId2: [{x:value, y:value}, ...],
        //  ...}
        it("Multiple lists", function() {
            let datasets = Data.datasets.multipleLists;
            let validated = Validator.validateData(datasets);
            expect(validated).toBeDefined();
            let keys = Object.keys(datasets);
            //Same number of datasets
            expect(validated.length).toBe(keys.length);
            //Validate that datasets contains same ids and number of entries
            for (let i = 0; i < keys.length; i++) {
                let setId = validated[i].id;
                let setData = validated[i].data;
                expect(setId).toBeDefined();
                expect(setData).toEqual(jasmine.any(Array));
                expect(setData.length).toEqual(datasets[setId].length);
                for (let j = 0; j < validated[i].data.length; j++) {
                    expect(validated[i].data[j].x).toBeDefined();
                    expect(validated[i].data[j].y).toBeDefined();
                }
            }
        });

        // {dataSetId: {xValue:yValue, ...}}
        it("Single map", function() {
            let datasets = Data.datasets.map;
            let validated = Validator.validateData(datasets);
            expect(validated).toBeDefined();
            let keys = Object.keys(datasets);
            //Same number of datasets
            expect(validated.length).toBe(keys.length);
            //Validate that datasets contains same ids and number of entries
            for (let i = 0; i < keys.length; i++) {
                let setId = validated[i].id;
                let setData = validated[i].data;
                expect(setId).toBeDefined();
                expect(setData).toEqual(jasmine.any(Array));
                expect(setData.length).toEqual(Object.keys(datasets[setId]).length);
                for (let j = 0; j < validated[i].data.length; j++) {
                    expect(validated[i].data[j].x).toBeDefined();
                    expect(validated[i].data[j].y).toBeDefined();
                }
            }
        });

        // {dataSetId1: {xValue:yValue, ...},
        //  dataSetId2: {xValue:yValue, ...},
        //  ...}
        it("Multiple maps", function() {
            let datasets = Data.datasets.multipleMaps;
            let validated = Validator.validateData(datasets);
            expect(validated).toBeDefined();
            let keys = Object.keys(datasets);
            //Same number of datasets
            expect(validated.length).toBe(keys.length);
            //Validate that datasets contains same ids and number of entries
            for (let i = 0; i < keys.length; i++) {
                let setId = validated[i].id;
                let setData = validated[i].data;
                expect(setId).toBeDefined();
                expect(setData).toEqual(jasmine.any(Array));
                expect(setData.length).toEqual(Object.keys(datasets[setId]).length);
                for (let j = 0; j < validated[i].data.length; j++) {
                    expect(validated[i].data[j].x).toBeDefined();
                    expect(validated[i].data[j].y).toBeDefined();
                }
            }
        });

        // {dataSetId1: {xValue:yValue, ...},
        //  dataSetId2: [{x:value, y:value}, ...],
        //  ...}
        it("Mix lists and maps", function() {
            let datasets = Data.datasets.mixListMap;
            let validated = Validator.validateData(datasets);
            expect(validated).toBeDefined();
            let keys = Object.keys(datasets);
            //Same number of datasets
            expect(validated.length).toBe(keys.length);
            //Validate that datasets contains same ids and number of entries
            for (let i = 0; i < keys.length; i++) {
                let setId = validated[i].id;
                let setData = validated[i].data;
                expect(setId).toBeDefined();
                expect(setData).toEqual(jasmine.any(Array));
                if (Array.isArray(datasets[setId])) {
                    expect(setData.length).toEqual(datasets[setId].length);
                } else {
                    expect(setData.length).toEqual(Object.keys(datasets[setId]).length);
                }
                for (let j = 0; j < validated[i].data.length; j++) {
                    expect(validated[i].data[j].x).toBeDefined();
                    expect(validated[i].data[j].y).toBeDefined();
                }
            }
        });

        it("Invalid format", function() {
            expect(() => {
                Validator.validateData(['wrong format', 1234]);
            }).toThrowError('Invalid data format');
            expect(() => {
                Validator.validateData({
                    data: ['fdsa']
                });
            }).toThrowError('Invalid data format');
            expect(() => {
                Validator.validateData('wrong format');
            }).toThrowError('Invalid data format');
            expect(() => {
                Validator.validateData(1234);
            }).toThrowError('Invalid data format');
        });
    });

    describe("Colors:", function() {
        // {datasetId: '#color'}
        it("By dataset", function() {
            for (let config of Data.colors.valid) {
                let colors = Validator.validateColors(config);
                expect(colors).toBeDefined();
                expect(colors).toEqual(jasmine.objectContaining(config));
            }
        });

        it("Unkown Format", function() {
            /* jshint -W083 */
            for (let config of Data.colors.invalid) {
                expect(() => {
                    Validator.validateColors(config);
                }).toThrowError('Invalid data format');
            }
            /* jshint +W083 */
        });
    });

    describe("Labels:", function() {
        // {xAxis: 'TIME_FORMAT'}
        it("Axis time formatter", function() {
            let x = Validator.validateLabels(Data.labels.timeFormatterX);
            let y = Validator.validateLabels(Data.labels.timeFormatterY);
            expect(x).toBeDefined();
            expect(y).toBeDefined();
            expect(x).toEqual(jasmine.objectContaining(Data.labels.timeFormatterX));
            expect(y).toEqual(jasmine.objectContaining(Data.labels.timeFormatterY));
        });

        // {xAxis: {xValue:label, ...}}
        it("By values", function() {
            let labels = Validator.validateLabels(Data.labels.byValue);
            expect(labels).toBeDefined();
            expect(labels).toEqual(jasmine.objectContaining(Data.labels.byValue));
        });

        // {xAxis: dataSetLabel}
        it("Unkown formatter", function() {
            /* jshint -W083 */
            for (let config of Data.labels.invalidFormat) {
                expect(() => {
                    Validator.validateLabels(config);
                }).toThrowError('Invalid data format');
            }
            /* jshint +W083 */
        });

        // {dataSetId: dataSetLabel}
        it("Dataset label", function() {
            let labels = Validator.validateLabels(Data.labels.datasetLabel);
            expect(labels).toBeDefined();
            expect(labels).toEqual(jasmine.objectContaining(Data.labels.datasetLabel));
        });
    });
});
