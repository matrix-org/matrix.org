Jekyll converts markdown and reStructuredText and other text to .htmk using templates

To generate, run jekyll build and posts in ./_posts will be generated into ./_site

add_anchors.py is a script that will add anchors before any <h1/h2/h3/h4/h5> tags with an id="..." - this is used for things like the FAQ where we want to have anchored links to every question (and this way you don't have to manually maintain it in the source doc)

Run ./generate.sh to generate the .html AND apply the above script
