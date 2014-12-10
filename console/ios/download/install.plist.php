<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; echo "\n"; ?>
<?php echo '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">'; echo "\n"; ?>
<?php

$username = 'dbkr';
$password = '11d7ad76ed7471de59bd23a2d8795c6c';

$context = stream_context_create(array(
    'http' => array(
        'header'  => "Authorization: Basic " . base64_encode("$username:$password")
    )
));

$resp = json_decode(file_get_contents('http://matrix.org/jenkins/job/MatrixConsoleiOS/lastSuccessfulBuild/api/json'), false, $context);

$build = $resp['number'];

$ipaName = null;
$ipaPath = null;

for ($resp['artifacts'] as $artifact) {
    if (substr($artifact['fileName'], -4) == '.ipa') {
        $ipaName = $artifact['fileName'];
        $ipaPath = $artifact['relativePath'];
    }
}


$ipaFileName = "matrixConsole-$version-$bundleVersion-$build.ipa";
$ipaPath = "cache/$ipaFileName";

$plistFileName = "matrixConsole-$version-$bundleVersion-$build-Info.plist";
$plistPath = "cache/$plistFileName";

$iconFileName = "matrixConsole-$version-$bundleVersion-$build-icon-57x57.png";
$iconPath = "cache/$iconFileName";

$retinaIconFileName = "matrixConsole-$version-$bundleVersion-$build-icon-57x57.png";
$retinaIconPath = "cache/$retinaIconFileName";

if (!file_exists($ipaPath)) {
    file_put_contents($ipaPath, fopen("http://matrix.org/jenkins/job/MatrixConsoleiOS/$build/artifact/$ipaPath", 'r', $context));
}

if (!file_exists($plistPath)) {
    `unzip -p latest.ipa Payload/*/Info.plist > $plistPath`
}

if (!file_exists($iconPath)) {
    `unzip -p latest.ipa Payload/*/Info.plist > $plistPath`
}

$bundleVersion = `python plistget.py $plistPath CFBundleShortVersionString`
$version = `python plistget.py $plistPath CFBundleVersion`

?>
<plist version="1.0">
<dict>
	<key>items</key>
	<array>
		<dict>
			<key>assets</key>
			<array>
				<dict>
					<key>kind</key>
					<string>software-package</string>
					<key>url</key>
				<string>https://www.matrix.org/ios/download/<?php echo $plistPath; ?></string>
				</dict>
				<dict>
					<key>kind</key>
					<string>display-image</string>
					<key>needs-shine</key>
					<false/>
					<key>url</key>
					<string>https://www.matrix.org/ios/download/<?php echo $iconPath; ?></string>
				</dict>
			</array>
			<key>metadata</key>
			<dict>
				<key>bundle-identifier</key>
				<string>org.matrix.matrixConsole</string>
				<key>bundle-version</key>
				<string><?php echo $bundleVersion; ?></string>
				<key>kind</key>
				<string>software</string>
				<key>title</key>
				<string>Matrix Console <?php echo $version; ?></string>
			</dict>
		</dict>
	</array>
</dict>
</plist>
