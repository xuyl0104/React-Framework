
window.gsp = window.gsp || {};
gsp.rtf = gsp.rtf || {};
window.mobile = {};
window.imp = window.imp || {};
window.imp.invoke = function invoke(params) {
    var iframe = document.createElement("iframe"),
        iframeUrl = "imp://" + encodeURIComponent(JSON.stringify(params));
    iframe.setAttribute("src", iframeUrl);
    document.body.appendChild(iframe);
    iframe.parentNode.removeChild(iframe);
    iframe = null
};
(function (ua, mobile) {
    mobile.os = {};
    mobile.os.webkit = !!ua.match(/WebKit\/([\d.]+)/);
    mobile.os.android = ua.match(/(Android)\s+([\d.]+)/) || ua.match(/Silk-Accelerated/) ? true : false;
    mobile.os.androidICS = mobile.os.android && ua.match(/(Android)\s4/) ? true : false;
    mobile.os.ios7 = !!ua.match(/(iPhone\sOS)\s([7_]+)/);
    mobile.os.ipad = !!ua.match(/(iPad).*OS\s([\d_]+)/);
    mobile.os.iphone = !mobile.os.ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/) ? true : false;
    mobile.os.ios = mobile.os.ipad || mobile.os.iphone;
    if (mobile.os.android && !mobile.os.webkit) mobile.os.android = false;
    if (!!window.top.imp_ios_gspatate) {
        mobile.os.ios = true
    }
    mobile.isInImp = !!ua.match(/(isInImp)/i);
    mobile.isInEMM = !!ua.match(/(emmcloud)/i);
    mobile.invoke = window.imp.invoke;
    gsp.mobile = mobile;
    gsp.mobile.iSession = {
        state: null,
        skin: null,
        getInfoCallBack: function (rtn) {
            rtn = JSON.parse(rtn);
            gsp.mobile.iSession.state = rtn.GSPState;
            gsp.mobile.iSession.skin = rtn.skin
        }
    }
})(navigator.userAgent, window.mobile);

gsp.rtf = (function (rtf, win, mobile) {
    var IMP_ADR_SVR = "com.inspur.gsp.imp.framework.plugin.GloSessionService";

    rtf.func = (function (func) {

        func.closeCurrent = function () {
            console.log("Function called!");
            if (mobile.os.ios || mobile.os.ios7) {
                var params = {
                    className: "WindowService",
                    methodName: "close"
                };
                mobile.invoke(params)
            } else if (!!window.imp) {
                window.imp.invokeAndReturn(IMP_ADR_SVR, "getClose", '{}')
            }
        };

        func.download = function (url) {
            if (!/^http/i.test(url)) {
                url = win.location.origin + url
            }

            if (mobile.os.ios || mobile.os.ios7) {
                var param = {
                    url: url,
                    fileName: ''
                };
                var params = {
                    className: "FileTransferService",
                    methodName: "download",
                    param: param
                };
                mobile.invoke(params)
            } else {
                var session = window.imp.invokeAndReturn(IMP_ADR_SVR, "downloadFile", JSON.stringify({
                    key: url
                }))
            }

            window.event.returnValue = false;
            return false
        }
        return func;
    })(rtf.func || {});

    return rtf;
})(gsp.rtf || {}, window, gsp.mobile);
