/* global require, describe, it */

/**
 * Simple app test using Appium. Requires wd, mocha and chai.
 */

var wd = require("wd"),
    chai = require("chai"),
    chaiAsPromised = require("chai-as-promised"),
    colors = require('colors'),
    path = require("path");

// setup chai - yawn
chai.use(chaiAsPromised);
chai.should();
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

var appiumServer = {
  host: "localhost",
  port: 4723
};

// capabilities for iOS simulator
var capabilities = {
  browserName: "",
  autoWebview: true,
  platformName: "iOS",
  platformVersion: "7.1",
  deviceName: "iPhone Simulator",
  app: path.resolve("foo/platforms/ios/build/emulator/foo.app")
};

// a simple test suite
describe("Foo app", function () {
  var browser;

  // set a nice long timeout so Appium can do it's thing
  this.timeout(300000);

  // setup wd session
  before(function(done) {
    browser = wd.promiseChainRemote(appiumServer);

    browser.on('status', function(info) {
      console.log(info.cyan);
    });
    browser.on('command', function(eventType, command, response) {
      console.log(' > ' + eventType.cyan, command, (response || '').grey);
    });
    browser.on('http', function(meth, path, data) {
      console.log(' > ' + meth.magenta, path, (data || '').grey);
    });

    browser
      .init(capabilities)
      .then(function() { done(); });
  });

  // test a very simple property of the app
  it("should have title 'Dashboard'", function (done) {
    browser
      .elementByCss(".title")
      .getValue().should.become("Dashboard")
      .then(function() { done(); });
  });

  // a more exciting test
  it("should have some tabs", function (done) {
    browser
      .elementByCss("a[icon~=ion-heart]")
      .click()
      .elementByCss(".title")
      .getValue().should.become("Friends")
      .elementByCss("a[icon~=ion-gear-b]")
      .click()
      .elementByCss(".title")
      .getValue().should.become("Account")
      .then(function() { done(); });
  });

  // kill session after tests have run
  after(function(done) {
    browser
      .quit()
      .then(function() { done(); });
  });
});
