/*** Class Population *********************************************************************************/
function Population(populationSize, isInit){
    this.routes = new Array(populationSize);
    if(isInit){
        for(var i=0;i<populationSize;i++){
            var route = new Route();
            route.generateRoute();
            this.routes[i] = route;
        }
    };

    this.getFittestRoute = function(){
        var fittestRoute = this.routes[0];
        // logTerminalln("in getFittestRoute: fittestRoute = " + fittestRoute);
        for(var i=0;i<this.routes.length;i++){
            if(fittestRoute.getDistance() >= this.routes[i].getDistance()){
                fittestRoute = this.routes[i];
            }
        }
        return fittestRoute;
    };
}