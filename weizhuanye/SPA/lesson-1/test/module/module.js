class Module {
    constructor (config) {
        try {
            this._parent = config.parent
        } catch(e) {
            this._parent = document.querySelector('#app');
        }
    }

    build() {
        // do somthing
    }

    show() {
        if (this._body) {
            this._parent.appendChild(this._body);
        }
    }

    refresh() {}

    hide() {
        if (this._body) {
            fragment.appendChild(this._body);
        }
    }
}

