// Wrapping in nv.addGraph allows for '0 timeout render', stores rendered charts in nv.graphs, and may do more in the future... it's NOT required
var chart;

function display_linechart(div_id, data) {
    chart = nv.models.lineChart()
        .options({
            duration: 300,
            useInteractiveGuideline: true
        })
        //.x(function(d) { return d.x })
        //.y(function(d) { return d.y })
    ;

    // chart sub-models (ie. xAxis, yAxis, etc) when accessed directly, return themselves, not the parent chart, so need to chain separately
    chart.xAxis
        .axisLabel("Date")
        //.tickFormat(function(d) { return d3.time.format('%x')(new Date(data.x[d]) })
        .tickFormat(function(d) { return d3.time.format('%Y-%m-%d')(new Date(d)); })
        //.tickFormat(function(d) { return data.x })
        .staggerLabels(false)
    //chart.xScale(d3.time.scale());

    chart.yAxis
        .axisLabel('Temperature')
        .tickFormat(d3.format('.f'))
    ;

    //chart.forceY([0])

    d3.select(div_id).append('svg')
        .datum(data)
        .call(chart);

    nv.utils.windowResize(chart.update);

    return chart;
}

