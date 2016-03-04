define(["jquery"], function($) {
  $.fn.extend({
    search_link: function() {
      $(this).each(function() {
        // Lame, I know, but it's just a 404 page
        $(this).attr("href", 
            "/search.html?q=" 
            + window.location.pathname.replace(/^\//, "")
              .replace(/\.html/, "")
              .split(/[.-\/]/)
              .join("+"));
      });
    }
  });
});
