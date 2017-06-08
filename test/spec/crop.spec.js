require('jasmine-ajax');

describe("Crop:", function() {
    var Crop = require("crop.js");

    describe("New instance:", function() {
        it("Module is defined", function() {
            expect(Crop).toBeDefined();
        });

        it("Default args", function() {
            let cropId = 'testCropId';
            let defaultHoneycomb = 'https://honeycomb.apisense.io/';
            let c = new Crop(cropId);

            expect(c).toBeDefined();
            expect(c.getDataUrl()).toContain(defaultHoneycomb);
            expect(c.getDataUrl()).toContain(cropId);
            expect(c.settings.accessKey).toBeUndefined();
            expect(c.settings.filter).toBeUndefined();
        });

        it("Custom honeycomb", function() {
            let customHoneycomb = 'http://custom.honeycomb/';
            let c = new Crop('testCropId', {
                honeycomb: customHoneycomb
            });

            expect(c.getDataUrl()).toContain(customHoneycomb);
        });

        it("Data filter", function() {
            let filter = 'testFilter';
            let c = new Crop('testCropId', {
                filter: filter
            });

            expect(c.settings.filter).toBeDefined();
            expect(c.getDataUrl()).toContain(filter);
        });

        it("AccessKey", function() {
            let accessKey = 'kgnbphkmfpknc1094u1rdwc';
            let c = new Crop('testCropId', {
                accessKey: accessKey
            });
            expect(c.settings.accessKey).toBeDefined();
            expect(c.settings.accessKey).toEqual(accessKey);
        });
    });

    describe("Retrieve data:", function() {
        //TODO search a cleaner way to load mock data
        // Mock of https://<honeycomb>/api/v1/crop/<id>/data
        var mockData = require('../fixtures/cropMockData.js');

        var mockDataResponse = {
            status: 200,
            responseText: JSON.stringify(mockData)
        };

        //List of records in fixture
        var records = [];
        for (var i = 0; i < mockData.length; i++) {
            var body = mockData[i].body;
            for (var k = 0; k < body.length; k++) {
                records.push(body[k]);
            }
        }

        beforeEach(function() {
            jasmine.Ajax.install();
        });

        afterEach(function() {
            jasmine.Ajax.uninstall();
        });

        it("getRecords: accessKey", function() {
            let accessKey = 'kgnbphkmfpknc1094u1rdwc';
            let c = new Crop('testCropId', {
                accessKey: accessKey
            });

            //Request records
            c.getRecords();

            //Check for Authorization header
            let headers = jasmine.Ajax.requests.mostRecent().requestHeaders;

            expect(headers.Authorization).toBeDefined();
            expect(headers.Authorization).toEqual('accessKey ' + accessKey);
        });

        it("getRecords: returns only the list of records", function(done) {
            let crop = new Crop("crop");

            //Request records
            crop.getRecords().then(function(data) {
                expect(data).toEqual(records);
                done();
            });

            //Respond with mock response
            jasmine.Ajax.requests.mostRecent().respondWith(mockDataResponse);
        });

        it("getRecords with filter: returns full json response", function(done) {
            let crop = new Crop("crop", {
                filter: 'customFilter'
            });

            //Request records
            crop.getRecords().then(function(data) {
                expect(data).toEqual(mockData);
                done();
            });

            //Respond with mock response
            jasmine.Ajax.requests.mostRecent().respondWith(mockDataResponse);
        });
    });
});
