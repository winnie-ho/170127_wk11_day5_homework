const chart = function(title, dataArray){
	const container = document.querySelector("#pr-matrix");
	const sortedDataArray = dataArray.sort((a,b) => new Date(a.start_date) - new Date(b.start_date));


	const dataArrayTime = sortedDataArray.map(run => run.moving_time);
	const timeFormatted = dataArrayTime.map(time => renderTime(time));
	const dataArrayDate = sortedDataArray.map(run => run.start_date);
	const dateFormatted = dataArrayDate.map(date => renderDate(date));
	const dataArrayKm1 = kmSegs[0].map(seg => seg.moving_time);
	const dataArrayKm2 = kmSegs[1].map(seg => seg.moving_time);
	const dataArrayKm3 = kmSegs[2].map(seg => seg.moving_time);
	const dataArrayKm4 = kmSegs[3].map(seg => seg.moving_time);
	const dataArrayKm5 = kmSegs[4].map(seg => seg.moving_time);

	const chart = new Highcharts.Chart({
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
			},
			{
				name: "km 1",
				data: dataArrayKm1,
				color: "#f4a142",		
				style: {
					"fontSize": "12px",
					"color": "#f4a142"
				},
			},
			{
				name: "km 2",
				data: dataArrayKm2,
				color: "#f1f441",		
				style: {
					"fontSize": "12px",
					"color": "#f1f441"
				},
			},
			{
				name: "km 3",
				data: dataArrayKm3,
				color: "#4cf441",		
				style: {
					"fontSize": "12px",
					"color": "#4cf441"
				},
			},
			{
				name: "km 4",
				data: dataArrayKm4,
				color: "#f441eb",		
				style: {
					"fontSize": "12px",
					"color": "#f441eb"
				},
			},
			{
				name: "km 5",
				data: dataArrayKm5,
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
	},
	legend: {
		itemStyle:{'color':'white'}
	}
	});
}