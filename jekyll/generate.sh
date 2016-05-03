#!/bin/sh
jekyll build
python add_anchors.py _site/guides/faq.html >tmp && mv tmp _site/guides/faq.html
python add_anchors.py _site/projects/try-matrix-now.html >tmp && mv tmp _site/projects/try-matrix-now.html

