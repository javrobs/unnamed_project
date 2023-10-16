// Variable to define whether a plot has been created:
var plotCreated=false;

// This function plots the graph with the data that is received from the server:
function plot(data,yearFlag){
    // Initializes all the variables needed to plot the data:
    let yearRange=(year2007.checked)?"2007-2008":"2017-2018";
    let y=[];
    let groceries=[];
    let nonFood=[];
    let otherStores=[];
    let eatingOut=[];
    let delivered=[];
    let groceriesPercentage=[];
    let nonFoodPercentage=[];
    let otherStoresPercentage=[];
    let eatingOutPercentage=[];
    let deliveredPercentage=[];
    // Populates all the created variables with the data received from the server:
    for (let i=data.all_data.length-1;i>=0;i--){
        let line=data.all_data[i];
        // Populates the data of only the selected year:
        if (line.year==yearRange){
            y.push(`${line.description.replace("~","<br>")}<br><em>(${line["count"]})</em>`);
            groceries.push(line["groceries"]);
            nonFood.push(line["non_food"]);
            otherStores.push(line["other_stores"]);
            eatingOut.push(line["eating_out"]);
            delivered.push(line["delivered"]);
            groceriesPercentage.push(line["groceries_percentage"]);
            nonFoodPercentage.push(line["non_food_percentage"]);
            otherStoresPercentage.push(line["other_stores_percentage"]);
            eatingOutPercentage.push(line["eating_out_percentage"]);
            deliveredPercentage.push(line["delivered_percentage"]);
        };
    };
    // Identifies how many missing values there are and adds the information to the DOM:
    data.nulls.forEach(line=>{
        if (line.year==yearRange){
            missingValueDiv.innerHTML=(line.missing!=0)?`Missing values: ${line['missing']}`:"";
        };
    });
    // Defines the trace for the 'groceries' spending data:
    var trace1 = {
        x: groceries,
        y: y,
        customdata:groceriesPercentage,
        name: `Groceries`,
        type: 'bar',
        hovertemplate:"%{x:$.2f}<br>(%{customdata:.2f}%)",
        orientation: 'h',
        marker:{color:"#3D2F73"}
    };
    // Defines the trace for the 'non-food' spending data:
    var trace2 = {
        x: nonFood,
        y: y,
        customdata:nonFoodPercentage,
        name: 'Non-food',
        type: 'bar',
        hovertemplate:"%{x:$.2f}<br>(%{customdata:.2f}%)",
        orientation: 'h',
        marker:{color:"#2771A5"}
    };
    // Defines the trace for the 'other stores' spending data:
    var trace3 = {
        x: otherStores,
        y: y,
        customdata:otherStoresPercentage,
        name: 'Other stores',
        type: 'bar',
        hovertemplate:"%{x:$.2f}<br>(%{customdata:.2f}%)",
        orientation: 'h',
        marker:{color:"#30AEBA"}
    };
    // Defines the trace for the 'eating out' spending data:
    var trace4 = {
        x: eatingOut,
        y: y,
        customdata:eatingOutPercentage,
        name: 'Eating out',
        type: 'bar',
        hovertemplate:"%{x:$.2f}<br>(%{customdata:.2f}%)",
        orientation: 'h',
        marker:{color:"#D93662"}
    };
    // Defines the trace for the 'delivered' spending data:
    var trace5 = {
        x: delivered,
        y: y,
        customdata:deliveredPercentage,
        name: 'Delivery/Take-out',
        type: 'bar',
        hovertemplate:"%{x:$.2f}<br>(%{customdata:.2f}%)",
        orientation: 'h',
        marker:{color:"#E5BB3E"}
    };
    // Creates an array with all the spending data traces:
    var data = [trace1,trace2,trace3,trace4,trace5];
    // Defines the layout of the plot:
    var layout = {
        barmode: 'stack',
        height:(window.innerHeight-20-breadcrumbDiv.offsetHeight-legendDiv.offsetHeight),
        width: (plotArea.offsetWidth),
        showlegend:false,
        automargin:true,
        margin:{b:60,l:160,t:100,r:30,autoexpand:false},
        title:`Average Monthly Spending<br>${yearRange}`,
        xaxis: {
            fixedrange:true
        },
        yaxis: {
            fixedrange:true
        }
    };
    // Plots with the correct data and layout and hides the default Plotly 'mode bar':
    Plotly.newPlot('plot', data, layout, {
        displayModeBar:false
    });
    // Starts the window resize listener the first time a plot is created:
    if (plotCreated===false){
        startListener();
    };
};

// This function creates the listener of the window resizing:
function startListener(){
    // Indicates that a plot has been created:
    plotCreated=true;
    // If the window is resized, it runs the 'resizedWindow' function after 0.1s:
    window.addEventListener("resize", ()=>{
        let doit;
        // Resets the timeout:
        clearTimeout(doit);
        // Sets the timeout to 0.1s and executes the 'resizedWindow' function if the timeout is completed:
        doit = setTimeout(resizedWindow, 100);
    });
};

// This function changes the size of plot:
function resizedWindow(){
    // Gets rid of the last plot:
    Plotly.purge('plot');
    // If the 'Graph' button is active, it runs the 'filter' function with the 'current-filter' data:
    if (desktopButton.classList.contains('about-button')) {
        let lastFilter = document.querySelector('.current-filter');
        filter(lastFilter);
    };
};