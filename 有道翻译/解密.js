window = global;
const crypto = require('crypto');
const decodeKey = 'ydsecret://query/key/B*RGygVywfNBwpmBaZg*WT7SIOUP2T0C9WHMZN39j^DAdaZhAnxvGcCY6VYFwnHl'
const decodeIv = 'ydsecret://query/iv/C@lZe2YzHtZ2CYgaXKSVfsb7Y4QWHjITPPZ0nQp87fBeJ!Iv6v^6fvi2WN@bYpJ4'


function decryptAES128CBC(encryptedText, keyText, ivText) {
    if (!encryptedText)
        return null;

    function y(e) {
        return crypto.createHash("md5").update(e).digest()
    }

    // 使用'crypto'模块创建缓冲区，'alloc'方法用于分配一个新的Buffer
    const keyBuffer = Buffer.alloc(16, y(keyText));
    const ivBuffer = Buffer.alloc(16, y(ivText));

    // 创建一个解密器实例，指定算法、密钥和初始向量(IV)
    const decipher = crypto.createDecipheriv('aes-128-cbc', keyBuffer, ivBuffer);

    // 解密文本
    let decrypted = decipher.update(encryptedText, 'base64', 'utf-8');
    decrypted += decipher.final('utf-8');

    return decrypted;
}

function y(e) {
    return crypto.createHash("md5").update(e).digest()
}

function decodeData(t) {
    var decodeKey = "ydsecret://query/key/B*RGygVywfNBwpmBaZg*WT7SIOUP2T0C9WHMZN39j^DAdaZhAnxvGcCY6VYFwnHl";
    var decodeIv = "ydsecret://query/iv/C@lZe2YzHtZ2CYgaXKSVfsb7Y4QWHjITPPZ0nQp87fBeJ!Iv6v^6fvi2WN@bYpJ4";
    if (!t) return null;
    const a = Buffer.alloc(16, y(decodeKey)),
        i = Buffer.alloc(16, y(decodeIv)),
        r = crypto.createDecipheriv('aes-128-cbc', a, i);
    let s = r.update(t, 'base64', 'utf-8');
    return s += r.final('utf-8'),
        s
}
// 命令行接口
if (process.argv.length > 2) {
    const encryptedText = process.argv[2];
    console.log(decryptAES128CBC(encryptedText, decodeKey, decodeIv));
}

