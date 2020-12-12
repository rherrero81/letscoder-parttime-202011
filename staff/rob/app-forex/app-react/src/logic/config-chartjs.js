const countDecimals = (value) => {
    if ((value % 1) != 0)
        return value.toString().split(".")[1].length;
    return 0;
};

const configChart = (candles, order) => {
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
            //Customize chart options
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

export default { configChart, reduceCandles, countDecimals }