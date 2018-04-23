---
layout: project
title: Try Matrix Now!
categories: projects
---
<script type="text/javascript">
jQuery(document).ready(($) => {
  {% assign maturities = '' | split: ',' %}
  {% assign languages = '' | split: ',' %}
  {% assign licenses = '' | split: ',' %}
  {% for post in site.categories.projects %}
    {% assign maturities = maturities | push: post.maturity %}
    {% assign languages = languages | push: post.language %}
    {% assign licenses = licenses | push: post.license %}
  {% endfor %}

  /* Populate types list */
  var types = [
    ['Clients', 'client'],
    ['Servers', 'server'],
    ['Application Services', 'as'],
    ['Client SDKs', 'sdk'],
    ['Bots', 'bot'],
    ['Other', 'other']];
  types.forEach(type => {
    var item = $('<div>');
    var checkboxId = 'chk-type-' + type[1];
    item.append(
      $('<input>')
        .attr('id', checkboxId)
        .attr('type', 'checkbox')
        .attr('checked', 'checked')
    );
    item.append($('<label>').attr('for', checkboxId).text(" " + type[0]));
    $("#types-list").append(item);
  });

  /* For each type, a click event */
  $("[id^=chk-type]").click(function(a) {
    var type = a.target.id.replace("chk-type-", "");
    checkVisibility($('li.project[data-type="' + type + '"]').toArray());
  });

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
    $("#maturities-list").append(item);
  }));

  /* For each maturity, a click event */
  $("[id^=chk-maturity]").click(function(a) {
    var maturity = a.target.id.replace("chk-maturity-", "");
    checkVisibility($('li.project[data-maturity="' + maturity + '"]').toArray());
  });

  /* Populate languages list */
  var languages =  "{{ languages | uniq | join: "," }}".split(',');
  if (languages.indexOf("Unknown") === -1) languages.push("Unknown");
  languages.forEach((language => {
    if (language.length === 0) return;

    var item = $('<div>').addClass("item-language");
    var checkboxId = 'chk-language-' + language.replace(/ /g, '').replace(/\+/g, '-').replace(/\//g, '-').replace(/#/g, '-');
    item.append(
      $('<input>')
        .attr('id', checkboxId)
        .attr('type', 'checkbox')
        .attr('checked', 'checked')
    );
    item.append($('<label>').attr('for', checkboxId).text(" " + language.trim()))
    $("#languages-list").append(item);
  }));

  /* For each language, a click event */
  $("[id^=chk-language]").click(function(a) {
    var language = a.target.id.replace("chk-language-", "");
    checkVisibility($('li.project[data-language="' + language + '"]').toArray());
  });

    /* Populate licenses list */
  var licenses =  "{{ licenses | uniq | join: "," }}".split(',');
  if (licenses.indexOf("Unknown") === -1) licenses.push("Unknown");
  licenses.forEach((license => {
    if (license.length === 0) return;

    var item = $('<div>');
    var checkboxId = 'chk-license-' + license.replace(/ /g, '').replace(/\//g, '-');
    item.append(
      $('<input>')
        .attr('id', checkboxId)
        .attr('type', 'checkbox')
        .attr('checked', 'checked')
    );
    item.append($('<label>').attr('for', checkboxId).text(" " + license.trim()))
    $("#licenses-list").append(item);
  }));

  /* For each license, a click event */
  $("[id^=chk-license]").click(function(a) {
    var license = a.target.id.replace("chk-license-", "");
    checkVisibility($('li.project[data-license="' + license + '"]').toArray());
  });

  /* Missing data is classed as 'Unknown' for now */
  jQuery('li[data-language=""]').attr("data-language", "Unknown");
  jQuery('li[data-license=""]').attr("data-license", "Unknown");

  /* controls for the All/None selectors */
  $("#types-all").click(() => {
    $("[id^=chk-type]").prop("checked", true);
    checkVisibility($('li.project').toArray());
  });
  $("#types-none").click(() => {
    $("[id^=chk-type]").prop("checked", false);
    checkVisibility($('li.project').toArray());
  });
  $("#maturities-all").click(() => {
    $("[id^=chk-maturity]").prop("checked", true);
    checkVisibility($('li.project').toArray());
  });
  $("#maturities-none").click(() => {
    $("[id^=chk-maturity]").prop("checked", false);
    checkVisibility($('li.project').toArray());
  });
  $("#languages-all").click(() => {
    $("[id^=chk-language]").prop("checked", true);
    checkVisibility($('li.project').toArray());
  });
  $("#languages-none").click(() => {
    $("[id^=chk-language]").prop("checked", false);
    checkVisibility($('li.project').toArray());
  });

  $("#licenses-all").click(() => {
    $("[id^=chk-license]").prop("checked", true);
    checkVisibility($('li.project').toArray());
  });
  $("#licenses-none").click(() => {
    $("[id^=chk-license]").prop("checked", false);
    checkVisibility($('li.project').toArray());
  });

  /* Make the visibility changes on click */
  function checkVisibility(projects) {
    projects.forEach(function(project) {
      project = $(project);

      var project_type = project.data("type");
      var correct_type = $("#chk-type-" + project_type).prop("checked");
      if (! correct_type && project_type !== "") {
        project.hide(400);
        return;
      }
      var project_maturity = project.data("maturity");
      var correct_maturity = $("#chk-maturity-" + project_maturity).prop("checked");
      if (! correct_maturity && project_maturity !== "") {
        project.hide(400);
        return;
      }
      var project_language = project.data("language");
      var correct_language = $("#chk-language-" + project_language.toString()).prop("checked");
      if (! correct_language && project_language !== "") {
        project.hide(400);
        return;
      }
      var project_license = project.data("license");
      var correct_license = $("#chk-license-" + project_license.toString()).prop("checked");
      if (! correct_license && project_license !== "") {
        project.hide(400);
        return;
      }
      project.show(400);
    });
  }

  /* show contols if JS is actually available... */
  $("#controls").show();
});


</script>

<div class='font18 bold'>
To get started using Matrix, pick a client and join #matrix:matrix.org:
</div>

<p>&nbsp;</p>
<table class='bigtable'>
  <tr>
    <td class='bigproject'>
      <a href='./client/riot.html' class='font18 bold'>
        Riot
      </a><br />
      If you like glossy and feature-rich web clients, try Riot. Available <a href='./client/riot.html'>on the web</a> and as a <a href='https://riot.im/desktop.html'>desktop client</a>.<br /><br />
      <a href='./client/riot.html'>
        <img src='/docs/projects/images/riot-web-featured.png' class='featured_screenshot'>
      </a>
    </td>
    <td class='bigproject'>
      <a href='./client/riot-android.html' class='font18 bold'>
        Riot for Android and iOS
      </a><br />
      Riot is available on mobile devices<br /><br />
      <a href='./client/riot-android.html' style="float:left; padding: 10px">
        Android
        <img src='/docs/projects/images/vector-android-featured.png' class='featured_screenshot'>
      </a>
      <a href='./client/riot-ios.html' style="float:left; padding: 10px">
        iOS
        <img src='/docs/projects/images/vector-iOS-featured.png' class='featured_screenshot'>
      </a>
    </td>
    <td class='bigproject'>
      <a href='./client/weechat.html' class='font18 bold'>
        Weechat/Matrix
      </a><br />
      If you like command line clients, try the Weechat plugin.<br /><br />
      <a href='./client/weechat.html'>
        <img src='https://matrix.org/blog/wp-content/uploads/2015/04/Screen-Shot-2015-08-07-at-13.31.29-300x209.png' class='featured_screenshot'>
      </a>
    </td>
  </tr>
  <tr>
    <td class='bigproject'>
      <a href='./client/weechat.html' class='font18 bold'>
        Quaternion
      </a><br />
      A cross-platform desktop client based on Qt5.<br /><br /><br />
      <a href='./client/quaternion.html'>
        <img src='https://raw.githubusercontent.com/QMatrixClient/Quaternion/master/quaternion.png' class='featured_screenshot'>
      </a>
    </td>
    <td class='bigproject'>
      <a href='./client/nheko.html' class='font18 bold'>
        Nheko
      </a><br />
      Nheko aims to provide a native desktop app for Matrix.<br /><br />
      <a href='./client/nheko.html'>
        <img src='/docs/projects/images/nheko_thumb.png' class='featured_screenshot'>
      </a>
    </td>
    <td class='bigproject'>
      <a href='./client/fractal.html' class='font18 bold'>
        Fractal
      </a><br />
      If you're looking for a client for Gnome, try Fractal.<br /><br />
      <a href='./client/fractal.html'>
        <img src='/docs/projects/images/fractal-featured.png' class='featured_screenshot'>
      </a>
    </td>
  </tr>
</table>

<div class='font18 bold'>Let's go deeper</div>
Matrix is a whole ecosystem of matrix-enabled clients, servers, gateways, application services, bots, etc. If you'd like to learn more, this page aims to collect all known Matrix projects. To add a new one (or update an existing one), you can submit a PR to the [matrix.org](https://github.com/matrix-org/matrix.org) project on github - the existing projects can be found [here](https://github.com/matrix-org/matrix.org/tree/master/jekyll/_posts/projects) - or just let us know in the #matrix:matrix.org room.


<div id="controls" style="user-select: none; display: none;">
  <div id="types" class='control-column'>
    <div class='font18'>Project Type</div>
    <span id="types-all" style="font-size: smaller;">All</span>
    <span id="types-none" style="font-size: smaller;">None</span>
    <div id="types-list"></div>
  </div>
  <div id="maturities" class='control-column'>
    <div class='font18'>Maturity</div>
    <span id="maturities-all" style="font-size: smaller;">All</span>
    <span id="maturities-none" style="font-size: smaller;">None</span>
    <div id="maturities-list"></div>
  </div>
  <div id="languages" class='control-column'>
    <div class='font18'>Language</div>
    <span id="languages-all" style="font-size: smaller;">All</span>
    <span id="languages-none" style="font-size: smaller;">None</span>
    <br />
    <div id="languages-list" style="display: inline-table;column-count: 2;width: 400px;"></div>
  </div>
  <div id="licenses" class='control-column'>
    <div class='font18'>License</div>
    <span id="licenses-all" style="font-size: smaller;">All</span>
    <span id="licenses-none" style="font-size: smaller;">None</span>
    <div id="licenses-list"></div>
  </div>
</div>

<br clear="all" />

|

Clients
=======

<ul class='projectlist'>
  {% for post in site.categories.client reversed limit:100 %}
      <li class='project' 
        data-maturity='{{ post.maturity | replace:' ', '' }}'
        data-language='{{ post.language | replace:' ', '' | replace: '+', '-' | replace: '/', '-' | replace: '#', '-' }}'
        data-license='{{ post.license | replace:' ', '' | replace: '/', '-' }}'
        data-type='client'>
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
      <li class='project' 
        data-maturity='{{ post.maturity | replace:' ', '' }}'
        data-language='{{ post.language | replace:' ', '' | replace: '+', '-' | replace: '/', '-' | replace: '#', '-' }}'
        data-license='{{ post.license | replace:' ', '' }}'
        data-type='server'>
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
      <li class='project' 
        data-maturity='{{ post.maturity | replace:' ', '' }}'
        data-language='{{ post.language | replace:' ', '' | replace: '+', '-' | replace: '/', '-' | replace: '#', '-' }}'
        data-license='{{ post.license | replace:' ', '' }}'
        data-type='as'>
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
      <li class='project' 
        data-maturity='{{ post.maturity | replace:' ', '' }}'
        data-language='{{ post.language | replace:' ', '' | replace: '+', '-' | replace: '/', '-' | replace: '#', '-' }}'
        data-license='{{ post.license | replace:' ', '' }}'
        data-type='sdk'>
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
      <li class='project' 
        data-maturity='{{ post.maturity | replace:' ', '' }}'
        data-language='{{ post.language | replace:' ', '' | replace: '+', '-' | replace: '/', '-' | replace: '#', '-' }}'
        data-license='{{ post.license | replace:' ', '' }}'
        data-type='bot'>
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
      <li class='project' 
        data-maturity='{{ post.maturity | replace:' ', '' }}'
        data-language='{{ post.language | replace:' ', '' | replace: '+', '-' | replace: '/', '-' | replace: '#', '-' }}'
        data-license='{{ post.license | replace:' ', '' | replace: '/', '-' }}'
        data-type='other'>
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

