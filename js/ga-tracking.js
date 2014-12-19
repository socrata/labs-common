// Turn any clickable element into a trackable Google Analytic event
//
// How to use:
// - Add the "ga-track" class
// - Add "data-action", "data-label", and "data-value" attributes to pass data to gajs:
// https://developers.google.com/analytics/devguides/collection/gajs/eventTrackerGuide#SettingUpEventTracking
$(".ga-track").click(function() {
  _gaq.push(["_trackEvent", this.getAttribute("data-action"), this.getAttribute("data-label"), this.getAttribute("data-value")]);
});
