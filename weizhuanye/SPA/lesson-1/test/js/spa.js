/*
*   主框架
* */
!function () {
    let mws = [];
    window.spa = {
        add: function (mw) {
            if (mw instanceof Array) {
                mw.forEach(function (it) {
                    spa.add(it);
                });
                return;
            }
            if (typeof mw === 'function') {
                mws.push(mw);
            }
        },
        dispatch: function (context) {
            let index = 0,
                next = function () {
                    let mw = mws[index];
                    index++;
                    if (mw) {
                        return mw(context, next);
                    }
                };
            next();
        }
    }
}();