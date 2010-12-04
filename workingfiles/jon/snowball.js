// Debug Stuffs
forbind.debug = true;
var output = document.getElementById('out'),
    log = function (s) {
      if (forbind.debug) {
        var item = document.createElement('li');
        item.innerHTML = s;
        output.appendChild(item);
      }
    };
    
// Simulation Stuffs - simulate game events for testing 
document.onkeypress = function (event) {
  console.log(event);
  switch (event.charCode) {
    case 115: // (S)nowball Fired

      // This would be used by Seb's game world when the user fires a snowball.
      ev(document).fire('snowball', {
        slot: player, //TODO: This would be the players lot number.
        vector: {
          x: ~~(Math.random() * 101),
          y: ~~(Math.random() * 101),
          z: ~~(Math.random() * 101)
        }
      });

      break;
    case 106: // (J)oin
      forbind.join();
      break;
    case 108: // (L)eave
      forbind.leave();
      break;
    case 97: // (A)vatar changed

      // This would be used by Remy after a avatar has been loaded and resized
      ev(document).fire('avatar', {
        slot: player,
        imageData: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAABGdBTUEAALGPC/xhBQAAAAlwSFlzAAALEgAACxIB0t1+/AAAAAd0SU1FB9EFBAoYMhVvMQIAAAAtSURBVHicY/z//z8DHoBH+v///yy4FDEyMjIwMDDhM3lgpaEuh7gTEzDiDxYA9HEPDF90e5YAAAAASUVORK5CYII='
      });

      break;
  }
};   
    

// Snowball Sleigher
    
var player;

forbind.on({
  join: function (event) {
    if (event.isme) {
      player = event.slot;
      log('You joined the fight as Player ' + player); // event.users: array
    } else {
      log('Player ' + event.slot + ' joined the fight'); // event.user: object
    }
  },
  ready: function () {
    log('Snowball Fight! (session ready)');
    fight();
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
  
  // Seb's Magic here instead of this silly text game

  if (event.data.slot == player) {
    forbind.send({
      type: 'snowball',
      slot: event.data.slot,
      vector: event.data.vector
    });
//}
// The below is just for debugging    
    log('You fired a snowball going ' + JSON.stringify(event.data.vector));
  } else {
    log('Player ' + event.data.slot + ' fired a snowball going ' + JSON.stringify(event.data.vector));
  }
});
ev(document).on('avatar', function (event) {
  //slot
  //imageData base64
  
  // Seb's Magic Here
  
  if (event.data.slot == player) {
    forbind.send({
      type: 'avatar',
      data: event.data.imageData
    });
//}
// The below is just for debugging
    log('You updated your avatar to <img src="' + event.data.imageData + '"/>');
  } else {
    log('Player ' + event.data.slot + ' updated their avatar to <img src="' + event.data.imageData + '"/>');
  }
});