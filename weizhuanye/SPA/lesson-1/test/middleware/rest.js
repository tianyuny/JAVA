/*
*   输入解析
* */
function rest(options) {
    let matchers = options.matchers || [];

    matchers.forEach(function (it, index, list) {
        list[index] = str2matcher(it);
    });

    function str2matcher(url) {
        let ret = {
            url: url,
            keys: []
        };
        let reg = url.replace(/:(.+?)(?=\/|$)/g, function ($, $1) {
            ret.keys.push($1);
            return '([^/]+)?';
        });
        ret.matcher = new RegExp('^' + reg + '$', 'gi');
        return ret;
    }

    function getParams(path) {
        let ret = {};
        matchers.find(function (it) {
            let res = it.matcher.exec(path);
            if (res) {
                it.keys.forEach(function (key, index) {
                    ret[key] = res[index + 1] || '';
                });
                return true;
            }
        });
        return ret;
    }

    return function (context, next) {

        /*let req = context.request;
        req.restParams = getParams(req.pathname);*/

        let req = context.request;
        if (!!req.hash) {
            let hash = new URL(
                req.hash.substr(1),
                req.origin
            );
            context.hash = hash;
            hash.restParams = getParams(hash.pathname);
        } else {
            return;
        }

        next();
    };
}