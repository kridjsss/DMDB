//defining the root angular module called datamigration and injecting the another angular module called moduleControllers
var app = angular.module("datamigration", [ 'moduleControllers' ]);
var dynamicChart
var moduleChart
var data, moduleData
// Create a dashboard.
var dashboard

app.directive('pdTitle', function() {
	return {
		ristrict : 'AE',
		template : "Data Migration Dashboard"
	}
});

// creating the separate module for controllers
var moduleControllers = angular.module('moduleControllers', []);

// defining the module controller
moduleControllers.controller("moduleController", function($scope, $log) {
	//$scope.$log  = $log
	$scope.chartsData = {
		"Modules" : [ [ 'Modules', 'Count' ], [ 'Proposal', 180000 ],
				[ 'Quote', 1170 ], [ 'Order Enrichment', 2000 ],
				[ 'OM', 20000 ], [ 'Provisioning', 3000 ], [ 'Billing', 4000 ],
				[ 'Mediation', 5000 ], [ 'Service Qualification', 2300 ],
				[ 'Other', 5000 ] ],
		"Proposal" : [ [ 'Proposal Types', 'Count' ], [ 'Residential', 90000 ],
				[ 'Enterprise', 30000 ], [ 'Wholesale', 60000 ] ],
		"Residential" : [ [ 'Status', 'Count' ], [ 'Open', 10000 ],
				[ 'InProgress', 50000 ], [ 'Completed', 30000 ] ],
		"Enterprise" : [ [ 'Status', 'Count' ], [ 'Open', 1400 ],
				[ 'InProgress', 25600 ], [ 'Completed', 3000 ] ],
		"Wholesale" : [ [ 'Status', 'Count' ], [ 'Open', 26000 ],
				[ 'InProgress', 4000 ], [ 'Completed', 30000 ] ],
		"Phases" : [ [ 'Phases', 'Count' ], [ 'Phase1', 10000 ],
				[ 'Phase2', 20000 ], [ 'Phase3', 30000 ] ],
		"DataFailed" : [ [ 'Phases', 'Count' ], [ 'Phase1', 2000 ],
				[ 'Phase2', 1500 ],['Phase3', 200 ] ],
		"MigrationPlan":[['Phases','Name','Start','End'],['Phase1 Migration Plan','Phase1',new Date(2016,06,04),new Date(2016,06,28)],['Phase2 Migration Plan','Phase2',new Date(2016,07,01),new Date(2016,08,18)],['Phase3 Migration Plan','Phase3',new Date(2016,08,20),new Date(2016,09,28)],['Phase4 Migration Plan','Phase4',new Date(2016,10,01),new Date(2016,12,18)]]

	};
	

	$scope.createDashboard1 = function() {

		moduleData = google.visualization.arrayToDataTable(
				$scope.chartsData.Modules, false);

		dashboard = new google.visualization.Dashboard(document
				.getElementById('dashboard_div'));

		var recordsRangeSlider = new google.visualization.ControlWrapper({
			'controlType' : 'NumberRangeFilter',// StringFilter
			'containerId' : 'moduleNumber_filterId',
			'options' : {
				'filterColumnLabel' : 'Count'
			}
		});
		var moduleFilter = new google.visualization.ControlWrapper({
			'controlType' : 'StringFilter',// StringFilter
			'containerId' : 'moduleString_filterId',
			'options' : {
				'filterColumnLabel' : 'Modules'
			}
		});
		// Create a Bar chart, passing some options
		moduleChart = new google.visualization.ChartWrapper({
			'chartType' : 'BarChart',
			'containerId' : 'module_chartContainer',
			'options' : {
				'width' : 360,
				'height' : 400,
				'pieSliceText' : 'value',
				'legend' : 'right',
				'is3D' : true,
				'title' : "How Much Data Left to Migrate in Each Module"
			// 'chartArea': {'left': 25, 'top': 15, 'right': 0, 'bottom': 0}
			}
		});

		dashboard.bind([ recordsRangeSlider, moduleFilter ], moduleChart);

		dashboard.draw(moduleData);

		google.visualization.events.addListener(moduleChart, 'ready',
				function() {
					google.visualization.events.addListener(moduleChart
							.getChart(), 'select', moduleHandler);
				});

	}

	$scope.createDashboard2 = function() {

		var phasesData = google.visualization.arrayToDataTable(
				$scope.chartsData.Phases, false);

		dashboard = new google.visualization.Dashboard(document
				.getElementById('dashboard_div'));

		var phasesFilter = new google.visualization.ControlWrapper({
			'controlType' : 'StringFilter',// StringFilter
			'containerId' : 'phasesString_filterId',
			'options' : {
				'filterColumnLabel' : 'Phases'
			}
		});
		// Create a Bar chart, passing some options
		var phasesChart = new google.visualization.ChartWrapper({
			'chartType' : 'PieChart',
			'containerId' : 'phases_chartContainer',
			'options' : {
				'width' : 360,
				'height' : 400,
				'pieSliceText' : 'value',
				'legend' : 'left',
				'title' : "How Much Data Left to Migrate in Each Phase"
			// 'chartArea': {'left': 25, 'top': 15, 'right': 0, 'bottom': 0}
			}
		});
		dashboard.bind(phasesFilter, phasesChart);
		dashboard.draw(phasesData);

	}
	
	$scope.createDashboard3 = function() {

		dashboard = new google.visualization.Dashboard(document
				.getElementById('dashboard_div'));

		var DataFailed = google.visualization.arrayToDataTable(
				$scope.chartsData.DataFailed, false);

		var phasesFilter = new google.visualization.ControlWrapper({
			'controlType' : 'StringFilter',// StringFilter
			'containerId' : 'dataFailedString_filterId',
			'options' : {
				'filterColumnLabel' : 'Phases'
			}
		});

		// Create a Bar chart, passing some options
		var dataFailedChart = new google.visualization.ChartWrapper({
			'chartType' : 'LineChart',
			'containerId' : 'dataFailed_chartContainer',
			'options' : {
				'width' : 320,
				'height' : 400,
				'title' : "How Much Data Failed in Each Phase",
				'colors':['#ff3333']
			}
		});
		dashboard.bind(phasesFilter, dataFailedChart);
		dashboard.draw(DataFailed);

	}
	$scope.createDashboard4 = function() {

		dashboard = new google.visualization.Dashboard(document
				.getElementById('dashboard_div'));

		var DataFailed = google.visualization.arrayToDataTable(
				$scope.chartsData.MigrationPlan, false);

		var phasesFilter = new google.visualization.ControlWrapper({
			'controlType' : 'StringFilter',// StringFilter
			'containerId' : 'migrationPlanString_filterId',
			'options' : {
				'filterColumnLabel' : 'Phases'
			}
		});

		// Create a Bar chart, passing some options
		var dataFailedChart = new google.visualization.ChartWrapper({
			'chartType' : 'Timeline',
			'containerId' : 'migrationPlan_chartContainer',
			'options' : {
				'width' : 400,
				'height' : 400,
				'timeline': { showRowLabels: false}
			}
		});
		dashboard.bind(phasesFilter, dataFailedChart);
		dashboard.draw(DataFailed);

	}

	$scope.drawModuleChart = function() {
		
		$scope.createDashboard1();
		$scope.createDashboard2();
		$scope.createDashboard3();
		$scope.createDashboard4();
	}

	$scope.chartInfoValue = null;
	$scope.drawDynamicChart = function(value, evt) {

		if (!$scope.chartsData[value])
			return;
		if(!!evt)
			$scope.activeTablink(evt)
		
		document.getElementById("modal01").style.display = "block";

		//$scope.showConfigurationContainer = false;
		//$scope.showDashboardContainer = false;
		//$scope.showModuleContainer = true;
		$scope.chartInfoValue = value;

		// Create the data table.
		data = google.visualization.arrayToDataTable($scope.chartsData[value],
				false);

		dashboard = new google.visualization.Dashboard(document
				.getElementById('dashboard_div'));

		var filter = new google.visualization.ControlWrapper({
			'controlType' : 'StringFilter',// StringFilter
			'containerId' : 'moduleType_filterId',
			'options' : {
				'filterColumnLabel' : $scope.chartsData[value][0][0]
			}
		});
		// Create a pie chart, passing some options
		dynamicChart = new google.visualization.ChartWrapper({
			'chartType' : $scope.chartType.selectedOption.name,
			'containerId' : 'dynamic_chartContainer',
			'options' : {
				'width' : 320,
				'height' : 400,
				'pieSliceText' : 'value',
				'legend' : 'right',
				'is3D' : true,
				'title' : "How Much " + value + " Data Left to Migrate."
			// 'chartArea': {'left': 25, 'top': 15, 'right': 0, 'bottom': 0}
			}
		});
		dashboard.bind(filter, dynamicChart);

		// Draw the dashboard.
		dashboard.draw(data);
		google.visualization.events.addListener(dynamicChart, 'ready',
				function() {
					google.visualization.events.addListener(dynamicChart
							.getChart(), 'select', subModuleHandler);
				});
	}

	$scope.modules = [

	{
		name : "Proposal",
		menu : [ {
			value : 'Residential',
			submenu : [ 'Open', 'InProgress', 'Completed' ]
		}, {
			value : 'Wholesale',
			submenu : [ 'Open', 'InProgress', 'Completed' ]
		}, {
			value : 'Enterprise',
			submenu : [ 'Open', 'InProgress', 'Completed' ]
		} ]
	}, {
		name : "Quote",
	}, {
		name : "Order Enrichment",
	}, {
		name : "OM",
	}, {
		name : "Provisioning",
	}, {
		name : "Billing",
	}, {
		name : "Mediation",
	}, {
		name : "Service Qualification",
	} ];

	$scope.chartType = {
		availableOptions : [ {
			id : '1',
			name : 'PieChart'
		}, {
			id : '2',
			name : 'BarChart'
		}, {
			id : '3',
			name : 'Histogram'
		}, {
			id : '4',
			name : 'AreaChart'
		}, {
			id : '5',
			name : 'ColumnChart'
		} ],
		selectedOption : {
			id : '5',
			name : 'ColumnChart'
		}
	};

	$scope.tilesAlignment = {
		availableOptions : [ {
			id : '1',
			name : 'Left'
		}, {
			id : '2',
			name : 'Center'
		}, {
			id : '3',
			name : 'Right'
		} ],
		selectedOption : {
			id : '1',
			name : 'Left'
		}
	}

	$scope.chartFilters = {
		availableOptions : [ {
			id : '1',
			name : 'Numeric'
		}, {
			id : '2',
			name : 'String'
		} ],
		selectedOption : {
			id : '1',
			name : 'String'
		}
	}

	$scope.toggleModuleDropdown = function() {
		var x = document.getElementById("moduleDropdownId");
		if (x.className.indexOf("w3-show") == -1) {
			x.className += " w3-show";
		} else {
			x.className = x.className.replace(" w3-show", "");
		}
	}

	$scope.showConfiguration = function(evt) {
		$scope.showDashboardContainer = false;
		$scope.showConfigurationContainer = true;
		$scope.activeTablink(evt);
	}
	$scope.showDashboard = function(evt) {
		$scope.showConfigurationContainer = false;
		$scope.showDashboardContainer = true;
		$scope.activeTablink(evt);
	}
	$scope.activeTablink = function(evt) {
		var i, x, tablinks;
		tablinks = document.getElementsByClassName("tablink");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" w3-pink",
					"");
		}
		evt.currentTarget.className += " w3-pink";
	}
	$scope.showDashboardContainer = true;
	
	$scope.showConfigProperties = false;
	
	$scope.showProperties = function(){
		$scope.showConfigProperties = true
	}
});

function moduleHandler() {
	var selectedItem = moduleChart.getChart().getSelection()[0];
	if (selectedItem) {
		var value = moduleData.getValue(selectedItem.row, 0);
		var $scope = angular.element(document.getElementsByTagName('body')[0])
				.scope();
		$scope.$apply(function() {
			$scope.drawDynamicChart(value);
		});
	}
}
function subModuleHandler() {
	var selectedItem = dynamicChart.getChart().getSelection()[0];
	if (selectedItem) {
		var value = data.getValue(selectedItem.row, 0);
		var $scope = angular.element(document.getElementsByTagName('body')[0])
				.scope();
		$scope.$apply(function() {
			$scope.drawDynamicChart(value);
		});
	}

}
