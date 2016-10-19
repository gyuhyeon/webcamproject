//on-demand global mode for p5js
new p5();

var canvas;
var img;  // Declare variable 'img'.
var video=[];
var videostate=[true, true, true, true, true, true, true, true, true];
var gridwidth=300;
var gridheight=300;

var current=0;


function setup(){
	canvas = createCanvas(900, 900);
	canvas.position(50,50);
	for(var i=0; i<9; ++i){
		/*
		video[i] = createVideo(['https://dl.dropboxusercontent.com/u/90141299/catbowl.mov']);
		video[i].loop();
		video[i].hide();
		*/
		video[i] = loadImage("http://crowdvoteapp.com/stream1");
		//video[i] = loadImage("http://camera.nton.lviv.ua/mjpg/video.mjpg");
	}
	//video = loadImage(['http://217.7.233.140/cgi-bin/faststream.jpg?stream=full&fps=0']);
	//video.loop();
	//video.hide();
	//img = loadImage("https://s.graphiq.com/sites/default/files/stories/t2/tiny_cat_12573_8950.jpg");  // Load the image
}

function draw(){
	/*
	for(var i=0; i<3; ++i){
		for(var j=0; j<3; ++j){
			rect(gridwidth*i,gridheight*j,gridwidth-1,gridheight-1);
		}
	}*/
	for(var i=0; i<3; ++i){
		for(var j=0; j<3; ++j){
			//rect(gridwidth*i,gridheight*j,gridwidth-1,gridheight-1);
			if(videostate[i*3+j]==true){
				image(video[i*3+j],gridwidth*j,gridheight*i,gridwidth,gridheight);
			}
		}
	}
	//image(img, 0, 0);
}

function tempcounterincrease(){
	current++;
}
function tempcounterreset(){
	background(255);
	current=0;
}
function tempprint(){
	window.print();
}

function mousePressed() {
	//current++;
  /*saveFrames("out", "png", 1, 25, function(data){
    print(data);
  });*/
}

function keyPressed() {
  if (keyCode === ENTER)
  	save(canvas, 'output.jpg');
}