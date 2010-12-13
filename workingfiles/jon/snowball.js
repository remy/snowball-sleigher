// Debug Helpers
forbind.debug = true;
var output = document.getElementById('out'),
    log = function (s) {
      if (forbind.debug) {
        var item = document.createElement('li');
        item.innerHTML = s;
        output.appendChild(item);
      }
    };

// Snowball Sleigher
    
var player;
forbind.on({
  join: function (event) {
    if (event.isme) {
      player = event.user._id;
      console.log(event.users);
      init(event.users, player);
      log('You joined the fight as Player ' + player); // event.users: array
    } else {
      console.log(event);
      log('Player ' + event.user._id + ' joined the fight'); // event.user: object
    }
  },
  ready: function () {
    log('Snowball Fight! (session ready)');
  },
  leave: function (event) {
    log('> ' + event.user + ' left. ' + event.total + ' users remaining');
  },
  message: function (event) {
    ev(document).fire(event.data.type, event.data);
  }
});

ev(document).on('snowball', function (event) {
  //slot
  //vector {x, y, z}
  
  // Sebs function
  console.log(event);
  snowView.makeSnowBall(event.data.playerID, event.data.vector);

  if (event.data.slot == player) {
    forbind.send({
      type: 'snowball',
      playerID: event.data.playerID,
      vector: event.data.vector
    });
//}
// The below is just for debugging    
    log('You fired a snowball going ' + JSON.stringify(event.data.vector));
  } else {
    log('Player ' + event.data.playerID + ' fired a snowball going ' + JSON.stringify(event.data.vector));
  }
});
ev(document).on('avatar', function (event) {
  //slot
  //imageData base64
  
  // Seb's Magic Here
  
  if (event.data.playerID == player) {
    forbind.send({
      type: 'avatar',
      data: event.data.imageData
    });
//}
// The below is just for debugging
    log('You updated your avatar to <img src="' + event.data.imageData + '"/>');
  } else {
    log('Player ' + event.data.playerID + ' updated their avatar to <img src="' + event.data.imageData + '"/>');
  }
});





var snowView;
var init =  function (allPlayersIDs, currentPlayerID) {
  
  snowView = new SnowballView(800, 600);
	
	snowView.setup(allPlayersIDs, currentPlayerID); 
	
	snowView.fireCallback = function(playerID, velocity) {
    ev(document).fire('snowball', {
      player: playerID,
      vector: velocity
    });
  };
	
	document.getElementById('container').appendChild(snowView.renderer.domElement);
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
  document.addEventListener( 'mousedown', onDocumentMouseDown, false );
  
  setInterval(loop, 1000 / 60 );
  
  function onDocumentMouseDown(event) {
  	snowView.throwSnowBall(); 
  }
  function onDocumentMouseMove ( event ) {
  	snowView.setMouse(event.clientX, event.clientY);
  }
  function loop() {
  	snowView.update()
  }
};

forbind.join();