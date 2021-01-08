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
            labels: candles.map(c => new Date(c[0]).toLocaleString().split(' ')[1]),
            datasets: [{
                    type: 'line',
                    label: order.symbol,
                    data: candles.map(c => c[1]),
                    dragData: false,
                    borderWidth: 3,
                    borderColor: 'grey',
                    fill: false,

                },
                {
                    type: 'line',
                    label: '',
                    data: candles.map(c => c[2]),
                    dragData: false,
                    borderWidth: 3,
                    borderColor: 'black',
                    fill: false,

                },

                {
                    label: 'Line Sl',
                    data: candles.map(c => order.sl ? order.sl : order.high),

                    type: 'line',
                    borderColor: 'red',
                    backgroundColor: 'transparent',
                    borderWidth: 5,
                    fill: false
                },
                {
                    label: 'Line TP',
                    data: candles.map(c => order.tp ? order.tp : order.low),
                    type: 'line',
                    borderColor: 'green',
                    backgroundColor: 'transparent',
                    fill: false

                },
                {
                    label: 'Line Price',
                    data: candles.map(c => order.price == 0 ? null : order.price),
                    type: 'line',
                    borderColor: 'blue',
                    backgroundColor: 'transparent',
                    fill: false

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
                    case 2:
                        changeLimits(value, null, null);
                        break;
                    case 3:
                        changeLimits(null, value, null);
                        break;
                    case 4:
                        changeLimits(null, null, value);
                        break;
                    default:
                        break;
                }
                console.log(datasetIndex, index, value)
            }
        }
    }
}

const reduceCandles = (candles, digits) => {
    let i = 0;
    let min = Number.MAX_VALUE;
    let max = Number.MIN_VALUE;
    const temp_candles = candles.reduce(function(accumm, value, index) {
        if (i >= candles.length / 10) {

            accumm.push([value[0], min, max]);
            min = Number.MAX_VALUE;
            max = Number.MIN_VALUE;
            i = 0;
        } else {
            let valmin = value[1] / (Math.pow(10, digits));
            let valmax = value[2] / (Math.pow(10, digits));
            if (valmin < min)
                min = valmin;

            if (valmax > max)
                max = valmax

            i++;
        }
        return accumm;
    }, []);

    return temp_candles;
}


const changeLimits = (datasets, order) => {

    let sl = datasets.filter(d => d.label == "Line Sl");
    let tp = datasets.filter(d => d.label == "Line TP");
    let price = datasets.filter(d => d.label == "Line Price");

    if (sl.length > 0 && order.sl != 0)
        sl[0].data = sl[0].data.map(c => order.sl);
    if (tp.length > 0 && order.tp != 0)
        tp[0].data = tp[0].data.map(c => order.tp);
    if (price.length > 0)
        price[0].data = price[0].data.map(c => order.price == 0 ? null : order.price);
    return datasets;
}

export default { configChart, reduceCandles, countDecimals, changeLimits }