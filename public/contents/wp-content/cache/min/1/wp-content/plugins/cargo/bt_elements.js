(function ($) {
  function btAnimateElements() {
    var winheight = $(window).height();
    var fullheight = $(document).height();
    var $elems = $(".btCounter, .btProgressBar");
    $elems.each(function () {
      $elm = $(this);
      if ($elm.isOnScreen()) {
        if ($elm.hasClass("btCounter")) {
          btAnimateCounter($elm);
        }
        if ($elm.hasClass("btProgressBar")) {
          btAnimateProgress($elm);
        }
      }
    });
  }
  function btAnimateCounter(elm) {
    var number_length = elm.data("digit-length");
    for (var i = parseInt(number_length); i > 0; i--) {
      var digit = parseInt(elm.children(".p" + i).data("digit"));
      if (digit == 0) digit = 10;
      for (var j = 0; j <= digit; j++) {
        elm
          .children(".p" + i)
          .children(".n" + j)
          .css("transform", "translateY(-" + digit * elm.height() + "px)");
      }
    }
    return !1;
  }
  function btAnimateProgress(elm) {
    elm
      .find(".btProgressAnim")
      .css(
        "transform",
        "translateX(-" +
          (100 - elm.find(".btProgressAnim").data("percentage")) +
          "%)"
      );
    return !1;
  }
  $(window).on("btload", function () {
    btAnimateElements();
    $(window).scroll(function () {
      btAnimateElements();
    });
  });
  $(window).on("btload", function () {
    $(".tabsVertical").each(function (index) {
      $(this)
        .find(".tabAccordionTitle")
        .click(function () {
          if ($(this).hasClass("on")) {
            $(this).removeClass("on").next().slideUp(250);
          } else {
            $(this)
              .closest(".tabsVertical")
              .find(".tabAccordionTitle")
              .removeClass("on");
            $(this)
              .closest(".tabsVertical")
              .find(".tabAccordionContent")
              .delay(250)
              .slideUp(250);
            $(this).addClass("on").next().slideDown(250);
          }
        });
      var open_first = $(this).data("open-first");
      if (open_first == "yes") {
        $(this).find(".tabAccordionTitle").first().click();
      }
    });
    $(".tabsHorizontal").each(function (index) {
      $(this)
        .find("ul.tabsHeader li")
        .click(function () {
          $(this).siblings().removeClass("on");
          $(this).addClass("on");
          $(this)
            .parent()
            .parent()
            .find(".tabPanes .tabPane")
            .removeClass("on");
          $(this)
            .parent()
            .parent()
            .find(".tabPanes .tabPane")
            .eq($(this).index())
            .addClass("on");
        });
      $(this).find("ul.tabsHeader li").first().click();
    });
    $(".btDropdownSelect")
      .fancySelect()
      .on("change.fs", function (e) {
        var url = $(this).parent().find(".options .selected").data("raw-value");
        if (typeof url == "undefined") {
          url = this.value;
        }
        if (url != "") window.location = url;
      });
  });
})(jQuery);
