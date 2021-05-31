/*
 * @Description: lastupdate
 * @Author: minggege
 * @Date: 2021-05-31 10:53:06
 * @LastEditTime: 2021-05-31 12:17:49
 * @LastEditors: minggege
 * @FilePath: \extensions\src\common\utils.js
 */
module.exports = {
    //==封装的常用的请求范式==//
    requestDataOnline(that,url, header, successCall, finalCall) {
        that.$axios.get(url, {
            headers: header
        }).then((respose) => {
            if (successCall)
                successCall(respose.data.data)
            if (finalCall)
                finalCall()
        }).catch((respose) => {
            if (finalCall)
                finalCall()
            console.log(respose)
        })
    },
    //==从url地址中获取参数==//
    getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]);
        return "";
    },
}