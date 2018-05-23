let app = {
    start: function (options) {

        spa.add(
            [
                rest(options),
                rewrite(options),
                filter.mw,
                router(options)
            ]
        );
        filter.add(AuthFilter);

        let monitor = new Monitor({
            onchange: function (e) {
                let context = {
                    request: new URL(e.newValue)
                };
                spa.dispatch(context);
            }
        });
    }
};

app.start({
    matchers: [
        '/user/:id',
        '/group/:gid/user/:uid/'
    ],
    rules: [
        {
            matcher: /\/group\/[\d]+\/user\/[\d]+\//i,
            target: '/user/'
        }
    ],
    routes: {
        '/user/': User,
        // '/group/': Group
    }
});