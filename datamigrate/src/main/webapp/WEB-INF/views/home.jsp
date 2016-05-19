<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html data-ng-app="datamigration">
<head>
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Data Migration Dashboard</title>
<link rel="shortcut icon"
	href="${pageContext.request.contextPath}/assets/images/winstream_min_logo.png"
	type="image/png">
<link rel="stylesheet" href="http://www.w3schools.com/lib/w3.css">
<link rel="stylesheet"
	href="http://www.w3schools.com/lib/w3-theme-red.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/assets/css/font-awesome.min.css">
<link rel="stylesheet"
	href="${pageContext.request.contextPath}/assets/css/custom.css">
<script
	src="http://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<script type="text/javascript"
	src="${pageContext.request.contextPath}/assets/js/gcharts.js"></script>
<script
	src="${pageContext.request.contextPath}/assets/js/ag.application.js"></script>
<script type="text/javascript"
	src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript">
	// Load the Visualization API and the controls package.
	google.charts.load('current', {
		'packages' : [ 'controls', 'corechart' ]
	});
	google.charts.setOnLoadCallback(drawChart);
</script>

</head>
<body data-ng-controller="moduleController">
	<div class="w3-top">
		<ul class="w3-navbar w3-red w3-large">
			<li><img class="w3-circle"
				src="${pageContext.request.contextPath}/assets/images/winstream_min_logo.png"
				alt="avatar" style="width: 30px"></li>
			<li data-pd-title></li>
			<li><a href="#" data-ng-click='showDashboard=!showDashboard'><i
					class="fa fa-tachometer fa-fw" aria-hidden="true"></i>&nbsp;Dashboard</a></li>
			<li><a href="#"><i class="fa fa-cog fa-fw"
					aria-hidden="true"></i>&nbsp;Configure</a></li>
			<li  data-ng-mouseleave='toggleModuleDropdown()' class="w3-dropdown-click"><a href="#" data-ng-click='toggleModuleDropdown()'><i
					class="fa fa-pencil fa-fw" aria-hidden="true"></i>&nbsp;Modules</a>
				<div id='moduleDropdownId' class="w3-dropdown-content w3-white w3-card-4" data-ng-style="{'height':'223px','overflow-y':'scroll'}">
					<a href="#" data-ng-repeat="module in modules" data-ng-click="drawDynamicChart(module.name)">{{module.name}}</a>
				</div></li>
			<li><a href="${pageContext.request.contextPath}/logout"><i
					class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Logout</a></li>
		</ul>
	</div>
	<%-- 	
	<nav class="w3-sidenav w3-card-2 w3-white w3-top" style="width: 20%;">
		<div class="w3-container w3-theme-d2">
			<!-- 			<span data-ng-click="nav_openAndClose()"
				class="w3-closenav w3-right w3-xlarge">x</span> <br> -->
			<div class="w3-padding w3-center">
				<img class="w3-circle"
					src="${pageContext.request.contextPath}/assets/images/winstream_min_logo.png"
					alt="avatar" style="width: 30px">
			</div>
		</div>
		<br>
		
		<a href='#' class='dropbtn' data-ng-click='showDashboard=!showDashboard'><i class="fa fa-tachometer fa-fw" aria-hidden="true"></i>&nbsp;Dashboard</a>
		<a href='#' class='dropbtn'><i class="fa fa-cog fa-fw" aria-hidden="true"></i>&nbsp;Configuration</a>
		<a class="dropbtn" href="#" data-ng-click='displayModules=!displayModules'><i class="fa fa-pencil fa-fw" aria-hidden="true"></i> Modules<span
					class="w3-badge w3-grey">{{modules.length}}</span></a>
		<div data-ng-repeat="module in modules" class='w3-padding-ver-6' data-ng-show='displayModules'>
			<a href="#" class="dropbtn"
				data-ng-click="show=!show;drawDynamicChart(module.name)">{{module.name}}</a>
			<div class="w3-indigo w3-padding-ver-8" data-ng-show="show"
				data-ng-repeat="menu in module.menu">
				<a href="#"
					data-ng-click="showme=!showme;drawDynamicChart(menu.value)">{{menu.value}}</a>
			</div>
		</div>
	</nav> --%>

	<div data-ng-style="{'margin-top':'75px'}" data-ng-show='showDashboard'>
		<div class="w3-row" id="dashboard_div">
			<div class="w3-col m6">
				<!--Divs that will hold each control and chart-->
				<div id="moduleString_filterId"></div>
				<div id="module_chartContainer"></div>
				<div id="moduleNumber_filterId"></div>

			</div>
			<div class="w3-col m6">
				<div id="moduleType_filterId"></div>
				<div id="dynamic_chartContainer"></div>
				<span data-ng-show='dynamicChartContainer'>Choose Chart Type:<select
					name="chartType"
					data-ng-options="option.name for option in chartType.availableOptions track by option.id"
					data-ng-model="chartType.selectedOption"
					data-ng-change="drawDynamicChart(chartInfoValue)"></select></span>
			</div>
		</div>
	</div>
	<footer class="w3-container w3-theme w3-bottom">Last Account
		Activity: 1 hour ago</footer>

</body>
</html>