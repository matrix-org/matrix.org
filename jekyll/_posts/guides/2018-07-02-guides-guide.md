---
layout: default
categories: guides
---

<script>
    var allArticlesTableRows = {};
    //allArticlesTableRows[0].children[0].textContent

    jQuery(document).ready(function() {
        allArticlesTableRows = jQuery("table > tbody  > tr");
        allArticlesTableRows.each(row => {
            console.log(allArticlesTableRows[row].children[0].textContent)
        })
    });
</script>

# Guides Guide

## Guides Recommended by matrix.org

If you want to... | Then read...
---|---
Understand the CS API | [How to use the client-server API](https://matrix.org/docs/guides/client-server.html)
Get started with the CS API using ... |
... JavaScript |
... Python |

## All Guides

Article | Author | Topic | Community Rating
---|---|---|---
[Enter the Matrix](https://brendan.abolivier.bzh/enter-the-matrix/)|Brendan|Introduction, CS API|4.2/5
[Run your end-to-end encrypted chat server using Matrix and Riot](https://blog.cryptoaustralia.org.au/2017/03/21/run-your-end-to-end-encrypted-chat-server-matrix-riot/)|Gabor Szathmari
Gabor Szathmari|E2E, Synapse Installation and Hosting|4.2/5

[Riot Matrix from La Foresta](http://laforesta.net/riot-matrix/)
[Obtain Access Tokens from Riot](https://t2bot.io/docs/access_tokens/)