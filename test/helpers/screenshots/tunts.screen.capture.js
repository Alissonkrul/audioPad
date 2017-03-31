var fs = require('fs');

function ScreenshotService(browser, screenshotFolder) {
  var browser = browser;
  var screenshotFolder = screenshotFolder || '';
  var self = this;

  if (!browser || typeof browser.takeScreenshot !== 'function') {
    throw 'ScreenshotService needs a browser instance, pass it as first argument in constructor';
  }

  self.capture = function (path) {
    return browser.takeScreenshot().then(function (png) {
      var stream = fs.createWriteStream(path);
      stream.write(new Buffer(png, 'base64'));
      return stream.end();
    });
  };

  self.takeScreenshot = function (spec) {
    var name = spec.description.replace(/ /g, '_');
    var path = screenshotFolder + name + '-' + Date.now() + '.png';
    return self.capture(path);
  };

  self.takeScreenshotOnFailure = function (spec) {
    if (spec.failedExpectations.length) {
      return self.takeScreenshot(spec);
    }
  };
}

ScreenshotService.constructor = ScreenshotService;
module.exports = ScreenshotService;

