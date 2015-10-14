#!/bin/sh
jekyll build
python add_anchors.py _site/faq.html >tmp && mv tmp _site/faq.html
