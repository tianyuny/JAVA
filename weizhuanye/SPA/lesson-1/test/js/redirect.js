function redirect(path) {
    const app = document.querySelector('#app');
    switch (path) {
        case '/404' :
            app.innerHTML = '非常抱歉，你要找的页面不见了';
            break;
        case '/logion' :
            app.innerHTML = '请登录';
    }
}