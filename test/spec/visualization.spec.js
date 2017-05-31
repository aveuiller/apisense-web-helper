require('jasmine-ajax');
var Crop = require("crop.js");

describe("Visualization:", function() {
    var Vis = require("visualization.js");

    it("Module is defined", function() {
        expect(Vis).toBeDefined();
    });

    describe("Create chart:", function() {
        var crop = new Crop("test", {});
        var ctx = '<canvas></canvas>';
        var title = "test";
        var initCallback = function(chart, data) {};

        var mockData = require('../fixtures/cropMockData.js');

        var mockDataResponse = {
            status: 200,
            responseText: JSON.stringify(mockData)
        };

        describe("Add", function() {
            beforeEach(function() {
                jasmine.Ajax.install();
                jasmine.Ajax.stubRequest(crop.getDataUrl()).andReturn(mockDataResponse);
                spyOn(Vis, '_newChart').and.callFake(function(ctx, config) {
                    return "new Chart";
                });
            });

            afterEach(function() {
                jasmine.Ajax.uninstall();
            });

            it("Line", function(done) {
                var promise = Vis.addLineChart(ctx, crop, title, initCallback);
                expect(promise).toBeDefined();
                promise.then(function(chart) {
                    expect(Vis._newChart).toHaveBeenCalled();
                    done();
                });
            });

            it("Bar", function() {
                var promise = Vis.addBarChart(ctx, crop, title, initCallback);
                expect(promise).toBeDefined();
                promise.then(function(chart) {
                    expect(chart).toBeDefined();
                    done();
                });
            });

            it("Pie", function() {
                var promise = Vis.addPieChart(ctx, crop, title, initCallback);
                expect(promise).toBeDefined();
                promise.then(function(chart) {
                    expect(chart).toBeDefined();
                    done();
                });
            });

            //TODO add map
            // it("Map", function() {});
            //var map = Vis.addMap(title, initCallback);
        });

        describe("Chart Callback Wrapper", function() {
            describe("Set data:", function() {
                it("Data format {dataSetId: [{x:value, y:value}], ...}", function() {
                    expect(false).toBe(true);
                });

                xit("Data format {dataSetId: {xValue:yValue, ...}, ...}", function() {
                    expect(false).toBe(true);
                });
            });

            xdescribe("Set colors:", function() {
                it("Data format {dataSetId: color, ...}", function() {
                    expect(false).toBe(true);
                });

                xit("Data format {dataSetId: {xValue:color, ...}, ...}", function() {
                    expect(false).toBe(true);
                });
            });

            xdescribe("Set labels:", function() {
                it("Data format {axis: formatter, ...}", function() {
                    expect(false).toBe(true);
                });

                xit("Data format {axis: {value:label, ...}, ...}", function() {
                    expect(false).toBe(true);
                });
            });
        });
    });


});
