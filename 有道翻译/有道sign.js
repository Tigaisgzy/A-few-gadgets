const crypto = require("crypto");
const e = 'fsdsogkndfokasodnaso'
const u = "fanyideskweb"
              , d = "webfanyi"
              , m = "client,mysticTime,product"
              , p = "1.0.0"
              , g = "web"
              , f = "fanyi.web"
              , h = 1
              , A = 1
              , v = 1
              , b = "wifi"
              , T = 0;
function _(e) {
    return crypto.createHash("md5").update(e.toString()).digest("hex")
}

function S(e, t) {
    return _(`client=${u}&mysticTime=${e}&product=${d}&key=${t}`)
}

function k(e, t) {
    const n = (new Date).getTime();
    return {
        sign: S(n, e),
        client: u,
        product: d,
        appVersion: p,
        vendor: g,
        pointParam: m,
        mysticTime: n,
        keyfrom: f,
        mid: h,
        screen: A,
        model: v,
        network: b,
        abtest: T,
        yduuid: t || "abcdefg"
    }
}

console.log(k(e))