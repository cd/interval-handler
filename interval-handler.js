(function(root, factory) {
  if (typeof define === "function" && define.amd) {
    define([], function() {
      return factory(root);
    });
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(root);
  } else {
    root.IntervalHandler = factory(root);
  }
})(typeof self !== "undefined" ? self : this, function(root) {
  "use strict";

  // Feature test
  if (
    typeof root.setTimeout !== "function" ||
    typeof root.clearTimeout !== "function"
  )
    throw Error("No support of setTimeout or clearTimeout");

  /**
   * Constructor function
   */
  var IntervalHandler = function() {
    this.timer = [];
  };

  // Default interval
  IntervalHandler.interval = 3000;

  IntervalHandler.prototype._getTimer = function(fnc) {
    var found = null;
    this.timer.forEach(function(timer) {
      if (timer.fnc === fnc) {
        found = timer;
        return;
      }
    });
    return found;
  };

  IntervalHandler.prototype._createTimer = function(fnc) {
    var timer = { id: null, fnc: fnc };
    this.timer.push(timer);
    return timer;
  };

  /**
   * Set Timer
   */
  IntervalHandler.prototype.setTimer = function(fnc, interval) {
    if (typeof fnc !== "function") return;
    var timer = this._getTimer(fnc) || this._createTimer(fnc);
    if (timer.id !== null) this.clearTimer(timer.fnc);
    var args = [];
    for (var index = 2; index < arguments.length; index++) {
      args.push(arguments[index]);
    }
    timer.id = root.setTimeout(
      function() {
        timer.fnc.apply(root, args);
      },
      typeof interval === "number" ? interval : IntervalHandler.interval
    );
  };

  /**
   * Clear timer
   */
  IntervalHandler.prototype.clearTimer = function(fnc) {
    if (fnc) {
      this.timer.forEach(function(timer) {
        if (timer.fnc === fnc) root.clearTimeout(timer.id);
      });
      return;
    }
    this.timer.forEach(function(timer) {
      root.clearTimeout(timer.id);
    });
  };

  return IntervalHandler;
});
