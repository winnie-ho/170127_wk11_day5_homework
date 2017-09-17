var scatterChart = function(title, seriesName, dataArray, catArray){
	var container = document.querySelector("#pr-matrix");
	var dataArrayConvert = dataArray.map(run => run.moving_time);
	var chart = new Highcharts.Chart({
		chart: {
			type: "scatter",
			renderTo: container,
			backgroundColor: "rgba(0, 0, 0, 0)",
			zoomType: "xy"
		},
		title: {
			text: title,
			style: {
				"fontSize": "12px",
				 "color": "white"
			}
		},
		series:[{
			name: seriesName,
			data: dataArrayConvert,	
			color: "white",		
			style: {
				"fontSize": "12px",
				"color": "white"
			},
		}],
		legend: {
			color: 'white',
			fill: 'white'
		},
		xAxis: {
			title: {
				enabled: true,
				text: 'Date',
				style: {
					"fontSize": "12px",
					"color": "white"
				}
			},
			labels: {
				style: {
						color: 'white'
				},
			},
			startOnTick: true,
			endOnTick: true,
			showLastLabel: true,
	},
	yAxis: {
		title: {
			enabled: true,
			text: 'Time',
			color: "white",
			style: {
				"fontSize": "12px",
				"color": "white"
			},
		},
		labels: {
			style: {
					color: 'white'
			},
		},
		startOnTick: true,
		endOnTick: true,
		showLastLabel: true,
	},
	plotOptions: {
		scatter: {
			marker: {
				radius: 5,
				states: {
					hover: {
						enabled: true,
						lineColor: 'rgb(100,100,100)'
					}
				}
			},
			states: {
				hover: {
					marker: {
						enabled: false
					}
				}
			},
			tooltip: {
				headerFormat: '<b>{series.name}</b><br>',
				pointFormat: '{point.x}, {point.y} seconds'
			}
		}
	},
	});
}