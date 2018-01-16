$(function(){
/*
* 登录、注册*/
    var user=$('.user-re'),
        popups=$('.popups'),
        regi=popups.find('.register'),
        regiT=regi.find('.register-title button'),
        regis=regi.find('form');
    //用户登录/注册
    user.click(function(){
       //登录/注册切换
       regiFun($(this).index());
       //开启登录/注册栏
       regi.show();
       //开启弹窗模块
       popups.show();
        //登录/注册标题hover事件
        regiT.mouseover(function(){
            regiFun($(this).index());
        });
       return false;
    });
    //登录表单验证
    $('#user-enter').click(function(){
        var name=$('input[name="enter-name"]').val();
        var pass=$('input[name="enter-password"]').val();
        if(name==='11111111111'&&pass==='111111'){
            alert('登录成功')
        }else{
            $('input[name="enter-password"]').next().text('密码或用户名错误');
            return false;
        }
    });
    //登录表单输入合法验证
    $('input[name="enter-name"]').change(function(){
        var value=$(this).val();
        if(isNaN(value) || value.length!==11){
            $(this).next().text('请输入正确的邮箱或手机号');
        }
    });
    $('input[name="enter-password"]').change(function(){
        var value=$(this).val();
        if(isNaN(value) || value.length<6){
            $(this).next().text('请输入6-16位密码，区分大小写，不能使用空格！');
        }
    });
    //注册表单验证
    $('#user-log').click(function(){
        var name=$('input[name="log-name"]').val();
        var ver=$('input[name="ver"]').val();
        if(!isNaN(name)&&name.length===11&&ver==='Gyyd'){
            alert('注册成功')
        }else{
            $('input[name="ver"]').parent().next().text('注册失败');
            return false;
        }
    });
    //登录表单输入合法验证
    $('input[name="log-name"]').change(function(){
        var value=$(this).val();
        if(isNaN(value) || value.length!==11){
            $(this).next().text('请输入正确的邮箱或手机号');
        }
    });
    $('input[name="ver"]').change(function(){
        var ver=$(this).val();
        if(ver!=='Gyyd'){
            $(this).parent().next().text('验证码错误');
        }
    });
    //登录/注册样式
    function regiFun(index){
        //格式化样式
        regiT.each(function(index){
            $(this).removeClass('regi-t');
            regis.eq(index).hide();
        });
        //登录/注册标题样式
        regiT.eq(index).addClass('regi-t');
        //显示登录/注册表单
        regis.eq(index).show();
    }
    //关闭弹出层
    $('#popups-close').click(popupsClose);
    function popupsClose(){
        $('.popups-content>div').each(function(){
            $(this).hide();
        });
        popups.hide();
        //内容初始化
        $('form p').text('');
        popups.find('input[type="text"],input[type="password"]').each(function(){
           $(this).val('');
        });
    }
});
$(function(){
/*
* 轮播图*/
    var box=$('.banner-slide'),
        nav=box.find('.slide-nav span'),
        img=box.find('img'),
        len=img.length,
        index=0,
        clear=null;
    //鼠标滑动到轮播图，停止轮播
    $('.banner-slide').mouseover(function(){
        clearInterval(clear);
    //鼠标离开轮播图，开始轮播
    }).mouseout(function(){
        clear=setInterval(function(){
            ++index>=len?index=0:false;
            slide();
        },3000);
    //立即轮播
    }).trigger('mouseout');
    //幻灯片
    function slide(){
        img.each(function(index){
            $(this).removeClass('active');
            nav.eq(index).removeClass('active');
        });
        img.eq(index).addClass('active');
        nav.eq(index).addClass('active');
    }
    //上一张下一张切换
    $('.slide-turn span').click(function(){
       if($(this).index()){
           ++index>=len?index=0:false;
       }else{
           --index<0?index=len-1:false;
       }
       slide();
    });
    //导航点击事件
    nav.click(function(){
        index=$(this).index();
        slide();
    });
});
$(function(){
/*
* 商品分类菜单*/
    var comm=$('.banner-commodity'),
        content=comm.find('.list-content'),
        list=comm.find('.list-item'),
        len=list.length;
    //菜单栏hover事件绑定
    comm.find('.list li').mouseover(function(){
        //显示子菜单
        content.show()
            //鼠标离开隐藏子菜单
            .mouseout(function(){content.hide()})
            //鼠标离开菜单栏进入子菜单显示子菜单
            .mouseover(function(){$(this).show()});
        //遍历隐藏所有子条目
        list.each(function(){
            $(this).hide();
        });
        //显示指定子条目
        list.eq($(this).index()).show();
    //鼠标离开菜单栏隐藏子菜单
    }).mouseout(function(){content.hide()});
});