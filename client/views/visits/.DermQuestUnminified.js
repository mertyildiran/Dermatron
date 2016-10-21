window.debug = (function() {
  var i = this,
    b = Array.prototype.slice,
    d = i.console,
    h = {}, f, g, m = 9,
    c = ["error", "warn", "info", "debug", "log"],
    l = "assert clear count dir dirxml exception group groupCollapsed groupEnd profile profileEnd table time timeEnd trace".split(" "),
    j = l.length,
    a = [];
  while (--j >= 0) {
    (function(n) {
      h[n] = function() {
        m !== 0 && d && d[n] && d[n].apply(d, arguments);
      };
    })(l[j]);
  }
  j = c.length;
  while (--j >= 0) {
    (function(n, o) {
      h[o] = function() {
        var q = b.call(arguments),
          p = [o].concat(q);
        a.push(p);
        e(p);
        if (!d || !k(n)) {
          return;
        }
        d.firebug ? d[o].apply(i, q) : d[o] ? d[o](q) : d.log(q);
      };
    })(j, c[j]);
  }
  function e(n) {
    if (f && (g || !d || !d.log)) {
      f.apply(i, n);
    }
  }
  h.setLevel = function(n) {
    m = typeof n === "number" ? n : 9;
  };

  function k(n) {
    return m > 0 ? m > n : c.length + m <= n;
  }
  h.setCallback = function() {
    var o = b.call(arguments),
      n = a.length,
      p = n;
    f = o.shift() || null;
    g = typeof o[0] === "boolean" ? o.shift() : false;
    p -= typeof o[0] === "number" ? o.shift() : n;
    while (p < n) {
      e(a[p++]);
    }
  };
  return h;
})();
(function($, window, undefined) {
  dermquest = new function() {
    var me = {}, defaults = {
      selected_class: "selected",
      active_class: "active",
      inactive_class: "inactive",
      open_class: "open",
      close_class: "close",
      last_class: "last",
      first_class: "first",
      default_class: "default",
      slide_speed: 500,
      fade_speed: 200,
      fade_delay: 200,
      data: "data"
    };
    var components = [];

    function init() {
      function launchComponents() {
        for (var i = 0, l = components.length; i < l; i++) {
          var component = components[i];
          if (typeof component.launch === "function") {
            component.launch();
          }
        }
      }
      function initExtensions() {
        String.prototype.toCamel = function() {
          return this.replace(/(\-[a-z])/g, function($1) {
            return $1.toUpperCase().replace("-", "");
          });
        };
        String.prototype.toTitle = function() {
          return this.replace(/([\w&`'??"?.@:\/\{\(\[<>_]+-? *)/g, function(match, p1, index, title) {
            if (index > 0 && title.charAt(index - 2) !== ":" && match.search(/^(a(nd?|s|t)?|b(ut|y)|en|for|i[fn]|o[fnr]|t(he|o)|vs?\.?|via)[ \-]/i) > -1) {
              return match.toLowerCase();
            }
            if (title.substring(index - 1, index + 1).search(/['"_{(\[]/) > -1) {
              return match.charAt(0) + match.charAt(1).toUpperCase() + match.substr(2);
            }
            if (match.substr(1).search(/[A-Z]+|&|[\w]+[._][\w]+/) > -1 || title.substring(index - 1, index + 1).search(/[\])}]/) > -1) {
              return match;
            }
            return match.charAt(0).toUpperCase() + match.substr(1);
          });
        };
        $.fn.activate = function() {
          if (this.length) {
            this.removeClass(dermquest.getDefault("inactive_class"));
            this.addClass(dermquest.getDefault("active_class"));
            var _data = this.getData();
            _data._active = true;
          }
          return this;
        };
        $.fn.deactivate = function() {
          if (this.length) {
            this.removeClass(dermquest.getDefault("active_class"));
            this.addClass(dermquest.getDefault("inactive_class"));
            var _data = this.getData();
            _data._active = false;
          }
          return this;
        };
        $.fn.select = function() {
          if (this.length) {
            this.addClass(dermquest.getDefault("selected_class"));
          }
          return this;
        };
        $.fn.deselect = function() {
          if (this.length) {
            this.removeClass(dermquest.getDefault("selected_class"));
          }
          return this;
        };
        $.fn.toggleElement = function(_class) {
          var rtn;
          if (_class !== undefined) {
            rtn = this.is(_class.getClassSelector());
          } else {
            if (this.hasClass(dermquest.getDefault("active_class"))) {
              this.deactivate();
              rtn = false;
            } else {
              this.activate();
              rtn = true;
            }
          }
          return rtn;
        };
        $.fn.fade = function(opacity, callback) {
          this.stop();
          this.dequeue();
          this.fadeTo(dermquest.getDefault("fade_speed"), opacity, function() {
            if (callback != undefined) {
              callback();
            }
            if (opacity === 0) {
              $(this).css({
                display: "none"
              });
            }
          });
          return this;
        };
        $.fn.setData = function(_data) {
          $.data(this[0], dermquest.getDefault("data"), _data);
          return this;
        };
        $.fn.getData = function() {
          return $.data(this[0], dermquest.getDefault("data")) || {};
        };
        $.fn.isActive = function() {
          return $.data(this[0], dermquest.getDefault("data"))._active || false;
        };
        $.fn.getAttributes = function(str) {
          var rtn = {}, attributes = this[0].attributes;
          for (var i = 0, l = attributes.length; i < l; i++) {
            var attribute = attributes[i],
              index = attribute.name.indexOf(str);
            if (!str || index >= 0) {
              rtn[attribute.name] = attribute.value;
            }
          }
          return rtn;
        };
        String.prototype.getClassSelector = function() {
          return "." + this;
        };
        String.prototype.getIdSelector = function() {
          return "#" + this;
        };
      }
      initExtensions();
      launchComponents();
      if (me.Router) {
        me.Router.init();
      }
    }
    function getDefault(str) {
      return defaults[str];
    }
    function register(namespace, obj) {
      var namespaces = namespace.split("."),
        _loc = me;
      components.push(obj);
      for (var i = 0, l = namespaces.length; i < l; i++) {
        var _namespace = namespaces[i];
        if (_namespace === namespaces[l - 1]) {
          _loc[_namespace] = obj;
        } else {
          _loc = _loc[_namespace] = _loc[_namespace] || {};
        }
      }
    }
    $(document).ready(function() {
      init();
    });
    me.register = register;
    me.getDefault = getDefault;
    return me;
  };
}(jQuery, this));
(function($, dermquest, window, undefined) {
  dermquest.register("BlogListing", new function() {
    var me = {}, $me = {};
    var $pagination_indicator = {}, $blog_listing = {}, $document = {};

    function launch() {
      $me = $("#blog");
      if ($me.length) {
        init();
      }
    }
    function init() {
      $document = $(document);
      $pagination_indicator = $("#hdnPaginationCount");
      $blog_listing = $("#blog-listing");
      $document.on("click", ".filter-trigger", function(e) {
        e.preventDefault();
        setPage(1);
        update();
      });
      $me.on("click", ".next-page-trigger", function(e) {
        e.preventDefault();
        update(true);
      });
      $me.on("reset", ".filters", function(e) {
        e.preventDefault();
        reset();
      });
    }
    function getProperty(property) {
      var rtn = "",
        $author_inputs = $("[rel=" + property + "]"),
        $active_author_inputs = $author_inputs.filter(":checked");
      if ($author_inputs.length !== $active_author_inputs.length) {
        var selection = [];
        for (var i = 0, l = $active_author_inputs.length; i < l; i++) {
          var $input = $active_author_inputs.eq(i);
          selection.push($input.attr("data-filter"));
        }
        rtn = selection.join(",");
      }
      return rtn;
    }
    function update(next_page) {
      var authors = getProperty("cbAuthorsAll"),
        content_types = getProperty("cbContentAll"),
        page_id = parseInt($pagination_indicator.val());
      if (next_page) {
        page_id++;
      } else {
        setPage(1);
      }
      loadEntries(content_types, authors, page_id);
    }
    function loadEntries(content_types, authors, page_id) {
      if (!content_types) {
        content_types = "";
      }
      if (!authors) {
        authors = "";
      }
      if (!page_id) {
        page_id = 1;
      }
      $.ajax({
        type: "POST",
        url: dermquest.Settings.Resources.blog_feed + "?pageId=" + page_id,
        data: {
          containerIds: content_types,
          authorNames: authors
        },
        dataType: "html",
        success: function(html) {
          setPage(page_id);
          if (page_id === 1) {
            $blog_listing.html(html);
          } else {
            $blog_listing.append(html);
          }
        }
      });
    }
    function setPage(page_id) {
      $pagination_indicator.val(page_id);
    }
    function reset() {
      setPage(1);
      loadEntries();
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("CaseNotes", new function() {
    var me = {}, $me = {};

    function launch() {
      $me = $("#casenotes-carousel");
      if ($me.length) {
        init();
      }
    }
    function init() {
      $(window).load(function() {
        $me.carouFredSel({
          circular: true,
          items: {
            visible: 1
          },
          scroll: {
            fx: "scroll"
          },
          infinite: false,
          auto: false,
          width: "auto",
          pagination: {
            container: "#casenote-thumbs",
            anchorBuilder: function(nr, item) {
              var thumb = item.clone();
              thumb.find("img").attr("width", "130");
              thumb.removeAttr("style");
              return thumb;
            }
          }
        });
      });
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("Common.Accordion", new function() {
    var me = {}, $me = {};
    var $slides = {}, $headings = {};

    function launch() {
      $me = $(".new-accordion");
      if ($me.length) {
        init();
      }
    }
    function init() {
      $headings = $me.find("h3");
      $slides = $me.find("ul");
      $headings.first().addClass("open");
      $slides.first().addClass("open");
      $me.on("click", "h3:not(.open, .request-link)", function(e) {
        var $trigger = $(e.currentTarget);
        accordionAnimation($trigger);
      });
    }
    function accordionAnimation($this) {
      $headings.filter(".open").removeClass("open");
      $slides.filter(".open").removeClass("open").slideToggle("fast");
      $this.toggleClass("open");
      $this.next().toggleClass("open").slideToggle("fast");
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("Common.ContentSwitcher", new function() {
    var me = {};
    var $content_switchers = {};

    function launch() {
      $(document).on("click", ".switch-trigger", function(e) {
        e.preventDefault();
        var $trigger = $(e.currentTarget);
        if (!$trigger.hasClass("disabled")) {
          showContent($trigger.get(0).hash);
        }
      });
      $(document).on("click", ".switch-all-trigger", function(e) {
        e.preventDefault();
        var $trigger = $(e.currentTarget);
        showAll($trigger);
      });
      if (window.location.hash) {}
    }
    function showContent(id) {
      debug.log(id);
      var $active_content = $(id),
        $content_switcher = $active_content.parents(".content-switcher").eq(0),
        $navigation = $content_switcher.find(".switch-navigation").eq(0),
        $content_wrapper = $content_switcher.find(".switch-contents").eq(0),
        $inactive_contents = $content_wrapper.children(".switch-content").not($active_content),
        $triggers = $navigation.find(".switch-trigger, .switch-all-trigger");
      $triggers.deactivate();
      $inactive_contents.deactivate();
      $active_content.activate();
      $triggers.filter(function() {
        return this.hash === id;
      }).activate();
    }
    function showAll($trigger) {
      var $content_switcher = $trigger.parents(".content-switcher"),
        $contents = $content_switcher.find(".switch-content"),
        $triggers = $content_switcher.find(".switch-trigger").not($trigger);
      $triggers.deactivate();
      $trigger.activate();
      $contents.activate();
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("Common.Filters", new function() {
    var me = {}, $me = {};
    var $document = {};

    function launch() {
      $me = $(".filters");
      if ($me.length) {
        init();
      }
    }
    function init() {
      $document = $(document);
      $me.on("click", "input", function(e) {
        var $trigger = $(e.currentTarget);
        updateBranch($trigger);
      });
      $me.on("change", "input", function(e) {
        var $trigger = $(e.currentTarget);
        updateLeaf($trigger);
      });
      $me.on("click", ".reveal-trigger", function(e) {
        e.preventDefault();
        var $trigger = $(e.currentTarget),
          $inactive_options = $trigger.parents(".inline-option").children(".content").find("li.inactive").activate();
        $trigger.deactivate();
      });
      $document.on("click", ".reset-trigger", function(e) {
        e.preventDefault();
        reset();
      });
    }
    function updateBranch($target) {
      var active = $target.is(":checked"),
        $sibling_inputs = $target.parent().siblings("li").children("input"),
        $children_inputs = $target.siblings(".content").children(".sub-filters").find("input");
      if ($children_inputs.length) {
        $children_inputs.attr("checked", active).trigger("change");
      } else {
        var $parent_input = $target.parents(".sub-filters").parent().siblings("input"),
          $active_siblings = $sibling_inputs.filter(":checked");
        if (!active || $active_siblings.length === $sibling_inputs.length) {
          $parent_input.attr("checked", active).trigger("change");
        }
      }
    }
    function updateLeaf($trigger) {
      var $label = $trigger.siblings("label"),
        active = $trigger.is(":checked");
      if (!$label.length) {
        $label = $trigger.siblings(".content").children("label");
      }
      if (active) {
        $label.activate();
      } else {
        $label.deactivate();
      }
      $me.trigger("filter:change", {
        active: active,
        $input: $trigger
      });
    }
    function reset() {
      $me.find("input").attr("checked", true).trigger("change");
      $me.trigger("reset");
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("Common.Forms", new function() {
    var me = {}, $me = {};
    var error_feedback_template;
    var default_error_selector = ".error-message";

    function launch() {
      var $forms = $(".form");
      if ($forms.length) {
        init($forms);
      }
    }
    function init($forms) {
      $me = $(document);

      function initCheckboxes() {}
      function initRadioButtons() {}
      function initDropdowns() {}
      function initValidation() {
        error_feedback_template = Hogan.compile(dermquest.Settings.Templates.error_feedback);
        $("form").on("click", ".form-submit-trigger", function(e) {
          e.preventDefault();
          isValid($(e.currentTarget).parents("form"));
          $(e.currentTarget).parents("form").trigger("submit");
        });
        $(document).on("submit", "form", function(e) {
          return isValid($(this));
        });
        $forms.on("blur change", ".required", function(e) {
          var $field = $(e.currentTarget);
          checkField($field);
        });
        $forms.on("keyup", ":text.required, :password.required, .match-group, textarea", function(e) {
          var $field = $(e.currentTarget),
            val = $field.val();
          checkField($field);
        });
      }
      function initCatpcha() {}
      function initFilesUploads() {
        $me.on("click", ".file-select-trigger", function(e) {
          e.preventDefault();
          var $file_input = $(e.currentTarget).siblings(":file");
          $file_input.trigger("click");
        });
        $(".file").on("mousemove", function(e) {
          var $trigger = $(this),
            $trigger_offset = $trigger.offset(),
            $input = $(this).find(":file"),
            x_offset = $input.width() - 20,
            y_offset = $input.height() / 2,
            x = parseInt(e.clientX - $trigger_offset.left) - x_offset,
            y = parseInt(e.clientY - $trigger_offset.top) - y_offset;
          $input.css({
            left: x,
            top: y
          });
        });
      }
      initCheckboxes();
      initRadioButtons();
      initDropdowns();
      initValidation();
      initCatpcha();
      initFilesUploads();
    }
    function isValidFile(file, file_types) {
      return _.indexOf(file_types, file) >= 0;
    }
    function checkField($field) {
      resetErrors($field);
      var valid_field = true,
        val = $field.val(),
        selector;
      if ($field.is(":text, :password, textarea") && !val.length) {
        valid_field = false;
        selector = ".blank-error";
      }
      if ($field.is(":file")) {
        var extension = dermquest.Common.getFileExtension(val),
          file_types = $field.attr("data-file-types").split(",");
        valid_field = isValidFile(extension, file_types);
      }
      if ($field.is(".option-group")) {
        var $selected_options = $field.find(":radio, :checkbox").filter(":checked");
        if (!$selected_options.length) {
          valid_field = false;
          message = $field.attr("data-error-message");
          selector = default_error_selector;
        }
      }
      if ($field.is(".match-group")) {
        var $inputs = $field.find(":text, :password"),
          val = $inputs.eq(0).val();
        for (var p = 0, pl = $inputs.length; p < pl; p++) {
          if (p !== 0 && $inputs.eq(p).val() !== val) {
            valid_field = false;
            selector = default_error_selector;
            p = pl;
          }
        }
      }
      if ($field.is("select")) {
        var $selected_option = $field.find(":selected");
        if ($selected_option.is(".default")) {
          valid_field = false;
          selector = default_error_selector;
        }
      }
      if ($field.is(":checkbox")) {
        if (!$field.is(":checked")) {
          valid_field = false;
          selector = default_error_selector;
        }
      }
      if (!valid_field) {
        valid_form = valid_field;
        $field.next(selector).activate();
      }
      return valid_field;
    }
    function isValid($form) {
      var valid_form = true,
        $validated_fields = $form.find(".required");
      for (var i = 0, l = $validated_fields.length; i < l; i++) {
        var $field = $validated_fields.eq(i);
        valid_form = checkField($field);
      }
      return valid_form;
    }
    function resetErrors($fields) {
      $fields.siblings(".error-message").deactivate();
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("Common.ImageListing", new function() {
    var me = {};
    var $document = $(document);

    function launch() {
      $document.on("click", ".switch-trigger", function(e) {
        e.preventDefault();
        var $trigger = $(e.currentTarget),
          $active_image = $trigger.parents(".image-summary");
        if ($active_image.length) {
          var $inactive_images = $active_image.siblings(".image-summary");
          $active_image.select();
          $inactive_images.deselect();
        }
      });
      $document.on("scroll", function() {
        scroll();
      });
      $document.on("mouseenter", ".image-summary", function(e) {
        var $target = $(e.currentTarget);
        $target.activate();
      });
      $document.on("mouseleave", ".image-summary", function(e) {
        var $target = $(e.currentTarget);
        $target.deactivate();
      });
      $document.on("click", ".switch-trigger", function(e) {
        scroll();
      });
      $document.on("update", ".image-listing", function(e) {
        scroll();
      });
      $(document).on("click", ".image-rating", function(e) {
        e.preventDefault();
        var $trigger = $(e.currentTarget),
          image_id = $trigger.data("imageId");
        rate(image_id);
      });
      scroll();
    }
    function reposition($obj, $offset_parent) {
      var min_height = $offset_parent.height(),
        my_height = $obj.height();
      if (min_height > my_height) {
        var min_y = Math.ceil($offset_parent.offset().top),
          cur_y = $document.scrollTop(),
          top = cur_y - min_y;
        if (top > 0) {
          var height = $obj.outerHeight(),
            limit = min_y + $offset_parent.outerHeight() - height;
          if (cur_y > limit) {
            top = limit - min_y;
          }
          $obj.css("top", top);
          $obj.addClass("sticky");
          $obj.parent().height(1);
        } else {
          $obj.removeClass("sticky");
          $obj.parent().removeAttr("style");
        }
      } else {
        $obj.removeClass("sticky");
        $obj.parent().removeAttr("style");
      }
    }
    function scroll() {
      var $image_listing = $(".image-listing-wrapper");
      if ($image_listing.length) {
        var data = $image_listing.getData(),
          $case_panel;
        if (data.$case_panel) {
          $case_panel = data.$case_panel;
        } else {
          $case_panel = $image_listing.find(".case-summary-panel");
          var target_width = $case_panel.parent().outerWidth() || 185;
          $case_panel.width(target_width);
          $image_listing.setData({
            $case_panel: $case_panel
          });
        }
        if ($case_panel.length) {
          reposition($case_panel, $image_listing);
        }
      }
    }
    function rate(image_id) {
      $.ajax({
        type: "GET",
        url: dermquest.Settings.Resources.member_rating_feed,
        data: {
          Id: image_id
        },
        dataType: "json",
        success: function(rating) {
          $('.image-rating[data-image-id="' + image_id + '"]').text(rating).deactivate();
        }
      });
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("Common", new function() {
    var me = {}, $me = {};

    function launch() {
      $(document).on("click", ".back-trigger", function(e) {
        e.preventDefault();
        history.back();
      });
    }
    function getFileExtension(file_name, file_types) {
      var fe = file_name.split(".");
      return fe[fe.length - 1].toLowerCase();
    }
    function getQueryString(key) {
      key = key.replace(/[*+?^$.\[\]{}()|\\\/]/g, "\\$&");
      var match = location.search.match(new RegExp("[?&]" + key + "=([^&]+)(&|$)"));
      var value = match && decodeURIComponent(match[1].replace(/\+/g, " "));
      if (value == null) {
        return "";
      } else {
        return value;
      }
    }
    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    me.launch = launch;
    me.getFileExtension = getFileExtension;
    me.getQueryString = getQueryString;
    me.validateEmail = validateEmail;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("Common.LockerButtons", new function() {
    var me = {}, $me = {};

    function launch() {
      $(document).on("click", ".addtolocker-trigger", function(e) {
        e.preventDefault();
        var $trigger = $(e.currentTarget),
          dataCaseId = $trigger.data("caseId"),
          dataAssetTypeId = $trigger.data("assetTypeId"),
          dataImageId = $trigger.data("imageId");
        addToLocker($trigger, dataCaseId, dataAssetTypeId, dataImageId);
      });
      $(document).on("click", ".delete-bookmark", function(e) {
        e.preventDefault();
        var $trigger = $(e.currentTarget);
        openDeletionConfirmationModal($trigger);
      });
    }
    function addToLocker($trigger, caseId, assetTypeId, imageId) {
      var url = $trigger.data("jsonUrl");
      $.ajax({
        type: "GET",
        url: url,
        data: {
          nodeId: caseId,
          lookupId: assetTypeId,
          imageId: imageId,
          url: document.location.href
        },
        dataType: "json",
        success: function(data) {
          var modalUrl = $trigger.attr("href");
          dermquest.Common.Modal.open(modalUrl, {
            autoHeight: true
          });
        }
      });
    }
    function openDeletionConfirmationModal($this) {
      bookmark_id = $this.data("bookmarkid");
      var url = $this.attr("href");
      dermquest.Common.Modal.open(url, {
        autoHeight: true,
        afterShow: function() {
          modalButtons();
        }
      });
    }
    function modalButtons() {
      $("#delete-bookmark").on("click", function(e) {
        e.preventDefault();
        deleteBookmark();
      });
      $("#cancel-delete").on("click", function(e) {
        e.preventDefault();
        bookmark_id = "";
        dermquest.Common.Modal.close();
      });
    }
    function deleteBookmark() {
      jQuery.ajax({
        type: "GET",
        url: "/Services/DermQuestRestServices.svc/DeleteBookmark?Id=" + bookmark_id,
        dataType: "json",
        success: function(response) {
          window.location = window.location.pathname;
        },
        error: function(xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("Common.Modal", new function() {
    var me = {}, $me = {};

    function launch() {
      $.extend($.fancybox.defaults, {
        autoSize: false,
        autoHeight: true,
        margin: 0,
        padding: 0,
        type: "ajax",
        width: 644,
        maxHeight: "75%",
        minHeight: 0
      });
      $(document).on("click", ".modal-close", function(e) {
        e.preventDefault();
        close();
      });
      $(document).on("click", ".modal-trigger", function(e) {
        e.preventDefault();
        var $trigger = $(e.currentTarget),
          url = e.currentTarget.hash || $trigger.attr("href"),
          width = $trigger.attr("data-modal-width");
        open(url, {
          width: width
        });
      });
      if ($("#restrictedContentBox").length) {
        open("#restrictedContentBox");
      }
      if ($("#cookiesDirectiveBox").length) {
        open("#cookiesDirectiveBox");
      }
      if ($("#reachedLimitBox").length) {
        open("#reachedLimitBox");
      }
    }
    function open(target, options) {
      if (target) {
        var config = options || {};
        if (target instanceof jQuery) {
          config.type = "html";
          config.content = target;
          config.content.activate();
        } else {
          if (target.indexOf("#") === 0) {
            config.type = "html";
            config.content = $(target);
            config.content.activate();
          } else {
            config.href = target;
          }
        }
        if (config.callback) {
          config.beforeShow = function() {
            config.callback(this.wrap);
          };
        }
        $.fancybox.open(config);
      }
    }
    function close(force) {
      $.fancybox.close(force);
    }
    function confirm(config) {
      var modal_content = "";
      if (!config.url && config.title && config.content) {
        modal_content = $(Hogan.compile(dermquest.Settings.Templates.confirm_modal).render({
          title: config.title,
          content: config.content
        }));
      } else {
        modal_content = config.url;
      }
      if (modal_content.length > 0) {
        open(modal_content, {
          callback: function($modal) {
            $modal.on("click", ".confirm-trigger", function(e) {
              e.preventDefault();
              close();
              config.callback();
            });
          }
        });
      }
    }
    me.launch = launch;
    me.open = open;
    me.close = close;
    me.confirm = confirm;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("Common.Tree", new function() {
    var me = {};
    var $trees = {};

    function launch() {
      $(document).on("click", ".expand-trigger", function(e) {
        e.preventDefault();
        $(e.currentTarget).parent().parent().toggleClass("open");
      });
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("Common.VerticalTabPanel", new function() {
    var me = {};
    var $me = {}, $nav_items = {}, $nav = {}, $slides = {}, $eventCoveragePanels = {}, $events_container = {};
    var $indicator = {};

    function launch() {
      $me = $(".vertical-tab-panel");
      $nav = $me.find(".vertical-tab-panel-nav");
      $indicator = $("#nav-indicator");
      if ($me.length) {
        init();
      }
    }
    function init() {
      $slides = $me.find(".slide");
      $events_container = $("#highlight-events-info");
      $nav.on("click", "a", function(e) {
        e.preventDefault();
        var $target = $(this);
        switchSlide($target);
      });
      switchSlide($nav.find("a").eq(0));
    }
    function switchSlide($target) {
      if (!$target.is(".selected")) {
        var new_index = $target.parent().index(),
          $target_slide = $slides.eq(new_index);
        $nav.find(".selected").deselect();
        $target.select();
        $slides.filter(":visible").fade(0, function() {
          $slides.eq(new_index).fade(1);
        });
        if ($events_container.length) {
          showEventsPanel(new_index);
        }
      }
      var nav_offset = $nav.offset(),
        $item = $target.parent(),
        target_offset = $item.offset(),
        target_y = target_offset.top - nav_offset.top + ($item.height() / 2 - $indicator.height() / 2);
      $indicator.css("top", target_y);
    }
    function showEventsPanel(index) {
      var $panels = $events_container.find(".event-info");
      for (var i = 0, l = $panels.length; i < l; i++) {
        var $panel = $panels.eq(i);
        if (i === index) {
          $panel.fade(1);
        } else {
          $panel.hide();
        }
      }
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("CookieManager", new function() {
    var me = {}, $me = {};

    function launch() {}
    function createCookie(name, val, days) {
      var expires = "";
      if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
      }
      document.cookie = name + "=" + val + expires + "; path=/";
    }
    function readCookie(name) {
      var nameEQ = name + "=",
        ca = document.cookie.split(";"),
        rtn = null;
      for (var i = 0, l = ca.length; i < l; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
          c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
          rtn = c.substring(nameEQ.length, c.length);
        }
      }
      return rtn === "true";
    }
    function deleteCookie(name) {
      createCookie(name, "", -1);
    }
    me.launch = launch;
    me.createCookie = createCookie;
    me.readCookie = readCookie;
    me.deleteCookie = deleteCookie;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("EditorialCarousel", new function() {
    var me = {};
    var $me = {};

    function launch() {
      $me = $("#editorial-carousel ol");
      if ($me.length) {
        init();
      }
    }
    function init() {
      $me.carouFredSel({
        circular: true,
        items: {
          visible: 1
        },
        scroll: {
          fx: "scroll"
        },
        infinite: false,
        auto: false,
        prev: "#editorial-carousel .previous",
        next: "#editorial-carousel .next"
      });
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("eLearning", new function() {
    var me = _.extend({}, Backbone.Events),
      $me = {};
    var default_delay = 5;

    function launch() {
      $me = $("#elearning-thanks");
      if ($me.length) {
        init();
      }
    }
    function init() {
      var survey_delay = ($me.data("surveyDelay") || default_delay) * 1000,
        $survey_link = $me.find("a");
      var redirect = $me.data("surveyUrl");
      $survey_link.on("click", function(e) {
        redirect = "";
      });
      setTimeout(function() {
        if (redirect.length) {
          window.location.href = redirect;
        }
      }, survey_delay);
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("EmailAFriend", new function() {
    var me = {}, $me = {};

    function launch() {
      $me = $(".emailForm");
      if ($me.length) {
        init();
      }
    }
    function init() {
      if ($("#recaptcha")) {
        ShowRecaptcha();
        $(document).on("click", "#btnSubmitEmailForm", function(e) {
          e.preventDefault();
          var $trigger = $(e.currentTarget);
          ShareContentByEmail();
        });
      }
    }
    function ShowRecaptcha() {
      Recaptcha.create(RecaptchaPublicKey, "recaptcha", {
        theme: "white"
      });
    }
    function ShareContentByEmail() {
      $("#emailFormError p").remove();
      if ($("#tbYourEmail").val() == "" || !validateEmail($("#tbYourEmail").val())) {
        $("<p>Please enter a valid email</p>").appendTo("#emailFormError");
      }
      if ($("#tbFriendEmail").val() == "" || !validateEmail($("#tbFriendEmail").val())) {
        $("<p>Please enter a  valid friend's email</p>").appendTo("#emailFormError");
      }
      if ($("#emailFormError p").length > 0) {
        return;
      }
      $.ajax({
        type: "GET",
        url: "/Services/DermQuestRestServices.svc/EmailFriend",
        data: {
          captchaChallange: $("#recaptcha_challenge_field").val(),
          captchaResponse: $("#recaptcha_response_field").val(),
          userEmail: $("#tbYourEmail").val(),
          friendEmail: $("#tbFriendEmail").val(),
          msg: $("#tbMsg").val(),
          articleName: $("head title").text(),
          articleLink: window.location.href
        },
        dataType: "json",
        success: function(response) {
          response = $.parseJSON(response);
          if (!response.Success) {
            $("<p>" + response.Error + "</p>").appendTo("#emailFormError");
          } else {
            parent.dermquest.Common.Modal.close(true);
            $("#tbYourEmail").val("");
            $("#tbFriendEmail").val("");
            $("#tbMsg").val("");
          }
        },
        error: function(xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
      });
    }
    function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("EventCoverageCarousel", new function() {
    var me = {};
    var $me = {};

    function launch() {
      $me = $("#event-coverage-carousel ol");
      if ($me.length) {
        init();
      }
    }
    function init() {
      $me.carouFredSel({
        circular: true,
        items: {
          visible: 1
        },
        scroll: {
          fx: "scroll"
        },
        infinite: false,
        auto: false,
        prev: "#event-coverage-carousel .previous",
        next: "#event-coverage-carousel .next"
      });
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("HomeCarousel", new function() {
    var me = {};
    var $me = {};

    function launch() {
      $me = $("#home-carousel ol");
      if ($me.length) {
        init();
      }
    }
    function init() {
      $me.carouFredSel({
        circular: true,
        items: {
          visible: 4,
          minimum: 1
        },
        scroll: {
          fx: "scroll"
        },
        infinite: false,
        auto: false,
        scroll: 1,
        prev: "#home-carousel .previous",
        next: "#home-carousel .next"
      });
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("ImageDetail", new function() {
    var me = {};
    var $me, $carousel, $thumbnails, $nav_items, $case_info_wrapper, $locker_triggers, $zoom_window, $zoom_window_wrapper, $interaction_instructions;
    var $carousel;

    function launch() {
      $me = $("#image-detail-carousel");
      $locker_triggers = $("#locker-triggers").find("a");
      $zoom_window_wrapper = $("#image-holder-wrapper");
      $zoom_window = $("#image-holder");
      $case_info_wrapper = $(".case-summary-panel");
      $interaction_instructions = $(".interaction-instructions");
      var instructions_template = Hogan.compile(dermquest.Settings.Templates.image_click_interation);
      if (Modernizr.touch) {
        instructions_template = Hogan.compile(dermquest.Settings.Templates.image_touch_interaction);
      }
      $interaction_instructions.html(instructions_template.render({
        href: "#"
      }));
      if ($me.length) {
        $(window).load(function() {
          init();
        });
        var $back_triggers = $(".back-trigger");
        if (document.referrer.indexOf("image-library") < 0) {
          $back_triggers.deactivate();
        } else {
          $back_triggers.activate();
        }
      }
    }
    function init() {
      $carousel = $me.find("ol");
      $thumbnails = $(".image-listing");
      $nav_items = $thumbnails.children("ul").children("li");
      $case_summaries = $(".case-summary-panel").find(".case-summary");
      var start_index = $nav_items.filter(".selected").index() || 0;
      $carousel.carouFredSel({
        circular: true,
        items: {
          visible: 1,
          start: start_index
        },
        scroll: {
          fx: "scroll"
        },
        infinite: false,
        auto: false,
        width: "auto",
        scroll: {
          onBefore: function($old, $new) {
            $interaction_instructions.stop().dequeue().fadeTo(100, 0);
          },
          onAfter: function($old, $new) {
            initZoom($new);
            update($new);
          }
        },
        onCreate: function($new) {
          update($new);
          initZoom($new);
          $me.activate();
        }
      });
      $me.on("click", ".next", function(e) {
        $carousel.trigger("next");
      });
      $me.on("click", ".previous", function(e) {
        $carousel.trigger("prev");
      });
      $thumbnails.on("click", "a", function(e, dont_scroll) {
        e.preventDefault();
        var index = $(this).parents("li").index();
        slideTo(index);
        if (!dont_scroll) {
          resetScroll();
        }
      });
      updateLockerButton(start_index);
    }
    function back() {}
    function hideOverview() {
      $zoom_window_wrapper.activate();
      $case_info_wrapper.hide();
    }
    function showOverview() {
      $zoom_window_wrapper.deactivate();
      $case_info_wrapper.show();
    }
    function initZoom($item) {
      if (!$item.find(".zoom-preview").length) {
        $item.on("mousedown", "img", function(e) {
          return false;
        });
        var $figure = $item.find("figure"),
          $image = $figure.find("img"),
          medium_image_width = $image.width(),
          medium_image_height = $image.height(),
          max_width = 639,
          max_height = $image.height(),
          ratio = 1;
        var $link = $figure.find("a").not(".iom-highlight"),
          zoom_image_path = escape($link.attr("href")),
          zoom_image = new Image();
        zoom_image.onload = function(e) {
          $interaction_instructions.fadeTo(250, 1);
          var zoom_image_width = zoom_image.width,
            zoom_image_height = zoom_image.height,
            ratio = zoom_image_width / medium_image_width,
            preview_width = medium_image_width,
            preview_height = medium_image_height;
          if (preview_width < zoom_image_width) {
            preview_width = max_width;
            preview_height = max_height;
          }
          if (medium_image_width + 20 < zoom_image_width) {
            $(".image-options").find(".floatLeft").show();
            var $preview = $('<span class="zoom-preview" />'),
              max_x = zoom_image.width - medium_image_width,
              max_y = zoom_image.height - medium_image_height,
              preview_offset;
            var css = {
              width: preview_width,
              height: preview_height,
              "background-image": "url(" + zoom_image_path + ")",
              "margin-left": -preview_width / 2,
              top: $image.position().top,
              "background-position": "0px 0px"
            };
            $preview.css(css).fadeTo(0, 0);
            $link.append($preview);
            $preview.on("mouseenter touchstart", function(e) {
              e.preventDefault();
              $preview.fadeTo(250, 1);
              move(e);
            });
            $preview.on("mousemove touchmove", function(e) {
              e.preventDefault();
              move(e);
            });
            $preview.on("mouseleave touchend", function(e) {
              preview_offset = undefined;
              $preview.stop().dequeue().fadeTo(100, 0);
            });
            $preview.on("mousedown click tap", function(e) {
              return false;
            });

            function move(e) {
              if (e.originalEvent.targetTouches) {
                e.pageX = e.originalEvent.targetTouches[0].pageX;
                e.pageY = e.originalEvent.targetTouches[0].pageY;
              }
              if (preview_offset === undefined) {
                preview_offset = $preview.offset();
              }
              var preview_position = {
                left: Math.floor(e.pageX - preview_offset.left),
                top: Math.floor(e.pageY - preview_offset.top)
              };
              x_position = preview_position.left / preview_width, y_position = preview_position.top / preview_height, zoom_image_center2 = {
                left: zoom_image_width * x_position,
                top: zoom_image_height * y_position
              }, preview_center2 = {
                left: preview_position.left - zoom_image_center2.left,
                top: preview_position.top - zoom_image_center2.top
              };
              $preview.css({
                "background-position": preview_center2.left + "px " + preview_center2.top + "px"
              });
            }
          } else {
            $(".image-options").find(".floatLeft").hide();
          }
        };
        zoom_image.src = zoom_image_path;
      } else {
        $interaction_instructions.fadeTo(250, 1);
      }
    }
    function update($new) {
      $carousel.trigger("currentPage", function(new_index) {
        var $active_item = $nav_items.eq(new_index);
        if (!$active_item.is(".selected")) {
          var $trigger = $active_item.find(".switch-trigger");
          $trigger.trigger("click", true);
        }
        updateLockerButton(new_index);
        updateDownloadButton($new);
      });
    }
    function updateDownloadButton($item) {
      var hi_res_path = escape($item.find(".preview-image").attr("href")),
        $image_options = $(".image-options"),
        $image_option_links = $image_options.find("a");
      for (var i = 0, l = $image_option_links.length; i < l; i++) {
        var $link = $image_option_links.eq(i),
          href = hi_res_path;
        if ($link.is(".download-link")) {
          href += "?dl=true&wm=true";
        }
        if ($link.is(".fullsize-link")) {
          href += "?wm=true";
        }
        $link.attr("href", href);
      }
    }
    function updateLockerButton(index) {
      var active_id = $nav_items.eq(index).attr("data-image-id");
      for (var i = 0, l = $locker_triggers.length; i < l; i++) {
        var $trigger = $locker_triggers.eq(i),
          image_id = $trigger.attr("data-image-id");
        if (image_id === active_id) {
          $trigger.activate();
        } else {
          $trigger.deactivate();
        }
      }
    }
    function slideTo(index) {
      $carousel.trigger("currentPage", function(current_page) {
        if (current_page !== index) {
          $carousel.trigger("slideTo", index);
        }
      });
    }
    function resetScroll() {
      $("html, body").animate({
        scrollTop: $("#image-detail-panel").offset().top
      }, 500);
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  Model = Backbone.Model.extend();
  dermquest.register("ImageLibrary", new function() {
    var me = _.extend({}, Backbone.Events),
      $me = {};
    var model = new Model;
    var filter_separator = "&",
      key_value_separator = "=",
      value_separator = "|";
    var facet_collections_url, image_results_url;
    var FacetSelectionPage, ImageResultsPage;
    var selection_lists = {};
    var $overlay;

    function launch() {
      debug.time("load library");
      $me = $("#image-library");
      if ($me.length) {
        init();
      }
    }
    function init() {
      function initFeedUrls() {
        facet_collections_url = dermquest.Settings.Resources.facet_feed;
        image_results_url = dermquest.Settings.Resources.image_feed_url;
      }
      function initLoader() {
        $overlay = $('<div class="overlay-wrapper"><div class="overlay"></div><div class="loading-icon"></div></div>');
        $overlay.activate();
        $me.append($overlay);
      }
      function initModel() {
        $.getJSON(facet_collections_url, function(collections) {
          if (collections) {
            model.set("data", collections.facet_collection);
            dataLoaded();
          }
        });
      }
      function initRouting() {
        dermquest.Router.on("route:image-search", function(route) {
          showLoading();
          decodeRoute(route);
          FacetSelectionPage.hide();
          ImageResultsPage.show();
          getImages(route);
        });
        dermquest.Router.on("route:default", function(route) {
          reset();
          FacetSelectionPage.reset();
          ImageResultsPage.hide();
          FacetSelectionPage.show();
        });
      }
      function initInteractions() {
        $(document).on("click", ".search-trigger", function(e) {
          e.preventDefault();
          dermquest.Common.Modal.close(true);
          search();
        });
      }
      function initPages() {
        FacetSelectionPage = new SelectionPage(model);
        FacetSelectionPage.on("loaded", function() {
          hideLoading();
        });
        ImageResultsPage = new ResultsPage(model);
        ImageResultsPage.on("loaded", function() {
          hideLoading();
        });
      }
      initFeedUrls();
      initLoader();
      initRouting();
      initInteractions();
      initPages();
      initModel();
    }
    function dataLoaded() {
      Backbone.history.start();
    }
    function removeFacet(category_id, facet_id) {
      var route = model.get("route"),
        new_route = {
          page: 1
        };
      var route_category = route[category_id],
        new_category = _.without(route_category, facet_id);
      if (new_category.length > 0) {
        new_route[category_id] = new_category;
      } else {
        new_route[category_id] = undefined;
        new_route[category_id + "MatchAll"] = undefined;
      }
      setFacets(new_route);
    }
    function search() {
      var selection = _.extend({}, model.get("route")),
        empty_search = true;
      _.each(selection_lists, function(list, key) {
        var list_state = list.getState();
        selection[key] = list_state.selection;
        if (list_state.selection.length > 0) {
          empty_search = false;
          if (list_state.operator !== undefined) {
            selection[key + "MatchAll"] = list_state.operator;
          }
        }
      });
      debug.log("search", selection);
      if (!empty_search) {
        setFacets(selection);
      } else {
        reset();
      }
    }
    function filterInteraction($trigger) {
      var attribute_prefix = "data-",
        data_attributes = $trigger.getAttributes(attribute_prefix),
        new_route = {};
      trigger_attributes = _.each(data_attributes, function(val, key) {
        var camel_key = key.substring(key.indexOf(attribute_prefix) + attribute_prefix.length).toCamel(),
          number = parseInt(val);
        if (_.isNumber(number)) {
          new_route[camel_key] = number;
        } else {
          new_route[camel_key] = val;
        }
      });
      setFacets(new_route);
    }
    function setFacets(obj) {
      var new_route = _.extend({}, model.get("route"), obj);
      if (!obj.page) {
        new_route.page = 1;
      }
      routeCheck(new_route);
    }
    function routeCheck(new_route) {
      new_route = filterRoute(new_route);
      var keys = _.keys(model.get("data")),
        search_has_facets = false;
      for (var i = 0, l = keys.length; i < l; i++) {
        var key = keys[i];
        if (new_route[key]) {
          search_has_facets = true;
        }
      }
      if (new_route.q) {
        search_has_facets = true;
      }
      if (search_has_facets) {
        updateRoute(new_route);
      } else {
        reset();
      }
    }
    function filterRoute(new_route) {
      var filtered_route = _.extend({}, new_route),
        facet_collections = model.get("data"),
        keys = _.keys(facet_collections);
      _.each(keys, function(key) {
        var collection = facet_collections[key],
          route_collection = filtered_route[key],
          new_collection = [];
        if (route_collection) {
          for (var i = 0, l = route_collection.length; i < l; i++) {
            var id = route_collection[i];
            if (id) {
              var facet = collection.Facets[id];
              if (facet) {
                var has_children = (facet.Facets && facet.Facets.length) ? true : false;
                new_collection.push(id);
              }
            }
          }
          filtered_route[key] = new_collection;
        }
      });
      return filtered_route;
    }
    function reset() {
      updateRoute({});
      model.unset("results");
      model.unset("route");
      debug.log("reset app");
    }
    function updateRoute(obj) {
      var route = encodeState(obj),
        prefix = "";
      if (route.length > 0) {
        prefix = "image-search/";
      }
      debug.log("updating route", route);
      dermquest.Router.navigate(prefix + route, {
        trigger: true
      });
    }
    function encodeState(obj) {
      var route = "";
      _.each(obj, function(val, key) {
        if (_.isArray(val) && val.length === 0) {
          return;
        }
        if (val !== undefined) {
          if (route.length !== 0) {
            route += filter_separator;
          }
          route += key + key_value_separator;
          if (_.isArray(val)) {
            route += val.join(value_separator);
          } else {
            route += val;
          }
        }
      });
      return route;
    }
    function decodeRoute(route) {
      var decoded_route = {};
      if (route) {
        var collections = route.split(filter_separator),
          keys = _.keys(model.get("data"));
        for (var i = 0, l = collections.length; i < l; i++) {
          var category = collections[i],
            key_value_separator_index = category.indexOf(key_value_separator),
            key = category.substring(0, key_value_separator_index),
            val = category.substring(key_value_separator_index + 1);
          if (_.indexOf(keys, key) >= 0) {
            val = _.map(val.split(value_separator), function(item) {
              return parseInt(item);
            });
          } else {
            val = parseInt(val) || val;
          }
          decoded_route[key] = val;
        }
      }
      debug.log("decoded route", decoded_route);
      model.set("route", decoded_route);
    }
    function getImages(route) {
      debug.log("getting images");
      $.ajax({
        type: "GET",
        url: image_results_url + "?" + route,
        success: function(data) {
          debug.log("got images!");
          model.set("results", data);
          hideLoading();
        },
        dataType: "json"
      });
    }
    function updateRouteOptions(results) {
      var obj = _.extend({}, model.get("route"));
      _.each(["perPage", "page", "sort"], function(item) {
        obj[item] = results[item];
      });
    }
    function showLoading() {
      $overlay.show();
      $overlay.activate();
    }
    function hideLoading() {
      $overlay.deactivate();
      setTimeout(function() {
        $overlay.hide();
      }, 0);
    }
    me.launch = launch;
    me.setFacets = setFacets;
    me.hideLoading = hideLoading;
    me.showLoading = showLoading;

    function SelectionPage(model) {
      var me = _.extend({}, Backbone.Events),
        $me = $("#filter-selection");
      var content_template = Hogan.compile($("#facet-selection-panel").html());

      function launch() {
        if ($me.length) {
          model.on("change:data", function() {
            init();
          });
        }
      }
      function init() {
        debug.time("build selection page");
        debug.log("start build");
        build();
        debug.log("finish build");
        debug.timeEnd("build selection page");
        show();
        me.trigger("loaded");
      }
      function build() {
        var $menu_wrapper = $me.children(".c1"),
          $content_wrapper = $me.children(".main"),
          $menu = $('<div class="v-nav switch-navigation" />'),
          $list = $("<ul />"),
          i = 0;
        _.each(model.get("data"), function(collection, key) {
          var content_id = key,
            list = {};
          var $menu_item = $("<li />"),
            $anchor = $('<a href="#' + content_id + '" class="switch-trigger">' + collection.Text + "</a>"),
            $content = $(content_template.render({
              id: content_id,
              panel_title: collection.Text
            })),
            $target = $content.find(".panel-content"),
            config = {
              id: key,
              model: model
            };
          debug.time(key);
          if (key === "localization") {
            list = new dermquest.Settings.Objects.BodySelection($target, config);
          } else {
            if (key === "lesions" || key === "symptoms" || key === "pathos") {
              list = new dermquest.Settings.Objects.LogicalSelectList($target, config);
            } else {
              if (key === "diagnosis") {
                list = new dermquest.Settings.Objects.AlphaSelectList($target, config);
              }
            }
          }
          selection_lists[key] = list;
          debug.timeEnd(key);
          $menu_item.append($anchor);
          $list.append($menu_item);
          if (i === 3) {
            $anchor.activate();
            $content.activate();
          }
          i++;
          $content_wrapper.append($content);
        });
        $menu.append($list);
        $menu_wrapper.prepend($menu);
      }
      function show() {
        $me.activate();
      }
      function hide() {
        $me.deactivate();
      }
      function reset() {
        var $switch_contents = $me.children(".switch-contents").children(".switch-content"),
          $switch_triggers = $me.children().children(".switch-navigation").find(".switch-trigger");
        $switch_contents.removeAttr("style").deactivate();
        $switch_triggers.deactivate().eq(0).click();
      }
      launch();
      me.show = show;
      me.hide = hide;
      me.reset = reset;
      return me;
    }
    function ResultsPage(model) {
      var me = _.extend({}, Backbone.Events),
        $me = $("#image-results");
      var ActiveFacets, Listing, Options;
      var results_template = Hogan.compile(dermquest.Settings.Templates.image_search_results),
        single_results_template = Hogan.compile(dermquest.Settings.Templates.single_image_search_result);
      var $results_feedback = $("#results-feedback");

      function launch() {
        $me.on("click", ".reset-trigger", function(e) {
          e.preventDefault();
          $results_feedback.html("");
          reset();
        });
        $me.on("click", ".filter-trigger", function(e) {
          e.preventDefault();
          var $trigger = $(e.currentTarget);
          filterInteraction($trigger);
        });
        $me.on("click", ".case-info-trigger", function(e) {
          e.preventDefault();
          var $trigger = $(e.currentTarget),
            $item = $trigger.parents("li[data-image-id]"),
            asset_id = $item.attr("data-image-id");
          $item.select();
          $item.siblings("li").deselect();
          showImageInfo(asset_id);
        });
        $me.on("click", ".remove-trigger", function(e) {
          e.preventDefault();
          var $trigger = $(e.currentTarget),
            facet_id = parseInt($trigger.attr("data-facet-id")),
            category_id = $trigger.parent("li").parent("ul").parent("li").attr("data-category-id");
          removeFacet(category_id, facet_id);
        });
        model.on("change:results", function(e) {
          if (e.get("results")) {
            update();
            me.trigger("loaded");
          }
        });
        ActiveFacets = new dermquest.Settings.Objects.ActiveFacetList(model);
        Listing = new dermquest.Settings.Objects.ResultListing(model);
        Options = new dermquest.Settings.Objects.ListingOptions(model);
      }
      function show() {
        $me.activate();
      }
      function hide() {
        $me.deactivate();
      }
      function update() {
        function updateFeedback() {
          var results = model.get("results"),
            first_index = ((results.page * results.perPage) - results.perPage) + 1,
            last_index = first_index + (results.perPage - 1);
          if (first_index < 1) {
            first_index = 1;
          }
          if (last_index > results.Hits) {
            last_index = results.Hits;
          }
          debug.log("results", results.Hits);
          if (results.Hits > 0) {
            var template = results_template,
              obj = {
                total_results: results.Hits
              };
            if (last_index !== results.Hits) {
              obj.min = first_index;
              obj.max = last_index;
            } else {
              if (results.Hits === 1) {
                template = single_results_template;
              }
            }
            $results_feedback.html(template.render(obj));
          } else {
            $results_feedback.empty();
          }
        }
        updateFeedback();
      }
      function getImageInfo(image_id) {
        var images = model.get("results").Results,
          image = _.filter(images, function(item) {
            return item.AssetId === image_id;
          })[0];
        return image;
      }
      function showImageInfo(image_id) {
        var image = getImageInfo(image_id);
      }
      launch();
      me.show = show;
      me.hide = hide;
      me.update = update;
      return me;
    }
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  Model = Backbone.Model.extend();
  dermquest.register("ImageSubmission", new function() {
    var me = {}, $me = {};
    var $image_listing_list = {};
    var model = new Model;
    var selection_lists = [],
      file_types = "",
      state = {};

    function launch() {
      $me = $("#image-submission");
      if ($me.length) {
        image_template = Hogan.compile($("#image-submission-image").html());
        init();
      }
    }
    function init() {
      initImageFields();
      initPregnancyQuestion();
      $.getJSON(dermquest.Settings.Resources.facet_feed, function(data) {
        if (data.facet_collection) {
          model.set("data", data.facet_collection);
          initFacetSelection();
        }
      });
    }
    function initPregnancyQuestion() {
      var $pregnancy_question = $("#pregnancy-question");
      if ($("#rdFemale").is(":checked")) {
        $pregnancy_question.show();
      }
      $me.on("click", "#rdFemale", function(e) {
        $pregnancy_question.show();
      });
      $me.on("click", "#rdMale", function(e) {
        $pregnancy_question.hide().find("input").attr("checked", false);
      });
    }
    function initImageFields() {
      var $image_listing = $me.find(".image-upload-listing");
      $image_listing_list = $image_listing.children("ul");
      var $image_items = $image_listing_list.find("li");
      for (var i = 0, l = $image_items.length; i < l; i++) {
        var $item = $image_items.eq(i),
          $file = $item.find(":file");
        if ($file.val().length > 0) {
          $item.activate();
        }
      }
      file_types = $image_listing.attr("data-file-types").split(",");
      $me.on("click", ".add-trigger", function(e) {
        e.preventDefault();
        addImage();
      });
      $me.on("click", ".remove-trigger", function(e) {
        e.preventDefault();
        var $target = $(e.currentTarget);
        initDeleteImage($target);
      });
      $(":file").on("change", function(e) {
        var $target = $(e.currentTarget);
        imageSelected($target);
      });
      $(document).on("click", ".confirm-trigger", function(e) {
        e.preventDefault();
        updateSelection();
      });
      var $inputs = $me.find(".image-submission-facet-list").find("input:hidden");
      $me.find(".image-submission-facet-list").on("change", "input", function(e) {
        var $input = $(e.currentTarget);
        populateFacetNames($input);
      });
    }
    function initFacetSelection(collections) {
      _.each(model.get("data"), function(collection, key) {
        var $panel = $("#" + key + "-selection"),
          $list_wrapper = $panel.find(".select-list-wrapper"),
          $confirm_trigger = $(dermquest.Settings.Templates.confirm_facets),
          list = {}, config = {
            data: collection,
            roots: collection.Roots,
            id: key
          }, $field = {}, $other_field = {};
        if (key === "localization") {
          config.model = model;
          config.hide_trigger = true;
          list = new dermquest.Settings.Objects.BodySelection($list_wrapper, config);
          $field = $("#hdnAtomical");
        } else {
          if (key === "lesions") {
            list = new dermquest.Settings.Objects.SelectList($list_wrapper, config);
            $field = $("#hdnlesion");
            $other_field = $("#tbOtherLesion");
          } else {
            if (key === "symptoms") {
              list = new dermquest.Settings.Objects.SelectList($list_wrapper, config);
              $field = $("#hdnSymptom");
              $other_field = $("#tbOtherSymptom");
            } else {
              if (key === "pathos") {
                list = new dermquest.Settings.Objects.SelectList($list_wrapper, config);
                $field = $("#hdnPatho");
                $other_field = $("#tbOtherPatho");
              } else {
                if (key === "diagnosis") {
                  config.limit = 1;
                  config.include_trigger = false;
                  config.group_name = "diagnosis-selection-group";
                  list = new dermquest.Settings.Objects.AlphaSelectList($list_wrapper, config);
                  $field = $("#hdnDiagnosis");
                  $other_field = $("#tbOtherDiagnosis");
                  $other_field.on("keydown", function(e) {
                    list.reset();
                  });
                  list.on("change", function() {
                    $other_field.val("");
                  });
                }
              }
            }
          }
        }
        $field.attr("data-category-id", key);
        populateFacetNames($field);
        if (key === "localization") {
          $list_wrapper.find(".floatLeft").eq(1).append($confirm_trigger);
        } else {
          $list_wrapper.after($confirm_trigger);
        }
        state[key] = {
          $field: $field,
          $other_field: $other_field,
          selection: []
        };
        selection_lists.push(list);
        if (key != "localization") {
          $list = $panel.find(".select-list");
          $list.height(0.5 * $(window).height());
          $.event.add(window, "resize", new function() {
            $list.height(0.5 * $(window).height());
          });
        }
      });
    }
    function updateSelection() {
      for (var i = 0, l = selection_lists.length; i < l; i++) {
        var list = selection_lists[i],
          list_state = list.getState(),
          id = list_state.id,
          state_category = state[id],
          $field = state_category.$field;
        if ($field.val() !== list_state.selection.join(",")) {
          state_category.selection = list_state.selection;
          $field.val(list_state.selection).trigger("change");
        }
      }
    }
    function populateFacetNames($input) {
      var val = $input.val(),
        $description = $input.siblings(".selection");
      var category_id = $input.attr("data-category-id"),
        state_category = state[category_id],
        model_category = model.get("data")[category_id],
        values = val.split(","),
        html = "";
      for (var i = 0, l = values.length; i < l; i++) {
        var val = values[i];
        if (val.length > 0) {
          var facet = model_category.Facets[values[i]];
          if (i !== 0) {
            html += ", ";
          }
          html += facet.Text;
        }
      }
      if (state_category) {
        var $other_field = state_category.$other_field;
        if ($other_field.length) {
          var other_selection = $other_field.val();
          if (other_selection.length > 0) {
            if (html.length !== 0) {
              html += ", ";
            }
            html += other_selection;
          }
        }
      }
      if (html.length === 0) {
        html = dermquest.Settings.Dictionary.none;
      }
      $description.html(html);
    }
    function addImage() {
      var $all_items = $image_listing_list.find("li"),
        $next_item = $all_items.not(".active").eq(0),
        $add_triggers = $me.find(".add-trigger").parent();
      $next_item.activate();
      if ($next_item.index() >= $all_items.length - 1) {
        $add_triggers.deactivate();
      } else {
        $add_triggers.activate();
      }
    }
    function initDeleteImage($trigger) {
      var $active_items = $image_listing_list.find("li.active"),
        $image_item = $trigger.parents("li"),
        $field = $image_item.find(":file"),
        is_empty = $field.val().length === 0;
      if ($active_items.length === 1) {
        if (!is_empty) {
          dermquest.Common.Modal.confirm({
            url: dermquest.Settings.Resources.remove_image_submission_image,
            callback: function() {
              clearFields($image_item);
            }
          });
        }
      } else {
        if ($active_items.length > 1) {
          if (is_empty) {
            deleteImage($image_item);
          } else {
            dermquest.Common.Modal.confirm({
              url: dermquest.Settings.Resources.remove_image_submission_image,
              callback: function() {
                deleteImage($image_item);
              }
            });
          }
        }
      }
    }
    function deleteImage($image_item) {
      var $parent = $image_item.parent(),
        $add_triggers = $me.find(".add-trigger").parent();
      $image_item = $image_item.deactivate().detach();
      $parent.append($image_item);
      clearFields($image_item);
      $add_triggers.activate();
    }
    function clearFields($image_item) {
      $image_item.find("input").val("");
    }
    function imageSelected($target) {
      var $image_item = $target.parents("li"),
        val = $target.val();
      val = val.substring(val.lastIndexOf("\\") + 1);
      if (!checkFormat(val)) {
        val = "";
      }
      $image_item.find(":text").val(val);
    }
    function checkFormat(file_name) {
      var fe = file_name.split(".");
      fe = fe[fe.length - 1].toLowerCase();
      for (var x = 0; x < file_types.length; x++) {
        var te = file_types[x].toLowerCase();
        if (te == fe) {
          return (true);
        }
      }
      return (false);
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
$(document).ready(function() {
  $("#UserNaviButton,#hrefLogin").click(function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $("#LoginDropdownBox").hide();
      $("#ForgottenPasswordDropdownBox").hide();
    } else {
      $(this).addClass("active");
      $("#ForgottenPasswordDropdownBox").hide();
      $("#LoginDropdownBox").show();
    }
    return false;
  });
  $(".forgotten-pass").click(function() {
    $("#LoginDropdownBox").hide();
    $("#ForgottenPasswordDropdownBox").show();
    return false;
  });
  $(".forgotten-login").click(function() {
    $("#LoginDropdownBox").show();
    $("#ForgottenPasswordDropdownBox").hide();
    return false;
  });
  $("a.personal-locker-btn, a.profile-btn").click(function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this).parent("li").find("ul").hide();
    } else {
      $("li.personal-locker ul, li.profile ul").hide();
      $("a.personal-locker-btn, a.profile-btn").removeClass("active");
      $(this).addClass("active");
      $(this).parent("li").find("ul").show();
    }
    return false;
  });
  if ($("#LoginDropdownBox").length) {
    if (window.location.search.indexOf("login=true") > 0) {
      setTimeout(function() {
        $("#hrefLogin").click();
      }, 1000);
    }
    $(".login-trigger").click(function(e) {
      e.preventDefault();
      var $trigger = $(e.currentTarget),
        redirect_url = $trigger.attr("href");
      if (redirect_url.indexOf("#") === 0) {
        redirect_url = "";
      }
      $("#redirectTo").val(redirect_url);
      setTimeout(function() {
        $("#hrefLogin").click();
      }, 1000);
    });
  }
  $("html").click(function() {
    if ($("li.personal-locker ul").is(":visible")) {
      $("li.personal-locker ul").hide();
      $("a.personal-locker-btn").removeClass("active");
    }
    if ($("li.profile ul").is(":visible")) {
      $("li.profile ul").hide();
      $("a.profile-btn").removeClass("active");
    }
    if ($("#LoginDropdownBox").is(":visible")) {
      $("#LoginDropdownBox").hide();
      $("#UserNaviButton,#hrefLogin").removeClass("active");
    }
    if ($("#ForgottenPasswordDropdownBox").is(":visible")) {
      $("#ForgottenPasswordDropdownBox").hide();
      $("#UserNaviButton,#hrefLogin").removeClass("active");
    }
  });
  $("a.personal-locker ul, a.profile ul, #LoginDropdownBox, #ForgottenPasswordDropdownBox").click(function(event) {
    event.stopPropagation();
  });
  $("a.search-button").click(function() {
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $("#SearchPanelWide").hide();
      $("#HeaderContainerWide").addClass("fixed-shadow");
    } else {
      $(this).addClass("active");
      $("#SearchPanelWide").show();
      $("#HeaderContainerWide").removeClass("fixed-shadow");
    }
    return false;
  });
  $(window).scroll(function(event) {
    checkSearchPanelForScroll();
  });
  checkSearchPanelForScroll();
});

function checkSearchPanelForScroll() {
  var scroll = $(window).scrollTop();
  if (scroll === 0) {
    $("a.search-button").addClass("active");
    $("#SearchPanelWide").show();
    $("#HeaderContainerWide").removeClass("fixed-shadow");
  } else {
    if (scroll > 0) {
      $("a.search-button").removeClass("active");
      $("#SearchPanelWide").hide();
      $("#HeaderContainerWide").addClass("fixed-shadow");
    }
  }
}
function pageLoad() {
  $(".forgotten-pass").click(function() {
    $("#LoginDropdownBox").hide();
    $("#ForgottenPasswordDropdownBox").show();
    return false;
  });
}(function($, dermquest, window, undefined) {
  dermquest.register("PdfMenu", new function() {
    var me = {}, $me = {};
    var $drop_down = {}, t = 0;

    function launch() {
      $me = $("#PL_Container");
      if ($me.length) {
        init();
      }
    }
    function init() {
      $me.on("click", ".btn-pdf-options", function(e) {
        e.preventDefault();
      });
      $me.on("mouseenter", function() {
        clearTimeout(t);
        t = setTimeout(function() {
          $me.activate();
        }, 250);
      });
      $me.on("mouseleave", function() {
        clearTimeout(t);
        t = setTimeout(function() {
          $me.deactivate();
        }, 250);
      });
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("PersonalLocker", new function() {
    var me = {}, $me = {};
    var bookmark_id;
    var hide_locker_update_cookie = "hide_locker_updates";

    function launch() {
      $me = $("#personal-locker");
      if ($me.length) {
        init();
      }
      $(document).on("click", ".locker-add-trigger", function(e) {
        e.preventDefault();
        var $trigger = $(e.currentTarget),
          asset = getAssetConfig($trigger.data());
        add(asset);
      });
      $(document).on("click", ".locker-remove-trigger", function(e) {
        e.preventDefault();
        var $trigger = $(e.currentTarget),
          asset = getAssetConfig($trigger.data());
        initRemove(asset);
      });
      $(document).on("change", ".locker-update-preference", function(e) {
        var $trigger = $(e.currentTarget);
        if ($trigger.is(":checked")) {
          hideLockerUpdates();
        }
      });
    }
    function getAssetConfig(data) {
      var asset_config = {
        nodeId: data.nodeId,
        lookupId: data.typeId
      };
      if (data.imageId) {
        asset_config.imageId = data.imageId;
      }
      return asset_config;
    }
    function add(asset) {
      var current_url = document.location.href;
      lockerInteraction({
        url: dermquest.Settings.Resources.locker_add,
        data: asset
      }, function(response) {
        if (response && response.success) {
          addComplete(response.isFirstTimeUse);
        }
      });

      function addComplete(is_first_asset) {
        var hide_updates = dermquest.CookieManager.readCookie(hide_locker_update_cookie),
          $active_triggers = $('.locker-add-trigger[data-node-id="' + asset.nodeId + '"]');
        if (asset.imageId) {
          $active_triggers = $active_triggers.filter(function() {
            return $(this).data("imageId") === asset.imageId;
          });
        }
        $active_triggers.removeClass("locker-add-trigger").addClass("locker-remove-trigger");
        if (!hide_updates) {
          var url = dermquest.Settings.Resources.locker_add_modal;
          if (is_first_asset) {
            url = dermquest.Settings.Resources.locker_first_add_modal;
          }
          dermquest.Common.Modal.open(url);
        }
      }
    }
    function initRemove(asset) {
      dermquest.Common.Modal.confirm({
        url: dermquest.Settings.Resources.remove_confim_modal,
        callback: function() {
          remove(asset);
        }
      });
    }
    function remove(asset) {
      lockerInteraction({
        url: dermquest.Settings.Resources.locker_remove,
        data: asset
      }, function(response, asset) {
        removeComplete(asset);
      });

      function removeComplete() {
        if ($me.length) {
          document.location.reload(true);
        } else {
          var $active_triggers = $('.locker-remove-trigger[data-node-id="' + asset.nodeId + '"]');
          if (asset.imageId) {
            $active_triggers = $active_triggers.filter(function() {
              return $(this).data("imageId") === asset.imageId;
            });
          }
          $active_triggers.removeClass("locker-remove-trigger").addClass("locker-add-trigger");
        }
      }
    }
    function hideLockerUpdates() {
      dermquest.CookieManager.createCookie(hide_locker_update_cookie, true);
    }
    function lockerInteraction(config, callback) {
      $.ajax({
        type: "GET",
        url: config.url,
        dataType: "json",
        data: config.data,
        success: function(data) {
          callback(data);
        }
      });
    }
    function init() {}
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("Poll", new function() {
    var me = {}, $me = {};

    function launch() {
      $me = $(".PollContainer");
      if ($me.length) {
        init();
      }
    }
    function init() {
      if ($(".Graph").length > 0) {
        animateResults();
      }
      $(".PollQuestion .btn").unbind().click(function() {
        var checkedCount = $(this).closest(".PollQuestions").find("input:checked").length;
        if (checkedCount > 0) {
          $(this).closest(".PollQuestions").fadeOut();
          submitPoll(this);
        } else {
          alert("Please select you vote.");
        }
        return false;
      });
    }
    function animateResults(_pollContainer) {
      if (_pollContainer) {
        _pollContainer.find(".Graph").each(function() {
          $(this).css("width", "0");
          var percentage = $(this).attr("rel");
          $(this).css({
            width: "0%"
          }).animate({
            width: percentage
          }, "slow");
        });
      } else {
        $(".Graph").each(function() {
          $(this).css("width", "0");
          var percentage = $(this).attr("rel");
          $(this).css({
            width: "0%"
          }).animate({
            width: percentage
          }, "slow");
        });
      }
      $("div[class$=poll-have-voted]").fadeOut(6000);
    }
    function submitPoll(obj) {
      var pollContainer = $(obj).closest(".PollContainer");
      var pID = pollContainer.find("input[type='hidden']").val();
      var cID = $("input[name='rdoPoll']:checked").val();
      var data = "{'pID':'" + pID + "', 'cID':'" + cID + "'}";
      $.ajax({
        type: "POST",
        url: "/umbraco/plugins/MapTeamsPolls/PollsWebServices.asmx/UpdatePollCount",
        data: data,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(msg) {
          debug.log(msg);
          var template = Hogan.compile($("#MustacheTemplateClient").html());
          var pollHtml = template.render(msg.d);
          pollContainer.find("div.cf").html(pollHtml).hide().fadeIn("fast", function() {
            animateResults(pollContainer);
          });
        },
        error: function(msg) {
          confirm(msg.responseText);
        }
      });
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("Profile", new function() {
    var me = {}, $me = {};
    var idxCourse = 1,
      idxUniversity = 1,
      idxMembership = 1,
      idxPublication = 1;
    var $university_template, $course_template;
    var $modal_template;
    var deleted_string = "DELETED";
    var $publications_section, $teaching_section;

    function launch() {
      $me = $("#profile");
      if ($me.length) {
        init();
      } else {
        $me = $("#registration");
        if ($me.length) {
          $me.on("click", ".submit-trigger", function(e) {
            saveSpecialityChanges();
          });
        }
      }
    }
    function init() {
      $modal_template = Hogan.compile(dermquest.Settings.Templates.confirm_modal);
      $me.on("click", ".submit-trigger", function(e) {
        saveProfileUpdateChanges();
      });

      function initProfileImage() {
        $me.on("change", ":file", function() {
          previewImage(this);
        });
      }
      function initMembership() {
        $me.on("click", ".add-membership-trigger", function(e) {
          e.preventDefault();
          addMembership();
        });
        $me.on("click", ".remove-membership-trigger", function(e) {
          e.preventDefault();
          var $trigger = $(e.currentTarget),
            membershipId = $trigger.data("membership");
          confirmDeleteMembership(membershipId);
        });
      }
      function initTeaching() {
        $university_template = Hogan.compile($("#university-add-item").html());
        $course_template = Hogan.compile($("#course-add-item").html());
        $publication_template = Hogan.compile($("#publication-add-item").html());
        $teaching_section = $("#ProfileTeaching");
        if ($teaching_section.find(".add-item").length <= 0) {
          $teaching_section.deactivate();
        }
        $me.on("click", ".add-university-trigger", function(e) {
          e.preventDefault();
          addUniversity();
        });
        $me.on("click", ".remove-university-trigger", function(e) {
          e.preventDefault();
          var $trigger = $(e.currentTarget),
            $item = $trigger.parents(".add-item.university").eq(0);
          confirmDeleteUniversity($item);
        });
        $me.on("click", ".add-course-trigger", function(e) {
          e.preventDefault();
          var $trigger = $(e.currentTarget),
            $item = $trigger.parents(".add-item").eq(0);
          addCourse($item);
        });
        $me.on("click", ".remove-course-trigger", function(e) {
          e.preventDefault();
          var $trigger = $(e.currentTarget),
            $item = $trigger.parents(".add-item").eq(0);
          confirmDeleteCourse($item);
        });
      }
      function initPublications() {
        var $publications_sections = $("#ProfilePublications");
        if ($publications_sections.find(".add-item").length <= 0) {
          $publications_sections.deactivate();
        }
        $me.on("click", ".add-publication-trigger", function(e) {
          e.preventDefault();
          addPublication();
        });
        $me.on("click", ".remove-publication-trigger", function(e) {
          e.preventDefault();
          var $trigger = $(e.currentTarget),
            $item = $trigger.parents(".add-item").eq(0);
          confirmDeletePublication($item);
        });
      }
      function initAccountDelete() {
        $me.on("click", ".delete-account-trigger", function(e) {
          e.preventDefault();
          confirmDeleteAccount();
        });
      }
      initMembership();
      initTeaching();
      initPublications();
      initAccountDelete();
      initProfileImage();
    }
    function saveSpecialityChanges() {
      $("#hdnAreasOfInterest").val(getAreasOfInterest());
    }
    function saveProfileUpdateChanges() {
      $("#hdnAreasOfInterest").val(getAreasOfInterest());
      $("#hdnPublication").val(getPublications());
      $("#hdnTeaching").val(getTeaching());
    }
    function getPublications() {
      var $publication_section = $("#ProfilePublications"),
        $items = $publication_section.find(".add-item").find("textarea");
      return getValues($items, "\r\n");
    }
    function getAreasOfInterest() {
      var $interests_section = $(".areaOfInterest"),
        $items = $interests_section.find(":checked");
      return getValues($items, ";");
    }
    function getValues($items, delimiter) {
      var rtn = [];
      for (var i = 0, l = $items.length; i < l; i++) {
        var val = $items.eq(i).val();
        if (val.length > 0 && val !== deleted_string) {
          rtn.push(val);
        }
      }
      if (delimiter) {
        rtn = rtn.join(delimiter);
      }
      return rtn;
    }
    function getTeaching() {
      var teaching = [],
        $teaching_section = $("#ProfileTeaching"),
        $universities = $teaching_section.find(".university");
      for (var i = 0, l = $universities.length; i < l; i++) {
        var $university = $universities.eq(i),
          $courses = $university.children(".university-courses").find(":text"),
          university_name = $university.children(".add-item").find(":text").val();
        if (university_name.length > 0) {
          var university = {
            univeristy: $university.children(".add-item").find(":text").val(),
            courses: getValues($courses)
          };
          teaching.push(university);
        }
      }
      return JSON.stringify(teaching);
    }
    function confirmDeleteAccount() {
      fancyboxConfirm("DELETE ACCOUNT AND ALL ACCOUNT DATA?", 'We are sorry to see you go. Please consider <a href="/footer/contact-us/">contacting us</a> with any questions or feedback you might have.<br/><br/>Deleting your account will permanently delete all your account data.<br/><br/><strong>This action is irreversible.</strong>', function(ret) {
        if (ret) {
          confirm("Delete");
        }
      });
    }
    function confirmDeletePublication($item) {
      var id = $item.data("id"),
        $name = $("#" + id),
        siblings_count = $item.siblings(".add-item").not(".inactive").length,
        $wrapper = $item.parents(".add-list").eq(0);
      dermquest.Common.Modal.confirm({
        title: "DELETE PUBLICATION?",
        content: "Are you sure you want to delete this publication?",
        callback: function() {
          $item.remove();
          if (siblings_count < 1) {
            $wrapper.deactivate();
          }
        }
      });
    }
    function addPublication() {
      var newIDX = "newPublication" + (idxPublication++),
        $item = $($publication_template.render({
          id: newIDX
        })),
        $add_list = $("#ProfilePublications"),
        $list = $add_list.children("ul");
      $add_list.activate();
      $list.append($item);
      $item.find("textarea").eq(0).trigger("focus");
    }
    function addCourse($item) {
      var newIDX = "newCourse" + (idxCourse++),
        $course_item = $($course_template.render({
          id: newIDX,
          university_id: university_id
        })),
        university_id = $item.data("id"),
        $add_list = $item.find(".add-list"),
        $list = $add_list.children("ul"),
        $focussed_input = $course_item.find(":text").eq(0);
      $add_list.activate();
      $list.append($course_item);
      $focussed_input.trigger("focus");
    }
    function confirmDeleteCourse($course_item) {
      var id = $course_item.data("id"),
        siblings_count = $course_item.siblings(".add-item").length,
        $wrapper = $course_item.parents(".university-courses");
      dermquest.Common.Modal.confirm({
        title: "DELETE COURSE?",
        content: "Are you sure you want to delete this course?",
        callback: function() {
          $course_item.remove();
          if (siblings_count < 1) {
            $wrapper.deactivate();
          }
        }
      });
    }
    function confirmDeleteUniversity($item) {
      var id = $item.data("id");
      $name = $("#" + id);
      siblings_count = $item.siblings(".add-item").not(".inactive").length;
      $wrapper = $item.parents(".add-list").eq(0);
      dermquest.Common.Modal.confirm({
        title: "DELETE UNIVERSITY?",
        content: "Are you sure you want to delete this university?",
        callback: function() {
          $item.remove();
          if (siblings_count < 1) {
            $wrapper.deactivate();
          }
        }
      });
    }
    function addUniversity() {
      var newIDX = "newUniversity" + (idxUniversity++),
        $item = $($university_template.render({
          id: newIDX
        })),
        $add_list = $("#ProfileTeaching"),
        $list = $add_list.children("ul"),
        $focussed_input = $item.find(":text").eq(0);
      $add_list.activate();
      $list.append($item);
      $focussed_input.trigger("focus");
    }
    function confirmDeleteMembership(id) {
      var pc = $("#" + id + " option:selected").text();
      var pi = $("#" + id + " option:selected").index();
      if (pi == 0) {
        pc = "";
      }
      fancyboxConfirm("DELETE PROFESSIONAL MEMBERSHIP?", "Are you sure you want to delete this membership?<br/><br/><strong>" + pc + "</strong>", function(ret) {
        if (ret) {
          $("#ProfileMemberships .ProfileMembership[rel='" + id + "']").hide(1000, function() {
            $("#" + id + ">option:eq(0)").attr("selected", true);
          });
        }
      });
    }
    function addMembership() {
      var newIDX = "newMembership" + (idxMembership++);
      var newLink = "#";
      var newMembership = '<div class="ProfileMembership" rel="' + newIDX + '"><div class="floatLeft formSelect"><select id="' + newIDX + '" name="' + newIDX + '" class="pretty_nofloat ProfileMembership"><option selected>Please select</option><option>American Academy of Dermatology</option><option>American Dermatological Association</option><option>A.N.Other Membership</option></select></div><div class="floatLeft"><a href="' + newLink + '" data-membership="' + newIDX + '" class="buttonRemove remove-membership-trigger"></a></div><br class="clear" /></div>';
      $("#ProfileMemberships").append(newMembership);
      $("#" + newIDX).dropkick();
    }
    function previewImage(input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        $image_preview = $(input).siblings(".preview-image");
        reader.onload = function(e) {
          $image_preview.attr("src", e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("Quiz", new function() {
    var me = {}, $me = {};
    var $quiz_answer;

    function launch() {
      $me = $("#quiz-question");
      if ($me.length) {
        init();
      }
    }
    function init() {
      $quiz_answer = $("#quiz-answer");
      $me.on("click", ".reveal-trigger", function(e) {
        e.preventDefault();
        showAnswer();
      });
      $me.on("keyup", function(e) {
        if (e.keyCode === 13) {
          e.preventDefault();
          showAnswer();
        }
      });
    }
    function showAnswer() {
      var answer = $me.find(":text").val();
      if (answer.length > 0) {
        $quiz_answer.fadeIn();
        $("html, body").animate({
          scrollTop: $me.offset().top
        }, 500);
      }
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, x) {
  dermquest.register("RandomImageCarousel", new function() {
    var me = {};
    var $me, $carousel, $thumbnails, $nav_items, $case_info_wrapper, $locker_triggers, $zoom_window, $zoom_window_wrapper, $interaction_instructions;
    var $carousel;

    function launch() {
      $me = $("#random-image-carousel");
      $locker_triggers = $("#locker-triggers").find("a");
      $zoom_window_wrapper = $("#image-holder-wrapper");
      $zoom_window = $("#image-holder");
      $case_info_wrapper = $(".case-summary-panel");
      $interaction_instructions = $(".interaction-instructions");
      var instructions_template = Hogan.compile(dermquest.Settings.Templates.image_click_interation);
      if (Modernizr.touch) {
        instructions_template = Hogan.compile(dermquest.Settings.Templates.image_touch_interaction);
      }
      $interaction_instructions.html(instructions_template.render({
        href: "data-image-id",
      }));
      if ($me.length) {
        $(window).load(function() {
          init();
        });
        var $back_triggers = $(".back-trigger");
        if (document.referrer.indexOf("image-library") < 0) {
          $back_triggers.deactivate();
        } else {
          $back_triggers.activate();
        }
      }
    }
    function init() {
      $carousel = $me.find("ol");
      $thumbnails = $(".image-listing");
      $nav_items = $thumbnails.children("ul").children("li");
      $case_summaries = $(".case-summary-panel").find(".case-summary");
      var start_index = $nav_items.filter(".selected").index() || 0;
      $carousel.carouFredSel({
        circular: true,
        items: {
          visible: 1,
          start: start_index
        },
        scroll: {
          fx: "scroll"
        },
        infinite: false,
        auto: true,
        width: "auto",
        scroll: {
          onBefore: function($old, $new) {
            $interaction_instructions.stop().dequeue().fadeTo(100, 0);
          },
          onAfter: function($old, $new) {
            initZoom($new);
            update($new);
          },
          pauseOnHover: true
        },
        onCreate: function($new) {
          update($new);
          initZoom($new);
          $me.activate();
        }
      });
      $me.on("click", ".next", function(e) {
        $carousel.trigger("next");
        $carousel.auto = false;
        $carousel.trigger("start", true);
      });
      $me.on("click", ".previous", function(e) {
        $carousel.trigger("prev");
        $carousel.trigger("auto", false);
      });
      $thumbnails.on("click", "a", function(e, dont_scroll) {
        e.preventDefault();
        var index = $(this).parents("li").index();
        slideTo(index);
        if (!dont_scroll) {
          resetScroll();
        }
      });
      updateLockerButton(start_index);
    }
    function back() {}
    function hideOverview() {
      $zoom_window_wrapper.activate();
      $case_info_wrapper.hide();
    }
    function showOverview() {
      $zoom_window_wrapper.deactivate();
      $case_info_wrapper.show();
    }
    function initZoom($item) {
      if (!$item.find(".zoom-preview").length) {
        $item.on("mousedown", "img", function(e) {
          return false;
        });
        var $figure = $item.find("figure"),
          $image = $figure.find("img"),
          medium_image_width = $image.width(),
          medium_image_height = $image.height(),
          max_width = 639,
          max_height = $image.height(),
          ratio = 1;
        var $link = $figure.find("a").not(".iom-highlight"),
          zoom_image_path = escape($link.attr("href")),
          zoom_image = new Image();
        zoom_image.onload = function(e) {
          $interaction_instructions.fadeTo(250, 1);
          var zoom_image_width = zoom_image.width,
            zoom_image_height = zoom_image.height,
            ratio = zoom_image_width / medium_image_width,
            preview_width = medium_image_width,
            preview_height = medium_image_height;
          if (preview_width < zoom_image_width) {
            preview_width = max_width;
            preview_height = max_height;
          }
          if (medium_image_width + 20 < zoom_image_width) {
            $(".image-options").find(".floatLeft").show();
            var $preview = $('<span class="zoom-preview" />'),
              max_x = zoom_image.width - medium_image_width,
              max_y = zoom_image.height - medium_image_height,
              preview_offset;
            var css = {
              width: preview_width,
              height: preview_height,
              "background-image": "url(" + zoom_image_path + ")",
              "margin-left": -preview_width / 2,
              top: $image.position().top,
              "background-position": "0px 0px"
            };
            $preview.css(css).fadeTo(0, 0);
            $link.append($preview);
            $preview.on("mouseenter touchstart", function(e) {
              e.preventDefault();
              $preview.fadeTo(250, 1);
              move(e);
            });
            $preview.on("mousemove touchmove", function(e) {
              e.preventDefault();
              move(e);
            });
            $preview.on("mouseleave touchend", function(e) {
              preview_offset = undefined;
              $preview.stop().dequeue().fadeTo(100, 0);
            });
            $preview.on("mousedown click tap", function(e) {
              return false;
            });

            function move(e) {
              if (e.originalEvent.targetTouches) {
                e.pageX = e.originalEvent.targetTouches[0].pageX;
                e.pageY = e.originalEvent.targetTouches[0].pageY;
              }
              if (preview_offset === undefined) {
                preview_offset = $preview.offset();
              }
              var preview_position = {
                left: Math.floor(e.pageX - preview_offset.left),
                top: Math.floor(e.pageY - preview_offset.top)
              };
              x_position = preview_position.left / preview_width, y_position = preview_position.top / preview_height, zoom_image_center2 = {
                left: zoom_image_width * x_position,
                top: zoom_image_height * y_position
              }, preview_center2 = {
                left: preview_position.left - zoom_image_center2.left,
                top: preview_position.top - zoom_image_center2.top
              };
              $preview.css({
                "background-position": preview_center2.left + "px " + preview_center2.top + "px"
              });
            }
          } else {
            $(".image-options").find(".floatLeft").hide();
          }
        };
        zoom_image.src = zoom_image_path;
      } else {
        $interaction_instructions.fadeTo(250, 1);
      }
    }
    function update($new) {
      $carousel.trigger("currentPage", function(new_index) {
        var $active_item = $nav_items.eq(new_index);
        if (!$active_item.is(".selected")) {
          var $trigger = $active_item.find(".switch-trigger");
          $trigger.trigger("click", true);
        }
        updateLockerButton(new_index);
        updateDownloadButton($new);
      });
    }
    function updateDownloadButton($item) {
      var hi_res_path = escape($item.find(".preview-image").attr("href")),
        $image_options = $(".image-options"),
        $image_option_links = $image_options.find("a");
      for (var i = 0, l = $image_option_links.length; i < l; i++) {
        var $link = $image_option_links.eq(i),
          href = hi_res_path;
        if ($link.is(".download-link")) {
          href += "?dl=true&wm=true";
        }
        if ($link.is(".fullsize-link")) {
          href += "?wm=true";
        }
        $link.attr("href", href);
      }
    }
    function updateLockerButton(index) {
      var active_id = $nav_items.eq(index).attr("data-image-id");
      for (var i = 0, l = $locker_triggers.length; i < l; i++) {
        var $trigger = $locker_triggers.eq(i),
          image_id = $trigger.attr("data-image-id");
        if (image_id === active_id) {
          $trigger.activate();
        } else {
          $trigger.deactivate();
        }
      }
    }
    function slideTo(index) {
      $carousel.trigger("currentPage", function(current_page) {
        if (current_page !== index) {
          $carousel.trigger("slideTo", index);
        }
      });
    }
    function resetScroll() {
      $("html, body").animate({
        scrollTop: $("#image-detail-panel").offset().top
      }, 500);
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("Router", new function() {
    var me = {}, $me = {};
    var AppRouter = Backbone.Router.extend({
      routes: {
        "image-search/:filters": "image-search",
        "*path": "default"
      }
    }),
      me = new AppRouter;

    function init() {}
    me.init = init;
    return _.extend(me, Backbone.Events);
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("Search", new function() {
    var me = {}, $me = {};

    function launch() {
      $me = $("#search-results");
      if ($me.length) {
        init();
      }
    }
    function init() {
      $("#site-search-mode").change(function() {
        var q = dermquest.Common.getQueryString("q");
        if ($(this).val() == "1") {
          window.location = "/search-results-list/?q=" + q;
        } else {
          if ($(this).val() == "0") {
            window.location = "/results/?q=" + q;
          }
        }
      });
      $me.on("filter:change", ".filters", function(e, obj) {
        var $panel = getRelatedPanel(obj.$input);
        if ($panel.length) {
          togglePanel($panel, obj.active);
        }
      });
      var $filters = $me.find(".filters").find("input");
      for (var i = 0, l = $filters.length; i < l; i++) {
        var $filter = $filters.eq(i),
          $panel = getRelatedPanel($filter);
        if ($panel.length) {
          $panel.children(".panel-header").append('<label class="close-trigger" for="' + $filter.attr("id") + '"></label>');
        }
      }
    }
    function getRelatedPanel($input) {
      var $panel = $(),
        id = $input.data("resultsId");
      if (id) {
        $panel = $("#" + id + "-search-results");
      }
      return $panel;
    }
    function togglePanel($panel, show) {
      var target_opacity = (show) ? 1 : 0;
      $panel.fade(target_opacity, function(show) {
        if (show) {
          $panel.activate();
        } else {
          $panel.deactivate();
        }
      });
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("SocialLinks", new function() {
    var me = {}, $me = {};

    function launch() {
      $me = $(document);
      if ($me.length) {
        init();
      }
    }
    function init() {
      $me.on("click", ".share-trigger", function(e) {
        e.preventDefault();
        share(this.href);
      });
    }
    function share(url) {
      var $window = $(window),
        width = 575,
        height = 400,
        left = ($window.width() - width) / 2,
        top = ($window.height() - height) / 2,
        options = "status=1,width=" + width + ",height=" + height + ",top=" + top + ",left=" + left;
      window.open(url, "twitter", options);
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("Tracking", new function() {
    var me = {}, $me = {};

    function launch() {
      if (_gaq) {
        init();
      }
    }
    function init() {
      $(document).on("click", 'a[track="true"]', function() {
        var $trigger = $(this);
        trackEvent($trigger.attr("category"), $trigger.attr("action"), $trigger.attr("dataValue"));
      });
    }
    function trackEvent(category, action, dataValue) {
      _gaq.push(["_trackEvent", category, action, dataValue]);
    }
    me.launch = launch;
    me.trackEvent = trackEvent;
    return me;
  });
}(jQuery, dermquest, window));
(function($, dermquest, window, undefined) {
  dermquest.register("VerticalCarousel", new function() {
    var me = {}, $me = {};
    var lastICSelect;

    function launch() {
      $me = $("#image-carousel");
      if ($me.length) {
        init();
      }
    }
    function init() {
      var ICStatus = function(oldItems, newItems) {
        var firstItem = $(".CarouselItem:first", newItems).attr("rel");
        var lastItem = $(".CarouselItem:last", newItems).attr("rel");
        $("#ImageCarouselStatus").html(firstItem + " - " + lastItem + " of " + $me.find(".CarouselItem").length + " images");
      };
      $me.before("<div class='CarouselNavLarge'><a id='ImageCarouselPrev' class='NavUp'></a><a id='ImageCarouselNext' class='NavDown'></a></div>").carouFredSel({
        circular: true,
        infinite: true,
        direction: "up",
        items: {
          visible: 1,
          width: 250,
          height: 350
        },
        scroll: {
          onAfter: ICStatus,
          items: 1
        },
        onCreate: function(newItems) {
          var idx = 1;
          var total = $me.find(".CarouselItem").length;
          $me.find(".CarouselItem").each(function() {
            $("img", this).after(idx + " of " + total);
            $(this).attr("rel", idx);
            idx++;
          });
          var firstItem = $(".CarouselItem:first", newItems).attr("rel");
          var lastItem = $(".CarouselItem:last", newItems).attr("rel");
          $("#ImageCarouselStatus").html(firstItem + " - " + lastItem + " of " + $("#image-carousel .CarouselItem").length + " images");
        },
        auto: false,
        width: 250,
        height: 350,
        prev: "#ImageCarouselPrev",
        next: "#ImageCarouselNext"
      });
      $me.on("click", ".CarouselItem", function(e) {
        e.preventDefault();
        IC_Select($(this).data("item"));
      });
    }
    function IC_Select(idx) {
      if (idx == lastICSelect) {
        return;
      }
      lastICSelect = idx;
      $me.find(".CarouselItem a.selected").removeClass("selected");
      $me.find(".CarouselItem[rel='" + idx + "']").children("a").addClass("selected");
      var $thumb = $me.find(".CarouselItem[rel='" + idx + "']").find("img"),
        img_src = $thumb.data("imageSrc");
      var $dummy_image = $("<img/>");
      $dummy_image.on("load", function() {
        $("#ImageCarouselFullsize img").fadeOut(300, function() {
          $("#ImageCarouselFullsize img").attr("src", img_src).fadeIn(500);
        });
        delete $dummy_image;
      });
      $dummy_image.attr("src", img_src);
    }
    me.launch = launch;
    return me;
  });
}(jQuery, dermquest, window));
