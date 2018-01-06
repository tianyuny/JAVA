window.onload=slide;
function byId(id){
    return (typeof(id)==="string")?document.getElementById(id):id;
}
function slide(){
    var tab=byId("tab"),
        slid=byId("banner").getElementsByTagName("div"),
        len=slid.length,
        nav=byId("banner-nav").getElementsByTagName("div"),
        index=0,
        clear=null;
    //鼠标滑动到banner上方停止轮播
    tab.onmouseover=function(){
        clearInterval(clear);
    };
    //鼠标离开banner开始轮播
    tab.onmouseout=function(){
        clear=setInterval(function(){
            index++;
            if(index>=len) index=0;
            //切换图片
            switc();
        },1000);
    };
    tab.onmouseout();
    //切换图片
    function switc(){
        //隐藏所有轮播图片，清空导航class
        for(var i=0;i<len;i++){
            slid[i].style.display="none";
            nav[i].className="";
        }
        //更换图片与导航
        slid[index].style.display="block";
        nav[index].className="nav-active";
    }
    //点击导航切换
    for(var j=0;j<len;j++){
        nav[j].index=j;
        nav[j].onclick=function(){
            index=this.index;
            switc();
        }
    }
}