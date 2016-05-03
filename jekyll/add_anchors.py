from sys import argv
import re

script, filename = argv

textfile = open(filename, "r")
regex = r'(<h\d id="(.*?)">)'
regex2 = r'(<div class="section" id="(.*?)">)'

replacement = r'<p><a class="anchor" id="\2"></a></p>\n\1'

# check for <hX id="..." (used in the FAQ) and add anchors - and then check 
# for <div class="section" id="..." and add anchors (used in the spec)
for line in textfile:
  line = re.sub(regex, replacement, line.rstrip())
  print(re.sub(regex2, replacement, line.rstrip()))

