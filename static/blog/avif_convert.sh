#!/bin/sh
set -euo pipefail

mkdir -p img_avif

magick mogrify -format avif -path ./img_avif/ img/*.jpg
magick mogrify -format avif -path ./img_avif/ img/*.jpeg
magick mogrify -format avif -path ./img_avif/ img/*.jpe
magick mogrify -format avif -path ./img_avif/ img/*.png
magick mogrify -format avif -path ./img_avif/ img/*.PNG
magick mogrify -format avif -path ./img_avif/ img/*.webp
