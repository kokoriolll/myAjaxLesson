<?php
//1.自定义字典保存产品信息
/*$products = array(
    "nz"=>array("title"=>"时尚女装","des"=>"人见人爱,花间花开,甜美系列","images"=>"images/1.jpg"),
    "bb"=>array("title"=>"奢华女包","des"=>"送女友,送情人,送学妹,一送一个准系列","images"=>"images/2.jpg"),
    "tx"=>array("title"=>"键盘拖鞋","des"=>"程序员专属拖鞋, 屌丝气息浓郁, 你值得拥有","images"=>"images/3.jpg")
);*/

// 2.获取到前端传递的参数
/*$name =  $_GET["name"];*/

// 3.根据前端传入的key，找到对应的字典

/*$products = $products[$name];*/

/*print_r($products);*/

// 4.将取出小字典的内容返回给前端

/*echo $products["title"];
echo "|";
echo $products["des"];
echo "|";
echo $products["images"];*/

// 执行结果中有中文, 必须在php文件顶部设置
//header("content-type:text/html; charset=utf-8");
// 如果PHP中需要返回XML数据, 也必须在PHP文件顶部设置
header("content-type:text/xml; charset=utf-8");


echo file_get_contents("10-ajax-test.xml");

?>

