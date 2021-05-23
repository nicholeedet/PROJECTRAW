// @TODO: YOUR CODE HERE!
const svgWidth = 960;
const svgHeight = 500;
const margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100,
};
const width = svgWidth - margin.left - margin.right;
const height = svgHeight - margin.top - margin.bottom;
// Create an SVG wrapper, append an SVG group that will hold our chart, and shift the latter by left and top margins.
let svg = d3
  .select('#scatter')
  .append('svg')
  .attr('width', svgWidth)
  .attr('height', svgHeight)
  .append('g')
  .attr('transform', `translate(${margin.left}, ${margin.top})`);

// Import Data
const extractData = (healthData, point) =>
  healthData.map((data) => parseInt(data[point]));

const graphPlot = (xAxis, yAxis, xLabel, yLabel) => {
  d3.csv('../data/data.csv')
    .then((healthData) => {
      // console.log(healthData);
      // const xAxis = 'healthcare';
      // const yAxis = 'poverty';
      const xList = extractData(healthData, xAxis);
      const xListMax = Math.max.apply(null, xList);
      // console.log(xList);
      const yList = extractData(healthData, yAxis);
      const yListMax = Math.max.apply(null, yList);

      let x = d3
        .scaleLinear()
        .domain([0, xListMax * 1.2])
        .range([0, width]);
      svg
        .append('g')
        .attr('transform', 'translate(0,' + height + ')')
        .call(d3.axisBottom(x));
      let y = d3
        .scaleLinear()
        .domain([0, yListMax * 1.2])
        .range([height, 0]);
      svg.append('g').call(d3.axisLeft(y));

      var toolTip = d3
        .tip()
        .attr('class', 'tooltip')
        .offset([80, -60])
        .html(
          (d) =>
            `<strong>${d.abbr}</strong><br>${xAxis}: ${d[xAxis]}<br>${yAxis}: ${d[yAxis]}`
        );
      svg.call(toolTip);

      svg
        .selectAll('circle')
        .data(healthData)
        .enter()
        .append('circle')
        .attr('cx', (d) => x(parseInt(d[xAxis])))
        .attr('cy', (d) => y(parseInt(d[yAxis])))
        .attr('r', 15)
        .attr('fill', 'lightblue')
        .attr('opacity', 0.7)
        .on('mouseover', function (d) {
          toolTip.show(d, this);
        })
        .on('mouseout', function (d) {
          toolTip.hide(d);
        });

      svg
        .append('g')
        .selectAll('text')
        .data(healthData)
        .enter()
        .append('text')
        .text((d) => d.abbr)
        .attr('x', (d) => x(parseInt(d[xAxis])))
        .attr('y', (d) => y(parseInt(d[yAxis])))
        .attr('text-anchor', 'middle')
        .attr('stroke', 'black')
        .attr('stroke-width', 1)
        .attr('class', 'state_label')
        .on('mouseover', function (d) {
          toolTip.show(d, this);
        })
        .on('mouseout', function (d) {
          toolTip.hide(d);
        });

      svg
        .append('text')
        .attr(
          'transform',
          `translate(${margin.left - 140}, ${height * 0.56}) rotate(270)`
        )
        .attr('id', yAxis)
        .attr('class', 'axis_label y_axis_label text')
        .text(yLabel);

      svg
        .append('text')
        .attr(
          'transform',
          `translate(${width * 0.45}, ${height + margin.top + 30})`
        )
        .attr('id', xAxis)
        .attr('class', 'axis_label x_axis_label text')
        .text(xLabel);
    })
    .catch((error) => console.log(error));
};
graphPlot('healthcare', 'poverty', 'Lacks Healthcare (%)', 'In Poverty (%)');
