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

