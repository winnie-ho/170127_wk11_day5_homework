const kmChart = function(parkRuns){
	const container = document.querySelector("#km-chart");
	const dateFormatted = parkRuns.slice().map(run => renderDate(run.start_date)).reverse();
	const clone = kmSegments.map(kmX => kmX.slice());
	clone.map(kmX => kmX.reverse());
	const formattedKmDataArrays = clone.map(array => array.map(seg => seg.moving_time * 1000));
	
	const chart = new Highcharts.Chart({
		chart: {
			type: "line",
			renderTo: container,
			backgroundColor: "rgba(0, 0, 0, 0)",
			zoomType: "xy"
		},
		title: {
			text: "Park Run KM Breakdown",
			style: {
				"fontSize": "12px",
				 "color": "white"
			}
		},
		tooltip: {
			pointFormatter: function () {
					var ser = this.series;
					return '<span style="color:' + ser.color + '" >●</span> ' +
									ser.name + ': <b>' +
									Highcharts.dateFormat('%H:%M:%S', this.y) + '</b><br>';
			},
		},
		series:[
			{
				name: "km 1",
				data: formattedKmDataArrays[0],
				color: "#f4a142",		
				style: {
					"fontSize": "12px",
					"color": "#f4a142"
				},
			},
			{
				name: "km 2",
				data: formattedKmDataArrays[1],
				color: "#f1f441",		
				style: {
					"fontSize": "12px",
					"color": "#f1f441"
				},
			},
			{
				name: "km 3",
				data: formattedKmDataArrays[2],
				color: "#4cf441",		
				style: {
					"fontSize": "12px",
					"color": "#4cf441"
				},
			},
			{
				name: "km 4",
				data: formattedKmDataArrays[3],
				color: "#f441eb",		
				style: {
					"fontSize": "12px",
					"color": "#f441eb"
				},
			},
			{
				name: "km 5",
				data: formattedKmDataArrays[4],
				color: "#54c6ff",		
				style: {
					"fontSize": "12px",
					"color": "#54c6ff"
				},
			}
		],
		xAxis: {
			title: {
				enabled: true,
				text: 'Date',
				style: {
					"fontSize": "12px",
					"color": "white"
				}
			},
			categories: dateFormatted,
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
		type: 'datetime',		
		gridLineWidth: 0.1,
		title: {
			enabled: true,
			text: 'Time (s)',
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
	legend: {
		itemStyle:{'color':'white'}
	}
	});
}