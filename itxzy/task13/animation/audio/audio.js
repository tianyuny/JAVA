!function(d){
    var btn = d.querySelector('.audio'),
        audio = btn.querySelector('audio') || false,
        clear = null,
        ctx = d.querySelector('canvas').getContext('2d'),
        arcStart = -Math.PI*0.5;
    if(!btn.addEventListener || !audio) return;

    function btnClassSwop(){
        btn.classList.toggle('icon-pause2');
        btn.classList.toggle('icon-play');
    }
    function drawArc(deg){
        ctx.clearRect(0,0,100,100);
        ctx.beginPath();
        ctx.strokeStyle = '#fbb435';
        ctx.lineWidth = 10;
        ctx.arc(50,50,44.5,arcStart,arcStart + deg,false);
        ctx.stroke();
    }

    audio.addEventListener('ended',function(){
        btnClassSwop();
        clearInterval(clear);
    });
    audio.addEventListener('pause',function(){
        btnClassSwop();
        clearInterval(clear);
        drawArc(Math.PI*2);
    });
    audio.addEventListener('playing',function(){
        btnClassSwop();
        drawArc(0);
        clear = setInterval(function(){
            var deg = Math.PI*2*(audio.currentTime / audio.duration);
            drawArc(deg);
        },300);
    });

    btn.addEventListener('click',function(){
        audio.paused ? audio.play() : audio.pause();
    });
}(document);