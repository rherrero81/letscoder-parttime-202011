const countDecimals = (value) => {
    if ((value % 1) != 0)
        return value.toString().split(".")[1].length;
    return 0;
};

const configChart = (candles, order, changeLimits) => {
    if (candles.length == 0)
        return [];

    const precision = Math.pow(10, order.digits ? order.digits : order.pipsPrecision);

    return {
        type: "line",
        data: {
            //Bring in data
            labels: candles.map(c => new Date(c[0]).toLocaleString().split(' ')[1]),
            datasets: [{
                    label: order.symbol,
                    data: candles.map(c => c[1] / precision),
                    dragData: false
                },
                {
                    label: 'Line Sl',
                    data: candles.map(c => order.sl ? order.sl : order.high),

                    type: 'line',
                    borderColor: 'red'

                },
                {
                    label: 'Line TP',
                    data: candles.map(c => order.tp ? order.tp : order.low),
                    type: 'line',
                    borderColor: 'green'

                }
            ]
        },
        options: {
            elements: {
                point: {
                    /*   radius: 10 */
                }
            },
            dragData: true,
            /*   dragOptions: {
                  magnet: {
                      to: Math.round // to: (value) => value + 5
                  }
              }, */
            onDragStart: function(e) {
                console.log(e)
            },
            onDrag: function(e, datasetIndex, index, value) {
                console.log(datasetIndex, index, value)
            },
            onDragEnd: function(e, datasetIndex, index, value) {
                switch (datasetIndex) {
                    case 1:
                        changeLimits(value, null);
                        break;
                    case 2:
                        changeLimits(null, value);
                        break
                    default:
                        break;
                }
                console.log(datasetIndex, index, value)
            }
        }
    }
}

const reduceCandles = (candles) => {
    let i = 0;
    return candles = candles.reduce(function(accumm, value, index) {
        if (i >= candles.length / 10) {
            i = 0;
            accumm.push(value);
        } else i++;
        return accumm;
    }, []);
}


const changeLimits = (datasets, order) => {
    datasets[1].data = datasets[1].data.map(c => order.sl);
    datasets[2].data = datasets[2].data.map(c => order.tp);
    return datasets;
}

export default { configChart, reduceCandles, countDecimals, changeLimits }