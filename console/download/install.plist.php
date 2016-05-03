<?php echo '<?xml version="1.0" encoding="UTF-8"?>'; echo "\n"; ?>
<?php echo '<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">'; echo "\n"; ?>
<?php

require_once('fetchbuild.inc.php');

$stream = 'master';
if (isset($_GET['dev'])) {
    $stream = 'develop';
}

if (isset($_GET['endpoint'])) {
    $stream = 'endpoint';
}

$buildInfo = fetch_ios_build($stream);
extract($buildInfo);

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
				<string>https://matrix.org/console/download/<?php echo $ipaPath; ?></string>
				</dict>
				<dict>
					<key>kind</key>
					<string>display-image</string>
					<key>needs-shine</key>
					<false/>
					<key>url</key>
					<string>https://matrix.org/console/download/<?php echo $iconPath; ?></string>
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
                <string>Matrix Console, <?php echo $stream; ?> integration <?php echo $build; ?></string>
			</dict>
		</dict>
	</array>
</dict>
</plist>
