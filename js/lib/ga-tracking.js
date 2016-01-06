---
---
{% if site.ga_tracking_code %}
require(['jquery', 'ga'], function($, ga) {
  if($.isFunction(ga)) {
    ga('send', 'pageview');

    // // Track click events
    $('body').on('click', '.ga-track', function() {
      ga('send', {
        hitType: 'event',
        eventCategory: this.getAttribute('data-tracking-category'),
        eventAction: 'click',
        eventLabel: this.getAttribute('data-tracking-label'),
        eventValue: this.getAttribute('data-tracking-value')
      });
    });
  } else {
    console.log("I see you're blocking Google Analytics ;)");
  }
});
{% else %}
console.log("_config.yml did not specify a ga_tracking_code");
{% endif %}
