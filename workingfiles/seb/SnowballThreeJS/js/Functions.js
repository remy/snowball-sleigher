var TO_RADIANS = Math.PI/180; 

THREE.Vector3.prototype.rotateY = function(angle){
					
	cosRY = Math.cos(angle * TO_RADIANS);
	sinRY = Math.sin(angle * TO_RADIANS);
	
	var tempz = this.z;; 
	var tempx = this.x; 

	this.x= (tempx*cosRY)+(tempz*sinRY);
	this.z= (tempx*-sinRY)+(tempz*cosRY);


};

THREE.Vector3.prototype.rotateX = function(angle){
					
	cosRY = Math.cos(angle * TO_RADIANS);
	sinRY = Math.sin(angle * TO_RADIANS);
	
	var tempz = this.z;; 
	var tempy = this.y; 

	this.y= (tempy*cosRY)+(tempz*sinRY);
	this.z= (tempy*-sinRY)+(tempz*cosRY);


};



// Particle3D class

Particle3D = function (material ) {

	THREE.Particle.call( this );
	
	this.material = material instanceof Array ? material : [ material ];
	
	// define properties
	this.velocity = new THREE.Vector3(0,0,0); 
	this.gravity = new THREE.Vector3(0,0,0); 
	this.drag = 1; 
	// methods... 
	
};

Particle3D.prototype = new THREE.Particle();
Particle3D.prototype.constructor = Particle3D;

Particle3D.prototype.update = function() {
	
	this.velocity.multiplyScalar(this.drag); 
	this.velocity.addSelf(this.gravity);
	this.position.addSelf(this.velocity);

}


// SnowBall class

SnowBall = function (particleImage) {
	
	Particle3D.call(this, new THREE.ParticleBasicMaterial( {color:0xffffff, map:particleImage} ));// {}
	
	this.gravity.set(0,-1,0); 
	this.drag = 0.99; 
	
	this.scale.x = this.scale.y = 0.5; //this.enabled ? 1 : 0.3; 
	
	
}

SnowBall.prototype = new Particle3D();
SnowBall.prototype.constructor = SnowBall;

SnowBall.prototype.update = function() { 

	
	if(this.enabled) 
		Particle3D.prototype.update.call(this);
	
}



Player = function (index) {
	
}

Player.prototype = new Plane3D(); 
Player.prototype.constructor = Player; 




