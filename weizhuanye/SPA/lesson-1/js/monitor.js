// URL变化触发器
function Monitor(opt) {
    opt = opt || {};
    let last = null;

    let runURLCheck = function () {
        let url = location.href;
        if (url !== last) {
            let e = {
                oldValue: last,
                newValue: url
            };
            last = url;
            if (typeof opt.onchange === 'function') {
                opt.onchange(e);
            }
        }
    };

    window.onhashchange = runURLCheck;
}