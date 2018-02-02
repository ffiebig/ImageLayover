import {createCanvas} from './create_canvas';

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
  canvases = createCanvas(imageArray);
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
