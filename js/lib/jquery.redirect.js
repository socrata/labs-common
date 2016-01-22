// I do a lot of redirects, so make it friendly
(function ($) {
  $.redirect = function(url) {
    window.location.replace(url);
    if(url.match(/#/)) {
      window.location.reload();
    }
  };
}(jQuery));

