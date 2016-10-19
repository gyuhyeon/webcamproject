  // Initialize variables

  // Prompt for setting a username
  var username = prompt("현재 위치를 입력해주세요(1~9) :");
  document.getElementById("mainimgframe").src='http://crowdvoteapp.com/stream'+(int(username))

  var socket = io();

  // Sends a chat message
  function sendMessage () {
    var message = $inputMessage.val();
    // Prevent markup from being injected into the message
    message = cleanInput(message);
    // if there is a non-empty message and a socket connection
    if (message && connected) {
      $inputMessage.val('');
      addChatMessage({
        username: username,
        message: message
      });
      // tell server to execute 'new message' and send along one parameter
      socket.emit('new message', message);
    }
  }

  function capture(){
    var data = username;
    socket.emit('camera capture', data);
  }

  function applyCapture(data){
    videostate[int(data)-1]=false;
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
    socket.emit('print');
  }


  // Socket events

  // Whenever the server emits 'camera capture', update the canvas.
  socket.on('camera capture', function (data) {
    applyCapture(data.username);
  });

  //Whenever the server emits 'print', revert page to default.
  socket.on('print', function () {
    for(var i=0; i<9; ++i){
      videostate[i]=true;
    }
  });