window.onload = function() {
    var heartChild = document.getElementById('heartchild');
    for (var i = 0; i < 36; i++) {
        var child = document.createElement('div');
        child.style.transform = "rotatey(" + i * 10 + "deg) rotatez(44.5deg) translatex(14.8vw)";
        heartChild.appendChild(child);
    }
};