class Module {
    constructor (config) {
        this._parent = config.parent;
    }

    buildd () {
        // do somthing
        // 子类生成 this._body
    }

    show () {
        if (this._body) {
            this._parent.appendChild(this._body);
        }
    }

    refresh () {}

    hide () {
        if (this._body) {
            fragment.appendChild(this._body);
        }
    }

    destroy () {}
}

class User extends Module {

    build (options) {
        super.build(options);
        this._body = document.createElement('div');
        this._unode = document.createElement('p');
        this._body.appendChild(this._unode);
    }

    show (context) {
        super.show(context);
        let req = context.request;
        this._doUpdateUser(req.restParams.uid);
    }

    refresh (context) {
        super.refresh(context);
        let req = context.request;
        this._doUpdateUser(req.restParams.uid);
    }

    _doUpdateUser(uid) {
        this._unode.innerHTML = '<p>大家好，我是用户' + uid + '</p>';
    }
}