#!/bin/bash
pushd static/blog/img

rm -r av1
rm -r hevc
rm -r vp9
mkdir av1
mkdir hevc
mkdir vp9

for i in *.{mp4,m4v,webm,mov};
  do
  name=`echo "$i" | cut -d'.' -f1`
  echo "Converting ${name}"
  ffmpeg -i "$i" -map 0:v -c:v libvpx-vp9 -map "0:a?" -af aformat=channel_layouts="7.1|5.1|stereo" -c:a libopus -map "0:s?" -c:s copy -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" "./vp9/${name}.webm"
  ffmpeg -i "$i" -map 0:v -c:v libsvtav1 -g 240 -b:v 4M -svtav1-params pass=0:lookahead=42:scd=1:film-grain=0:lp=4 -preset 5 -map "0:a?" -af aformat=channel_layouts="7.1|5.1|stereo" -c:a libopus -map "0:s?" -c:s copy -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" "./av1/${name}.webm"
  ffmpeg -i "$i" -map_metadata -1 -c:a libopus -c:v libx265 -crf 24 -preset veryslow -pix_fmt yuv420p -movflags +faststart -tag:v hvc1 -vf "scale=trunc(iw/2)*2:trunc(ih/2)*2" "./hevc/${name}.mp4"
done

popd
