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

$resp = json_decode(file_get_contents('http://matrix.org/jenkins/job/MatrixConsoleiOS/lastSuccessfulBuild/api/json', false, $context), true);

$build = $resp['number'];

$ipaName = null;
$ipaPath = null;

foreach ($resp['artifacts'] as $artifact) {
    if (substr($artifact['fileName'], -4) == '.ipa') {
        #$ipaRemoteFileName = $artifact['fileName'];
        $ipaRemotePath = $artifact['relativePath'];
    }
}

$ipaFileName = "matrixConsole-build$build.ipa";
$ipaPath = "cache/$ipaFileName";

$plistFileName = "matrixConsole-build$build-Info.plist";
$plistPath = "cache/$plistFileName";

$iconFileName = "matrixConsole-build$build-icon-57x57.png";
$iconPath = "cache/$iconFileName";

//$retinaIconFileName = "matrixConsole-$version-$bundleVersion-$build-icon-57x57.png";
//$retinaIconPath = "cache/$retinaIconFileName";

if (!file_exists($ipaPath)) {
    file_put_contents($ipaPath, fopen("http://matrix.org/jenkins/job/MatrixConsoleiOS/$build/artifact/$ipaRemotePath", 'r', false, $context));
}

if (!file_exists($plistPath)) {
    `unzip -p $ipaPath Payload/*.app/Info.plist > $plistPath`;
}

if (!file_exists($iconPath)) {
    `unzip -p $ipaPath Payload/*.app/AppIcon57x57.png > $iconPath`;
}

$bundleVersion = trim(`python plistget.py $plistPath CFBundleVersion`);
$version = trim(`python plistget.py $plistPath CFBundleShortVersionString`);
$bundleId = trim(`python plistget.py $plistPath CFBundleIdentifier`);

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
				<string>https://matrix.org/console/ios/download/<?php echo $ipaPath; ?></string>
				</dict>
				<dict>
					<key>kind</key>
					<string>display-image</string>
					<key>needs-shine</key>
					<false/>
					<key>url</key>
					<string>https://matrix.org/console/ios/download/<?php echo $iconPath; ?></string>
				</dict>
			</array>
			<key>metadata</key>
			<dict>
				<key>bundle-identifier</key>
                <string><?php echo $bundleId; ?></string>
				<key>bundle-version</key>
				<string><?php echo $bundleVersion; ?></string>
				<key>kind</key>
				<string>software</string>
				<key>title</key>
                <string>Matrix Console <?php echo $version; ?> integration <?php echo $build; ?></string>
			</dict>
		</dict>
	</array>
</dict>
</plist>
