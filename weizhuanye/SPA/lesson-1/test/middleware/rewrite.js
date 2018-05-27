/*
*   重写校验
* */
function rewrite(options) {
    let rules = options.rules || [];
    rules.forEach(function (it) {
        let target = it.target;
        if (typeof target !== 'function') {
            it.target = function () {
                return target;
            }
        }

        let matcher = it.matcher;
        if (typeof matcher === 'function') {
            return;
        }
        if (typeof matcher === 'string') {
            it.matcher = function () {
                return ctx.pathname === matcher;
            };
            return;
        }
        if (matcher instanceof RegExp) {
            it.matcher = function (ctx) {
                return matcher.test(ctx.pathname);
            };
        }
    });

    return function (context, next) {
        /*let ret = rules.find(function (it) {
            return it.matcher(context.request);
        });
        if (!!ret) {
            let target = ret.target(context.request);
            context.request.pathname = target;

        }*/
        if (!!context.hash) {
            let ret = rules.find(function (it) {
                return it.matcher(context.hash);
            });
            if (!!ret) {
                let target = ret.target(context.hash);
                context.hash.pathname = target;
            }
        }

        next();
    }
}