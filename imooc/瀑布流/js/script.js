window.onload=function(){
    var warp=$('#container'),
        box=warp.children('div');
    waterfall(warp,box);
    var data = [{
        "src": "1.png",
        "title": "第一怪 竹筒当烟袋"
    }, {
        "src": "2.png",
        "title": "第二怪 草帽当锅盖"
    }, {
        "src": "3.png",
        "title": "第三怪 这边下雨那边晒"
    }, {
        "src": "4.png",
        "title": "第四怪 四季服装同穿戴"
    }, {
        "src": "5.png",
        "title": "第五怪 火车没有汽车快"
    }, {
        "src": "6.png",
        "title": "第六怪 火车不通国内通国外"
    }, {
        "src": "7.png",
        "title": "第七怪 老奶爬山比猴快"
    }, {
        "src": "8.png",
        "title": "第八怪 鞋子后面多一块"
    }, {
        "src": "9.png",
        "title": "第九怪 脚趾四季露在外"
    }, {
        "src": "10.png",
        "title": "第十怪 鸡蛋拴着卖"
    }, {
        "src": "11.png",
        "title": "第十一怪 粑粑叫饵块"
    }, {
        "src": "12.png",
        "title": "第十二怪 花生蚕豆数着卖"
    }, {
        "src": "13.png",
        "title": "第十三怪 三个蚊子一盘菜"
    }, {
        "src": "14.png",
        "title": "第十四怪 四个老鼠一麻袋"
    }, {
        "src": "15.png",
        "title": "第十五怪 树上松毛扭着卖"
    }, {
        "src": "16.png",
        "title": "第十六怪 姑娘叫老太"
    }, {
        "src": "17.png",
        "title": "第十七怪 小和尚可以谈恋爱"
    }, {
        "src": "18.png",
        "title": "第十八怪 背着娃娃谈恋爱"
    }];
    //追加图片
    $(document).scroll(function(){
       if($(this).scrollTop()+$(window).height()>=$(this).height()){
           for(var i=0; i<data.length;i++){
               warp.append('<div><a href="#"><img src="img/'
                   + data[i].src+'" alt=""><span>'+data[i].title+'</span></a></div>');
           }
           box=warp.children('div');
           waterfall(warp,box);
       }
    });
};
//瀑布流主函数
function waterfall(warp,box){
    var boxW = (box.outerWidth(true)),
        colls = Math.floor($(window).width()/boxW);
    //设置容器的宽度
    warp.width(boxW*colls);
    var boxH=[];
    for(var i=0;i<box.length;i++){
        if(i<colls){
            boxH[i] = box.eq(i).outerHeight(true);
        }else{
            //找到高度最小的div
            var minH = Math.min.apply(null,boxH);
            //找到索引
            var minI = boxH.indexOf(minH);
            //更新高度
            boxH[minI] += box.eq(i).outerHeight(true);
            boxStyle(box.eq(i),minH,box.eq(minI).position().left,i);
        }
        box.eq(i).mouseover(function(){
            $(this).css("opacity",.5);
        }).mouseout(function(){
            $(this).css("opacity",1);
        });
    }
}
var num;
//为图片设置样式
function boxStyle(box,top,left,index){
    if(num>=index) return;
    box.css({
        "position": "absolute",
        "top": top,
        "left": left,
        "opacity": 0
    }).stop().animate({
        "opacity": 1
    },1000);
    num=index;
}