/*
*   过滤器中间件
* */

!function () {
    let filters = [];

    window.filter = {
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
}();