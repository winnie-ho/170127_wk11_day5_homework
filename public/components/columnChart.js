var chart = function(title, dataArray){
	var container = document.querySelector("#pr-matrix");
	var sortedDataArray = dataArray.sort((a,b) => new Date(a.start_date) - new Date(b.start_date));


	var dataArrayTime = sortedDataArray.map(run => run.moving_time);
	let timeFormatted = dataArrayTime.map(time => renderTime(time));
	var dataArrayDate = sortedDataArray.map(run => run.start_date);
	let dateFormatted = dataArrayDate.map(date => renderDate(date));

	var chart = new Highcharts.Chart({
		chart: {
			type: "line",
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
		series:[
			{
				name: "Time",
				data: dataArrayTime,
				color: "white",		
				style: {
					"fontSize": "12px",
					"color": "white"
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
		gridLineWidth: 0.1,
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
			categories: timeFormatted,		
		},
		startOnTick: true,
		endOnTick: true,
		showLastLabel: true,
	}
	});
}