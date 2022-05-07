const canvas = new fabric.Canvas("canvas", {
  width: 1000,
  height: 700,
    backgroundColor: "#ffffc3",
});

// Uploading the image
const imgAdded = (e) => {
  console.log(e);
  const inputElem = document.getElementById("img");
  const file = inputElem.files[0];
  reader.readAsDataURL(file);
};

const reader = new FileReader();

const inputFile = document.getElementById("img");
inputFile.addEventListener("change", imgAdded);

reader.addEventListener("load", () => {
  fabric.Image.fromURL(reader.result, (img) => {
    canvas.add(img);
    canvas.requestRenderAll();
  });
});


//zoom feature on mouse wheel
canvas.on('mouse:wheel', function(opt) {
var delta = opt.e.deltaY;
var zoom = canvas.getZoom();
zoom *= 0.999 ** delta;
if (zoom > 20) zoom = 20;
if (zoom < 0.01) zoom = 0.01;
canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
opt.e.preventDefault();
opt.e.stopPropagation();
var vpt = this.viewportTransform;
if (zoom < 400 / 1000) {
  vpt[4] = 200 - 1000 * zoom / 2;
  vpt[5] = 200 - 1000 * zoom / 2;
} else {
  if (vpt[4] >= 0) {
    vpt[4] = 0;
  } else if (vpt[4] < canvas.getWidth() - 1000 * zoom) {
    vpt[4] = canvas.getWidth() - 1000 * zoom;
  }
  if (vpt[5] >= 0) {
    vpt[5] = 0;
  } else if (vpt[5] < canvas.getHeight() - 1000 * zoom) {
    vpt[5] = canvas.getHeight() - 1000 * zoom;
  }
}
});