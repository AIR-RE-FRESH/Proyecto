d3.csv("fechas.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}


var trace1 = {
  type: "scatter",
  mode: "lines",
  name: 'DHT11',
  x: unpack(rows, 'Date'),
  y: unpack(rows, 'DHT11'),
  line: {color: '#17BECF'}
}

var trace2 = {
  type: "scatter",
  mode: "lines",
  name: 'MQ7',
  x: unpack(rows, 'Date'),
  y: unpack(rows, 'MQ7'),
  line: {color: '#ff7f50'}
}

var data = [trace1,trace2];

var layout = {
  title: 'Monitor Serial PPM',
  xaxis: {
    autorange: true,
    range: ['2024-05-27', '2024-09-07'],
    rangeselector: {buttons: [
        {
          count: 1,
          label: '1m',
          step: 'month',
          stepmode: 'backward'
        },
        {
          count: 2,
          label: '2m',
          step: 'month',
          stepmode: 'backward'
        },
        {step: 'all'}
      ]},
    rangeslider: {range: ['2024-05-27', '2024-09-07']},
    type: 'date'
  },
  yaxis: {
    autorange: true,
    range: [86.8700008333, 138.870004167],
    type: 'linear'
  }
};

Plotly.newPlot('myDiv', data, layout);
})
