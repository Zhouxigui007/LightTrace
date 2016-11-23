function Vector (pX, pY) {
	this.x = pX;
	this.y = pY;

	this.getLength = function() {
		return Math.sqrt(this.x * this.x + this.y * this.y);
	};

	this.getReverse = function() {
		return new Vector((-1)*this.x, (-1)*this.y); 
	};

	this.getNormal = function() {
		return new Vector((-1)*this.y, this.x);
	};

	this.getUnitVector = function() {
		return new Vector(this.x/this.getLength(), this.y/this.getLength());
	};

	this.multiply = function(pA) {
		return new Vector(pA * this.x, pA * this.y);
	};

	this.reflectThroughLine = function (pLineSegment) {
		var vLineSegment = new LineSegment({x:0, y:0}, {x:this.x, y:this.y});
		return vLineSegment.getReflectThroughAxis(pLineSegment).toVector();
	};

	this.getAngleWithVector = function(pV){
		a = Math.acos(this.getUnitVector().dotProduct(pV.getUnitVector()));
    	return rad2degree(a);
	};

	this.dotProduct = function(pV){
		return this.x * pV.x + this.y * pV.y;
	};
}