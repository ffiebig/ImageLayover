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


var Images;
var TransparentImages;
var ImageArray;

function isTransparent(e) {
  var x = e.pageX - document.getElementById('image-tab-content').getBoundingClientRect().left + window.pageXOffset,
      y = e.pageY - document.getElementById('image-tab-content').getBoundingClientRect().top + window.pageYOffset,
      transparent = true,

  // detectedElement = null,
  canvases = [];
  var canvas;
  var context2D;
  var context;

  ImageArray.forEach(function (image) {

    if (!transparent) {
      return true;
    }

    canvas = function (_this) {
      e = document.createElement('canvas');
      e.setAttribute('width', _this.width);
      e.setAttribute('height', _this.height);
      e.setAttribute('id', _this.id + '-canvas');
      e.setAttribute('style', 'display: none;');
      document.body.appendChild(e);
      context2D = e.getContext('2d');
      context2D.drawImage(_this, 0, 0, _this.width, _this.height);
      return e;
    }(image);

    if (canvas.getContext === undefined) {
      return false;
    }

    canvases.push(canvas);
    context = canvas.getContext('2d');

    transparent = context.getImageData(x, y, 1, 1).data[3] === 0;

    if (transparent) {
      // detectedElement = null;
      image.style.opacity = 1; // For real browsers;
      image.style.filter = 'alpha(opacity=100)'; // For IE;
    } else {
      // detectedElement = image.id;
      image.style.opacity = 0.6;
      image.style.filter = 'alpha(opacity=60)';
    }
    return false;
  });
  canvases.forEach(function (canvas) {
    canvas.parentNode.removeChild(canvas);
  });
}

(function () {
  var i;

  Images = document.getElementsByClassName('nn-image');
  TransparentImages = document.getElementsByClassName('nn-image-vacio');
  ImageArray = Array.from(Images);
  ImageArray.reverse();
  for (i = 0; i < TransparentImages.length; i++) {
    TransparentImages[i].addEventListener('mousemove', isTransparent);
    // isTransparent(TransparentImages[i], ImageArray);
  }
})();

/***/ })
/******/ ]);
});
//# sourceMappingURL=layhover.js.map