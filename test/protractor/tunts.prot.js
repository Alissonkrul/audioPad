'use strict';

var ScreenshotService = require('../helpers/screenshots/tunts.screen.capture');
var screenshotService = new ScreenshotService(browser, 'C:/Users/murilo/Pictures/SS/');

jasmine.getEnv().addReporter(new function() {
  this.specDone = function(specResult) {
    screenshotService.takeScreenshotOnFailure(specResult);
  };
});

describe('protractor', function () {

  it('prot lalala fail', function () {
    expect(1).toBe(0);
  });

  var spec = it('pass it like a boss', function() {
    expect(1).toBe(1);
    screenshotService.takeScreenshot(spec);
  });

});
