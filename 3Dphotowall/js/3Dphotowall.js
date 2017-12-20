window.onload = function() {
    var wall = document.getElementById('wall');
    var photos = wall.getElementsByTagName('img');
    for (var i = 0; i < photos.length; i++) {
        photos[i].style.transform = "rotatey("+i*36+"deg) translatez(400px)";
        photos[i].style.transition = "transform 1s " +(photos.length - i - 1)*0.1+ "s";
    }
};