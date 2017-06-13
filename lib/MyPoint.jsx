function MyPoint (pX, pY){
	this.x = pX;
	this.y = pY;

	this.linearTranslate = function(pV){
		return new MyPoint(this.x + pV.x, this.y + pV.y);
	};

	//pP0: rotate point
	//pAngle: rotate angle in degree
	this.rotatingPoint = function(pP0, pAngle){
	    angleRad = degree2rad(pAngle);
	    s = Math.sin(angleRad);
	    c = Math.cos(angleRad);

	    var p = {};

	    p.x = this.x - pP0.x;
	    p.y = this.y - pP0.y;

	    xnew = p.x * c - p.y * s;
	    ynew = p.x * s + p.y * c;

	    p.x = xnew + pP0.x;
	    p.y = ynew + pP0.y;

	    return new MyPoint(p.x, p.y);
	};
}