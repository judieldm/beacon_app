'use strict';

describe('module: main, service: ApiService', function () {

  // load the service's module
  beforeEach(module('main'));
  // load all the templates to prevent unexpected $http requests from ui-router
  beforeEach(module('ngHtml2Js'));

  // instantiate service
  var ApiService;
  beforeEach(inject(function (_ApiService_) {
    ApiService = _ApiService_;
  }));

  it('should do something', function () {
    expect(!!ApiService).toBe(true);
  });

});
