---
---
$(".related-pages").each(function(index, element){
  var related_div = element;
  $.getJSON('{{ site.root }}/related.json', function(data, status) {
    // See what we've got for this page
    path = location.pathname.replace(/\.html$/, '') + location.hash;
    related = data[path];

    if(related) {
      output = "<h3>Related Pages</h3><ul>";

      $.each(related, function(idx, page) {
        output += '<li><a href="' + page.url + '">' + page.title + '</a></li>';
      });

      output += "</ul>";
      $(related_div).append(output);
    }
  }).error(function() { 
    $(".related-pages").append("<p class=\"error\">There was an error retrieving related.json. This shouldn't happen.</p>");
  });
});
