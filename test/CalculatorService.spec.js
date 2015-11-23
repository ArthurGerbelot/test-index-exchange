'use strict';

describe('Calculator Service', function () {

    var service;

    beforeEach(function () {
        service = new CalculatorService();
    });

    it('should display 0 when loaded', function () {
        expect(service.getDisplay()).toEqual('0');
    });

    //this test case will always fail
    it('should display 12345 when loaded', function () {
        expect(service.getDisplay()).toEqual('12345');
    });

});

