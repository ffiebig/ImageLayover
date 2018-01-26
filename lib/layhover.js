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

function isClicked(e, clickFunction) {
  var x, y, transparent, context, image, canvas;

  if (e.target.className === 'nn-image-vacio') {
    if (window.lastElementClicked) {
      window.lastElementClicked.style.opacity = 1;
      window.lastElementClicked.style.filter = 'alpha(opacity=100)';
      window.lastElementClicked = '';
    }
  }
  x = e.pageX - (document.getElementById('image-tab-content').getBoundingClientRect().left + window.pageXOffset);
  y = e.pageY - (document.getElementById('image-tab-content').getBoundingClientRect().top + window.pageYOffset);
  transparent = true;

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

    if (!transparent) {
      image.style.opacity = 0.6;
      image.style.filter = 'alpha(opacity=60)';
      window.lastElementClicked = image;
      clickFunction(image);
    }
    return false;
  });
}

function isTransparent(e) {
  var x = e.pageX - (document.getElementById('image-tab-content').getBoundingClientRect().left + window.pageXOffset),
      y = e.pageY - (document.getElementById('image-tab-content').getBoundingClientRect().top + window.pageYOffset),
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

    if (transparent) {
      image.style.opacity = 1; // For real browsers;
      image.style.filter = 'alpha(opacity=100)'; // For IE;
      window.cursor = 'default';
    } else {
      image.style.opacity = 0.6;
      image.style.filter = 'alpha(opacity=60)';
      window.cursor = 'pointer';
    }
    return false;
  });
  if (window.isClicked) {
    this.style.cursor = window.cursor;
  }
  if (window.lastElementClicked) {
    window.lastElementClicked.style.opacity = 0.6;
    window.lastElementClicked.style.filter = 'alpha(opacity=60)';
  }
}

function startLayHover() {
  var i;

  canvases = [];
  transparentImages = document.getElementsByClassName('nn-image-vacio');
  imageArray = Array.from(document.getElementsByClassName('nn-image'));
  canvases = (0, _create_canvas.createCanvas)(imageArray);
  for (i = 0; i < transparentImages.length; i++) {
    transparentImages[i].addEventListener('mousemove', isTransparent);
  }
}

function initLayHover(event, functionIsClicked) {
  if (event === 'click') {
    startLayHover();
    document.addEventListener('click', function (e) {
      isClicked(e, functionIsClicked);
      window.isClicked = true;
    });
  } else if (event === 'mousemove') {
    startLayHover();
  }
}

(function () {
  var layhoverJS = initLayHover;

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