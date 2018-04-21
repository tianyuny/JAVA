!function(d){
    var slide = d.querySelector('.slide'),
        btn = slide.querySelector('.slide-toggle');
    btn.addEventListener('click',function(){
        d.body.classList.toggle('active');
    });
}(document);

