## Matrix.org Website

# Table of Contents
- [Overview](#overview)
- [Building the Website](#building-the-website)
- [Contribution Guidelines](#contribution-guidelines)
- [Contact Us](#contact-us)

# Overview

Matrix.org is a decentralized, open standard for real-time communication which allows users to collaborate in public and private rooms over IP. Matrix's purpose is to allow users to text and call without thinking about what app or phone the other user has. 



## Building the website
To contribute or run the website locally, follow the instructions below:
1. '''
git clone https://github.com/matrix-org/matrix.org.git
cd matrix.org
'''
2. Ensure Zola is installed, otherwise install the latest version of [Zola](https://www.getzola.org)
From the root repo run the following command
```
zola serve
```

Zola will build the website and start a web server, usually at
http://127.0.0.1:1111

3. To build the website for production, run the command:
'''
zola build
'''

## Contribution Guidelines
1. Fork the reposity (https://github.com/matrix-org/matrix.org.git)
2. Clone your fork to your local computer 
3. Create a new branch and implement changes using
'''
git checkout -b <yourBranchName>
4. Submit a pull request (PR)


# Contact Us

## Community
If you have any questions about the project or your contribution, you may join the various community chats on https://matrix.to/#/#matrix.org-website:matrix.org

Before contributing, make sure the feature or bug you intend to address has already been discussed in our issue tracker
and that we are interested in reviewing and merging such a contribution.

