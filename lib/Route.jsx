/*** Class Route **************************************************************************************/
function Route(){
    this.leds = [];

    //create blank route
    for(var i=0;i<_ALL_LEDS.length;i++){
        this.leds.push(null);
    }

    this.fitness = 0;
    this.distance = 0;

    this.generateRoute = function(){
        for(var i=0;i<_ALL_LEDS.length;i++){
            this.setLed(i, _ALL_LEDS[i]);
        }
        this.leds = shuffle(this.leds);
    };

    this.setLed = function(pPosition, pLedWrapper){
        this.leds[pPosition] = pLedWrapper;
        this.fitness = 0;
        this.distance = 0;
    };

    this.getLed = function(pPosition){
        return this.leds[pPosition];
    };

    this.getFitness = function(){
        if(this.fitness == 0){
            this.fitness = 1/this.getDistance();
        }
        return this.fitness;
    };

    this.getDistance = function(){
        if(this.distance == 0){
            //loop all leds on route and calculate total distance (except distance from last to first led)
            for(var i=0;i<this.leds.length-1;i++){
                this.distance += this.leds[i].distanceTo(this.leds[i+1]);
            }
            //add distance from last LED to first LED to total distance
            this.distance += this.leds[this.leds.length - 1].distanceTo(this.leds[0]);
        }
        return this.distance;
    };

    this.isContain = function(pLedWrapper){
        for(var i=0;i<this.leds.length;i++){
            if(this.leds[i] != null && this.leds[i].id == pLedWrapper.id){
                return true;
            }
        }
        return false;
    };

    this.shiftSource = function(pInitPos){
        var tmp1 = this.leds.slice(pInitPos, this.leds.length);
        for(var i=0;i<pInitPos;i++){
            tmp1.push(this.leds[i]);
        }
        this.leds = tmp1;
    }

    this.toString = function(){
        var tmpStr = "|";
        for(var i=0;i<this.leds.length;i++){
            tmpStr += this.leds[i].center.x + ", " + this.leds[i].center.y + "|";
        }
        return tmpStr;
    };

}