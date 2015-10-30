require(["jquery"], function($) {
  // Lame, I know, but it's just a 404 page
  $(".search").attr("href", "/search.html?q=" + window.location.pathname.replace(/^\//, "").replace(/\.html/, "").split(/[.-\/]/).join("+"));
});
