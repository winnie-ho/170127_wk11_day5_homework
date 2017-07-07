var ColumnChart = function(title, seriesName, dataArray, catArray){
	var container = document.querySelector("#distance");
	var chart = new Highcharts.Chart({
		chart: {
			type: "column",
			renderTo: container,
			backgroundColor: "#EBF5FB"
		},
		title: {
			text: title,
			style: {"fontSize": "12px", "color": "#1F618D"}
		},
		series:[{
			name: seriesName,
			data: dataArray
		}],
		xAxis: {
			categories: catArray,
			title: {style: {"color": "#1F618D"}}
		}, 
		yAxis: {
			ceiling: 60,
			minorTickInterval: 10
		}

	});
}