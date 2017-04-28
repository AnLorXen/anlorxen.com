

var FifthPinion = function () {
  "use strict";

  var
    docMap, stMap, 
    formatTime, mins, secs, 
    handleStart, handleAdjustment, initEvents, 
    timers;


  docMap = {
    "timeOne": document.getElementById("remaining-time-one"),
    "rowsOne": document.getElementById("record-rows-one"),

    "timeTwo": document.getElementById("remaining-time-two"),
    "rowsTwo": document.getElementById("record-rows-two"),

    "timeThree": document.getElementById("remaining-time-three"),
    "rowsThree": document.getElementById("record-rows-three"),

    "ctrlsStart": document.getElementsByClassName("ctrls-start"),
    "ctrlsSub": document.getElementsByClassName("ctrls-sub"),

    "diag": document.getElementById("diag")
  };

  stMap = {
    "time": 630
  };


  formatTime = function (_min, _sec, _ele) {
    mins = _min;
    if (_sec < 10) { secs = "0" + _sec; } else { secs = _sec; }
    _ele.textContent = mins + ":" + secs;
  };


  handleStart = function (_index) {
    if (!timers[_index].isRunning) {
      timers[_index].logEvent("Fifth Pinion");
      timers[_index].start();
    }
  };


  handleAdjustment = function (_index, _adjust) {

    console.log("timer:" + _index, "adjust:" + _adjust);

    if (timers[_index].isRunning) {
      timers[_index].logEvent("- 0:" + _adjust);
      timers[_index].adjust(_adjust);
    }
  };


  initEvents = function () {
    // convert HTMLCollection to array
    [].slice.call(docMap.ctrlsStart).forEach(function (_btn) {
      _btn.addEventListener("click", function (_event) {
        handleStart(
          parseInt(_event.target.dataset.ctrl.substring(0, 1), 0)
        );
      });
    });

    [].slice.call(docMap.ctrlsSub).forEach(function (_btn) {
      _btn.addEventListener("click", function (_event) {
        handleAdjustment(
          parseInt(_event.target.dataset.ctrl.substring(0, 1), 0), 
          parseInt(_event.target.dataset.ctrl.substring(1), 0)
        );
      });
    });
  };



  initEvents();

  timers = [
    new DolmenTimer({
      "timer": docMap.timeOne,
      "table": docMap.rowsOne,
      "duration": stMap.time
    }), 
    new DolmenTimer({
      "timer": docMap.timeTwo, 
      "table": docMap.rowsTwo, 
      "duration": stMap.time
    }), 
    new DolmenTimer({
      "timer": docMap.timeThree,
      "table": docMap.rowsThree,
      "duration": stMap.time
    })
  ];

  timers.forEach(function (_timer) {
    _timer.onTick(formatTime);
  });

};

window.addEventListener("load", function () {
  FifthPinion();
});


// ***********************
// ***********************
// ***********************


var DolmenTimer = function (_options) {
  this.eleTimer = _options.timer;
  this.eleTable = _options.table;
  this.adjustment = 0;
  this.duration = _options.duration; // 600000
  this.delay = _options.delay || 1000;
  this.ticks = [];
  this.isRunning = false;
};

DolmenTimer.prototype.start = function () {
  if (this.isRunning) {
    return;
  }
  this.isRunning = true;
  var start = Date.now(),
      that = this,
      diff,
      obj;

  (function timer() {
    diff = that.duration - (((Date.now() - start) / 1000) | 0);

    if (that.adjustment > 0) {
      if (that.duration - that.adjustment > 0) {
        that.duration -= that.adjustment;
        that.adjustment = 0;
      }
    }

    if (diff > 0) {
      setTimeout(timer, that.delay);
    } else {
      diff = 0;
      that.isRunning = false;
    }

    obj = DolmenTimer.parse(diff);
    that.ticks.forEach(function (_tick) {
      _tick.call(this, obj.minutes, obj.seconds, that.eleTimer);
    }, that);
  }());
};

DolmenTimer.prototype.adjust = function (_seconds) {
  this.adjustment = _seconds;
};

DolmenTimer.prototype.report = function (_item) {
  document.getElementById("diag").innerHTML = _item;
};

DolmenTimer.prototype.logEvent = function (_title) {
  var
    event = new Date(),
    now = event.toLocaleTimeString('en-US', { hour12: false }),
    eleTr = document.createElement("tr"),
    eleTdEvent = document.createElement("td"),
    eleTdTime = document.createElement("td");

  eleTdEvent.textContent = _title;
  eleTdTime.textContent = now;
  eleTr.appendChild(eleTdEvent);
  eleTr.appendChild(eleTdTime);

  this.eleTable.appendChild(eleTr);
};

DolmenTimer.prototype.onTick = function (_tick) {
  if (typeof _tick === "function") {
    this.ticks.push(_tick);
  }
  return this;
};

DolmenTimer.prototype.expired = function () {
  return !this.isRunning;
};

DolmenTimer.parse = function (_seconds) {
  return {
    "minutes": (_seconds / 60) | 0,
    "seconds": (_seconds % 60) | 0
  };
};




