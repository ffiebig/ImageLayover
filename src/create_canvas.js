export function createCanvas(imageArray) {
  var e;
  var canvas;
  var tuple;
  var canvases = [];

  imageArray.forEach(function (image) {
    canvas = (function (_this) {
      e = document.createElement('canvas');
      e.setAttribute('width', _this.width);
      e.setAttribute('height', _this.height);
      e.setAttribute('id', _this.id + '-canvas');
      e.setAttribute('style', 'display: none;');
      document.body.appendChild(e);
      return e;
    })(image);
    tuple = [image, canvas];
    canvases.push(tuple);
  });
  return canvases;
}
