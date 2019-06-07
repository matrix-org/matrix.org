$(document).ready(function () {
    console.log("tmn-control loaded")
    console.log($("[id^=chk-language]"))
    setTimeout(() =>{
      $.getScript("/js/webflow.js");
        /* For each type, a click event */
        $("[id^=chk-type]").click(function(a) {
        var type = a.target.id.replace("chk-type-", "");
        checkVisibility($('.filterableProject[data-type="' + type + '"]').toArray());
        });
    
        /* For each maturity, a click event */
        $("[id^=chk-maturity]").click(function(a) {
        var maturity = a.target.id.replace("chk-maturity-", "");
        checkVisibility($('.filterableProject[data-maturity="' + maturity + '"]').toArray());
        });
    
        /* For each language, a click event */
        $("[id^=chk-language]").click(function(a) {
        var language = a.target.id.replace("chk-language-", "");
        checkVisibility($('.filterableProject[data-language="' + language + '"]').toArray());
        });
    
        /* For each license, a click event */
        $("[id^=chk-license]").click(function(a) {
        var license = a.target.id.replace("chk-license-", "");
        checkVisibility($('.filterableProject[data-license="' + license + '"]').toArray());
        });
        
        $("[id^=chk]").prop('checked', true);

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
    }, 1000)
    /* Make the visibility changes on click */
    window.checkVisibility = function(projects) {
        console.log("checkVisibility start")
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