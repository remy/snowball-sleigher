
function Vector3(x,y,z) 
{
	this.x = x; 
	this.y = y; 
	this.z = z; 
	
	this.tx = 0; 
	this.tz = 0; 
	this.cosRY = 0; 
	this.sinRY = 0; 
	
	this.rotateY = function(angle)
	{
		this.tx = this.x; 
		this.tz = this.z; 
		
		cosRY = Math.cos(angle);
		sinRY = Math.sin(angle);
		
		
		this.x= (this.tx*cosRY)+(this.tz*sinRY);
		this.z= (this.tx*-sinRY)+(this.tz*cosRY); 
		
	}
	this.reset = function(x,y,z)
	{
		this.x = x; 
		this.y = y; 
		this.z = z; 
	
	}
	
	this.plusEq = function (v)
	{
		this.x += v.x; 
		this.y += v.y; 
		this.z += v.z; 
	}
	
	this.multiplyEq = function (s)
	{
		this.x*=s; 
		this.y*=s; 
		this.z*=s; 
	
	
	}

}

function Particle3D()
{

	this.drag = 0.99; 
	this.gravity = 0.5; 
	
	this.pos = new Vector3(0,0,0); 
	this.vel = new Vector3(0,0,0); 
	this.enabled = true; 
	
	this.reset = function (newx, newy, newz, velx, vely, velz)
	{		
		this.pos.reset(newx, newy, newz); 
		this.vel.reset(velx, vely, velz); 
		this.enabled = true;
	}
	
	
	
	this.update = function() 
	{
		if(!this.enabled) return; 
	
		this.pos.plusEq(this.vel);
		this.vel.multiplyEq(this.drag);  
			
		this.vel.y+=this.gravity; 
	
	}


}