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
<script type="text/javascript"
	src="${pageContext.request.contextPath}/assets/js/ag.application.js"></script>

<script type="text/javascript"
	src="${pageContext.request.contextPath}/assets/js/soyutils.js"></script>
<script src="${pageContext.request.contextPath}/assets/js/dashboard.js"></script>
<script src="${pageContext.request.contextPath}/assets/js/app.js"></script>


<script type="text/javascript"
	src="https://www.gstatic.com/charts/loader.js"></script>
<script type="text/javascript">
	// Load the Visualization API and the controls package.
	google.charts.load('current', {
		'packages' : [ 'controls', 'corechart','timeline','line' ]
	});
	google.charts.setOnLoadCallback(drawChart);
</script>

</head>
<body data-ng-controller="moduleController">
	<header class="w3-top" data-ng-style="{'background-color':'#336699'}">
		<ul class="w3-navbar w3-large w3-collapse">
			<li><img class="w3-circle"
				src="${pageContext.request.contextPath}/assets/images/winstream_min_logo.png"
				alt="avatar" style="width: 30px"></li>
			<li data-pd-title></li>
			<li><a href="#" data-ng-click='showDashboard($event)'
				class="tablink w3-pink"><i class="fa fa-tachometer fa-fw"
					aria-hidden="true"></i>&nbsp;Dashboard</a></li>
			<li><a href="#" data-ng-click='showConfiguration($event)'
				class="tablink"><i class="fa fa-cog fa-fw" aria-hidden="true"></i>&nbsp;Configuration</a></li>
			<li data-ng-mouseleave='toggleModuleDropdown()'
				class="w3-dropdown-click"><a href="#"
				data-ng-mouseover='toggleModuleDropdown()' class="tablink"><i
					class="fa fa-pencil fa-fw" aria-hidden="true"></i>&nbsp;Modules</a>
				<div id='moduleDropdownId'
					class="w3-dropdown-content w3-white w3-card-4"
					data-ng-style="{'height':'223px','overflow-y':'scroll'}">
					<a href="#" data-ng-repeat="module in modules" class="tablink"
						data-ng-click="drawDynamicChart(module.name,$event)">{{module.name}}</a>
				</div></li>
			<li><a href="${pageContext.request.contextPath}/logout"><i
					class="fa fa-sign-out" aria-hidden="true"></i>&nbsp;Logout</a></li>
		</ul>
	</header>
	<div class='content-heightdiv'
		id="dashboard_div" data-ng-show='showDashboardContainer'>
		<div class='w3-row-padding'>
			<script type="text/javascript">
				document.write(dashboard.tiles.modules());
				document.write(dashboard.tiles.phasesMigrationPlan());
				document.write(dashboard.tiles.phases());
			</script>
		</div>
		<div class='w3-row-padding'>
			<script type="text/javascript">
				document.write(dashboard.tiles.errorData());
			</script>
		</div>
	</div>
	<div id="modal01" class="w3-modal">
		<div class="w3-modal-content w3-animate-zoom">
			<header class="w3-container w3-teal">
				<span
					onclick="document.getElementById('modal01').style.display='none'"
					class="w3-closebtn">&times;</span>
				<h2>Chart Info</h2>
			</header>
			<div class="w3-container w3-padding-large" id="img01">
				<div id="moduleType_filterId"></div>
				<div id="dynamic_chartContainer"></div>
				<span>Choose Chart Type:<select name="chartType"
					data-ng-options="option.name for option in chartType.availableOptions track by option.id"
					data-ng-model="chartType.selectedOption"
					data-ng-change="drawDynamicChart(chartInfoValue)"></select></span>
			</div>
			<footer class="w3-container w3-teal">
				<p></p>
			</footer>
		</div>
	</div>
<!-- 	<div class="w3-container w3-border content-heightdiv"
		data-ng-show="showModuleContainer"></div> -->

	<div class="content-heightdiv"
		data-ng-show='showConfigurationContainer'>
		<div class="w3-row-padding">
			<div class="w3-col m8 w3-border w3-container config-boxshow">
				<table class="w3-table">
					<caption>Dashboard Customization</caption>
					<tr>
						<td>Modules Data Migration</td>
						<td><button class="w3-btn w3-white w3-border" data-ng-click='showProperties()'>Configure</button></td>
					</tr>
					<tr>
						<td>Phases Migration Plan</td>
						<td><button class="w3-btn w3-white w3-border">Configure</button></td>
					</tr>
					<tr>
						<td>Phases Data Migration</td>
						<td><button class="w3-btn w3-white w3-border">Configure</button></td>
					</tr>
					<tr>
						<td>Data Failed in Each Phase</td>
						<td><button class="w3-btn w3-white w3-border">Configure</button></td>
					</tr>
				</table>
			</div>
			<div class="w3-container w3-col m4 w3-border config-boxshow" data-ng-show='showConfigProperties'>
				<table class="w3-table">
					<caption>Properties</caption>
					<tr>
						<td>Alignment</td>
						<td><select
							data-ng-options="option.name for option in tilesAlignment.availableOptions track by option.id"
							data-ng-model="tilesAlignment.selectedOption">
						</select></td>
					</tr>
					<tr>
						<td>Filter</td>
						<td><select
							data-ng-options="option.name for option in chartFilters.availableOptions track by option.id"
							data-ng-model="chartFilters.selectedOption"></select></td>
					</tr>
					<tr>
						<td>Chart Type</td>
						<td><select
							data-ng-options="option.name for option in chartType.availableOptions track by option.id"
							data-ng-model="chartType.selectedOption"></select></td>
					</tr>
					<tr>
						<td>Chart Width</td>
						<td><input type="number" size='10' min='200' max='400'
							value='320' /> in px</td>
					</tr>
					<tr>
						<td>Chart Height</td>
						<td><input type='number' size='10' min='400' max='600'
							value='400' /> in px</td>
					</tr>
					<tr>
						<td>Title</td>
						<td><span>How Much Data Left to Migrate</span></td>
					</tr>
					<tr>
						<td>is3D</td>
						<td><input type='checkbox' /></td>
					</tr>
					<tr>
						<td>Legend</td>
						<td><select><option>Left</option>
								<option>Right</option></select></td>
					</tr>
					<tr>
						<td>Enable</td>
						<td><input type='checkbox' data-ng-model='enableSelected' /></td>
					</tr>

					<tr>
						<th colspan="2" style="text-align: center; padding-top: 20px;"><button
								class="w3-btn w3-white w3-border" data-ng-click="showConfigProperties=!showConfigProperties">Save</button>
								<button
								class="w3-btn w3-white w3-border" data-ng-click="showConfigProperties=!showConfigProperties">Cancel</button>
								</th>
					</tr>

				</table>
			</div>

		</div>

	</div>

	<footer class="w3-container w3-bottom"
		data-ng-style="{'background-color':'#336699'}">Last Account
		Activity: 1 hour ago</footer>

</body>
</html>