(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("layhover", [], factory);
	else if(typeof exports === 'object')
		exports["layhover"] = factory();
	else
		root["layhover"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _create_canvas = __webpack_require__(1);

var canvases;
var transparentImages;
var imageArray;
var lastElementClicked;

function isTransparent(e, baseId, transparentMethod, notTransparentMethod) {
  var x = e.pageX - (document.getElementById(baseId).getBoundingClientRect().left + window.pageXOffset),
      y = e.pageY - (document.getElementById(baseId).getBoundingClientRect().top + window.pageYOffset),
      transparent = true;
  var context, image, canvas;

  canvases.forEach(function (tuple) {
    image = tuple[0];
    canvas = tuple[1];

    if (window.getComputedStyle(image, null).getPropertyValue('display') === 'none') {
      return false;
    }

    canvas.setAttribute('width', image.width);
    canvas.setAttribute('height', image.height);
    canvas.getContext('2d').drawImage(image, 0, 0, image.width, image.height);

    if (!transparent) {
      return true;
    }

    if (canvas.getContext === undefined) {
      return false;
    }

    context = canvas.getContext('2d');
    transparent = context.getImageData(x, y, 1, 1).data[3] === 0;

    if (transparent && transparentMethod) {
      transparentMethod(image, lastElementClicked);
    } else if (!transparent && notTransparentMethod) {
      notTransparentMethod(image, lastElementClicked);
    }
    return false;
  });
}

function isClicked(e, object) {
  if (e.target.className === object.transparentClass) {
    if (lastElementClicked && object.lastElementMethod) {
      object.lastElementMethod(lastElementClicked);
    }
  }
  isTransparent(e, object.baseId, object.clickTransparentMethod, object.clickImageMethod);
}

function isHover(e, object) {
  isTransparent(e, object.baseId, object.transparentHoverMethod, object.hoverMethod);
  if (object.triggerEvent === 'click' && object.hoverClickMethod) {
    object.hoverClickMethod(e.target, lastElementClicked);
  }
}

function startLayHover(object) {
  var i;

  canvases = [];
  transparentImages = document.getElementsByClassName(object.transparentClass);
  imageArray = Array.from(document.getElementsByClassName(object.imageClass));
  canvases = (0, _create_canvas.createCanvas)(imageArray);
  for (i = 0; i < transparentImages.length; i++) {
    transparentImages[i].addEventListener('mousemove', function (e) {
      isHover(e, object);
    });
  }
}

function initLayHover(object) {
  if (object.triggerEvent === 'click') {
    startLayHover(object);
    document.addEventListener('click', function (e) {
      isClicked(e, object);
    });
  } else if (object.triggerEvent === 'mousemove') {
    startLayHover(object);
  }
}

function updateClickedElement(value) {
  lastElementClicked = value;
}

(function () {
  var layhoverJS = { init: initLayHover, updateLastClick: updateClickedElement };

  if (window.layhoverJS === undefined) {
    window.layhoverJS = layhoverJS;
  }
})();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCanvas = createCanvas;
function createCanvas(imageArray) {
  var e;
  var canvas;
  var tuple;
  var canvases = [];

  imageArray.forEach(function (image) {
    canvas = function (_this) {
      e = document.createElement('canvas');
      e.setAttribute('width', _this.width);
      e.setAttribute('height', _this.height);
      e.setAttribute('id', _this.id + '-canvas');
      e.setAttribute('style', 'display: none;');
      document.body.appendChild(e);
      return e;
    }(image);
    tuple = [image, canvas];
    canvases.push(tuple);
  });
  return canvases;
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=layhover.js.map