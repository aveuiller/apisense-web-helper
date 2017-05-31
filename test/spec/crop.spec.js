require('jasmine-ajax');

describe("Crop:", function() {
    var Crop = require("crop.js");

    describe("New instance:", function() {
        it("Module is defined", function() {
            expect(Crop).toBeDefined();
        });

        it("Can create new instance with args (id, options)", function() {
            var c = new Crop("id", {});
            expect(c).toBeDefined();
        });

        xit("Set honeycomb url", function() {
            expect(false).toBe(true);
        });

        xit("Set apikey", function() {
            expect(false).toBe(true);
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
