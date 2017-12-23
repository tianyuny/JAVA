window.onload = function() {
    var wall = document.getElementById('wall');
    var photos = wall.getElementsByTagName('li');
    var haulX = -25;
    var haulY = 0;
    var parent = document.getElementById('photo');
    var winWidth = window.innerWidth;
    document.onmousedown = pcmobile; //开启PC端鼠标拖拽动画
    document.addEventListener("touchstart",androidmobile); //开启移动端触摸滑动动画
    setTimeout(function(){
            photosWallanimation(); //照片墙动画
    },0);
    document.onclick = photosWallanimation; //照片墙动画
    for (var i = 0; i < photos.length; i++) {
        photos[i].onclick = function() {
            var bigPhoto = document.createElement('img');//创建大图片
            document.onmousedown = null; //关闭PC端鼠标拖拽动画
            document.removeEventListener("touchstart",androidmobile); //关闭移动端触摸滑动动画
            parent.innerHTML = ""; //清空大图片
            parent.appendChild(bigPhoto);
            bigPhoto.src = this.getElementsByTagName('img')[0].src;
            bigPhoto.className = "photos";
            height(bigPhoto,100);
            photosWallanimation2();       //照片墙回退
            bigPhotos(bigPhoto);
            function bigPhotos(bigPhoto){
                bigPhoto.onclick = function() { //关闭大图片
                    bigPhoto.style.transition = "none";
                    document.onmousedown = pcmobile; //开启PC端鼠标拖拽动画
                    document.addEventListener("touchstart",androidmobile); //开启移动端触摸滑动动画
                    clearTimeout(bigPhoto.move);
                    height(this,0);
                    photosWallanimation(); //照片墙css延时动画
                    return false;
                };
                bigPhoto.addEventListener("touchstart",function(e){
                    bigPhoto.style.transition = "none";
                    if (bigPhoto.previousSibling) {
                        if (bigPhoto.previousSibling.previousSibling) {
                            bigPhoto.previousSibling.previousSibling.remove();
                            this.style.left = winWidth/2 + "px";
                            this.style.transform = "translatex(-50%)";
                        }
                        bigPhoto.previousSibling.remove();
                    }
                    if (bigPhoto.nextSibling) {
                        if (bigPhoto.nextSibling.nextSibling) bigPhoto.nextSibling.nextSibling.remove();
                        bigPhoto.nextSibling.remove();
                    }
                    if (this.style.height !== "100vh") return false;
                    var touch = e.touches[0];
                    var lastX = touch.pageX;
                    var minusX;
                    var src = this.src;
                    var number = parseFloat(src.slice(src.length-5)); //图片编号
                    var beforeSibling = document.createElement('img');
                    var nextSibling = document.createElement('img');
                    var beforeNumber = number -1;
                    var nextNumber = number + 1;
                    this.parentNode.insertBefore(beforeSibling,this);
                    this.parentNode.appendChild(nextSibling);
                    beforeSibling.style.height = nextSibling.style.height = "100vh";
                    beforeSibling.style.position = nextSibling.style.position = "fixed";
                    beforeSibling.style.left = (-winWidth - 10) + "px";
                    nextSibling.style.right = (-winWidth + 10) + "px";
                    if (beforeNumber < 1) beforeNumber = photos.length;
                    if (nextNumber > photos.length) nextNumber = 1;
                    beforeSibling.src = "images/" + beforeNumber + ".jpg";
                    nextSibling.src = "images/" + nextNumber + ".jpg";
                    this.addEventListener("touchmove",move);
                    this.addEventListener("touchend",function end(){
                        var sibling;
                        var beforeSibling = this.previousSibling;
                        var nextSibling = this.nextSibling;
                        this.removeEventListener("touchmove",move);
                        this.removeEventListener("touchend",end);
                        if (minusX > winWidth/4) {
                            sibling = beforeSibling;
                            sibling.style.left = winWidth/2 + "px";
                            sibling.style.transform = "translatex(-50%)";
                            sibling.style.transition = "all 0.5s";
                            this.style.left = 3*winWidth + "px";
                            this.style.transition = "all 1s";
                        }
                        if (minusX<=winWidth/4 && minusX>=-winWidth/4){
                            beforeSibling.style.left = (-winWidth - 10) + "px";
                            nextSibling.style.right = (-winWidth + 10) + "px";
                            this.style.left = winWidth/2 + "px";
                            beforeSibling.style.transition = "all 0.4s";
                            nextSibling.style.transition = "all 0.4s";
                            this.style.transition = "all 0.4s";
                        }
                        if (minusX < -winWidth/4) {
                            sibling = nextSibling;
                            sibling.style.right = winWidth/2 + "px";
                            sibling.style.transform = "translatex(50%)";
                            sibling.style.transition = "all 0.5s";
                            this.style.left = -2*winWidth + "px";
                            this.style.transition = "all 1s";
                        }
                        if (sibling) bigPhotos(sibling);
                        return false;
                    },false);

                    function move(e) {
                        e.preventDefault();
                        var touch = e.touches[0];
                        var newX = touch.pageX;
                        minusX = newX - lastX;
                        beforeSibling.style.left = (minusX - winWidth - 10) + "px";
                        nextSibling.style.right = (-minusX - winWidth + 10) + "px";
                        this.style.left = (winWidth/2 + minusX) + "px";
                        return false;
                    }
                },false);
            }
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
            return false;
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