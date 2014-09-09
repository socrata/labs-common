var tumblr_api_key = "6riKIeh1riQjxAbnkngT3nFj4IzcNlCu3XcIrXp4o3CpdvqjTs";

$.ajax({
  dataType: "jsonp",
  url: "http://api.tumblr.com/v2/blog/status.socrata.com/posts/text?api_key=" + tumblr_api_key + "&limit=1",
}).done(function(results) {
  var last_post = results.response.posts[0];
  if(last_post.title != "All Systems Normal") {
    // Something has gone wrong! Attempt to parse it out of the body
    var matches = last_post.body.match(/([A-Z]+)!/);
    if(matches) {
      var level = "default";
      var message = "All systems go!";

      switch(matches[1]) {
        case "GREEN":
          console.log("All systems running normally");
          return;
        case "MAINTENANCE":
          level = "info";
          message = "Maintenence Mode";
          break;
        case "YELLOW":
          level = "warning";
          message = "Intermittent Issues";
          break;
        case "RED":
          level = "danger";
          message = "API Outage";
          break;
      }

      $("#socrata-status button")
        .addClass("btn-" + level)
        .attr("title", last_post.title)
        .attr("data-content", 'For more information see <a href="http://status.socrata.com">status.socrata.com</a>')
        .text(message)
        .popover();
      $("#socrata-status")
        .show();
    } else {
      console.log("Could not parse an alert level out of body");
    }
  }
}).fail(function(results) {
  console.log("Error retrieving current site status: " + results);
});
