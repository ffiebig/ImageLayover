import {createCanvas} from './create_canvas';

var transparentImages;
var imageArray;
var canvases;

function isTransparent(e) {
  var x = e.pageX - document.getElementById('image-tab-content').getBoundingClientRect().left + window.pageXOffset,
    y = e.pageY - document.getElementById('image-tab-content').getBoundingClientRect().top + window.pageYOffset,
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
    } else {
      image.style.opacity = 0.6;
      image.style.filter = 'alpha(opacity=60)';
    }
    return false;
  });
}

export function removeListener(element) {
  element.removeEventListener('mousemove', isTransparent);
}

export function startListener(element) {
  element.addEventListener('mousemove', isTransparent);
}

(function () {
  var i;

  canvases = [];
  transparentImages = document.getElementsByClassName('nn-image-vacio');
  imageArray = Array.from(document.getElementsByClassName('nn-image'));
  canvases = createCanvas(imageArray);
  for (i = 0; i < transparentImages.length; i++) {
    startListener(transparentImages[i]);
  }
})();
