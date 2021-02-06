function obj2str(obj) {
    /*
        {
            "userName":"root",
            "userPwd":"123123",
            "t":"3712i9471329876498132"
        }
    */
    obj.t = new Date().getTime();

    var res = [];

    for (var key in obj){

        //encodeURIComponent()
        // 在URL中是不可以出现中文的, 如果出现了中文需要转码
        // 可以调用encodeURIComponent方法
        // URL中只可以出现字母/数字/下划线/ASCII码

        res.push(encodeURIComponent(key)+'='+ encodeURIComponent(obj[key])); // [userName = root, userPwd = 123132]

    };
    return res.join("&");  // userName = root&userPwd = 123132
}

function ajax(url,obj,timeout,success, error) {
    //0.将对象转换为字符串
    var str = obj2str(obj);

    //1.创建一个异步对象
    //2.设置请求方式和地址
    /*
        method：请求的类型；GET 或 POST
        url：文件在服务器上的位置
        async：true（异步）或 false（同步）
    */

    var xmlhttp ,timer;
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    xmlhttp.open("GET",url+"?"+str,true);

    //3.发送请求

    xmlhttp.send();

    //4.监听状态的变化

    xmlhttp.onreadystatechange = function () {
        /*
           0: 请求未初始化
           1: 服务器连接已建立
           2: 请求已接收
           3: 请求处理中
           4: 请求已完成，且响应已就绪
       */

        if (xmlhttp.readyState === 4){
            clearInterval(timer);
            // 判断是否请求成功
            if (xmlhttp.status >= 200 && xmlhttp.status < 300 || xmlhttp.status === 304){
                success(xmlhttp);
            }else{
                error(xmlhttp);
            }

        }
    }

    //判断是否超时
    if (timeout) {

        timer = setInterval(function () {
            xmlhttp.abort();
            console.log("请求超时");
            clearInterval(timer);
        },timeout)

    }

}