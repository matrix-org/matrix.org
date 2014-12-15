<!DOCTYPE html>
<html>
<head>
<?php

require_once('fetchbuild.inc.php');

if (ereg('iPhone|iPad|iPod',$_SERVER['HTTP_USER_AGENT'])) {
    $url = "itms-services://?action=download-manifest&url=https://matrix.org/console/download/install.plist.php"+$_SERVER['QUERY_STRING'];
    echo '<meta http-equiv="refresh" content="0; url='.$url.'">';
}
else if (ereg('Android|android',$_SERVER['HTTP_USER_AGENT'])) {
    $buildinfo = fetch_android_build();

    //$latest = trim(file_get_contents('LATEST-android'));
    $url = "http://matrix.org/console/download/{$buildinfo['apkPath']}";
    echo '<meta http-equiv="refresh" content="0; url='.$url.'">';
}
?>
<title>Matrix Console</title>
<style>
body {
    text-align: center;
    font-family: Helvetica, Arial, sans-serif;
    font-size: 14pt;
}
</style>
</head>
<body>
<br/>
<br/>
<?php
    if (ereg('iPhone|iPad|iPod',$_SERVER['HTTP_USER_AGENT'])) {
        echo "Once the application has downloaded simply launch it as normal.";
    }
    else if (ereg('Android|android',$_SERVER['HTTP_USER_AGENT'])) {
        echo "Matrix Console is downloading.  Please check your Downloads for {$buildinfo['apkPath']} and tap on the file to install it - you may need to <a href='http://www.androidcentral.com/allow-app-installs-unknown-sources'>Allow installation of applications from unknown sources</a>";
    }
    else {
        echo "To install, please visit this page on an iOS or Android device.";
    }
?>

</body>
</html>
