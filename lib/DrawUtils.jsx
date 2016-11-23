function addRect(routeLayer, top, left, hozLength, verLength, pRouteColor){
    var rect = routeLayer.pathItems.rectangle(top, left, hozLength, verLength);
    rect.stroked = false;
    rect.fillColor = pRouteColor;
}

function addStraightLine(pParentLayer, pRouteLayerName, pPoint1, pPoint2, pColor, pIsStroke){
    var layer = getLayer(pParentLayer, pRouteLayerName);
    layer.visible = true;
    var line = layer.pathItems.add();
    line.stroked = pIsStroke;
    if(pIsStroke){
        line.strokeColor = pColor;
    }
    line.setEntirePath([pPoint1, pPoint2]);
    if(pRouteLayerName === TSP_RAW_ROUTE_LAYER_NAME || pRouteLayerName === TSP_UCR_ROUTE_LAYER_NAME){
        layer.visible = false;
    }
}

function addPolygon(pParentLayer, pLayerName, pPointArray, pColor, pIsStroke){
    var layer = getLayer(pParentLayer, pLayerName);
    layer.visible = true;
    var path = layer.pathItems.add();
    path.stroked = pIsStroke;
    if(pIsStroke){
        path.strokeColor = pColor;
    }
    path.fillColor = pColor;
    
    path.setEntirePath(pPointArray);
    path.closed = true;
    if(pLayerName === TSP_RAW_ROUTE_LAYER_NAME || pLayerName === TSP_UCR_ROUTE_LAYER_NAME){
        layer.visible = false;
    }
}

function addPolygonFromPoints(pParentLayer, pLayerName, pPointArray, pColor, pIsStroke){
    var a = [];
    for(var i=0;i<pPointArray.length;i++){
        a.push([mm2point(pPointArray[i].x), mm2point(pPointArray[i].y)]);
    }
    addPolygon(pParentLayer, pLayerName, a, pColor, pIsStroke);
}

function addPolygonFrom2LineSegments(pParentLayer, pLayerName, pLineSegment1, pLineSegment2, pColor, pIsStroke){
    p1 = [mm2point(pLineSegment1.A.x), mm2point(pLineSegment1.A.y)];
    p2 = [mm2point(pLineSegment1.B.x), mm2point(pLineSegment1.B.y)];
    p3 = [mm2point(pLineSegment2.B.x), mm2point(pLineSegment2.B.y)];
    p4 = [mm2point(pLineSegment2.A.x), mm2point(pLineSegment2.A.y)];
    addPolygon(pParentLayer, pLayerName, [p1, p2, p3, p4], pColor, pIsStroke);
}

function addStraightLineFromLineSegment(pParentLayer, pRouteLayerName, pLineSegment, pColor, pIsStroke){
    point1 = [mm2point(pLineSegment.A.x), mm2point(pLineSegment.A.y)];
    point2 = [mm2point(pLineSegment.B.x), mm2point(pLineSegment.B.y)];
    addStraightLine(pParentLayer, pRouteLayerName, point1, point2, pColor, pIsStroke);
}

function addBound(pRect1, pRect2, pColor){
    logTerminalln("Call addBound");
    //point and center of pRect1
    var points1 = [];
    for(var i = 0;i<pRect1.pathPoints.length;i++){
        var tmp = pRect1.pathPoints[i].anchor;
        points1.push({x:point2mm(tmp[0]), y:point2mm(tmp[1])});
    }
    var center1 = {}
    center1.x = ((points1[0].x + points1[2].x)/2);
    center1.y = ((points1[0].y + points1[2].y)/2);

    //point and center of pRect2
    var points2 = [];
    for(var i = 0;i<pRect2.pathPoints.length;i++){
        var tmp = pRect2.pathPoints[i].anchor;
        points2.push({x:point2mm(tmp[0]), y:point2mm(tmp[1])});
    }
    var center2 = {}
    center2.x = ((points2[0].x + points2[2].x)/2);
    center2.y = ((points2[0].y + points2[2].y)/2);

    centerLineSegment = new LineSegment(center1, center2);
    
    var farthestPointIndex1 = [];
    if(distancePoint2Line(points1[0], centerLineSegment) > distancePoint2Line(points1[1], centerLineSegment)){
        farthestPointIndex1.push(0);
        farthestPointIndex1.push(2);
    } else {
        farthestPointIndex1.push(1);
        farthestPointIndex1.push(3);
    }

    var farthestPointIndex2 = [];
    if(distancePoint2Line(points2[0], centerLineSegment) > distancePoint2Line(points2[1], centerLineSegment)){
        farthestPointIndex2.push(0);
        farthestPointIndex2.push(2);
    } else {
        farthestPointIndex2.push(1);
        farthestPointIndex2.push(3);
    }

    for(var i=0;i<farthestPointIndex1.length;i++){
        for(var j=0;j<farthestPointIndex2.length;j++){
            if(centerLineSegment.isSameSide(points1[farthestPointIndex1[i]], points2[farthestPointIndex2[j]])){
                // addStraightLineFromLineSegment(
                //     DRAFT_LAYER_NAME, 
                //     new LineSegment((points1[farthestPointIndex1[i]]), (points2[farthestPointIndex2[j]])), 
                //     pColor);
            }
        }
    }


}