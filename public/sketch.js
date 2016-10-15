var img;  // Declare variable 'img'.

function setup() {
  createCanvas(720, 400);
  img = loadImage("https://www.google.co.kr/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0ahUKEwi-25jG-dvPAhUMJZQKHSyfDYgQjRwIBw&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DtntOCGkgt98&psig=AFQjCNHgCCTvAX1XZ8rIsC1NCPh1FkR3Fg&ust=1476591339713581");  // Load the image
}

function draw() {
  // Displays the image at its actual size at point (0,0)
  image(img, 0, 0);
  // Displays the image at point (0, height/2) at half size
  image(img, 0, height/2, img.width/2, img.height/2);
}
