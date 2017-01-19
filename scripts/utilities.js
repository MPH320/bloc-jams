function forEach(points) {
    for (var i = 0; i < points.length; i++)
    {
        myCallback(points[i]);
    }
   
}

function myCallback(myPoint) {
    myPoint.style.opacity = 1;
    myPoint.style.transform = "scaleX(1) translateY(0)";
    myPoint.style.msTransform = "scaleX(1) translateY(0)";
    myPoint.style.WebkitTransform = "scaleX(1) translateY(0)";
}