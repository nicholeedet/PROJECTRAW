//Creating Dropdown menu and plot for Marriage rate by year
var populateDropdown = function (states) {
  var selectTag = d3.select('#selDataset');
  var options = selectTag.selectAll('option').data(states);
  options
    .enter()
    .append('option')
    .attr('value', function (d) {
      return d;
    })
    .text(function (d) {
      return d;
    });
};

var drawChart = function (year, distribution) {
  var trace = {
    x: year,
    y: distribution,
    text: year,
    type: 'scatter',
  };
  var data = [trace];
  var layout = {
    title: 'Marriage rates by year',
    xaxis: {
      title: 'Year',
      showgrid: false,
      zeroline: false,
    },
    yaxis: {
      title: 'Marriage Rate',
      showline: false,
    },
    width: 750,
    height: 750,
  };
  Plotly.newPlot('line', data, layout);
};

var optionChanged = function (newState) {
  if (newState == 'All States') {
    return showAllStates();
  }
  d3.csv('Resources/state-marriage-rates-90-95-99-19.csv').then(function (
    data
  ) {
    //Get the corresponding state that matches the newState passed as an object
    const statesData = data.filter((d) => d['State'] == newState)[0];
    const year = [];
    const distribution = [];
    // console.log(statesData);
    Object.entries(statesData).map(([key, value]) => {
      //Loop through and extract the year and the corresponding rates
      //Append to the corresponding lists
      year.push(parseInt(key));
      distribution.push(value);
    });
    year.pop(); //Remove the key of state from the array containing years
    distribution.pop(); //Remove the value of state from the distribution
    drawChart(year, distribution); // Create Chart
  });
};

const showAllStates = () => {
  d3.csv('Resources/state-marriage-rates-90-95-99-19.csv').then(function (
    data
  ) {
    const traces = data.map((d) => {
      const year = [];
      const distribution = [];
      Object.entries(d).map(([key, value]) => {
        year.push(parseInt(key));
        distribution.push(value);
      });
      year.pop();
      const name = distribution[distribution.length - 1]; // Get the name of the state;
      distribution.pop();
      return {
        x: year,
        y: distribution,
        type: 'scatter',
        name,
      };
    });
    var layout = {
      title: 'Marriage rates by year',
      xaxis: {
        title: 'Year',
        showgrid: false,
        zeroline: false,
      },
      yaxis: {
        title: 'Marriage Rate',
        showline: false,
      },
      width: 750,
      height: 750,
    };
    Plotly.newPlot('line', traces, layout);
  });
};

d3.csv('Resources/state-marriage-rates-90-95-99-19.csv').then(function (data) {
  // console.log(data);
  let states = data.map((d) => d['State']);
  // Populate dropdown with states
  states = ['All States', ...states];
  populateDropdown(states);
  showAllStates();
  // optionChanged(states[0]);
});
