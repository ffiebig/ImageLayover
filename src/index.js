import {createCanvas} from './create_canvas';

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

    if (!(transparent)) {
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
  canvases = createCanvas(imageArray);
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
