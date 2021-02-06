<?php

/*echo "post file";*/

/*print_r($_POST);
echo "<br>";
print_r($_FILES);*/

//1.获取上传文件对应的字典
$fileInfo = $_FILES["userFlie"];

/*print_r($fileInfo);*/

//2.获取文件名称和临时目录

$fileName = $fileInfo["name"];
$filePath = $fileInfo["tmp_name"];

//3.将文件移保存到其他目录

move_uploaded_file($filePath,iconv("UTF-8","gb2312","source/".$fileName));

?>