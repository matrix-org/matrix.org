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
  //var maturities =  "{{ maturities | uniq | join: "," }}".split(',');

  var maturities =  "Released,Stable,Late Beta,Beta,Early Beta,Late Alpha,Alpha,Early Alpha,Not actively maintained".split(',');
  maturities.forEach((maturity => {
    if (maturity.length === 0) return;

    var item = $('<div>');
    var checkboxId = 'chk-maturity-' + maturity.replace(/ /g, '');

    var checkbox = $('<input>')
        .attr('id', checkboxId)
        .attr('type', 'checkbox');
    if (maturity !== "Not actively maintained") { checkbox.attr('checked', 'checked'); };
    
    item.append(checkbox);
    item.append($('<label>').attr('for', checkboxId).text(" " + maturity.trim()))
    $("#maturities-list").append(item);
  }));

  /* For each maturity, a click event */
  $("[id^=chk-maturity]").click(function(a) {
    var maturity = a.target.id.replace("chk-maturity-", "");
    checkVisibility($('li.project[data-maturity="' + maturity + '"]').toArray());
  });

  /* Populate languages list */
  //var languages =  "{{ languages | uniq | join: "," }}".split(',');
  var languages =  "C,C++,C++/QML,C++/Qt/QML,QML,C++/Qt,Dart,Elm,Shell,JavaScript,Python,Kotlin,Java,Perl,Go,Lisp,Lua,TypeScript,C#,Haxe,Ruby,Rust,Swift,PowerShell,Shell/Python,Playbook,Elixir,PHP,C#/Python,Objective-C".split(',');
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
  //var licenses =  "{{ licenses | uniq | join: "," }}".split(',');
  var licenses =  "AGPL-3.0-only,AGPL-3.0-or-later,AGPL3,Apache-2.0,Apache,Artistic2,BSD,EUPL,CC0-1.0,GPL-1.0-or-later,GPL3,ISC,LGPL-2.1-only,LGPL,MIT,GPL-3.0-only,Unlicense,N/A,Unknown".split(',');
  if (licenses.indexOf("Unknown") === -1) licenses.push("Unknown");
  licenses.forEach((license => {
    if (license.length === 0) return;

    var item = $('<div>');
    var checkboxId = 'chk-license-' + license.replace(/ /g, '').replace(/\//g, '-').replace(/\./g, '-');
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
  $("li.project a img").each(function(a, b) {
    console.log($(b).attr("src"));
    if ($(b).attr("src").length === 0) {
      $(b).attr("src", "/docs/projects/images/noimage.png");
      //$(b).attr("style", "opacity: 0.4;");
      $(b).css({opacity:0.5, height:"120px"})
    }
  });
  checkVisibility($('li.project').toArray());
});
</script>

# Get started

To get started using Matrix, pick a client and join [#matrix:matrix.org]. You can also check the [Matrix Clients Matrix][clients] to see more detail.

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
      <a href='./client/weechat-matrix.html' class='font18 bold'>
        Weechat/Matrix
      </a> <small style="color: red">new!</small><br />
      If you like command line clients, try this
      Weechat Matrix protocol script written in python
      <br /><br />
      <a href='./client/weechat-matrix.html'>
        <img src='https://raw.githubusercontent.com/benparsons/matrix-notes/master/twim/weechat-matrix.png' class='featured_screenshot'>
      </a>
    </td>
  </tr>
  <tr>
    <td class='bigproject'>
      <a href='./client/quaternion.html' class='font18 bold'>
        Quaternion
      </a><br />
      A cross-platform desktop client based on Qt5/QML.<br /><br />
      <a href='./client/quaternion.html'>
        <img src='https://raw.githubusercontent.com/QMatrixClient/Quaternion/master/quaternion.png' class='featured_screenshot'>
      </a>
    </td>
    <td class='bigproject'>
      <a href='./client/nheko.html' class='font18 bold'>
        Nheko
      </a><br />
      Nheko is a glossy native desktop app for Matrix, based on Qt5.<br /><br />
      <a href='./client/nheko.html'>
        <img src='/docs/projects/images/nheko_thumb.png' class='featured_screenshot'>
      </a>
    </td>
    <td class='bigproject'>
      <a href='./client/fractal.html' class='font18 bold'>
        Fractal
      </a><br />
      If you're looking for a client for GNOME, try Fractal.<br /><br />
      <a href='./client/fractal.html'>
        <img src='/docs/projects/images/fractal-featured.png' class='featured_screenshot'>
      </a>
    </td>
  </tr>
</table>

# Types of Project

|[Clients][clients]|[Bridges][bridges]|[SDKs][sdks]|[Bots][bots]|
|:---:|:---:|:---:|:---:|
|[![Clients](images/tmn-client.svg)][clients]|[![Bridges](images/tmn-bridge.svg)][bridges]|[![SDKs](images/tmn-sdk.svg)][sdks]|[![Bots](images/tmn-bot.svg)][bots]|
|to find a client, choose from the above or browse the **[Matrix Clients Matrix][clients]**|to bridge to Matrix from another platform, take a look at the **[list of bridges][bridges]**|to start developing on Matrix using an SDK, check out our **[list of SDKs][sdks]**|to find a bot to use on Matrix, look at the **[list of Bots][bots]**

# Let's go deeper

Matrix is a whole ecosystem of matrix-enabled clients, servers, gateways, application services, bots, etc. If you'd like to learn more, this page aims to collect all known Matrix projects. To add a new one (or update an existing one), you can submit a PR to the [matrix.org](https://github.com/matrix-org/matrix.org) project on github - the existing projects can be found [here](https://github.com/matrix-org/matrix.org/tree/master/jekyll/_posts/projects) - or just let us know in the #matrix:matrix.org room.


<div id="controls" style="user-select: none; display: none;">
  <div id="types" class='control-column'>
    <div class='font18'>Project Type</div>
    <span id="types-all">All</span>
    <span id="types-none">None</span>
    <div id="types-list"></div>
  </div>
  <div id="maturities" class='control-column'>
    <div class='font18'>Maturity</div>
    <span id="maturities-all">All</span>
    <span id="maturities-none">None</span>
    <div id="maturities-list"></div>
  </div>
  <div id="languages" class='control-column'>
    <div class='font18'>Language</div>
    <span id="languages-all">All</span>
    <span id="languages-none">None</span>
    <br />
    <div id="languages-list" style="display: inline-table;column-count: 2;width: 400px;"></div>
  </div>
  <div id="licenses" class='control-column'>
    <div class='font18'>License</div>
    <span id="licenses-all">All</span>
    <span id="licenses-none">None</span>
    <div id="licenses-list"></div>
  </div>
</div>

<br clear="all" />

|

## Clients

<ul class='projectlist'>
  {% for post in site.categories.client reversed limit:100 %}
      <li class='project' 
        data-maturity='{{ post.maturity | replace:' ', '' }}'
        data-language='{{ post.language | replace:' ', '' | replace: '+', '-' | replace: '/', '-' | replace: '#', '-' }}'
        data-license='{{ post.license | replace:' ', '' | replace: '/', '-'| replace: '.', '-' }}'
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

## Servers

<ul class='projectlist'>
  {% for post in site.categories.server reversed limit:100 %}
      <li class='project' 
        data-maturity='{{ post.maturity | replace:' ', '' }}'
        data-language='{{ post.language | replace:' ', '' | replace: '+', '-' | replace: '/', '-' | replace: '#', '-' }}'
        data-license='{{ post.license | replace:' ', '' | replace: '/', '-'| replace: '.', '-' }}'
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

## Client SDKs

<ul class='projectlist'>
  {% for post in site.categories.sdk reversed limit:100 %}
      <li class='project' 
        data-maturity='{{ post.maturity | replace:' ', '' }}'
        data-language='{{ post.language | replace:' ', '' | replace: '+', '-' | replace: '/', '-' | replace: '#', '-' }}'
        data-license='{{ post.license | replace:' ', '' | replace: '/', '-'| replace: '.', '-' }}'
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

## Bots

<ul class='projectlist'>
  {% for post in site.categories.bot reversed limit:100 %}
      <li class='project' 
        data-maturity='{{ post.maturity | replace:' ', '' }}'
        data-language='{{ post.language | replace:' ', '' | replace: '+', '-' | replace: '/', '-' | replace: '#', '-' }}'
        data-license='{{ post.license | replace:' ', '' | replace: '/', '-'| replace: '.', '-' }}'
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

## Other

<ul class='projectlist'>
  {% for post in site.categories.other reversed limit:100 %}
      <li class='project' 
        data-maturity='{{ post.maturity | replace:' ', '' }}'
        data-language='{{ post.language | replace:' ', '' | replace: '+', '-' | replace: '/', '-' | replace: '#', '-' }}'
        data-license='{{ post.license | replace:' ', '' | replace: '/', '-'| replace: '.', '-' }}'
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

[#matrix:matrix.org]: https://matrix.to/#/#matrix:matrix.org
[clients]: https://matrix.org/docs/projects/clients-matrix
[bridges]: https://matrix.org/bridges
[sdks]: https://matrix.org/docs/projects/sdks
[bots]: https://matrix.org/docs/projects/bots