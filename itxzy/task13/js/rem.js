!function(w,d){
    var dEl = d.documentElement,
        recalc = function(){
            var clientWidth = dEl.clientWidth;
            if(clientWidth >= 640){
                dEl.style.fontSize = '100px';
            }else{
                dEl.style.fontSize = clientWidth / 640 * 100 + 'px';
            }
        };
    w.addEventListener('resize',recalc);
    d.addEventListener('DOMContentLoaded',recalc);
}(window,document);