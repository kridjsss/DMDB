// This file was automatically generated from dashboard.soy.
// Please don't edit this file by hand.

/**
 * @fileoverview Templates in namespace dashboard.tiles.
 */

if (typeof dashboard == 'undefined') { var dashboard = {}; }
if (typeof dashboard.tiles == 'undefined') { dashboard.tiles = {}; }


dashboard.tiles.modules = function(opt_data, opt_ignored) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="w3-col m4 custom-chart-transition"><span onclick="this.parentElement.style.display=\'none\'" class="w3-closebtn"><i class="fa fa-trash-o" aria-hidden="true"></i></i></span><div id="moduleString_filterId"></div><div id="module_chartContainer"></div><div id="moduleNumber_filterId"></div></div>');
};
if (goog.DEBUG) {
  dashboard.tiles.modules.soyTemplateName = 'dashboard.tiles.modules';
}


dashboard.tiles.phases = function(opt_data, opt_ignored) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="w3-col m4 custom-chart-transition"><span onclick="this.parentElement.style.display=\'none\'" class="w3-closebtn"><i class="fa fa-trash-o" aria-hidden="true"></i></span><div id="phasesString_filterId"></div><div id="phases_chartContainer"></div><div id="phasesNumber_filterId"></div></div>');
};
if (goog.DEBUG) {
  dashboard.tiles.phases.soyTemplateName = 'dashboard.tiles.phases';
}


dashboard.tiles.errorData = function(opt_data, opt_ignored) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="w3-col m4 custom-chart-transition"><span onclick="this.parentElement.style.display=\'none\'" class="w3-closebtn"><i class="fa fa-trash-o" aria-hidden="true"></i></span><div id="dataFailedString_filterId"></div><div id="dataFailed_chartContainer"></div><div id="dataFailedNumber_filterId"></div></div>');
};
if (goog.DEBUG) {
  dashboard.tiles.errorData.soyTemplateName = 'dashboard.tiles.errorData';
}


dashboard.tiles.phasesMigrationPlan = function(opt_data, opt_ignored) {
  return soydata.VERY_UNSAFE.ordainSanitizedHtml('<div class="w3-col m4 custom-chart-transition"><span onclick="this.parentElement.style.display=\'none\'" class="w3-closebtn"><i class="fa fa-trash-o" aria-hidden="true"></i></span><div id="migrationPlanString_filterId"></div><div id="migrationPlan_chartContainer"></div><div id="migrationPlanNumber_filterId"></div></div>');
};
if (goog.DEBUG) {
  dashboard.tiles.phasesMigrationPlan.soyTemplateName = 'dashboard.tiles.phasesMigrationPlan';
}
