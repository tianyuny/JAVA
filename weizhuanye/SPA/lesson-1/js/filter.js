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
let filters = [];

let filter = {
    add: function (ft) {
        if (ft instanceof Array) {
            ft.forEach(function (it) {
                filter.add(it);
            });
            return;
        }
        filters.push(ft);
    },
    mw: function (context, next) {
        let index = 0;
        let chain = function () {
            let Filter = filters[index++];
            if (Filter) {
                let ft = new Filter(
                    context, next, chain
                );
                ft.doFilter();
            }
        };
        chain();
    }
};

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