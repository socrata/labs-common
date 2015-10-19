// Setup
requirejs.config({
  baseUrl: '/common/js/lib',
  paths: {
    jquery: '//ajax.googleapis.com/ajax/libs/jquery/1.11.2/jquery.min',
    underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min',
    d3: '//cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min',
    bootstrap: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min',
    analytics: '//www.google-analytics.com/analytics',
    mustache: '//cdnjs.cloudflare.com/ajax/libs/mustache.js/2.1.3/mustache.min',
    highcharts: '//code.highcharts.com/highcharts',
    highcharts_data: '//code.highcharts.com/modules/data',
    zeroclipboard: 'ZeroClipboard.min'
  },
  shim: {
    'bootstrap': ['underscore', 'jquery'],
    'emphasis': ['jquery'],
    'jquery.forgiving': ['jquery'],
    'readmore': ['jquery'],
    'humane': ['jquery'],
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
    }
  }
});
