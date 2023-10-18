var e = require("../../@babel/runtime/helpers/interopRequireDefault").default, t = require("../../@babel/runtime/helpers/defineProperty"), a = require("../../@babel/runtime/helpers/createForOfIteratorHelper"), i = e(require("./showdown.js")), r = e(require("./html2json.js")), n = 0, d = 0;

function o(e) {
    var t = e.target.dataset.src, a = e.target.dataset.from;
    void 0 !== a && a.length > 0 && wx.previewImage({
        current: t,
        urls: this.data[a].imageUrls
    });
}

function s(e) {
    var i = e.target.dataset.from, r = e.target.dataset.idx;
    void 0 !== i && i.length > 0 && function(e, i, r, o) {
        var s, l = r.data[o];
        if (!l || 0 == l.images.length) return;
        var h, g = l.images, m = function(e, t, a, i) {
            var r, o = 0, s = 0, l = {}, h = a.data[i].view.imagePadding;
            d, e > (r = n - 2 * h) ? (s = (o = r) * t / e, l.imageWidth = o, l.imageheight = s) : (l.imageWidth = e, 
            l.imageheight = t);
            return l;
        }(e.detail.width, e.detail.height, r, o), v = g[i].index, u = "".concat(o), f = a(v.split("."));
        try {
            for (f.s(); !(h = f.n()).done; ) {
                var w = h.value;
                u += ".nodes[".concat(w, "]");
            }
        } catch (e) {
            f.e(e);
        } finally {
            f.f();
        }
        var c = u + ".width", p = u + ".height";
        r.setData((t(s = {}, c, m.imageWidth), t(s, p, m.imageheight), s));
    }(e, r, this, i);
}

wx.getSystemInfo({
    success: function(e) {
        n = e.windowWidth, d = e.windowHeight;
    }
}), module.exports = {
    wxParse: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "wxParseData", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "html", a = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : '<div class="color:red;">数据不能为空</div>', n = arguments.length > 3 ? arguments[3] : void 0, d = arguments.length > 4 ? arguments[4] : void 0, l = n, h = {};
        if ("html" == t) h = r.default.html2json(a, e); else if ("md" == t || "markdown" == t) {
            var g = new i.default.Converter(), m = g.makeHtml(a);
            h = r.default.html2json(m, e);
        }
        h.view = {}, h.view.imagePadding = 0, void 0 !== d && (h.view.imagePadding = d);
        var v = {};
        v[e] = h, l.setData(v), l.wxParseImgLoad = s, l.wxParseImgTap = o;
    },
    wxParseTemArray: function(e, t, a, i) {
        for (var r = [], n = i.data, d = null, o = 0; o < a; o++) {
            var s = n[t + o].nodes;
            r.push(s);
        }
        e = e || "wxParseTemArray", (d = JSON.parse('{"' + e + '":""}'))[e] = r, i.setData(d);
    },
    emojisInit: function() {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "", t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "/wxParse/emojis/", a = arguments.length > 2 ? arguments[2] : void 0;
        r.default.emojisInit(e, t, a);
    }
};