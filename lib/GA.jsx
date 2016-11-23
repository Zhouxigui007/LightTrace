/*** Class GA *****************************************************************************************/
//implement genetic algorithm
function GA(){
    this.mutationRate = 0.015;
    this.tourSize = 5;
    this.isKeepElite = true;

    this.evolvePopulation = function(pPop){
        var newPop = new Population(pPop.routes.length, false);

        var eliteOffset = 0;
        if(this.isKeepElite){
            newPop.routes[0] = pPop.getFittestRoute();
            eliteOffset = 1;
        }

        // logTerminalln("-----Start of new evolution----------");

        //crossover
        for(var i=eliteOffset;i<newPop.routes.length;i++){
            var childRoute = this.crossover(this.routeSelection(pPop), this.routeSelection(pPop));
            newPop.routes[i] = childRoute;
        }
        // logTerminalln("-----End of a crossover----------");

        //mutate
        for(var i=eliteOffset;i<newPop.routes.length;i++){
            this.mutate(newPop.routes[i]);
        }

        // logTerminalln("-----End of 1 evolution----------");

        return newPop;
    };

    this.mutate = function(pRoute){
        for(var i=0;i<pRoute.leds.length;i++){
            if(Math.random() < this.mutationRate){
                tmpLedPos = Math.floor(Math.random() * pRoute.leds.length);
                //swap 2 leds at position i and tmpLedPos
                tmpLed = pRoute.leds[tmpLedPos];
                pRoute.leds[tmpLedPos] = pRoute.leds[i];
                pRoute.leds[i] = tmpLed;
            }
        }
    };

    this.crossover = function(pRouteParent1, pRouteParent2){
        var childRoute = new Route();

        var startPos = Math.random() * pRouteParent1.leds.length;
        var endPos = Math.random() * pRouteParent2.leds.length;

        //get gene from pRouteParent1
        for(var i=0;i<childRoute.leds.length;i++){
            if(startPos < endPos && i >= startPos && i <= endPos){
                childRoute.leds[i] = pRouteParent1.leds[i];
            } else if(startPos > endPos){
                if(i >= startPos || i <= endPos){
                    childRoute.leds[i] = pRouteParent1.leds[i];
                }
            }
        }

        //get gene from pRouteParent2
        for(var i=0;i<pRouteParent2.leds.length;i++){
            if(!childRoute.isContain(pRouteParent2.leds[i])) {
                for(var j=0;j<childRoute.leds.length;j++){
                    if(childRoute.leds[j] == null){
                        childRoute.leds[j] = pRouteParent2.leds[i];
                        break;
                    }
                }
            }
        }

        return childRoute;
    };

    this.routeSelection = function(pPop){
        var tournament = new Population(this.tourSize, false);
        for(var i=0;i<this.tourSize;i++){
            var randPos = Math.floor(Math.random() * pPop.routes.length);
            tournament.routes[i] = pPop.routes[randPos];
        }
        return tournament.getFittestRoute();

    };
}