

//Function to create the dropdown menu
const populateDropdown = (names) => {
    const selectTag = d3.select("#selDataset");
    const options = selectTag.selectAll('option').data(names);
    options.enter()
        .append('option')
        .attr('value', function(d) {
            return d;
        })
        .text(function(d) {
            return d;
        });
};

// Function to pull names from json file and add them in the filter
var drawChart = function(x_data, y_data, hoverText, metadata) {

    var metadata_panel = d3.select("#sample-metadata");
    metadata_panel.html("");
    Object.entries(metadata).forEach(([key, value]) => {
        metadata_panel.append("strong").append("p").text(`${key.toUpperCase()}: ${value}`);
    });
    // Bar Chart Plot Start
    const xxx = x_data.filter((x,i)=> i<10).reverse()
    const data = [{
        x: xxx,
        y: y_data.filter((x,i)=> i<10).reverse().map(id=>`OTU ${id}`),
        text: hoverText.filter((x,i)=> i<10).reverse(),
        marker: {
            color: 'rgb(142,124,195)'
          },
        type: 'bar',
        orientation: 'h'
    }];

    // const data = [trace];
    const barTitle = {
        title:'Top 10 Bacteria Cultures Found',   
        font:{
            family: 'Raleway, sans-serif'
          },
    }
    Plotly.newPlot('bar', data, barTitle);
    var trace2 = {
        x: y_data,
        y: x_data,
        text: hoverText,
        mode: 'markers',
        marker: {
            size: x_data,
            color: y_data,
            colorscale: "Earth"
        }
    };
    var data2 = [trace2];
    const bubbleTitle = {
        title:'Bacteria Culture Per Sample', 
        xaxis:{
            title: 'OTU ID'
        }
    }
    Plotly.newPlot('bubble', data2, bubbleTitle); 
};
  

  
var optionChanged = function(newValue) {
    
    d3.json("data/samples.json").then(function(data) {
    var sample_new = data["samples"].filter(function(sample) {
        return sample.id == newValue;
    });
    var metadata_new = data["metadata"].filter(function(metadata) {
        return metadata.id == newValue;
    });
    var x_data = sample_new[0]["sample_values"];
    var y_data = sample_new[0]["otu_ids"];
    var hoverText = sample_new[0]["otu_labels"];
    drawChart(x_data, y_data, hoverText, metadata_new[0]);
    gauge_plot(metadata_new[0].wfreq)
    });
};
  
d3.json("data/samples.json").then(function(data) {
    //Populate dropdown with names
    populateDropdown(data["names"]);
    //Call optionChanged function with first data point
    optionChanged(parseInt(data["names"][0]))
});

function gauge_plot(wfreq){
    var data = [
        {
          domain: { x: [0, 2], y: [0, 2] }, 
          value: wfreq,
          title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [0, 9] },
            steps: [
              { range: [0, 1], color: "gray" },
              { range: [1, 2], color: "gray" },
              { range: [2, 3], color: "gray" },
              { range: [3, 4], color: "gray" },
              { range: [4, 5], color: "gray" },
              { range: [5, 6], color: "gray" },
              { range: [6, 7], color: "gray" },
              { range: [7, 8], color: "gray" },
              { range: [8, 9], color: "gray" },
            ],
            threshold: {
              line: { color: "red", width: 4 },
              thickness: 0.75,
              value: wfreq
            }
          }
        }
      ];
      var layout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
     Plotly.newPlot('gauge', data, layout); 
}
