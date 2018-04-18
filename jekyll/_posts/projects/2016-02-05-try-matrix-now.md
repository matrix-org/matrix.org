---
layout: project
title: Try Matrix Now!
categories: projects
---
<script type="text/javascript">
jQuery(document).ready(($) => {
  {% assign maturities = '' | split: ',' %}
  {% assign languages = '' | split: ',' %}
  {% for post in site.categories.projects %}
    {% assign maturities = maturities | push: post.maturity %}
    {% assign languages = languages | push: post.language %}
  {% endfor %}

  /* Populate maturities list */
  var maturities =  "{{ maturities | uniq | join: "," }}".split(',');
  maturities.forEach((maturity => {
    if (maturity.length === 0) return;

    var item = $('<div>');
    var checkboxId = 'chk-maturity-' + maturity.replace(/ /g, '');
    item.append(
      $('<input>')
        .attr('id', checkboxId)
        .attr('type', 'checkbox')
        .attr('checked', 'checked')
    );
    item.append($('<label>').attr('for', checkboxId).text(" " + maturity.trim()))
    $("#maturities").append(item);
  }));

  /* For each maturity, a click event */
  $("[id^=chk-maturity]").click(function(a) {
    var maturity = a.target.id.replace("chk-maturity-", "");
    checkVisibility($('li.project[data-maturity="' + maturity + '"]').toArray());
  });

  /* Populate languages list */
  var languages =  "{{ languages | uniq | join: "," }}".split(',');
  languages.push("Unknown");
  languages.forEach((language => {
    if (language.length === 0) return;

    var item = $('<div>');
    var checkboxId = 'chk-language-' + language.replace(/ /g, '');
    item.append(
      $('<input>')
        .attr('id', checkboxId)
        .attr('type', 'checkbox')
        .attr('checked', 'checked')
    );
    item.append($('<label>').attr('for', checkboxId).text(" " + language.trim()))
    $("#languages").append(item);
  }));

  /* For each language, a click event */
  $("[id^=chk-language]").click(function(a) {
    var language = a.target.id.replace("chk-language-", "");
    if (language === "Unknown") language = "";
    checkVisibility($('li.project[data-language="' + language + '"]').toArray());
  });

  /* Make the visibility changes */
  function checkVisibility(projects) {
    projects.forEach(function(project) {
      project = $(project);
      var project_maturity = project.data("maturity");
      var correct_maturity = $("#chk-maturity-" + project_maturity).prop("checked");
      if (! correct_maturity && project_maturity !== "") {
        project.hide(400);
        return;
      }
      var project_language = project.data("language");
      if (project_language === "") project_language = "Unknown";
      var correct_language = $("#chk-language-" + project_language.toString()).prop("checked");
      if (! correct_language && project_language !== "") {
        project.hide(400);
        return;
      }
      project.show(400);
    });
  }
});


</script>

<div class='font18'>
Matrix is a whole ecosystem of matrix-enabled clients, servers, gateways, application services, bots, etc.
</div>

|

<div class='font18 bold'>
The easiest way to get started is to pick a client that appeals and join #matrix:matrix.org:
</div>

<p>&nbsp;</p>
<table class='bigtable'>
  <tr>
    <td class='bigproject'>
      <a href='./client/weechat.html' class='font18 bold'>
        Weechat/Matrix
      </a><br />
      If you like command line clients, try the Weechat plugin.<br /><br />
      <a href='./client/weechat.html'>
        <img src='https://matrix.org/blog/wp-content/uploads/2015/04/Screen-Shot-2015-08-07-at-13.31.29-300x209.png' class='featured_screenshot'>
      </a>
    </td>
    <td class='bigproject'>
      <a href='./client/riot.html' class='font18 bold'>
        Riot
      </a><br />
      If you like glossy and feature-rich web clients, try Riot.<br /><br />
      <a href='./client/riot.html'>
        <img src='/docs/projects/images/riot-web-featured.png' class='featured_screenshot'>
      </a>
    </td>
    <td class='bigproject'>
      <a href='./client/riot-ios.html' class='font18 bold'>
        Riot iOS
      </a><br />
      You can also access Matrix on your iOS phone via Riot iOS.<br /><br />
      <a href='./client/riot-ios.html'>
        <img src='/docs/projects/images/vector-iOS-featured.png' class='featured_screenshot'>
      </a>
    </td>
    <td class='bigproject'>
      <a href='./client/riot-android.html' class='font18 bold'>
        Riot Android
      </a><br />
      Riot is also available on Android devices!<br /><br />
      <a href='./client/riot-android.html'>
        <img src='/docs/projects/images/vector-android-featured.png' class='featured_screenshot'>
      </a>
    </td>
  </tr>
</table>


This page aims to collect all known Matrix projects - if you want to add a new one (or update an existing one), you can submit a PR to the [matrix-doc](https://github.com/matrix-org/matrix.org) project on github - the existing projects can be found [here](https://github.com/matrix-org/matrix.org/tree/master/jekyll/_posts/projects) - or just let us know in the #matrix:matrix.org room.

| 

<div class='font18'>
Projects using Matrix:
</div>

* TOC
{:toc .toc}

|

<div id="controls">
  <div id="maturities" style="float:left;"></div>
  <div id="languages" style="float:left;"></div>
</div>

<br clear="all" />

|

Clients
=======

<ul class='projectlist'>
  {% for post in site.categories.client reversed limit:100 %}
      <li class='project' data-maturity='{{ post.maturity | replace:' ', '' }}' data-language='{{ post.language | replace:' ', '' }}'>
        <a href='/docs{{ BASE_PATH }}{{ post.url }}'> 
          <img class='thumbnail' src='{{ post.thumbnail }}'>
        </a>
        <br />
        <a href='/docs{{ BASE_PATH }}{{ post.url }}'>  
          {{ post.title }}
        </a><br />
        <div style='margin-bottom: 8px;'>
          {{ post.description }}
        </div> 
        Author: {{ post.author }}<br />
        Maturity: {{ post.maturity }} 
      </li>
  {% endfor %}
</ul>

|

Servers
=======

<ul class='projectlist'>
  {% for post in site.categories.server reversed limit:100 %}
      <li class='project' data-maturity='{{ post.maturity | replace:' ', '' }}' data-language='{{ post.language | replace:' ', '' }}'>
        <a href='/docs{{ BASE_PATH }}{{ post.url }}'>
          {{ post.title }}
        </a><br />
        <div style='margin-bottom: 8px;'>
          {{ post.description }}
        </div>
        Author: {{ post.author }}<br />
        Maturity: {{ post.maturity }}
      </li>
  {% endfor %}
</ul>


|

Application Services
====================

<ul class='projectlist'>
  {% for post in site.categories.as reversed limit:100 %}
      <li class='project' data-maturity='{{ post.maturity | replace:' ', '' }}' data-language='{{ post.language | replace:' ', '' }}'>
        <a href='/docs{{ BASE_PATH }}{{ post.url }}'>
          {{ post.title }}
        </a><br />
        <div style='margin-bottom: 8px;'>
          {{ post.description }}
        </div>
        Author: {{ post.author }}<br />
        Maturity: {{ post.maturity }}
      </li>
  {% endfor %}

 </ul>

|

Client SDKs
===========

<ul class='projectlist'>
  {% for post in site.categories.sdk reversed limit:100 %}
      <li class='project' data-maturity='{{ post.maturity | replace:' ', '' }}' data-language='{{ post.language | replace:' ', '' }}'>
        <a href='/docs{{ BASE_PATH }}{{ post.url }}'>
          {{ post.title }}
        </a><br />
        <div style='margin-bottom: 8px;'>
          {{ post.description }}
        </div>
        Author: {{ post.author }}<br />
        Maturity: {{ post.maturity }}
      </li>
  {% endfor %}

 </ul>

|

Bots
====

<ul class='projectlist'>
  {% for post in site.categories.bot reversed limit:100 %}
      <li class='project' data-maturity='{{ post.maturity | replace:' ', '' }}' data-language='{{ post.language | replace:' ', '' }}'>
        <a href='/docs{{ BASE_PATH }}{{ post.url }}'>
          {{ post.title }}
        </a><br />
        <div style='margin-bottom: 8px;'>
          {{ post.description }}
        </div>
        Author: {{ post.author }}<br />
        Maturity: {{ post.maturity }}
      </li>
  {% endfor %}

 </ul>

|

Other
=====

<ul class='projectlist'>
  {% for post in site.categories.other reversed limit:100 %}
      <li class='project' data-maturity='{{ post.maturity | replace:' ', '' }}' data-language='{{ post.language | replace:' ', '' }}'>
        <a href='/docs{{ BASE_PATH }}{{ post.url }}'>
          {{ post.title }}
        </a><br />
        <div style='margin-bottom: 8px;'>
          {{ post.description }}
        </div>
        Author: {{ post.author }}<br />
        Maturity: {{ post.maturity }}
      </li>
  {% endfor %}

 </ul>

