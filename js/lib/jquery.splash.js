require(['jquery', 'mustache'], function($, Mustache) {
  // Splashy splashy!
  (function ($) {
    $.fn.extend({
      splash: function(args) {
        var el = $(this);
        $.ajax('/common/js/lib/jquery.splash.mst').done(function(template) {
          $(el).html(Mustache.render(template, args)).fadeIn(500);
        });
      }
    });
  }(jQuery));
});

