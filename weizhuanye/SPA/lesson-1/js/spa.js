let mws = [];

let spa = {
    add: function (mw) {
        if (typeof mw === 'function') {
            mws.push(mw);
        }
    },
    dispath: function (context) {
        let index = 0;
        let next = function () {
            let mw = mus[index];
            index++;
            if (mw) {
                return mw(context, next);
            }
        };
        next();
    }
};