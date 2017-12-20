window.onload = function() {
    var wall = document.getElementById('wall');
    var photos = wall.getElementsByTagName('img');
    var haulX = -30;
    var haulY = 0;
    for (var i = 0; i < photos.length; i++) {
        photos[i].style.transform = "rotatey("+i*36+"deg) translatez(400px)";
        photos[i].style.transition = "transform 1s " +(photos.length - i - 1)*0.1+ "s";
    }
    document.onmousedown = function (e) {
        var lastX = e.clientX;
        var lastY = e.clientY;
        this.onmousemove = function (e) {
            var nowX = e.clientX;
            var nowY = e.clientY;
            minusX = nowX - lastX;
            minusY = nowY - lastY;
            haulX += minusY*(-0.2);
            haulY += minusX*0.2;
            wall.style.transform = "rotatex("+haulX+"deg) rotatey("+haulY+"deg)";
            lastX = nowX;
            lastY = nowY;
        };
        this.onmouseup = function () {
            document.onmousemove = null;
        };
        return false;
    };
    document.addEventListener("touchstart",function(e){
        var touch = e.touches[0];
        var lastX = touch.pageX;
        var lastY = touch.pageY;
        //alert(0);
        this.addEventListener("touchmove",move);
        this.addEventListener("touchend",function(){
            this.removeEventListener("touchmove",move);
        });
        function move(e){
            e.preventDefault();
            var touch = e.touches[0];
            var nowX = touch.pageX;
            var nowY = touch.pageY;
            minusX = nowX - lastX;
            minusY = nowY - lastY;
            haulX += minusY*(-0.2);
            haulY += minusX*0.2;
            wall.style.transform = "rotatex("+haulX+"deg) rotatey("+haulY+"deg)";
            lastX = nowX;
            lastY = nowY;

        }
    })

};
