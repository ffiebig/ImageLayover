var images;
var transparentImages;
var imageArray;

function isTransparent(e) {
  var x = e.pageX - document.getElementById('image-tab-content').getBoundingClientRect().left + window.pageXOffset,
    y = e.pageY - document.getElementById('image-tab-content').getBoundingClientRect().top + window.pageYOffset,
    transparent = true,
    // detectedElement = null,
    canvases = [];
  var canvas;
  var context2D;
  var context;

  imageArray.forEach(function (image) {

    if (!transparent) {
      return true;
    }

    canvas = (function (_this) {
      e = document.createElement('canvas');
      e.setAttribute('width', _this.width);
      e.setAttribute('height', _this.height);
      e.setAttribute('id', _this.id + '-canvas');
      e.setAttribute('style', 'display: none;');
      document.body.appendChild(e);
      context2D = e.getContext('2d');
      context2D.drawImage(_this, 0, 0, _this.width, _this.height);
      return e;
    })(image);

    if (canvas.getContext === undefined) {
      return false;
    }

    canvases.push(canvas);
    context = canvas.getContext('2d');

    transparent = (context.getImageData(x, y, 1, 1).data[3] === 0);

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

  images = document.getElementsByClassName('nn-image');
  transparentImages = document.getElementsByClassName('nn-image-vacio');
  imageArray = Array.from(images);
  imageArray.reverse();
  for (i = 0; i < transparentImages.length; i++) {
    transparentImages[i].addEventListener('mousemove', isTransparent);
    // isTransparent(TransparentImages[i], ImageArray);
  }
})();
