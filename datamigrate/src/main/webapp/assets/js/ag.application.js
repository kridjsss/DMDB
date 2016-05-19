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
moduleControllers.controller("moduleController", function($scope, $window) {
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
				[ 'InProgress', 4000 ], [ 'Completed', 30000 ] ]

	};

	$scope.dynamicChartContainer = false;
	$scope.drawModuleChart = function() {
		moduleData = google.visualization.arrayToDataTable(
				$scope.chartsData.Modules, false);
		dashboard = new google.visualization.Dashboard(document
				.getElementById('dashboard_div'));
		// Create a range slider, passing some options
		var recordsRangeSlider = new google.visualization.ControlWrapper({
			'controlType' : 'NumberRangeFilter',//StringFilter
			'containerId' : 'moduleNumber_filterId',
			'options' : {
				'filterColumnLabel' : 'Count'
			}
//			'state': {'lowValue': 1000, 'highValue': 80000}
		});
		var moduleFilter = new google.visualization.ControlWrapper({
			'controlType' : 'StringFilter',//StringFilter
			'containerId' : 'moduleString_filterId',
			'options' : {
				'filterColumnLabel' : 'Modules'
			}
		});
		// Create a pie chart, passing some options
		moduleChart = new google.visualization.ChartWrapper({
			'chartType' : 'BarChart',
			'containerId' : 'module_chartContainer',
			'options' : {
				'width' : 520,
				'height' : 500,
				'pieSliceText' : 'value',
				'legend' : 'right',
				'is3D' : true,
				'title':"How Much Modules Data Left to Migrate."
			//'chartArea': {'left': 25, 'top': 15, 'right': 0, 'bottom': 0}
			}
		});
		// Establish dependencies, declaring that 'filter' drives 'pieChart',
		// so that the pie chart will only display entries that are let through
		// given the chosen slider range.
		dashboard.bind([ recordsRangeSlider, moduleFilter ], moduleChart);

		// Draw the dashboard.
		dashboard.draw(moduleData);
		google.visualization.events.addListener(moduleChart, 'ready',
				function() {
					google.visualization.events.addListener(moduleChart
							.getChart(), 'select', moduleHandler);
				});

	}
	$scope.chartInfoValue = null;
	$scope.drawDynamicChart = function(value) {
		
		if (!$scope.chartsData[value])
			return;
		
		$scope.chartInfoValue = value;
		$scope.dynamicChartContainer = true;

		// Create the data table.
		data = google.visualization.arrayToDataTable($scope.chartsData[value],
				false);
		
		dashboard = new google.visualization.Dashboard(document
				.getElementById('dashboard_div'));
		
		var filter = new google.visualization.ControlWrapper({
			'controlType' : 'StringFilter',//StringFilter
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
				'width' : 520,
				'height' : 500,
				'pieSliceText' : 'value',
				'legend' : 'right',
				'is3D' : true,
				'title':"How Much "+value+" Data Left to Migrate."
			//'chartArea': {'left': 25, 'top': 15, 'right': 0, 'bottom': 0}
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
			id : '1',
			name : 'ColumnChart'
		}
	};

	$scope.chartAxes = {
		availableOptions : [ {
			id : '1',
			name : 'Migrated'
		}, {
			id : '2',
			name : 'Not-Migrated'
		} ],
		selectedXaxes : {
			id : '1',
			name : 'Migrated'
		},
		selectedYaxes : {
			id : '2',
			name : 'Not-Migrated'
		}
	};
	$scope.toggleModuleDropdown = function(){
			var x = document.getElementById("moduleDropdownId");
			if (x.className.indexOf("w3-show") == -1) {
				x.className += " w3-show";
			} else {
				x.className = x.className.replace(" w3-show", "");
			}
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