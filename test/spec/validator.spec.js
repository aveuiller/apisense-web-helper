require('jasmine-ajax');

describe("Validator:", function() {
    let Validator = require('validator.js');
    let Data = require('../fixtures/validatorData.js');

    it("Module is defined", function() {
        expect(Validator).toBeDefined();
    });

    describe("Data:", function() {
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
            }
        });

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
            }
        });

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
            }
        });

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
            }
        });

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
            }
        });

        it("Wrong format 1", function() {
            expect(() => {
                Validator.validateData(['wrong format']);
            }).toThrowError('Invalid data format');
        });
        it("Wrong format 2", function() {
            expect(() => {
                Validator.validateData({
                    data: ['fdsa']
                });
            }).toThrowError('Invalid data format');
        });
        it("Wrong format 3", function() {
            expect(() => {
                Validator.validateData('wrong format');
            }).toThrowError('Invalid data format');
        });
        it("Wrong format 4", function() {
            expect(() => {
                Validator.validateData(1234);
            }).toThrowError('Invalid data format');
        });

    });

    xdescribe("Colors:", function() {
        it("Data format {dataSetId: color, ...}", function() {
            expect(false).toBe(true);
        });

        it("Data format {dataSetId: {xValue:color, ...}, ...}", function() {
            expect(false).toBe(true);
        });

        it("Unkown Format", function() {
            expect(false).toBe(true);
        });
    });

    xdescribe("Labels:", function() {
        it("Data format {axis: formatter, ...}", function() {
            expect(false).toBe(true);
        });

        it("Data format {axis: {value:label, ...}, ...}", function() {
            expect(false).toBe(true);
        });

        it("Unkown Format", function() {
            expect(false).toBe(true);
        });
    });
});
