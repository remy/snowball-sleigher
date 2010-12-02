forbind.debug = true;

// Debug Stuffs
var output = document.getElementById('out'),
    join = document.getElementById('join');

function log(s) {
  var item = document.createElement('li');
  item.innerHTML = s;
  output.appendChild(item);
}

// Setup & Fluff Stuffs
join.onsubmit = function () {
  username = join.getElementsByTagName('input')[0].value;
  if(username && username != '') {
      forbind.user({username: username});
      forbind.join();
      join.style.display = 'none';
  } else {
    log('> enter a username dumbass');
  }
  return false;
};


// Forbind Magic Stuffs

forbind.on({
  join: function (event) {
    if (event.isme) {
      log('all connected users: ', event.users); // event.users: array
    } else {
      log('new user connected: ', event.user); // event.user: object
    }
  },
  ready: function () {
    log('> FIGHT! (session ready)');
    fight();
  },
  waiting: function (event) {
    log('> waiting for ' + event.waitingfor + ' others to join...');
  },
  leave: function (event) {
    log('> ' + event.user + ' left. ' + event.total + ' users remaining');
  },
  message: function (event) {
    log(event.user + ': ' + event.data);
    switch (event.data.type) {
      case 'snowball':
        // Maybe figure out who the user is?
        // Call Seb's snowball event here
          log('> snowball recieved!!!!! SPLATTER');
        break;
      // case 'avatar':
      // 
      //   break;
      // case 'join':
      // 
      //   break;
      // case 'leave':
      // 
      //   break;
      default:
        //
    }
  }
});

ev(document).on('snowball', function (event, velocity) {
  console.log(arguments);
  console.log('do I get here ever?');
  log('> snowball fired!!!!! OMFG' + velocity);
  forbind.send({
    type: 'snowball',
    velocity: velocity
  });
});








// Simulation Stuffs

var fight = function () {
  document.onkeypress = function (event) {
    switch (event.charCode) {
      case 115: // S
        ev(document).fire('fireSnowball', {
          x: 100,
          y: 50,
          z: 12
        });
        break;
      // case ??: // J
      //   // User Joins
      //   break;
      // case ??: // L
      //   // User Leaves
      //   break;
      // case ??: // A
      //   // User adds an avatar
      //   break;
      default:
        //
    }
  };
}