var db = openDatabase('migrationDB', '1.0', 'Test DB', 2 * 1024 * 1024);

db.transaction(function (tx) {
    tx.executeSql('CREATE TABLE MigrationInfo (id unique, category,name,data_left)');
    
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (1, "Modules","Proposal",180000)');
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (2, "Modules","Quote",1170)');
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (3, "Modules","Order Enrichment",2000)');
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (4, "Modules","OM",20000)');
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (5, "Modules","Provisioning",3000)');
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (6, "Modules","Billing",4000)');
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (7, "Modules","Mediation",5000)');
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (8, "Modules","Service Qualification",2300)');
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (9, "Modules","Other",5000)');
    
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (10, "Proposal","Residential",90000)');
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (11, "Proposal","Enterprise",30000)');
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (12, "Proposal","Wholesale",60000)');
    
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (13, "Residential","Open",10000)');
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (14, "Residential","InProgress",50000)');
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (15, "Residential","Completed",30000)');

    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (16, "Enterprise","Open",1400)');
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (17, "Enterprise","InProgress",25600)');
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (18, "Enterprise","Completed",3000)');
    
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (19, "Wholesale","Open",26000)');
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (20, "Wholesale","InProgress",4000)');
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (21, "Wholesale","Completed",30000)');
    
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (22, "Phases","Phase1",10000)');
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (23, "Phases","Phase2",20000)');
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (24, "Phases","Phase3",30000)');
    
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (25, "DataFailed","Phase1",2000)');
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (26, "DataFailed","Phase2",1500)');
    tx.executeSql('INSERT INTO MigrationInfo (id, category,name,data_left) VALUES (27, "DataFailed","Phase3",200)');
    
 });

db.transaction(function(tx) {
	tx.executeSql('SELECT * FROM MigrationInfo', [], function(tx, results) {
		
		var len = results.rows.length, i;
		var modulesData = [],proposalData = [], residentialData = [], enterpriseData = [], wholesaleData = [], phasesData = [],dataFailedInfo = [];

		modulesData.push(['Modules','Count']); proposalData.push(['Proposal Types','Count']); residentialData.push(['Status','Count'])
		enterpriseData.push(['Status','Count']); wholesaleData.push(['Status','Count']); phasesData.push(['Phases','Count']); dataFailedInfo.push(['Phases','Count'])
		
		for (i = 0; i < len; i++) {
			var data = []
			var row = results.rows.item(i);
			var category = row.category;
			
			data.push(row.name)
			data.push(row.data_left)
			
			switch (category) {
			case "Modules":
				modulesData.push(data);
				break;
			case "Proposal":
				proposalData.push(data)
				break;
			case "Residential":
				residentialData.push(data);
				break;
			case "Enterprise":
				enterpriseData.push(data);
				break;
			case "Wholesale":
				wholesaleData.push(data);
				break;
			case "Phases":
				phasesData.push(data);
				break;
			case "DataFailed":
				dataFailedInfo.push(data);
				break;
			}
		}
		
		var $scope = angular.element(document.getElementsByTagName('body')[0])
		.scope();
		
		$scope.$apply(function() {
			$scope.chartsData.Modules = modulesData; $scope.chartsData.Proposal = proposalData
			$scope.chartsData.Residential = residentialData; $scope.chartsData.Enterprise = enterpriseData
			$scope.chartsData.Wholesale = wholesaleData; $scope.chartsData.Phases = phasesData; $scope.chartsData.DataFailed = dataFailedInfo
		});

	}, null);
});