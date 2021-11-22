// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/Score.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Score = /*#__PURE__*/function () {
  function Score(software) {
    _classCallCheck(this, Score);

    this.software = software;
  }

  _createClass(Score, [{
    key: "getCpuScore",
    value: function getCpuScore(cpu) {
      var score = this.constructor.calcCpuAndGpuScore(cpu);

      if (score >= this.software.cpu) {
        return this.getMessage("CPU", "success", score, cpu);
      } else if (score === this.software.cpu - 1) {
        return this.getMessage("CPU", "alert", score, cpu);
      } else {
        return this.getMessage("CPU", "danger", score, cpu);
      }
    }
  }, {
    key: "getGpuScore",
    value: function getGpuScore(gpu) {
      var score = this.constructor.calcCpuAndGpuScore(gpu);

      if (score >= this.software.gpu) {
        return this.getMessage("کارت گرافیک", "success", score, gpu);
      } else {
        return this.getMessage("کارت گرافیک", "danger", score, gpu);
      }
    }
  }, {
    key: "getRamScore",
    value: function getRamScore(ram) {
      if (ram.score >= this.software.ram) {
        return this.getMessage("RAM", "success", ram.score, ram);
      } else {
        return this.getMessage("RAM", "danger", ram.score, ram);
      }
    }
  }, {
    key: "getHardScore",
    value: function getHardScore(hard) {
      if (hard.score >= this.software.hard) {
        return this.getMessage("هارد", "success", hard.score, hard);
      } else {
        return this.getMessage("هارد", "danger", hard.score, hard);
      }
    }
  }, {
    key: "getMessage",
    value: function getMessage(hardwareType, status, score, hardware) {
      switch (status) {
        case "success":
          return {
            message: "".concat(hardwareType, " \u0634\u0645\u0627 \u062F\u0631 \u0648\u0636\u0639\u06CC\u062A \u062E\u0648\u0628\u06CC \u0642\u0631\u0627\u0631 \u062F\u0627\u0631\u062F!"),
            status: status,
            score: score,
            name: hardware.name,
            hardwareType: hardwareType
          };

        case "danger":
          return {
            message: "".concat(hardwareType, " \u0634\u0645\u0627 \u0636\u0639\u06CC\u0641 \u0627\u0633\u062A !"),
            status: status,
            score: score,
            name: hardware.name,
            hardwareType: hardwareType
          };

        case "warning":
          return {
            message: "".concat(hardwareType, " \u0634\u0645\u0627 \u0642\u0627\u0628\u0644 \u0642\u0628\u0648\u0644 \u0627\u0633\u062A!"),
            status: status,
            score: score,
            name: hardware.name,
            hardwareType: hardwareType
          };
      }
    }
  }], [{
    key: "calcCpuAndGpuScore",
    value: function calcCpuAndGpuScore(hardware) {
      switch (hardware.category) {
        case "low":
          return 3;

        case "middle":
          return 6;

        case "high":
          return 10;

        default:
          break;
      }
    }
  }]);

  return Score;
}();

var _default = Score;
exports.default = _default;
},{}],"js/UI.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Score = _interopRequireDefault(require("./Score"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var UI = /*#__PURE__*/function () {
  function UI() {
    _classCallCheck(this, UI);

    this.app = document.querySelector('.app');
    this.form = document.querySelector('from');
    this.prevStep = document.querySelector(".prev-step");
    this.nextStep = document.querySelector(".next-step");
    this.hardwareList = document.querySelector(".hardware-list");
    this.title = document.querySelector(".title");
    this.stage = document.querySelector(".stage");
    this.progressBar = document.querySelector(".progress-bar");
    this.filter = document.querySelector('.filter');
    this.feedback = document.querySelector('.invalid-feedback');
  }

  _createClass(UI, [{
    key: "clearList",
    value: function clearList() {
      this.hardwareList.innerHTML = null;
    }
  }, {
    key: "drawOptions",
    value: function drawOptions(options, type) {
      var _this = this;

      console.log(this.hardwareList.selected);
      this.clearList();
      var disabled = document.createElement('option');
      disabled.disabled = true;
      disabled.selected = true;
      disabled.hidden = true;
      disabled.textContent = 'لطفا انتخاب کنید';
      this.hardwareList.append(disabled);
      options.forEach(function (option) {
        var optionTag = document.createElement("option");

        if (type === "RAM") {
          optionTag.textContent = option.name + " " + option.storage + " GB";
          optionTag.value = option.name + " " + option.storage;
        } else {
          optionTag.textContent = option.name;
          optionTag.value = option.name;
        }

        _this.hardwareList.append(optionTag);
      });
    }
  }, {
    key: "enableButton",
    value: function enableButton(btn, disabled) {
      btn.disabled = disabled;
    }
  }, {
    key: "getProgressWidth",
    value: function getProgressWidth() {
      var rule = this.progressBar.style.width;
      return parseInt(rule.substring(0, rule.length - 1));
    }
  }, {
    key: "setProgressWidth",
    value: function setProgressWidth(value) {
      this.progressBar.style.width = "".concat(value, "%");
    }
  }, {
    key: "clearFilter",
    value: function clearFilter() {
      this.filter.value = '';
    }
  }, {
    key: "clearApp",
    value: function clearApp() {
      this.app.innerHTML = null;
    }
  }, {
    key: "drawResult",
    value: function drawResult(alert) {
      var div = document.createElement('div');
      div.className = "alert alert-".concat(alert.status, " mt-3 text-right");
      var message = document.createElement('h6');
      message.textContent = alert.message;
      var info = document.createElement('small');
      info.textContent = "".concat(alert.hardwareType, " \u0627\u0646\u062A\u062E\u0627\u0628\u06CC \u0634\u0645\u0627 ").concat(alert.name, " \u0628\u0648\u062F \u0648 \u0627\u0645\u062A\u06CC\u0627\u0632 ").concat(alert.score, " \u0631\u0627 \u06A9\u0633\u0628 \u06A9\u0631\u062F\u06CC\u062F.");
      div.append(message);
      div.append(info);
      return div;
    }
  }, {
    key: "drawScore",
    value: function drawScore(score) {
      var div = document.createElement('div');
      div.textContent = "\u0627\u0645\u062A\u06CC\u0627\u0632 \u06A9\u0644\u06CC \u0634\u0645\u0627: ".concat(score, " \u0627\u0632 10");
      div.className = 'mb-4 text-right bold h5';
      this.app.append(div);
      var button = document.createElement('button');
      button.className = 'btn btn-primary btn-block';
      button.textContent = 'اجرای مجدد';
      button.addEventListener('click', function () {
        window.location.reload();
      });
      this.app.append(button);
    }
  }, {
    key: "drawResults",
    value: function drawResults(software, hardwares) {
      var score = new _Score.default(software);
      this.clearApp();
      var title = document.createElement('h4');
      title.textContent = 'نتیجه';
      this.app.append(title);

      for (var hardware in hardwares) {
        var alert = void 0;

        switch (hardware) {
          case 'CPU':
            alert = score.getCpuScore(hardwares[hardware]);
            break;

          case 'کارت گرافیک':
            alert = score.getGpuScore(hardwares[hardware]);
            break;

          case 'RAM':
            alert = score.getRamScore(hardwares[hardware]);
            break;

          case 'هارد':
            alert = score.getHardScore(hardwares[hardware]);
            break;

          default:
            break;
        }

        this.app.append(this.drawResult(alert));
      }
    }
  }]);

  return UI;
}();

var _default = new UI();

exports.default = _default;
},{"./Score":"js/Score.js"}],"../../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "5118" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../AppData/Roaming/npm/node_modules/parcel/src/builtins/hmr-runtime.js","js/UI.js"], null)
//# sourceMappingURL=/UI.e18802e0.js.map