d3.csv('bdE.csv', function(err, rows){

    function unpack(rows, key) {
      return rows.map(function(row) {
        return row[key];
      });
    }
    
    var data = [{
      type: 'parcoords',
      line: {
        showscale: true,
        reversescale: true,
        colorscale: 'Jet',
        cmin: -4000,
        cmax: -100,
        color: unpack(rows, 'colorVal')
      },
    
      dimensions: [{
        constraintrange: [100000, 150000],
        range: [32000, 227900],
        label: 'Gas',
        values: unpack(rows, 'blockHeight')
      }, {
        range: [0, 700000],
        label: 'Humedad',
        values: unpack(rows, 'blockWidth')
      }, {
        label: 'Puntero',
        tickvals: [0, 0.5, 1, 2, 3],
        ticktext: ['A', 'AB', 'B', 'Y', 'Z'],
        values: unpack(rows, 'cycMaterial')
      }, {
        label: 'Variaciones',
        tickvals: [0, 1, 2, 3],
        range: [-1, 4],
        values: unpack(rows, 'blockMaterial')
      }, {
        range: [134, 3154],
        label: 'Total en oxygeno',
        visible: true,
        values: unpack(rows, 'totalWeight')
      }, {
        range: [9, 19984],
        label: 'Total Humedad',
        values: unpack(rows, 'assemblyPW')
      }, {
        range: [49000, 568000],
        label: 'Variaciones en humedad',
        values: unpack(rows, 'HstW')
      }, {
        range: [-28000, 196430],
        label: 'Minimas',
        values: unpack(rows, 'minHW')
      }, {
         range: [98453, 501789],
         label: 'Altas',
         values: unpack(rows, 'minWD')
      }, {
        range: [1417, 107154],
        label: 'Puntero',
        values: unpack(rows, 'rfBlock')
      }]
    }];
    
    Plotly.newPlot('myDiv2', data);
    
    });
    