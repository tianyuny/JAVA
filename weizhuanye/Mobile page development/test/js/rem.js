!function(d,win){
    var e = d.documentElement,
        resize = 'orientationchange' in win ? 'orientationchange' : 'resize',
        c = 640, z = 100 / 640,
        scale = function() {
            var width = dEl.clientWidth;
            width > c && (width = c);
            e.style.fontSize = z * width + 'px';
        };
    e.addEventListener && (win.addEventListener(resize,scale,false), e.addEventListener('DOMContentLoaded',scale,false));
}(document,window);