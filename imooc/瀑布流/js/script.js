window.onload=function(){
    var warp=$('#container'),
        box=warp.children('div');
    waterfall(warp,box);
    //追加图片
    $(document).scroll(function(){
       if($(this).scrollTop()+$(window).height()>=$(this).height()){
           for(var i=0;i<data.length;i++){
               box.push($('<div><a href="#"><img src="img/'+data[i].src+'" alt=""><span>'+data[i].title+'</span></a></div>').get(0));
               warp.append(box.eq(box.length-1));
           }
           waterfall(warp,box);
       }
    });
    //浏览器窗口大小改变
    $(window).resize(function(){
        boxI=0;
        num=0;
        var boxW = (box.outerWidth(true)),
            colls = Math.floor($(window).width()/boxW);
        for(var i=0;i<colls;i++){
            box.eq(i).css("position", "static");
        }
        boxH=[];
        waterfall(warp,box);
        box.stop(false,true);
    });
};
//瀑布流主函数
var boxH=[];
var boxI=0;
function waterfall(warp,box){
    var boxW = (box.outerWidth(true)),
        colls = Math.floor($(window).width()/boxW);
    //设置容器的宽度
    warp.width(boxW*colls);
    for(;boxI<box.length;boxI++){
        if(boxI<colls){
            boxH[boxI] = box.eq(boxI).outerHeight(true);
        }else{
            //找到高度最小的div
            var minH = Math.min.apply(null,boxH);
            //找到索引
            var minI = boxH.indexOf(minH);
            //更新高度
            boxH[minI] += box.eq(boxI).outerHeight(true);
            boxStyle(box.eq(boxI),minH,box.eq(minI).position().left,boxI);
        }
        box.eq(boxI).mouseover(function(){
            $(this).css("opacity",.5);
        }).mouseout(function(){
            $(this).css("opacity",1);
        });
    }
}

//为图片设置样式
var num;
function boxStyle(box,top,left,index){
    if(num>=index) return;
    box.css({
        "position": "absolute",
        "top": top,
        "left": left,
        "opacity": 0
    }).stop().animate({
        "opacity": 1
    },500);
    num=index;
}
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