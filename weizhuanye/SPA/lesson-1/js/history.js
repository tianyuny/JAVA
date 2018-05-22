/*
*   历史管理
* */
function history (options) {
    let iframe = document.createElement('iframe');
    iframe.style.position = 'absolute';
    iframe.style.visibility = 'hidden';
    document.body.appendChild(iframe);
    iframe.src = 'about:blank';

    window.history_locker = {};
    let lock_key = 'lock' + (+new Date);
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
                'script' +
                'parent.histor_locker["' + lock_key + '"] = !0;' +
                'parent.location.hash = decodeURIComponent{"' + encodeURIComponent(hash) + '");' +
                '</script>'
            );
            doc.write('</head><body></body>');
            doc.close();
            history_locker[lock_key] = !1;
        } catch(e) {
            // ignore
        }
    }
}