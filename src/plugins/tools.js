import CryptoJS from "crypto-js";
function AESDecrypt(str) {
    var KEY = "w28Cz694s63kBYk4";
    var IV = "4kYBk36s496zC82w";
    var key = CryptoJS.enc.Utf8.parse(KEY); // 秘钥
    var iv = CryptoJS.enc.Utf8.parse(IV); //向量iv
    let encryptedHexStr = CryptoJS.enc.Hex.parse(str);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decrypted = CryptoJS.AES.decrypt(srcs, key, {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
}
const NameValueConllection = {
    pvHot: "浏览热度",
    uvHits: "访问人气",
    cltHits: "收藏人气",
    cltHot: "收藏热度",
    cartHits: "加购人气",
    cartHot: "加购热度",
}
export default { AESDecrypt, NameValueConllection }