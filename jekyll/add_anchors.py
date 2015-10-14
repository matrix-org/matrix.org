from sys import argv
import re

script, filename = argv

textfile = open(filename, "r")
regex = r'(<h\d id="(.*?)">)'
replacement = r'<p><a class="anchor" id="\2"></a></p>\n\1'

for line in textfile:
  print(re.sub(regex, replacement, line.rstrip()))
