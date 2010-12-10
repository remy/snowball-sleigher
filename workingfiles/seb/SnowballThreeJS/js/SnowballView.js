
SnowballView = function (screenWidth, screenHeight) {
	
	this.fireCallback;
	this.userID; 
	
	this.SCREEN_WIDTH = screenWidth;
	this.SCREEN_HEIGHT = screenHeight;

	this.snowBalls = [];
	this.spareSnowBalls = []; 

	this.scene;
	this.renderer;

	this.mouseX = 0;
	this.mouseY = 0;
	
	this.windowHalfX = this.SCREEN_WIDTH / 2,
	this.windowHalfY = this.SCREEN_HEIGHT / 2,
	


	this.particleImage = new Image();
				
	this.particleImage.src = 'img/ParticleSmoke.png';
	
	this.camera = new THREE.Camera( 75, this.SCREEN_WIDTH / this.SCREEN_HEIGHT, 1, 10000 );
	this.camera.position.y = 600;
	this.camera.target.position.y = -60; 
	this.camera.target.position.z = -10; 
	

	this.scene = new THREE.Scene();

	this.renderer = new THREE.CanvasRenderer();
	this.renderer.setSize(this.SCREEN_WIDTH, this.SCREEN_HEIGHT);
	
	
	var pos = new THREE.Vector3(500,-80,0);
		
	var numPlayers = 10; 

	for (var i = 0; i < numPlayers; i++) {
		
		//var geometry = new Plane( 50, 70, 1, 1 );
		var plane = new THREE.Mesh( new Plane( 50, 80 ), new THREE.MeshColorFillMaterial(  (0xff * ((numPlayers-i)/numPlayers)) | ((0xff * (i/numPlayers)) <<16) ));
		
		
		//particle = new Particle3D(  );
		plane.position.x = pos.x;
		plane.position.y = pos.y;
		plane.position.z = pos.z;
		
		plane.rotation.y = ((i*(360/numPlayers))-90) * TO_RADIANS;
		this.scene.addObject( plane );
			
		pos.rotateY(360/numPlayers); 
	}



	this.update = function () {
		
		for(var i = 0; i<this.snowBalls.length; i++){
			var snowball = this.snowBalls[i];
			
			snowball.update(); 
			
			if(!snowball.enabled) continue; 
			
			if(snowball.position.y < -200){
				
				snowball.position.y = -200; 
				snowball.enabled = false; 
				//scene.removeObject(snowball); 
				this.spareSnowBalls.push(snowball); 
			}
		
		}
		
	//	this.camera.target.position.x = ( mouseX) * 0.4;
		this.renderer.render( this.scene, this.camera );
		
		
	};

	this.throwSnowBall = function () {
		
		v = new THREE.Vector3(0,0,-60);
		
		v.rotateX(this.mouseY * 0.1);
		v.rotateY(this.mouseX * -0.2);
		
		console.log(v);
		
		// call 
		if (this.fireCallback) {
			this.fireCallback(1, v); 
		}
	}
	
	
	this.makeSnowBall = function (usernum, velocity) {
	
		var snowball; 

		if(this.spareSnowBalls.length>20){
			snowball = this.spareSnowBalls.shift(); 
		} else {
			snowball = new SnowBall(this.particleImage);
			this.snowBalls.push(snowball);
		
		}
	
		snowball.enabled = true;
		
		// set the position relative to the player!  
		snowball.position.set(0,0,200);
		snowball.velocity.set(velocity.x, velocity.y, velocity.z);
		
		this.scene.addObject( snowball );
	}
	
	this.setup = function (users, userid, slot)
	{
		this.userID = userid; 
		
		// iterate through each user and make a visual user object for each one. 
		
		for(var i = 0; i<users.length; i++)
		{
			var user = users[i]; 
			// do stuff... 
			
		}
		
		// update positions of everything.. 
		// this.updatePositions(); 
		
	}
	
	this.updatePlayers = function (users )
	{
		for(var i = 0; i<users.length; i++)
		{
			var user = users[i]; 
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

document.addEventListener( 'mousemove', onDocumentMouseMove, false );
document.addEventListener( 'mousedown', onDocumentMouseDown, false );
document.addEventListener( 'touchstart', onDocumentTouchStart, false );
document.addEventListener( 'touchmove', onDocumentTouchMove, false );

setInterval( loop, 1000 / 60 );


function onDocumentMouseDown(event) {

	snowView.throwSnowBall(); 

}

function onDocumentMouseMove ( event ) {

	snowView.setMouse(event.clientX, event.clientY);

}

function onDocumentTouchStart ( event ) {

	if ( event.touches.length == 1 ) {
	
		event.preventDefault();
		snowView.setMouse(event.touches[ 0 ].pageX, event.touches[ 0 ].pageY);
	
	}
}

function onDocumentTouchMove ( event ) {

	if ( event.touches.length == 1 ) {
		
		event.preventDefault();
		snowView.setMouse(event.touches[ 0 ].pageX, event.touches[ 0 ].pageY);
		
	}
}	
function loop() {
	
	snowView.update()

	stats.update();
}
