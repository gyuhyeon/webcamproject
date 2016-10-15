var img;

function setup() {
  createCanvas(640, 360);
  img = createImg("http://processing.org/img/processing-web.png", test);
  
}


function draw() {
  background(0);
  image(img, 0, 0);
}