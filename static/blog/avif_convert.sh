#!/bin/sh
set -euo pipefail

defaultSource="./img"
source="${1:-$defaultSource}"

mkdir -p img_avif
for i in ${source}/*.jpg ${source}/*.jpeg ${source}/*.jpe ${source}/*.png ${source}/*.PNG ${source}/*.webp; do
    basename=$(basename $i)
    filename=${basename%.*}
    [ "$filename" = "*" ] && continue
    [ -f "./img_avif/${filename}.avif" ] && continue
    echo "Processing ${basename}..."
    magick mogrify -format avif -path ./img_avif "$i"
    echo "Processed to ./img_avif/${filename}.avif..."
done
