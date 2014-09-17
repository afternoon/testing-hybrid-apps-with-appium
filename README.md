class: title

# Testing hybrid mobile apps with [Appium](http://appium.io/)

Ben Godfrey  
[@afternoon](http://twitter.com/afternoon)

---

# What is [Appium](http://appium.io/)?

- Selenium for phones and tablets
- Speaks the WebDriver protocol
- iOS and Android
- Test native or hybrid apps

---

# Appium interactions

- Tap
- Fill in forms (type text, selects, radios, checkboxes)
- Gestures
- Multitouch

---

# A simple app

Use Ionic to create a basic app.

```bash
$ npm install —g cordova ionic
$ ionic start foo tabs
$ cd foo
$ ionic platform add ios
$ ionic build ios
$ ionic emulate ios
```

(Use `npm run createapp` in the git repo.)

---

# A simple test

```javascript
// capabilities for iOS simulator
var capabilities = {
  browserName: "",
  autoWebview: true,
  platformName: "iOS",
  platformVersion: "7.1",
  deviceName: "iPhone Simulator",
  app: "/path/to/foo.app"
};
```

---

# A simple test

```javascript
// setup wd session
before(function(done) {
  browser = wd.promiseChainRemote(appiumServer);
  browser
    .init(capabilities)
    .then(function() { done(); });
});
```

---

# A simple test

```javascript
// test a very simple property of the app
it("should have title 'Dashboard'", function (done) {
  browser
    .elementByCss(".title")
    .getValue().should.become("Dashboard")
    .then(function() { done(); });
});
```

---

# A simple test

```javascript
// kill session after tests have run
after(function(done) {
  browser
    .quit()
    .then(function() { done(); });
});
```
---

# A more exciting test

```javascript
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
```

---

# Run tests

```bash
$ git clone $THIS_REPO
$ npm install
$ appium & # or run in separate console
$ npm test
```

---

# Real devices

## Android

- No problems!

## iOS

- [Signing](http://appium.io/slate/en/master/?javascript#appium-on-real-ios-devices)! `o_O`
- [`ios_webkit_debug_proxy`](https://github.com/google/ios-webkit-debug-proxy)

---

# Test clouds

Provider                           | Note
-----------------------------------|------------------------------
[TestDroid](http://testdroid.com/) | Lots of real devices
[Saucelabs](http://saucelabs.com/) | Emulators
[Appthwack](http://appthwack.com/) | Some real devices, had issues

---

# How should I organise my Appium tests?

- JavaScript is not the only choice
- Jasmine, Mocha, Cucumber
- Page objects

# Thanks!

You should follow [@wongatech](http://twitter.com/wongatech).
