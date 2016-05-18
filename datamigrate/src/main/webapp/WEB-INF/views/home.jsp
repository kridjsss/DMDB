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
	<%-- <jsp:include page="modules.jsp" />--%>
	<header class="w3-container w3-card-4 w3-theme w3-top">
		<div class="w3-row">
			<div class="w3-col" style="width: 80%">
				<h1>
					<i class="w3-opennav fa fa-bars" data-ng-click="nav_openAndClose()"></i>
					<data-pd-title data-ng-style="{'margin-left':marginleft}">
					</data-pd-title>
				</h1>
			</div>
			<div class="w3-col"
				style="width: 20%; padding-top: 20px; padding-right: -70px">
				<a href='${pageContext.request.contextPath}/logout'>Logout</a>
			</div>
		</div>


	</header>

	<nav class="w3-sidenav w3-card-2 w3-white w3-top" style="width: 30%;"
		data-ng-show="showNavigation">
		<div class="w3-container w3-theme-d2">
			<span data-ng-click="nav_openAndClose()"
				class="w3-closenav w3-right w3-xlarge">x</span> <br>
			<div class="w3-padding w3-center">
				<img class="w3-circle"
					src="${pageContext.request.contextPath}/assets/images/winstream_min_logo.png"
					alt="avatar" style="width: 30px">Modules<span
					class="w3-badge w3-green">{{modules.length}}</span>
			</div>
		</div>
		<br>
		<div data-ng-repeat="module in modules">
			<a href="#" class="dropbtn"
				data-ng-click="show=!show;drawDynamicChart(module.name)">{{module.name}}</a>
			<div class="w3-indigo w3-padding-ver-8" data-ng-show="show"
				data-ng-repeat="menu in module.menu">
				<a href="#"
					data-ng-click="showme=!showme;drawDynamicChart(menu.value)">{{menu.value}}</a>
				<!-- 				<div class="w3-brown w3-padding-ver-16"
					data-ng-repeat="submenu in menu.submenu" data-ng-show="showme">
					<a href="#" data-ng-click='drawDynamicChart(submenu)'>{{submenu}}</a>
				</div> -->
			</div>
		</div>
	</nav>

	<div data-ng-style="{'margin-top':'75px'}">
		<div class="w3-row" id="dashboard_div">
			<!-- 			<span data-ng-click="chartInfo=!chartInfo"
				class="w3-closenav w3-right w3-xlarge">x</span> -->
			<div class="w3-col m6">
				<!--Divs that will hold each control and chart-->
				<div id="moduleString_filterId"></div>
				<div id="module_chartContainer"></div>
				<div id="moduleNumber_filterId"></div>

			</div>
			<div class="w3-col m6" data-ng-show='dynamicChartContainer'
				data-ng-style="{'border-width':'0px 1px 1px 1px','border-style':'solid','border-color':'black'}">
				<div id="moduleType_filterId"></div>
				<div id="dynamic_chartContainer"></div>
				Choose Chart Type:<select name="chartType"
					data-ng-options="option.name for option in chartType.availableOptions track by option.id"
					data-ng-model="chartType.selectedOption"
					data-ng-change="drawDynamicChart(chartInfoValue)"></select>
			</div>
		</div>
	</div>
	<footer class="w3-container w3-theme w3-bottom">Last Account
		Activity: 1 hour ago</footer>
</body>
</html>