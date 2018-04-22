!function(d){
    var btn = d.querySelector('.audio'),
        audio = btn.querySelector('audio') || false,
        clear = null,
        ctx = d.querySelector('canvas').getContext('2d'),
        arcStart = -Math.PI*0.5;
    if(!btn.addEventListener || !audio) return;

    function drawArc(deg){
        ctx.clearRect(0,0,100,100);
        ctx.beginPath();
        ctx.strokeStyle = '#fbb435';
        ctx.lineWidth = 10;
        ctx.arc(50,50,44.5,arcStart,arcStart + deg,false);
        ctx.stroke();
    }
    audio.setAttribute('src','audio/GameOver.mp3');
    audio.addEventListener('playing',function(){
        console.log('playing');
        btn.classList.add('icon-pause2');
        btn.classList.remove('icon-play');
        drawArc(0);
        clear = setInterval(function(){
            var deg = Math.PI*2*(audio.currentTime / audio.duration);
            drawArc(deg);
        },300);
    });
    audio.addEventListener('pause',function(){
        console.log('pause');
        btn.classList.remove('icon-pause2');
        btn.classList.add('icon-play');
        drawArc(0);
        clearInterval(clear);
    });

    btn.addEventListener('click',function(){
        audio.paused ? audio.play() : audio.pause();
        return false;
    });
}(document);