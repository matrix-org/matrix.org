for file in *.md
do
  mv "$file" "${file%.md}.mdx"
done