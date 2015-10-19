require(["jquery"], function($) {
  var status_io_page_id = "532b466499798da4200000cc";

  $.ajax({
    url: "https://status.io/1.0/status/" + status_io_page_id,
  }).done(function(response) {
    var max_status = 100;
    $.each(response.result.status, function(idx, stat) {
      if(stat.name.match(/^API/)) {
        $.each(stat.containers, function(idx, substat) {
          max_status = Math.max(max_status, substat.status_code);
        });
      }
    });

    // Yes, I could pull the status message out of the API, but this allows
    // me to control it when people complain
    var message = "All systems go!";
    var level = "default";
    switch(max_status) {
      case 100:
        console.log("All systems running normally");
        return;

      case 300:
        message = "Degraded Performance";
        level = "warning";
        break;

      case 400:
        message = "Partial Service Disruption";
        level = "warning";
        break;

      case 500:
        message = "Service Disruption";
        level = "danger";
        break;

      case 600:
        message = "Security Event";
        level = "info";
        break;
    }

    $("#socrata-status button")
      .addClass("btn-" + level)
      .attr("title", message)
      .attr("data-content", 'For more information see <a href="http://status.socrata.com">status.socrata.com</a>')
      .text(message)
      .popover();
    $("#socrata-status")
      .show();
  }).fail(function(results) {
    console.log("Error retrieving current site status: " + results);
  });
});
