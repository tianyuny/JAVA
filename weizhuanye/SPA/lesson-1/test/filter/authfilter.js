// 登录校验过滤器
class AuthFilter extends Filter {

    doFilter() {
        //let session = this._context.session;
        if (false/*!session || !session.user|| !session.user.id*/) {
            redirect('/logion');
            return;
        }
        super.next();
    }
}