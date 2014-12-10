#!/usr/bin/env python

import biplist
import sys

if len(sys.argv) < 3:
    print "Usage: plistget.py <plist file> <property>"
    sys.exit(1)

pl = biplist.readPlist(sys.argv[1])

print pl[sys.argv[2]]

