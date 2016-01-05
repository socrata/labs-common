---
---
{% if site.ga_tracking_code %}
require(['jquery', 'ga'], function($, ga) {
  if($.isFunction(ga)) {
    ga('create', '{{ site.ga_tracking_code }}', 'auto');
    ga('send', 'pageview');

    // Track click events
    $('body').on('click', '.ga-track', function() {
      ga('send', {
        hitType: 'event',
        eventCategory: this.getAttribute('data-action'),
        eventAction: 'click',
        eventLabel: this.getAttribute('data-label'),
        eventValue: this.getAttribute('data-value')
      });
    });
  } else {
    console.log("I see you're blocking Google Analytics ;)");
  }
});
{% else %}
// _config.yml did not specify a ga_tracking_code
{% endif %}
