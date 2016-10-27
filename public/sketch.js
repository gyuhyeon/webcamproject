//on-demand global mode for p5js
new p5();

var canvas;
var img;  // Declare variable 'img'.
var video=[];
var videostate=[true, true, true, true, true, true, true, true, true, true, true, false, false, false, true, true, true, true, true, true, true, true, true, true, true];
var gridwidth=180;
var gridheight=180;

var current=0;


function setup(){
	canvas = createCanvas(900, 900);
	canvas.position(50,50);
	for(var i=0; i<25; ++i){
		/*
		video[i] = createVideo(['https://dl.dropboxusercontent.com/u/90141299/catbowl.mov']);
		video[i].loop();
		video[i].hide();
		*/
		if(videostate[i]==true)
			video[i] = loadImage("http://crowdvoteapp.com/capture"+(i+1)+".jpg");
	}

	// static/local video or some shit *wait, this shouldn't be external links like this. It should be done by proxy...
	/*video[3] = loadImage("http://writm.com/wp-content/uploads/2016/08/Cat-hd-wallpapers.jpg");
	video[4] = loadImage("https://pixabay.com/static/uploads/photo/2016/05/18/20/57/cat-1401557_960_720.jpg");
	video[5] = loadImage("https://pixabay.com/static/uploads/photo/2014/03/29/09/17/cat-300572_960_720.jpg");
	video[6] = loadImage("http://www.rd.com/wp-content/uploads/sites/2/2016/02/06-train-cat-shake-hands.jpg");
	video[7] = loadImage("http://rollycat.com/wp-content/uploads/2014/09/apple-mac-cat-face-like-angel-soul_342655.jpg");
	video[8] = loadImage("https://s-media-cache-ak0.pinimg.com/564x/29/9e/56/299e56ab07c75af6407289ecc4ab1dd6.jpg");*/
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
	for(var i=0; i<5; ++i){
		for(var j=0; j<5; ++j){
			//rect(gridwidth*i,gridheight*j,gridwidth-1,gridheight-1);
			if(videostate[i*5+j]==true && (typeof video[i]!='undefined') ){
				image(video[i*5+j],gridwidth*j,gridheight*i,gridwidth,gridheight);
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