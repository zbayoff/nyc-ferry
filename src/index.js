import * as d3 from "d3";

// set map dimensions

let width = 800;
let height = 800;

// create mercator type map projection
let projection = d3.geoMercator()
    .center([-73.94, 40.70])
    .scale(50000)
    .translate([(width) / 2, (height) / 2]);

// generate path
let path = d3.geoPath()
    .projection(projection);

// create svg element
let svg = d3.select('body')
    .append('svg')
    .attr('width', width)
    .attr('height', height);

// create tooltip
let div = d3.select('body')
    .append('div')
    .attr('class', 'tooltip')
    .style('opacity', 0);

// import NYC GeoJSON data
d3.json('../src/data/nycMap.json')
    .then(data => {

        svg.selectAll("path")
            .data(data.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", "steelblue");

            

    })
    .catch(error => console.log(error));


// import data from shapes.csv file
d3.csv('../src/data/stops.csv')
    .then(data => {
        console.log(data);

        svg.selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', d => {
                return projection([d.stop_lon, d.stop_lat])[0]
            })
            .attr('cy', d => {
                return projection([d.stop_lon, d.stop_lat])[1]
            })
            .attr('r', 5)
            .style("fill", "rgb(217,91,67)")
            .style("opacity", 0.85)

            .on('mouseover', d => {
                div.transition()
                    .duration(200)
                    .style('opacity', 0.9);

                div.text(d.stop_name)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })

            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });



    })
    .catch(error => console.log(error));




//   console.log(geoGenerator);