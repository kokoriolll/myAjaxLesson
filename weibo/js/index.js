$(function () {

    // 1.监听内容的时时输入

    $("body").delegate(".comment","propertychange input",function () {
        // 1.1判断文本框内是否为空
        if ($(".comment").val().length >0){
             $(".send").css("background","#fd8040");
             $(".send").prop("disabled",false);
        }else {
             $(".send").css("background","#FFB877");
             $(".send").prop("disabled",true);
        };

    });

    // 2.监听发布按钮的点击
    $(".send").click(function () {

        // 拿到用户输入的内容
        var $text = $(".comment").val();

        $.ajax({
            type: "get",
            url: "weibo.php",
            data: "act=add&content=" + $text,
            success: function (msg) {

                //var obj = JSON.parse(msg);
                // VM304:1 Uncaught SyntaxError: Unexpected token e in JSON at position 1
                // 因为返回值不是标准的JSON格式，所有会报错

                var obj = eval("("+msg+")");
                // 返回值没有微博内容，所以要自己添加上
                obj.content = $text;
                //console.log(obj);

                // 根据内容创建节点
                var $weibo = createEle(obj);
                // 在DOM元素中添加对象信息，方便删除修改
                $weibo.get(0).obj = obj;

                // 插入微博

                $(".messagelist-box").prepend($weibo);

                //清空文本框，恢复按钮颜色
                $(".comment").val("");
                $(".send").prop("disabled",true);
                $(".send").css("background","#FFB877");

                //判断当前页是否为6条微博，超出部分删除
                if ($(".info").length > 6){
                    $(".info:last-child").remove();
                }

                //每发布一条微博，重新获取一次页码
                getPageNum ();
            },
            error: function (xhr) {
                console.log(xhr);
                innerHTML(xhr)
            }

        });

        // 根据内容创建节点
        //var $weibo = createEle($text);

        // 插入微博

        //$(".messagelist-box").prepend($weibo);

        //清空文本框，恢复按钮颜色
        /*$(".comment").val("");
        $(".send").prop("disabled",true);
        $(".send").css("background","#FFB877");*/

    });

    var number = window.location.hash.substring(1) || 1;
    console.log(number);
    getMsgList(number);
    console.log($(".page>a"));

    function getMsgList(number) {
        $(".messagelist-box").html("")
        $.ajax({
            type: "get",
            url: "weibo.php",
            data: "act=get&page=" + number,
            success: function (msg) {
                var obj = eval("("+ msg + ")")
                /*console.log(obj);*/

                // 遍历数组，创建节点，插入微博
                $.each(obj,function (key, value) {
                    /*console.log(key);
                    console.log(value);*/
                    // 根据内容创建节点
                    var $weibo = createEle(value);
                    // 在DOM元素中添加对象信息，方便删除修改
                    $weibo.get(0).obj = value;
                    // 插入微博
                    $(".messagelist-box").append($weibo);

                })
            },
            error: function (xhr) {
                console.log(xhr);
            }
        })
    }

    // 3.监听顶踩和删除按钮

    $("body").delegate(".ding","click",function () {
        $(this).text(parseInt($(this).text()) + 1);
        var obj = $(this).parents(".info").get(0).obj;
        $.ajax({
            type: "get",
            url: "weibo.php",
            data: "act=acc&id=" + obj.id,
            success: function (msg) {
                console.log(msg);
            },
            error: function (xhr) {
                console.log(xhr.status);
            }
        });

        //weibo.php?act=acc&id=12			顶某一条数据
        //返回：{error:0}

    });

    $("body").delegate(".cai","click",function () {
        $(this).text(parseInt($(this).text())+1);
        var obj = $(this).parents(".info").get(0).obj;
        $.ajax({
            type: "get",
            url: "weibo.php",
            data: "act=ref&id=" + obj.id,
            success: function (msg) {
                console.log(msg);
            },
            error: function (xhr) {
                console.log(xhr.status);
            }
        });
    });

    $("body").delegate(".del","click",function () {
        $(this).parents(".info").remove();
        var obj = $(this).parents(".info").get(0).obj;
        $.ajax({
            type: "get",
            url: "weibo.php",
            data: "act=del&id=" + obj.id,
            success: function (msg) {
                /*console.log(msg);*/
            },
            error: function (xhr) {
                console.log(xhr.status);
            }
        });
        //重新获取当前页
        getMsgList($(".cur").html());
        /*getMsgList();*/

        getPageNum ();
    });

    // 监听页码的点击
    $("body").delegate(".page>a","click",function () {
        /*console.log(this);
        console.log($(this));
        console.log($(this).html());*/
        $(this).addClass("cur");
        $(this).siblings().removeClass("cur");
        /*getMsgList($(this).html());*/
        document.location.hash = $(this).html();
    });

    // 创建节点方法
    function createEle(obj) {
        var $weibo = $("<div class=\"info\">\n" +
            "                <p class=\"info-text\">" + obj.content +  "</p>\n" +
            "                <p class=\"info-operation\">\n" +
            "                    <span class=\"info-time\">" + formartDate(obj.time) +"</span>\n" +
            "                    <span class=\"info-handle\">\n" +
            "                        <a href=\"javascript:;\" class='ding'>"+obj.acc+"</a>\n" +
            "                        <a href=\"javascript:;\" class='cai'>"+obj.ref+"</a>\n" +
            "                        <a href=\"javascript:;\" class='del'>删除</a>\n" +
            "                    </span>\n" +
            "                </p>\n" +
            "            </div>");

        return $weibo;

    };

    // 生产时间的方法
    function formartDate(time) {
        // 因为服务器传回来的数值为毫秒，所以要*1000
        var date = new Date(time * 1000);

        var arr =  [date.getFullYear() + "-" ,
                    date.getMonth() + 1 + "-",
                    date.getDate() + " ",
                    date.getHours() + ":",
                    date.getMinutes() + ":",
                    date.getSeconds()];
        return arr.join("");
    };

    // 获取页码
    getPageNum ();
    function getPageNum() {

        //weibo.php?act=get_page_count	获取页数
        //返回：{count:页数}


        //$(".page").html("");每发获取一次页数，就重新清理一次页码。防止重复
        $(".page").html("");

        $.ajax({
            type: "get",
            url: "weibo.php",
            data: "act=get_page_count",
            success:function (msg) {
                var obj = eval("(" + msg + ")");
                for (var i = 0; i<obj.count; i++){
                    var $pageTag = $("<a href='javascript:;'>"+ (i + 1) +"</a>");
                    if(i === (number-1)){
                        $pageTag.addClass("cur");
                    }
                    $(".page").append($pageTag);
                }
            },
            error:function (xhr) {
                console.log(xhr.status);
            }
        })

    }


});
