+++
title = "Experiments with Matrix for the Purism Librem5, starring Ubports and Nheko"
path = "/blog/2017/09/28/experiments-with-matrix-on-the-purism-librem5-starring-ubports-and-nheko"

[taxonomies]
author = ["Matthew Hodgson"]
category = ["General"]
+++

<strong><em>TL;DR: If you love FOSS-friendly hardware and if you love Matrix, please <a href="https://puri.sm/shop/librem-5/">preorder a Purism Librem5 Matrix-native smartphone</a>, so we can fully bring native Matrix communication to both phones and desktop!</em></strong>

It's been just over a month since Purism announced the campaign to fund the <a href="/blog/2017/08/24/the-librem-5-from-purism-a-matrix-native-smartphone/">Matrix-native Librem5 FOSS smartphone</a> - and the campaign is doing pretty well, with 54% of its target reached as of the time of writing!  So in a shameless attempt to whet everyone's appetite and <a href="https://puri.sm/shop/librem-5/">encourage everyone to fund the remaining 50%</a>, we thought we'd share some of the experiments we've been doing with running native Matrix clients on a pure Linux phone.

Unfortunately the Librem5 doesn't exist yet, but we do happen to have an <a href="https://store.bq.com/en/ubuntu-edition-e5/">BQ Aquaris E5 Ubuntu Phone</a> hanging around - so we wondered: Is it possible to run a native desktop Matrix client like mujx's <a href="https://github.com/mujx/nheko">Nheko</a> on a Linux phone, given all the latest Qt voodoo? And just how hard is it anyway to update the Qt platform abstractions (or GTK for that matter) for a given platform?  In retrospect, we probably should have just run <a href="https://github.com/LarreaMikel/uMatriks">uMatriks</a> on it - a proper dedicated Ubuntu Touch Matrix Client, but then we wouldn't have had a useful tour of maintaining the guts of a Qt distribution on mobile :)

So the core problem of running a client like Nheko on Ubuntu Touch is that it uses lots of fun glossy stuff from Qt 5.9, whereas Ubuntu Touch is still on Qt 5.4, which is over 2 years old now.  Also, it's been written as a desktop client so needs a bit of tuning to support a 'fat-finger' mobile form factor, although this is just a simple matter of programming and is a very similar problem to ensuring the desktop app has a nice responsive design on small screen window sizes (similar to how the telegram desktop client handles it).  In the end, we focused on solving the Qt problem: building a custom Qt 5.9 for <a href="https://ubports.com">Ubports</a> (the community project who do a fantastic job of continuing Ubuntu Touch development since Canonical pulled out), while for simplicity building it on top of the current ubports distribution (which is effectively still Ubuntu 15.04).  The reason for all this Ubuntu stuff rather than using PureOS is simply that it's not far enough along, and we don't physically have a Librem5 dev kit yet to play with!

In practice, this has been a fascinating process: setting up a crosscompiler to build all of Qt5.9, and then porting the ubuntumirclient Qt Platform Abstraction to work with Qt5.9, as well as (finally) working out how to build a Qt5.9-compatible custom Maliit input context platform plugin to get the onscreen keyboard (OSK) up and running.  But we got there in the end, and it was rather fun to finally see the Nheko splash screen popping up on the Aquaris E5! :D

<img class="aligncenter size-large wp-image-2833" src="/blog/wp-content/uploads/2017/09/nheko1-768x1024.jpeg" alt="" width="432" height="768" />

There was then a bit of a nightmare to get the OSK to work, thanks to<a href="https://bugreports.qt.io/browse/QTBUG-46009"> https://bugreports.qt.io/browse/QTBUG-46009</a> causing the plugin to be silently not updated - but could then log in and the app worked great (albeit a bit slow thanks to being a debug build on the energy-efficient but slow Mediatek MT6582 SoC):
<div style="text-align: center;"><img class="size-large wp-image-2834" src="/blog/wp-content/uploads/2017/09/screenshot20170928_131924004-576x1024.png" alt="" width="288" height="512" /> <img class="size-large wp-image-2835" src="/blog/wp-content/uploads/2017/09/screenshot20170928_132210382-576x1024.png" alt="" width="288" height="512" /> <img class="size-large wp-image-2836" src="/blog/wp-content/uploads/2017/09/screenshot20170928_131057113-576x1024.png" alt="" width="288" height="512" /> <img class="size-large wp-image-2837" src="/blog/wp-content/uploads/2017/09/screenshot20170928_132238278-576x1024.png" alt="" width="288" height="512" /></div>
Now the next step here would obviously be to tweak the app properly to layout on a phone (bigger fonts; bigger buttons; resize the window to make room for the OSK; separate the Left Panel from the timeline view; etc) - but the point here was more to show a fully fledged native Matrix client running on a current Linux Phone environment and see how it feels.  And we're happy to say that it leaves us dying to get our hands on a proper Librem5 so we can work with Nheko, uMatriks, libqmatrixclient and all the other native Matrix client projects to see how we can get the best possible native client experience running in PureOS for the phone!!

Finally, there doesn't seem to be much documentation out there on how to do a heavy customisation of Ubports like this, so for the sake of posterity, here's the guide if anyone else is crazy enough to try this (or for when Ubports gets around to doing an official update to Qt 5.9 for their OS!).  A versioned copy of this lives over at <a href="https://gist.github.com/ara4n/4a4076b8fd5a61153bde6c9a0a726c72">this gist</a>.

Thanks for reading, and don't forget to preorder!

Matthew

### Recipe: Librem5 experiments with an Ubuntu Phone and Nheko

Starting point: one old BQ Aquaris E5 ubuntu phone, running some old version of Ubuntu Touch which had got completely stuck (UI only unfreezing for 2-3 seconds every 2-3 minutes).

Step one: flash to latest UBPorts image:
<ul>
  <li>Set up Ubuntu desktop as a host (as per <a href="https://docs.ubuntu.com/phone/en/devices/installing-ubuntu-for-devices">https://docs.ubuntu.com/phone/en/devices/installing-ubuntu-for-devices</a>)</li>
</ul>
<pre><code>sudo add-apt-repository ppa:ubuntu-sdk-team/ppa
sudo apt-get update
sudo apt-get install ubuntu-device-flash
sudo apt-get install phablet-tools
</code></pre>
<ul>
  <li>Grab an adb-compatible recovery image (yes, seems like the right place is someone's personal webspace...)</li>
</ul>
<pre><code>wget http://people.canonical.com/~jhm/barajas/recovery-vegetahd.img
</code></pre>
<ul>
  <li>If your Ubuntu desktop is running in a VM, make sure you have USB 2.0 or 3.0 support enabled (in Virtualbox this needs the extension pack installed). USB 1 is too slow and the flash will timeout, semi-bricking the phone.</li>
  <li>Press volume-up and power on the phone during boot to get at the bootloader. Make sure it's not plugged into USB</li>
  <li>Select fastboot</li>
  <li>Plug into USB</li>
  <li>Flash the recovery image and latest UBPorts OS:</li>
</ul>
<pre><code>sudo ubuntu-device-flash --server=http://system-image.ubports.com touch --device=vegetahd \\
                         --channel=15.04/stable --bootstrap --recovery-image=recovery-vegetahd.img \\
                         --developer-mode --password=secret
</code></pre>
<ul>
  <li>Ensure the system OS is writable. (Ubuntu Touch runs the OS partition read-only by default to protect users. In this case, you can always re-flash it if all goes wrong.)</li>
</ul>
<pre><code>sudo phablet-config writable-image
</code></pre>
<ul>
  <li>Get an SSH server running on the phone before you go insane</li>
</ul>
<pre><code>adb shell
sudo /etc/init.d/ssh start # password is as set when flashing.
</code></pre>
Step two: cross-compile latest Qt 5.9 for the phone.

Ubuntu 15.04 shipped with 5.4, which is pretty old now, and too old for nheko. Based on <a href="https://rm5248.com/cross-compile-qt-for-arm/">https://rm5248.com/cross-compile-qt-for-arm/</a>
<pre><code># grab the source for Qt5
git clone git://code.qt.io/qt/qt5.git
cd qt5
./init-repository

# grab the right dev headers (as qtubuntu needs dbus & atspi support)
ssh phablet@phone "sudo apt-get install libdbus-1-dev libatspi2.0-dev libssl-dev"

# grab a copy of the root filesystem on the phone for the cross-compile to run against.
# you could also sshfs mount or something if you could be bothered.
mkdir ~/phone
rsync -avz --exclude /proc --exclude /run --exclude /sys --exclude /dev \\
           --exclude /android --exclude /var/lib/lxc phablet@phone:/ ~/phone/system
export ROOTFS=~/phone

# install the crosscompiler.
# We probably have to use GCC 4.9 so that it can link ok against the older system libraries
# (libstdc++ etc) on Ubuntu Touch 15.04
sudo apt-get install arm-linux-gnueabihf-g++-4.9

# fix up the absolute symlinks (important!)
cd ~
git clone https://github.com/rm5248/cross-compile-tools.git
./cross-compile-tools/fixQualifiedLibraryPaths $ROOTFS /usr/bin/arm-linux-gnueabihf-g++-4.9

# define a mkspec target for armhf
cd ~/qt5
cp -a qtbase/mkspecs/linux-arm-gnueabi-g++ qtbase/mkspecs/linux-arm-gnueabihf-g++
cat &gt; qtbase/mkspecs/linux-arm-gnueabihf-g++/qmake.conf &lt;&lt;EOT
#
# qmake configuration for building with arm-linux-gnueabihf-g++
#

MAKEFILE_GENERATOR      = UNIX
CONFIG                 += incremental
QMAKE_INCREMENTAL_STYLE = sublib

include(../common/linux.conf)
include(../common/gcc-base-unix.conf)
include(../common/g++-unix.conf)

# modifications to g++.conf
QMAKE_CC                = arm-linux-gnueabihf-gcc-4.9
QMAKE_CXX               = arm-linux-gnueabihf-g++-4.9
QMAKE_LINK              = arm-linux-gnueabihf-g++-4.9
QMAKE_LINK_SHLIB        = arm-linux-gnueabihf-g++-4.9

# modifications to linux.conf
QMAKE_AR                = arm-linux-gnueabihf-ar cqs
QMAKE_OBJCOPY           = arm-linux-gnueabihf-objcopy
QMAKE_NM                = arm-linux-gnueabihf-nm -P
QMAKE_STRIP             = arm-linux-gnueabihf-strip

!host_build {'{'}
        QMAKE_INCDIR_OPENGL     = $ROOTFS/usr/include/GL
        QMAKE_LIBDIR_OPENGL     = $ROOTFS/usr/lib/arm-linux-gnueabihf
        # GCC 4.9 apparently doesn't know where its own libstdc++ headers are when cross-compiling...
        QMAKE_INCDIR            = /usr/arm-linux-gnueabihf/include/c++/4.9.3 \\
                                  /usr/arm-linux-gnueabihf/include/c++/4.9.3/arm-linux-gnueabihf
{'}'}

load(qt_config)
EOT

# build it!
./configure \\
    -v \\
    -confirm-license \\
    -prefix /opt/qt5-arm \\
    -sysroot $ROOTFS \\
    -opensource \\
    -nomake examples \\
    -nomake tests \\
    -opengl es2 \\
    -qpa ubuntumirclient \\
    -xplatform linux-arm-gnueabihf-g++ \\
    -platform linux-g++ \\
    -feature-accessibility \\
    -feature-accessibility-atspi-bridge \\
    -feature-webrtc \\
    -feature-proprietary-codecs \\
    -reduce-exports

make -j8

# go to lunch

make install
</code></pre>
If anything goes wrong, a good bet (having backed up your new mkspec target) is to git clean everything:
<pre><code>git submodule foreach --recursive "git clean -dfx"
git clean -dfx
</code></pre>
Step 3: compile qtubuntu for Ubuntu-specific Qt stuff like the integration with the Mir display server (hey, at this point it feels like we're building our very own zombie Ubuntu Touch 17.04... :/)
<pre><code># grab dev package deps
ssh phablet@phone "sudo apt-get install libubuntu-application-api-dev libudev-dev"
rsync -avz --exclude /proc --exclude /run --exclude /sys --exclude /dev \\
           --exclude /android --exclude /var/lib/lxc phablet@phone:/ ~/phone/system
~/cross-compile-tools/fixQualifiedLibraryPaths $ROOTFS /usr/bin/arm-linux-gnueabihf-g++-4.9

# grab the qtubuntu source
bzr branch lp:qtubuntu

# find an version old enough that it builds against the old mir in 15.04
bzr revert -r 345

# cherrypick patches so it builds against qt 5.9...
http://bazaar.launchpad.net/~phablet-team/qtubuntu/trunk/revision/354
http://bazaar.launchpad.net/~phablet-team/qtubuntu/trunk/revision/372
http://bazaar.launchpad.net/~phablet-team/qtubuntu/trunk/revision/394
# ...we probably need others too.

/mnt/build/qt5/qtbase/bin/qmake -spec /mnt/build/qt5/qtbase/mkspecs/linux-arm-gnueabihf-g++

# we probably should have told Qt about more pkgconfig libraries when we built it, so as to not have to do it manually here...
export PKG_CONFIG_LIBDIR=$ROOTFS/usr/lib/pkgconfig:$ROOTFS/usr/share/pkgconfig:\\
$ROOTFS/usr/lib/arm-linux-gnueabihf/pkgconfig/:$ROOTFS/opt/qt5-arm/lib/pkgconfig/
export PKG_CONFIG_SYSROOT_DIR=$ROOTFS

# might need to manually explicitify the --sysroot definitions in qt's qconfig.pri
# as otherwise QT_SYSROOT seems not to be getting picked up for reasons unknown

make -j4
cp src/ubuntumirclient/libqpa-ubuntumirclient.so $ROOTFS/opt/qt5-arm/plugins/platforms/

# Need to build our own libmaliitphabletplatforminputcontextplugin.so for onscreen keyboard, as
# you can't mix Qt platform plugins between versions - see https://bugreports.qt.io/browse/QTBUG-46009
cd
bzr branch lp:ubuntu/vivid/maliit-framework
cd maliit-framework
# add QMAKE_LFLAGS+='-lQt5Network -lGLESv2' to config.pri

# technically don't need to build all of maliit - only the platform inputcontext plugin is required
export QMAKEMODULES=/mnt/build/qt5/qtdeclarative/mkspecs/modules
/mnt/build/qt5/qtbase/bin/qmake -spec /mnt/build/qt5/qtbase/mkspecs/linux-arm-gnueabihf-g++
make -j4

# build the input-context plugin
cd input-context
# change the version of the plugin in main.cpp so that it's picked up by Qt 5.9 (the API hasn't changed;
# it's just the difference between an explicit and implicit version):
# Q_PLUGIN_METADATA(IID "org.qt-project.Qt.QPlatformInputContextFactoryInterface.5.1" FILE "maliit.json")
/mnt/build/qt5/qtbase/bin/qmake -spec /mnt/build/qt5/qtbase/mkspecs/linux-arm-gnueabihf-g++

make -j4
make install

# rsync our beautiful new Qt5.9 over to the phone, including the qtubuntu plugin
rsync -avz $ROOTFS/opt/qt5-arm root@phone:/opt/
</code></pre>
Step 4: cross-compile nheko as an experiment
<pre><code># check it out
git clone --recursive git+ssh://git@github.com/mujx/nheko
cd nheko

# define a cross-compile toolchain (https://cmake.org/Wiki/CMake_Cross_Compiling)
cat &gt; Toolchain-arm-linux-gnueabihf.cmake &lt;&lt;EOT
# this one is important
SET(CMAKE_SYSTEM_NAME Linux)
# this one not so much
SET(CMAKE_SYSTEM_VERSION 1)
# needed to get the right flavour of ARM
SET(CMAKE_SYSTEM_PROCESSOR armv7)

# specify the cross compiler
SET(CMAKE_C_COMPILER   /usr/bin/arm-linux-gnueabihf-gcc-4.9)
SET(CMAKE_CXX_COMPILER /usr/bin/arm-linux-gnueabihf-g++-4.9)

# where is the target environment
SET(CMAKE_SYSROOT  $ROOTFS)
SET(CMAKE_FIND_ROOT_PATH  $ROOTFS)

# sort out our includes...
SET(CMAKE_CXX_FLAGS "${'{'}CMAKE_CXX_FLAGS{'}'} \\
    -I$ROOTFS/usr/include/c++/4.9 \\
    -I$ROOTFS/usr/include/arm-linux-gnueabihf \\
    -I$ROOTFS/usr/include/arm-linux-gnueabihf/c++/4.9")

SET(CMAKE_EXE_LINKER_FLAGS "${'{'}CMAKE_EXE_LINKER_FLAGS{'}'} \\
  $ROOTFS/lib/arm-linux-gnueabihf/libc.so.6 \\
  $ROOTFS/usr/lib/arm-linux-gnueabihf/libm.so \\
  $ROOTFS/usr/lib/arm-linux-gnueabihf/libhybris-egl/libGLESv2.so.2")

# search for programs in the build host directories
SET(CMAKE_FIND_ROOT_PATH_MODE_PROGRAM NEVER)
# for libraries and headers in the target directories
SET(CMAKE_FIND_ROOT_PATH_MODE_LIBRARY ONLY)
SET(CMAKE_FIND_ROOT_PATH_MODE_INCLUDE ONLY)

SET(CMAKE_PREFIX_PATH $ROOTFS/opt/qt5-arm)
EOT

# grab its dependencies on the phone and sync them over to your local phone FS copy
ssh phablet@phone 'sudo apt-get install liblmdb-dev'
rsync -avz --exclude /proc --exclude /run --exclude /sys --exclude /dev \\
           --exclude /android --exclude /var/lib/lxc phablet@phone:/ ~/phone/system
~/cross-compile-tools/fixQualifiedLibraryPaths $ROOTFS /usr/bin/arm-linux-gnueabihf-g++-4.9

# gen the makefile
sudo apt-get install cmake
cmake -DLMDB_LIBRARY=$ROOTFS/usr/lib/arm-linux-gnueabihf/liblmdb.so \\
      -DCMAKE_TOOLCHAIN_FILE=`pwd`/Toolchain-arm-linux-gnueabihf.cmake \\
      -H. -Bbuild -DCMAKE_BUILD_TYPE=Release
# remove -march=native from CMakeLists.txt

# build it
VERBOSE=1 make -C build -j4

# XXX: you might need to touch the Toolchain file and then run again to pick up
# the CXX_FLAGS correctly for some reason.

# run it!
rsync -avz $ROOTFS/home/phablet/nheko phablet@phone:/home/phablet
ssh phablet@phone "export MIR_SOCKET=/run/user/32011/mir_socket;
                   ./build/nheko --desktop_file_hint=unity8"

# N.B. if debugging under gdb, use `handle SIGILL nostop`
</code></pre>
Step 5: Package nheko
<pre><code># make sure you have a manifest.json, nheko.png, nheko.apparmor and nheko.desktop.
# If you don't have an icon, the app won't show up.
# you can grab it from the matthew/mobile branch of github.com/matrix-org/nheko
click build ./
scp im.vector.nheko_0.1_all.click phablet@phone:

# install it
ssh phablet@phone pkcon install-local --allow-untrusted im.vector.nheko_0.1_all.click

# ...and then swipe down on the app listing to hopefully see the app there.
# if that doesn't work, you can manually launch it with:
ssh phablet@phone ubuntu-app-launch im.vector.nheko_nheko_0.1</code></pre>
