
// URL触发器 monitor
function Monitor (opt) {
    opt = opt || {};
    var last = null;

    var urnURLCheck = function () {
        var url = location.href;
        if(url !== last) {
            var e = {
                oldValue: last,
                newValue: rul
            };
            last = url;
            if (typeof opt.onchange === 'function') {
                opt.onchange(e);
            }
        }
    };

    window.setInterval(urnURLCheck, 500);
}


// 中间件
function middleware(context, next) {
    // do sometion
    // do next middleware
}

// 主框架实现 spa
!function () {
    var mws = [];
    window.spa = {
        add: function (mw) {
            if (typeof mw === 'function') {
                mws.push(mw);
            }
        },
        dispatch: function (context) {
            var i = 0,
                next = function () {
                    var mw = mws[i];
                    i++;
                    if(typeof mw === 'function') {
                        return mw(context, text);
                    }
                };
            next();
        },
        remove: function (mw) {
            var i = mws.indexOf(mw);
            if (i > 0) {
                mws.splice(i,1);
            }
        }
    }
}();

// 框架整合  整合URL触发器和中间件 app
var monitor = new Monitor({
    onchange: function (e) {
        spa.dispath({
            request: new URL(e.newValue)
        });
    }
});

// 输入解析
function rest (opt) {
    var mathchers = opt.matchers || [];
    mathchers.forEach(function (it, index, list) {
        list[index] = str2matcher(it);
    });

    function str2matcher (url) {
        var ret = {
            url: url,
            keys: []
        };
        var reg = url.replace(/:(.+?)(?=\/|$)/g, function ($, $1) {
            ret.keys.push($1);
            return '([^/]+?)';
        });
        ret.matcher = new RegExp('^' + reg + '$', gi);
        return ret;
    }

    function getParams (path) {
        var ret = {};
        mathchers.forEach(function (it) {
            var res = it.matcher.exec(path);
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
        var req = context.request;
        req.restParams = getParams(
            req.pathname
        );

        if (!!req.hash) {
            var hash = new URL(
                req.hash.substr(1),
                req.origin
            );
            context.hash = hash;
            hash.restParams = getParams(
                hash.pathname
            );
        }

        next();
    };
}

// 历史管理
function history (opt) {
    var iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.visblility = 'hidden';
    document.body.appendChild(iframe);
    iframe.src = 'about:blank';

    window.history_locker = {};
    var lock_key = 'lock-' + (+ new Date);
    function doPushHistory (hash) {
        if (!hash || history_locker[lock_key]) {
            history_locker[lock_key] = !1;
            return;
        }

        try {
            var doc = iframe.contentWindow.document;
            doc.write('<head><title>');
            doc.write(document.title);
            doc.write('</title>');
            doc.write(
                '<script>' +
                'parent.history_locker["' + locker + '"] = !0;' +
                'parent.location.hash = decodeURIComponent("' + encodeURIComponent(hash) + '");' +
                '</script>'
            );
            doc.write('</head><body></body>');
            doc.close();
            history_locker[lock_key] = !1;
        }catch(ex){

        }
    }

    return function (context, next) {
        doPushHistory(
            contex.request.hash
        );

        next();
    }
}

// 重写校验
function rewrite (opt) {
    var rules = opt.rules || [];
    rules.forEach(function (it) {
        var target = it.target;
        if (typeof target !== 'function') {
            it.target = function (ctx) {
                return target;
            }
        }

        var matcher = it.matcher;
        if (typeof matcher === 'function') {
            return;
        }
        if (typeof matcher === 'string') {
            it.matcher = function (ctx) {
                return ctx.request.pathname === matcher;
            };
            return;
        }
        if (matcher instanceof RegExp) {
            it.matcher = function (ctx) {
                return matcher.test(ctx.request.pathname);
            };
        }
        return;
    });

    return function (context, next) {
        var ret = rules.find(function (it) {
            return it.matcher(context);
        });

        if (!!ret) {
            var target = ret.target(context);
            context.request.pathname = target;
            if (!!context.hash) {
                context.hash.pathname = target;
            }
        }

        next();
    }
}

// 过滤器
class Filter {
    constructor (context, next, chain) {
        this._context = context;
        this._chain = chain;
        this._next = next;
    }

    chain () {
        if (this._chain) {
            this.chain();
        }
    }

    next () {
        if (this._next) {
            this._next();
        }
    }

    doFilter () {

    }

}

!function () {
    var filters = [];

    var filter = {
        add: function (ft) {
            if (ft instanceof Array) {
                ft.forEach(function (it) {
                    filter.add(it);
                });
                return;
            }
            filter.push(filter);
        },

        mw: function (context, next) {
            var index = 0;
            var chain = function () {
                var Filter = filters[index++];
                if (Filter) {
                    var ft = new Filter(
                        context, next, chain
                    );
                    ft.doFilter();
                }
            };
            chain();
        }
    }
}();

// 路由器
function router (opt) {
    var routes = opt.routes || {};
    var current = null;

    return function (context, next) {
        var name = context.request.pathname;
        var module = routes[name];
        if (!module) {
            redirect('/404');
            return;
        }

        next();
    }
}