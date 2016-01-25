---
---

{% if site.ga_tracking_code %}
  // GA Setup
  window.GoogleAnalyticsObject = '__ga__';
  window.__ga__ = {
    q: [['create', '{{ site.ga_tracking_code }}', 'auto']],
    l: Date.now()
  };
{% endif %}

// Setup
requirejs.config({
  baseUrl: '{{site.root}}/common/js/lib',
  paths: {
    ga: '//www.google-analytics.com/analytics',
    bootstrap: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min',
    d3: '//cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min',
    featherlight: '//cdn.rawgit.com/noelboss/featherlight/1.3.4/release/featherlight.min',
    googlemaps: '//maps.googleapis.com/maps/api/js?sensor=true',
    highcharts: '//code.highcharts.com/highcharts',
    highcharts_data: '//code.highcharts.com/modules/data',
    jquery: 'jquery.min',
    mustache: 'mustache.min',
    underscore: 'underscore-min',
    zeroclipboard: 'ZeroClipboard.min'
  },
  shim: {
    'bootstrap': ['underscore', 'jquery'],
    'emphasis': ['jquery'],
    'jquery.forgiving': ['jquery'],
    'jquery.redirect': ['jquery'],
    'jquery.splash': ['jquery', 'mustache'],
    'jquery.cors' : ['jquery'],
    'readmore': ['jquery'],
    'humane': ['jquery'],
    'featherlight': ['jquery'],
    '404': ['jquery'],
    'highcharts' : {
      deps: ['jquery'],
      exports: 'Highcharts'
    },
    'highcharts_data' : {
      deps: ['highcharts']
    },
    'underscore': {
      exports: '_'
    },
    'mustache': {
      exports: 'Mustache',
      init: function() { return Mustache }
    },
    'zeroclipboard': {
      exports: 'ZeroClipboard'
    },
    'd3': {
      exports: 'd3'
    },
    'googlemaps': {
      exports: 'google'
    },
    'ga' : {
      exports: '__ga__'
    }
  }
});
