var planeGeom = new Plane( 50, 80 );
SnowballView = function (screenWidth, screenHeight) {
	
	this.fireCallback;
	
	this.currentUser; 
	
	this.users = []; 
	
	this.SCREEN_WIDTH = screenWidth;
	this.SCREEN_HEIGHT = screenHeight;

	this.snowBalls = [];
	this.spareSnowBalls = []; 
	this.maxSnowBalls = 10; 

	this.scene;
	this.renderer;

	this.mouseX = 0;
	this.mouseY = 0;
	
	this.windowHalfX = this.SCREEN_WIDTH / 2,
	this.windowHalfY = this.SCREEN_HEIGHT / 2,

	this.particleImage = new Image();
				
	this.particleImage.src = 'img/ParticleSmoke.png';
	
	this.camera = new THREE.Camera( 75, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, 10000 );

	this.camera.position.y = 800;
	// this.camera.target.position.y = -60; 
	 this.camera.target.position.z = -1; 
	
	this.scene = new THREE.Scene();

	this.renderer = new THREE.CanvasRenderer();
	this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);

	this.update = function () {
		//console.out("update");
		for(var i = 0; i<this.snowBalls.length; i++) {
			
			var snowball = this.snowBalls[i];
			
			snowball.update(); 
			
			if(!snowball.enabled) continue; 
			
			if(snowball.position.y < 0){
				
				snowball.position.y = 0; 
				snowball.enabled = false; 
				//scene.removeObject(snowball); 
				this.spareSnowBalls.push(snowball); 
			}
		
		}
		
		for(i = 0; i<this.users.length; i++) {
			
			var user = this.users[i];
			user.update(); 
			
		}
		
		// this.camera.position.copy(this.currentUser.plane.position);
		// 	this.camera.position.y+=40;
	 	this.renderer.render( this.scene, this.camera );
		
		
	};

	this.throwSnowBall = function () {
		
		v = new THREE.Vector3(0,0,-60);
		
		v.rotateX(this.mouseY * 0.1);
		v.rotateY(this.mouseX * -0.2);
		
		//console.log(v);
		
		// call 
		if (this.fireCallback) {
		  this.fireCallback(this.currentUser.id, this.currentUser.slotNumber, v); 
		}
	}
	
	
	this.makeSnowBall = function (usernum, velocity) {
	
		var snowball;

		if(this.spareSnowBalls.length>this.maxSnowBalls){
			snowball = this.spareSnowBalls.shift(); 
		} else {
			snowball = new SnowBall(this.particleImage);
			this.snowBalls.push(snowball);
			this.scene.addObject( snowball );
		
		}
	
		snowball.enabled = true;
		
		// set the position relative to the player!  
		var user = this.users[usernum];
		console.log("user",user, usernum);
		console.log(velocity, snowball);
		snowball.position.copy(user.plane.position);
		//velocity.rotateY(user.currentRotation+90);
		console.log(THREE);
		v = new THREE.Vector3(0,0,-60);
		v.rotateY.call(velocity, user.currentRotation+90);
		snowball.velocity.set(velocity.x, velocity.y, velocity.z);
		
		
	}
	
	this.setup = function (userlist, currentplayerid)
	{
		this.userID = currentplayerid; 
		this.users = [];
		
		// iterate through each user and make a visual user object for each one. 
	
		var numPlayers = userlist.length;
		
		for(var i = 0; i<numPlayers; i++)
		{
			var userlistitem = userlist[i]; 
			
			var user = new UserView(userlistitem._id, i);
			
			// Create a plane object add it  
			
			if(user.id == this.userID) {
				this.currentUser = user; 
				//user.plane = new THREE.Mesh( new Plane( 50, 80 ), new THREE.MeshColorFillMaterial(0xffffff));
				user.plane.material[0].color.setHex(0xffffffff);
				//console.log(user.plane.material[0].color);
				
			}
			
			this.scene.addObject( user.plane );

			user.updatePosition(numPlayers); 
			user.update(true);

			this.users.push(user);
		
			
		}

		// update positions of everything.. 
		// this.updatePositions(); 
		
	}
	
	this.updatePlayers = function (userlist )
	{
		for (var i =0 ; i<this.users.length; i++) {
			this.scene.removeObject(this.users[i].plane)
		}
		var oldusers = this.users; 
		this.users = [];
		for(var i = 0; i<userlist.length; i++)
		{
			var userlistitem = userlist[i];
			var user = undefined; 
			
			for(var j =0; j<oldusers.length; j++)
			{
				if(oldusers[j].id == userlistitem._id)
				{
					
					user = oldusers[j];
					
				}
			} 
			
			if(!user)
			{
				user = new UserView(userlistitem._id, i);
				user.currentRotation = 360; 
			
				//console.log("MAKING NEW USER", user);	
			}
			
			user.slotNumber = i; 
			
			this.scene.addObject(user.plane); 
			user.updatePosition(userlist.length);
			user.update(true);
			this.users.push(user);
			// do stuff... 
			// compare with current user array. 
			
			
		}
		
		//this.updatePositions(); 
		
	}
	
	this.setMouse = function(x, y)
	{
		this.mouseX = x - this.windowHalfX;
		this.mouseY = y - this.windowHalfY;
	}
	
	
		
};

UserView = function (id, slot)
{
	this.id = id;
	this.slotNumber = slot; 
	
	this.currentRotation = 0; 
	this.targetRotation = 0; 
	this.radius = 500; // distance from the centre of the circle. 
	this.tempVector = new THREE.Vector3(0,0,0);
	
	var col = Math.random(); 
	this.plane = new THREE.Mesh( planeGeom, new THREE.MeshBasicMaterial( { color:  (0xff * (col) | (0xff * (1-col) <<16) )} ));
	this.plane.doubleSided = true; 
	
	this.update = function (forceRefresh) {
		
		//this.plane.rotation.x+=0.01; 
		if((forceRefresh) || (this.currentRotation!=this.targetRotation)) {
		
			var diff = this.targetRotation-this.currentRotation; 
			
			if (Math.abs(diff)<0.01) {
				
				this.currentRotation = this.targetRotation;
				
			} else {

				diff*=0.1; 
				this.currentRotation+=diff; 
				
			}
	
		
			if(this.plane) {
				this.tempVector.set(this.radius, 40, 0);
				this.tempVector.rotateY(this.currentRotation); 
			
				this.plane.position.copy(this.tempVector);
				this.plane.rotation.y = (this.currentRotation-90) * TO_RADIANS;
			
			}
		}
	}
	
	this.updatePosition = function (numPlayers){
		
		 this.targetRotation = (360/numPlayers)*this.slotNumber;
		
		
	}
	
}
