'use strict';

describe('Service: Kodemonservice', function () {

  // load the service's module
  beforeEach(module('kodemonFrontApp'));

  // instantiate service
  var Kodemonservice;
  beforeEach(inject(function (_Kodemonservice_) {
    Kodemonservice = _Kodemonservice_;
  }));

  it('should do something', function () {
    expect(!!Kodemonservice).toBe(true);
  });

});
