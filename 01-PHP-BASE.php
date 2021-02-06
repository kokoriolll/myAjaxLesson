<?php


    // 1.JS中有两种注释
    // 1.1单行注释
    // 1.2多行注释
    // JS注释和PHP注释相同
    //
    /* */

    //JS中如何定义变量?
    // var num = 20;


    //PHP 中自定义变量
    // $num = 20;

    //JS中打印内容
    // console.log();

    //PHP中打印内容

    // 注意点: 后端编写的代码不能直接运行, 只能放到服务器对应的文件夹下, 通过服务器运行
    // 如何通过服务器运行: 通过ip地址找到服务器对应的文件夹, 然后再找到对应的文件运行

    // echo $num;

    //JS中如何定义集合
    // 1数组

    // var arr = [1,3,5];

    //PHP中如何定义数组

    // $arr = array(1,3,5);
    // print_r($arr);

    // 2字典(对象)

    //JS中如何定义对象

    // var dict = {'name':'lnj' , 'age':'18'};

    //PHP中如何定义对象

    //$dict = array("name"=>"lnj", "age"=>"18");
    //print_r($dict);
    //echo $dict["name"];

    // 5.JS中的分支循环语句
    // if/switch/三目/for/while

    $age = 99;


    // if语法

    /*if ($age >= 18){
        echo "成年人";
    }else {
        echo "未成年人";
    }*/


    // switch 语法


   /* switch ($age) {
        case -1:
            echo "非人类";
            break;
        case 18:
            echo "成年";
            break;
        default :
            echo "未成年";
            break;
    }*/


    // 三目语法
    /*$res = ($age >= 18) ? "成年了" : "未成年";

    echo $res;*/


    // for语法
    /*$arr = array(1,3,5);
    for ($i = 0; $i < count($arr); $i++){
        echo $arr[$i];
        echo "<BR>";
    }
    */

    //while 语法
    $arr = array(1,3,5);
    $index = 0;
    while ($index < count($arr)){
        echo $arr[$index];
        echo "<BR>";
        $index++;
    }


?>