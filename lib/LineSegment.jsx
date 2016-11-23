/*** Class LineSegment *****************************************************************************/
function LineSegment(pA, pB){
    this.A = pA;
    this.B = pB;

    this.doIntersectWith = function(pLineSegment){

        var p = this.A;
        var p2 = this.B;

        var q = pLineSegment.A;
        var q2 = pLineSegment.B;

        var r = subtractPoints(p2, p);
        var s = subtractPoints(q2, q);

        var uNumerator = crossProduct(subtractPoints(q, p), r);
        var denominator = crossProduct(r, s);

        if (uNumerator == 0 && denominator == 0) {
            // They are coLlinear
            
            // Do they touch? (Are any of the points equal?)
            if (equalPoints(p, q) || equalPoints(p, q2) || equalPoints(p2, q) || equalPoints(p2, q2)) {
                return false;
            }
            // Do they overlap? (Are all the point differences in either direction the same sign)
            return !allEqual(
                    (q.x - p.x < 0),
                    (q.x - p2.x < 0),
                    (q2.x - p.x < 0),
                    (q2.x - p2.x < 0)) ||
                !allEqual(
                    (q.y - p.y < 0),
                    (q.y - p2.y < 0),
                    (q2.y - p.y < 0),
                    (q2.y - p2.y < 0));
        }

        if (denominator == 0) {
            // lines are paralell
            return false;
        }

        var u = uNumerator / denominator;
        var t = crossProduct(subtractPoints(q, p), s) / denominator;

        return (t > 0) && (t < 1) && (u > 0) && (u < 1);

    };

    this.isSameSide = function(pP1, pP2){
        return ((this.A.y - this.B.y)*(pP1.x - this.A.x) + (this.B.x - this.A.x)*(pP1.y - this.A.y))*
                ((this.A.y - this.B.y)*(pP2.x - this.A.x) + (this.B.x - this.A.x)*(pP2.y - this.A.y)) >= 0
    };

    this.linearTranslation = function(pV){
        var A1 = {x:this.A.x + pV.x, y:this.A.y + pV.y};
        var B1 = {x:this.B.x + pV.x, y:this.B.y + pV.y};
        return new LineSegment(A1, B1);
    };

    this.rotate = function(pP0, pAngle){
        var A1 = rotatePoint(pP0, this.A, pAngle);
        var B1 = rotatePoint(pP0, this.B, pAngle);
        return new LineSegment(A1, B1);
    };

    this.revertTranslation = function(){
        return new LineSegment(this.B, this.A);
    };

    this.getVector = function(){
        return {x: this.B.x - this.A.x, y: this.B.y - this.A.y};
    };

    this.toVector = function(){
        return new Vector(this.B.x - this.A.x, this.B.y - this.A.y);
    };

    this.getReflectThroughAxis = function(pAxis){
        var A1 = reflectPointThroughLine(this.A, pAxis);
        var B1 = reflectPointThroughLine(this.B, pAxis);
        return new LineSegment(A1, B1);
    };

    this.shortestDistanceToPolygon = function(pPointArray){
        var res = distancePoint2Line(pPointArray[0], this);
        for(var i=1;i<pPointArray.length;i++){
            var d = distancePoint2Line(pPointArray[i], this);
            if(d<res){
                res = d;
            }
        }
        return res;
    };

    this.getUnitNormalVector = function() {
        return this.getVector().getNormal().getUnitVector();
    };

    this.getLength = function(){
        return this.toVector().getLength();
    }

    this.isContainPoint = function(pP){
        var tmp = this.toVector().dotProduct(new Vector(pP.x - this.A.x, pP.y - this.A.y));
        if(tmp < 0){
            return false;
        }
        return tmp <= (this.B.x - this.A.x) * (this.B.x - this.A.x) + 
                      (this.B.y - this.A.y) * (this.B.y - this.A.y);
    };
}