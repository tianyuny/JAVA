$(function(){
    var banner=$('.banner'),
        img=banner.find('.banner_img li'),
        nav=banner.find('.banner_nav span'),
        turn=banner.find('.turn div'),
        len=nav.length,
        inde=0,
        clear=null;
    banner.mouseover(function(){ //鼠标滑动到banner停止轮播
        clearInterval(clear);
    }).mouseout(function(){  //鼠标离开banner开始轮播
        clear=setInterval(function(){
            inde++;
            if(inde>=len) inde=0;
            slide();  //图片切换
        },2000);
    }).trigger('mouseout'); //手动触发鼠标离开事件
    nav.each(function(index){  //点击导航圆点切换图片
        $(this).click(function(){
            inde=index;
            slide();
        });
    });
    turn.each(function(index){ //上一页，下一页切换
        $(this).click(function(){
            if(index){
                inde++;
                if(inde>=len) inde=0;
                slide();  //图片切换
            }else{
                inde--;
                if(inde<0) inde=len-1;
                slide();
            }
        });
    });
    function slide(){  //图片切换
        img.each(function(index){
            $(this).css('display','none'); //隐藏图片
            if(index===inde) $(this).css('display','block'); //显示图片
        });
        nav.each(function(index){
            $(this).removeClass('active');  //移除导航class
            if(index===inde) $(this).addClass('active');  //添加导航class
        });
    }

});