  // Initialize variables

  // Prompt for setting a userid(now hardcoded in html)
  //var userid = prompt("현재 위치를 입력해주세요(1~3) :");
  //document.getElementById("mainimgframe").src='http://crowdvoteapp.com/stream'+userid;

  var socket = io();

  function capture(){
    var c = document.createElement('canvas');
    var img = document.getElementById('camera_'+userid);
    c.width = img.width;
    c.height = img.height;
    c.style.display='none';
    var ctx = c.getContext('2d');
    ctx.drawImage(img, 0, 0, img.width, img.height);
    $.ajax({
      type:"POST",
      url:"capture",
      data:{
        imgId:userid,
        imgBase64:c.toDataURL()
      }
    });
    //no need, it's POST anyway.
    //socket.emit('camera capture', data);
  }

  function applyCapture(data){
    //data:1,2,3
    video[parseInt(data)+10] = loadImage("http://crowdvoteapp.com/capture"+(parseInt(data)+11)+".jpg?t="+new Date().getTime());
    videostate[parseInt(data)+10] = true;
    document.getElementById('camera_'+data).style.display='none';
    //ensure canvas was updated, and POST print request only from userid 1(main)
    
    //not sure, but I think draw() seems to be having problems due to loadImage being async? -> (hopefully) solved by making draw() more safe
    draw();
    if(videostate[11]==true&&videostate[12]==true&&videostate[13]==true&&userid==1&& typeof canvas != 'undefined'){
      print();
    }
    
  }

  function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

//this print function's url needs to be migrated to raspberry pi.
  function print(){
    sleep(2000).then(() => {

      videostate[11]=false;
      videostate[12]=false;
      videostate[13]=false;
      $.ajax({
       type:"POST",
       url:"print",
       data:{
         imgBase64:canvas.canvas.toDataURL()
       }
     });
     //no need, it's POST anyway.
     //socket.emit('print');

    });
  }


  // Socket events

  socket.on('init', function (data) {
    for(var i=0; i<3; ++i){
      if(data.videostatus[i]==true){
        applyCapture(i+1);
      }
    }
  });

  // Whenever the server emits 'camera capture', update the canvas.
  socket.on('capture', function (data) {
    applyCapture(data.userid);
  });

  //Whenever the server emits 'print', revert page to default.
  socket.on('print', function () {
    //alert('프린트가 완료되었습니다. 페이지가 리셋됩니다.');
    if(userid==1){
      window.location = 'http://crowdvoteapp.com/video.html';
    }
    else{
      window.location.reload();
    }
    /*
    for(var i=0; i<9; ++i){
      videostate[i]=true;
    }
    */
  });