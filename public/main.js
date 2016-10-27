  // Initialize variables

  // Prompt for setting a userid
  var userid = prompt("현재 위치를 입력해주세요(1~3) :");
  document.getElementById("mainimgframe").src='http://crowdvoteapp.com/stream'+userid;

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
    video[parseInt(data)+10] = loadImage("http://crowdvoteapp.com/capture"+(parseInt(data)+11)+".jpg");
    videostate[parseInt(data)+10] = true;
    document.getElementById('camera_'+data).style.display='none';
    //ensure canvas was updated, and POST print request only from userid 1(main)
    draw();
    if(videostate[10]==true&&videostate[11]==true&&videostate[12]==true&&userid==1){
      print();
    }
  }

//this print function's url needs to be migrated to raspberry pi.
  function print(){
    $.ajax({
      type:"POST",
      url:"print",
      data:{
        imgBase64:canvas.canvas.toDataURL()
      }
    });
    //no need, it's POST anyway.
    //socket.emit('print');
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
    alert('프린트가 완료되었습니다. 페이지가 리셋됩니다.');
    window.location.reload();
    /*
    for(var i=0; i<9; ++i){
      videostate[i]=true;
    }
    */
  });