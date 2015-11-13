// Setup
requirejs.config({
  baseUrl: '/common/js/lib',
  paths: {
    analytics: '//www.google-analytics.com/analytics',
    bootstrap: '//maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min',
    d3: '//cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min',
    featherlight: '//cdn.rawgit.com/noelboss/featherlight/1.3.4/release/featherlight.min',
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
    'jquery.cors' : ['jquery'],
    'readmore': ['jquery'],
    'humane': ['jquery'],
    'featherlight': ['jquery'],
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
