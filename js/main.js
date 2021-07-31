let width = 1200,
    height = 800;
let svg = d3.select("svg");
let scale_x = d3.scaleLinear().domain([0,188]).range([0, 1100]);
let scale_y = d3.scaleLinear().domain([12,3]).range([0, 700]);

async function intro() {
    svg.append('text')
        .attr('x', 10)
        .attr('y', 50)
        .attr('stroke', 'Black')
        .style("font-size", 40)
        .text("The tapestry of The Office Viewship")
    svg.append('text')
        .attr('x', 10)
        .attr('y', 90)
        .attr('stroke', 'Black')
        .style("font-size", 20)
        .text("The office had an amazing run of 9 seasons. Today we will look at the episode viewership as the seasons progressed")

    // Create axes
    let x_axis = d3.axisBottom().scale(scale_x);
    let y_axis = d3.axisLeft().scale(scale_y);
    svg.append("g").attr("transform", "translate(" + 50 + "," + 900 + ")").call(x_axis);
    svg.append("g").attr("transform", "translate(" + 50 + "," + 200 + ")").call(y_axis);
    // Begin
    svg.append('rect')
        .attr("id","nav_button")
        .attr('width', 100)
        .attr('height', 50)
        .attr('x', 10)
        .attr('y', 120)
        .attr('stroke', 'black')
        .attr('fill', 'beige')
        .on("click", freeRoam);
}

async function freeRoam() {
    const data = await d3.csv("Wiki_OfficeDataFormatted.csv");
    for (const record in data) {
        if(data[record]['Season'] == '1') {
            console.log(data[record]['U.S. viewers (in millions)']);
        }
    }

    svg.append("g").attr("transform", "translate(" + 50 + "," + 200 + ")")
        .selectAll('circle').data(data).enter().append('circle')
        .transition()
        .delay(function(d,i) { return (i * 10); })
        .attr("id", "eps")
        .attr("fill", "orange")
        .attr("stroke", "black")
        .attr("opacity", 1.0)
        .attr("cx", function(d) {return scale_x(d["Episode"]);})
        .attr("cy", function(d) { return scale_y(d["U.S. viewers (in millions)"]); })
        .attr("r", 2);
}