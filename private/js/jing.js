window.onload = function() {
    var wall = document.getElementById('wall');
    var photos = wall.getElementsByTagName('li');
    var haulX = -25;
    var haulY = 0;
    var parent = document.getElementById('photo');
    document.onmousedown = pcmobile; //开启PC端鼠标拖拽动画
    document.addEventListener("touchstart",androidmobile); //开启移动端触摸滑动动画
    setTimeout(function(){
            photosWallanimation(); //照片墙动画
    },1);
    for (var i = 0; i < photos.length; i++) {
        photos[i].onclick = function() {
            var bigPhoto = document.createElement('img');//创建大图片
            document.onmousedown = null; //关闭PC端鼠标拖拽动画
            document.removeEventListener("touchstart",androidmobile); //关闭移动端触摸滑动动画
            parent.innerHTML = ""; //清空大图片
            parent.appendChild(bigPhoto);
            //console.log(this.getElementsByTagName('img')[0]);
            bigPhoto.src = this.getElementsByTagName('img')[0].src;
            //bigPhoto.src = this.src.replace("0","");
            bigPhoto.className = "photos";
            height(bigPhoto,100);
            photosWallanimation2();       //照片墙回退
            bigPhoto.onclick = function() { //关闭大图片
                document.onmousedown = pcmobile; //开启PC端鼠标拖拽动画
                document.addEventListener("touchstart",androidmobile); //开启移动端触摸滑动动画
                clearTimeout(bigPhoto.move);
                height(this,0);
                photosWallanimation(); //照片墙css延时动画
            };
            //bigPhoto.addEventListener("touchstart",function(e){
                //var touch = e.touches;
                //touch[0]
            //});
        }
    }
    function pcmobile(e) { //pc端鼠标拖拽动画
        var lastX = e.clientX;
        var lastY = e.clientY;
        this.onmousemove = function (e) {
            var nowX = e.clientX;
            var nowY = e.clientY;
            minusX = nowX - lastX;
            minusY = nowY - lastY;
            haulX += minusY*(-0.2);
            haulY += minusX*0.2;
            wall.style.transform = "rotatex("+haulX+"deg) rotatey("+haulY+"deg)";
            lastX = nowX;
            lastY = nowY;
        };
        this.onmouseup = function () {
            this.onmousemove = null;
        };
        return false;
    }

    function androidmobile(e){ //移动端触摸滑动动画
        var touch = e.touches[0];
        var lastX = touch.pageX;
        var lastY = touch.pageY;
        this.addEventListener("touchmove",move);
        this.addEventListener("touchend",function end(){
            this.removeEventListener("touchmove",move);
            this.removeEventListener("touchend",end);
            //alert(0);
        });
        function move(e){
            e.preventDefault();
            var touch = e.touches[0];
            var nowX = touch.pageX;
            var nowY = touch.pageY;
            minusX = nowX - lastX;
            minusY = nowY - lastY;
            haulX += minusY*(-0.2);
            haulY += minusX*0.2;
            wall.style.transform = "rotatex("+haulX+"deg) rotatey("+haulY+"deg)";
            lastX = nowX;
            lastY = nowY;
        }
    }
    function photosWallanimation() { //照片墙css延时动画
        for (var i = 0; i < photos.length; i++) {
            photos[i].style.transform = "rotatey("+i*40+"deg) translatez(400px)";
            photos[i].style.transition = "transform 1s " +(photos.length - i - 1)*0.1+ "s";
        }
    }
    function photosWallanimation2() { //照片墙css延时动画（回退）
        for (var i = 0; i < photos.length; i++) {
            photos[i].style.transform = "rotatey(0) translatez(0)";
            photos[i].style.transition = "transform 1s " +(photos.length - i - 1)*0.1+ "s";
        }
    }
};
function height(element,newHeight) {
    var lastHeight = parseFloat(element.style.height);/*replace(/[a-z]/ig,"");*/
    var minus = newHeight - lastHeight;
    if (!lastHeight) lastHeight = 0;
    if (minus === 0) return false;
    if (minus>-1 && minus<1) {
        lastHeight = newHeight;
    } else if (minus > 0) {
        lastHeight += 0.5;
    }else if (minus < 0) {
        lastHeight -= 0.5;
    }
    element.style.height = lastHeight + "vh";
    element.move = setTimeout(function(){
        height(element,newHeight);
    },1);
}