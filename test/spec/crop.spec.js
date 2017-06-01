require('jasmine-ajax');

describe("Crop:", function() {
    var Crop = require("crop.js");

    describe("New instance:", function() {
        it("Module is defined", function() {
            expect(Crop).toBeDefined();
        });

        it("Create new instance with default args", function() {
            var c = new Crop("id", {});
            expect(c).toBeDefined();
        });

        xit("Create new instance with custom honeycomb", function() {
            var c = new Crop("id", {
                honeycomb: "custom"
            });
            expect(c).toBeDefined();
        });

        xit("Create new instance with apikey", function() {
            var c = new Crop("id", {
                apikey: "key"
            });
            expect(c).toBeDefined();
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
            this.crop = new Crop("crop", {});
        });

        afterEach(function() {
            jasmine.Ajax.uninstall();
        });

        it("getRecords: returns a list of records", function(done) {
            //Request records
            this.crop.getRecords().then(function(data) {
                expect(data).toEqual(records);
                done();
            });

            //Respond with mock response
            jasmine.Ajax.requests.mostRecent().respondWith(mockDataResponse);
        });
    });
});
