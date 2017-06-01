require('jasmine-ajax');
var Crop = require("crop.js");

describe("Visualization:", function() {
    var Vis = require("visualization.js");
    var Validator = require('validator.js');

    it("Module is defined", function() {
        expect(Vis).toBeDefined();
    });

    describe("Create chart:", function() {
        var crop = new Crop("test", {});
        var ctx = '<canvas></canvas>';
        var title = "test";

        var initCallbacks = require('../fixtures/chartMockInit.js');
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
                spyOn(Validator, 'validateData').and.callThrough();
                spyOn(Validator, 'validateColors').and.callThrough();
                spyOn(Validator, 'validateLabels').and.callThrough();
            });

            afterEach(function() {
                jasmine.Ajax.uninstall();
            });

            it("Line", function(done) {
                var promise = Vis.addLineChart(ctx, crop, title, initCallbacks.all);
                expect(promise).toBeDefined();
                promise.then((chart) => {
                    expect(Validator.validateData).toHaveBeenCalled();
                    expect(Validator.validateColors).toHaveBeenCalled();
                    expect(Validator.validateLabels).toHaveBeenCalled();
                    expect(Vis._newChart).toHaveBeenCalled();
                    done();
                });
            });

            it("Bar", function() {
                var promise = Vis.addBarChart(ctx, crop, title, initCallbacks.all);
                expect(promise).toBeDefined();
                promise.then((chart) => {
                    expect(Validator.validateData).toHaveBeenCalled();
                    expect(Validator.validateColors).toHaveBeenCalled();
                    expect(Validator.validateLabels).toHaveBeenCalled();
                    expect(Vis._newChart).toHaveBeenCalled();
                    done();
                });
            });

            it("Pie", function() {
                var promise = Vis.addPieChart(ctx, crop, title, initCallbacks.all);
                expect(promise).toBeDefined();
                promise.then((chart) => {
                    expect(Validator.validateData).toHaveBeenCalled();
                    expect(Validator.validateColors).toHaveBeenCalled();
                    expect(Validator.validateLabels).toHaveBeenCalled();
                    expect(Vis._newChart).toHaveBeenCalled();
                    done();
                });
            });

            it("setData", function(done) {
                var promise = Vis.addLineChart(ctx, crop, title, initCallbacks.dataOnly);
                expect(promise).toBeDefined();
                promise.then((chart) => {
                    expect(Validator.validateData).toHaveBeenCalled();
                    expect(Validator.validateColors).not.toHaveBeenCalled();
                    expect(Validator.validateLabels).not.toHaveBeenCalled();
                    expect(Vis._newChart).toHaveBeenCalled();
                    done();
                });
            });

            it("setData setColors", function(done) {
                var promise = Vis.addLineChart(ctx, crop, title, initCallbacks.dataColors);
                expect(promise).toBeDefined();
                promise.then((chart) => {
                    expect(Validator.validateData).toHaveBeenCalled();
                    expect(Validator.validateColors).toHaveBeenCalled();
                    expect(Validator.validateLabels).not.toHaveBeenCalled();
                    expect(Vis._newChart).toHaveBeenCalled();
                    done();
                });
            });

            it("setData setLabels", function(done) {
                var promise = Vis.addLineChart(ctx, crop, title, initCallbacks.dataLabels);
                expect(promise).toBeDefined();
                promise.then((chart) => {
                    expect(Validator.validateData).toHaveBeenCalled();
                    expect(Validator.validateColors).not.toHaveBeenCalled();
                    expect(Validator.validateLabels).toHaveBeenCalled();
                    expect(Vis._newChart).toHaveBeenCalled();
                    done();
                });
            });

            //TODO add map
            // it("Map", function() {});
            //var map = Vis.addMap(title, initCallback);
        });
    });
});
