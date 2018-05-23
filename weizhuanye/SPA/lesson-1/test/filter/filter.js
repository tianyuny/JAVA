/*
*   过滤器
* */
class Filter {

    constructor(context, next, chain) {
        this._context = context;
        this._chain = chain;
        this._next = next;
    }

    chain() {
        if (this._chain) {
            this._chain();
        }
    }

    next() {
        if (this._next) {
            this._next();
        }
    }
}

// 登录校验过滤器
class AuthFilter extends Filter {

    doFilter() {
        let session = this._context.session;
        if (!session || !session.user|| !session.user.id) {
            redirect('/logion');
            return;
        }
        super.chain();
    }
}