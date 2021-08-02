let width = 1200,
    height = 800;
d3.select('body')
    .append('div')
    .attr('id', 'tooltip')
    .attr('style', 'position: absolute; opacity: 0; border-radius: 8px; background: thistle; padding: 10px');
let svg = d3.select('svg');
let scale_x = d3.scaleLinear().domain([1,188]).range([0, 1100]);
let scale_y = d3.scaleLinear().domain([12,3]).range([0, 700]);
let x_axis = d3.axisBottom().scale(scale_x);
let y_axis = d3.axisLeft().scale(scale_y);

async function intro() {
    svg.append('text')
        .attr('x', 10)
        .attr('y', 50)
        .attr('stroke', 'Black')
        .style('font-size', 40)
        .text('The Viewership Tapestry of The Office')
    svg.append('text')
        .attr('x', 10)
        .attr('y', 90)
        .attr('stroke', 'Black')
        .style('font-size', 20)
        .text('How important is Steve Carell to the popularity of the The Office? Spoiler alert: Very important')
    svg.append('text')
        .attr('x', -650)
        .attr('y', 20)
        .attr('stroke', 'Black')
        .style('font-size', 20)
        .attr('transform', 'rotate(-90)' )
        .text('U.S. Viewership (in millions)')
    svg.append('text')
        .attr('x', 550)
        .attr('y', 950)
        .attr('stroke', 'Black')
        .style('font-size', 20)
        .text('Episode')

    // Create axes

    svg.append('g').attr('transform', 'translate(' + 50 + ',' + 900 + ')').attr('id', 'xAxis').call(x_axis);
    svg.append('g').attr('transform', 'translate(' + 50 + ',' + 200 + ')').attr('id', 'yAxis').call(y_axis);
    // Begin
    svg.append('rect')
        .attr('id','nav_button')
        .attr('width', 100)
        .attr('height', 50)
        .attr('x', 10)
        .attr('y', 120)
        .attr('stroke', 'black')
        .attr('fill', 'beige')
        .on('click', openingScene);
    svg.append('text')
        .attr('id','nav_button_text')
        .attr('x', 35)
        .attr('y', 150)
        .attr('stroke', 'Black')
        .style('font-size', 20)
        .text('Begin')
        .on('click', openingScene)

    svg.append('circle').attr('cx',200).attr('cy',130).attr('r', 6).style('fill', 'red')
    svg.append('circle').attr('cx',200).attr('cy',160).attr('r', 6).style('fill', 'orange')
    svg.append('circle').attr('cx',300).attr('cy',130).attr('r', 6).style('fill', 'yellow')
    svg.append('circle').attr('cx',300).attr('cy',160).attr('r', 6).style('fill', 'green')
    svg.append('circle').attr('cx',400).attr('cy',130).attr('r', 6).style('fill', 'blue')
    svg.append('circle').attr('cx',400).attr('cy',160).attr('r', 6).style('fill', 'indigo')
    svg.append('circle').attr('cx',500).attr('cy',130).attr('r', 6).style('fill', 'violet')
    svg.append('circle').attr('cx',500).attr('cy',160).attr('r', 6).style('fill', 'gold')
    svg.append('circle').attr('cx',600).attr('cy',130).attr('r', 6).style('fill', 'black')
    svg.append('text').attr('x', 220).attr('y', 130).text('Season 1').style('font-size', '15px').attr('alignment-baseline','middle')
    svg.append('text').attr('x', 220).attr('y', 160).text('Season 2').style('font-size', '15px').attr('alignment-baseline','middle')
    svg.append('text').attr('x', 320).attr('y', 130).text('Season 3').style('font-size', '15px').attr('alignment-baseline','middle')
    svg.append('text').attr('x', 320).attr('y', 160).text('Season 4').style('font-size', '15px').attr('alignment-baseline','middle')
    svg.append('text').attr('x', 420).attr('y', 130).text('Season 5').style('font-size', '15px').attr('alignment-baseline','middle')
    svg.append('text').attr('x', 420).attr('y', 160).text('Season 6').style('font-size', '15px').attr('alignment-baseline','middle')
    svg.append('text').attr('x', 520).attr('y', 130).text('Season 7').style('font-size', '15px').attr('alignment-baseline','middle')
    svg.append('text').attr('x', 520).attr('y', 160).text('Season 8').style('font-size', '15px').attr('alignment-baseline','middle')
    svg.append('text').attr('x', 620).attr('y', 130).text('Season 9').style('font-size', '15px').attr('alignment-baseline','middle')
}

async function openingScene() {
    let scale_x_1 = d3.scaleLinear().domain([1,6]).range([0, 1100]);

    d3.select('#xAxis').transition().duration(3000).call(d3.axisBottom().scale(scale_x_1))

    const data = await d3.csv('Wiki_OfficeData.csv');
    svg.append('g').attr('id', 'opening_scene_g')
        .attr('transform', 'translate(' + 50 + ',' + 200 + ')')
        .selectAll('circle').data(data.filter(function (d) {return d['Season'] == '1'}))
        .enter().append('circle')
        .transition().duration(3000)
        .attr('id', 'episodes')
        .attr('fill', 'red')
        .attr('stroke', 'black')
        .attr('cx', function(d) {return scale_x_1(d['Episode']);})
        .attr('cy', function(d) { return scale_y(d['U.S. viewers (in millions)']); })
        .attr('r', 3);

    const annotations = [{
        note: {
            label: 'Premiered on PrimeTime TV on thursdays.',
            bgPadding: 20,
            title: 'Pilot'
        },
        //can use x, y directly instead of data
        data: data.filter(function (d) {return d['Episode'] == '1'}),
        className: 'show-bg',
        y: 260,
        x: 50,
        dy: 30,
        dx: 50,
        type: d3.annotationCalloutCircle
    }, {
        note: {
            label: 'Moved to intended Tuesday night slot',
            bgPadding: 20,
            title: 'Mediocre Season 1'
        },
        //can use x, y directly instead of data
        data: data.filter(function (d) {return d['Episode'] == '1'}),
        className: 'show-bg',
        y: 710,
        x: 710,
        dy: -50,
        dx: 50,
        type: d3.annotationCalloutCircle
    }]
    const makeAnnotations = d3.annotation().annotations(annotations)
    svg.append('g')
        .attr('id', 'annotation-group')
        .style('opacity', 0)
        .call(makeAnnotations);

    d3.select('#annotation-group').transition().duration(3000).style('opacity', 1);

    d3.select('#nav_button_text')
        .text('Next')
        .on('click', growthScene);
    d3.select('#nav_button')
        .on('click', growthScene);
}

async function growthScene() {
    d3.select('#annotation-group').remove();
    d3.select('#opening_scene_g').remove();
    let scale_x_1 = d3.scaleLinear().domain([1,28]).range([0, 1100]);
    d3.select('#xAxis').transition().duration(3000).call(d3.axisBottom().scale(scale_x_1))
    const data = await d3.csv('Wiki_OfficeData.csv');
    svg.append('g').attr('id', 'growth_scene_g')
        .attr('transform', 'translate(' + 50 + ',' + 200 + ')')
        .selectAll('circle').data(data.filter(function (d) {return parseInt(d['Season']) < 3}))
        .enter().append('circle')
        .transition().duration(3000)
        .attr('id', 'episodes')
        .attr('fill', function (d) {
            switch (d['Season']) {
                case '1': return 'red';
                case '2': return 'orange';
            }
        }).attr('stroke', 'black')
        .attr('cx', function(d) {return scale_x_1(d['Episode']);})
        .attr('cy', function(d) { return scale_y(d['U.S. viewers (in millions)']); })
        .attr('r', 3)

    const annotations = [{
        note: {
            bgPadding: 20,
            title: 'Pilot'
        },
        //can use x, y directly instead of data
        data: {episode: 1, views: 11.2},
        className: 'show-bg',
        y: 260,
        x: 50,
        dy: 30,
        dx: 50,
        type: d3.annotationCalloutCircle
    }, {
        note: {
            bgPadding: 20,
            title: 'Mediocre first Season'
        },
        //can use x, y directly instead of data
        data: {episode: 3, views: 6},
        className: 'show-bg',
        y: 720,
        x: 170,
        dy: -50,
        dx: 50,
        type: d3.annotationCalloutCircle
    }, {
        note: {
            label: "Steve carrel's fame after 40 year old virgin caused this giant boost",
            bgPadding: 20,
            title: 'Season 2 Boom'
        },
        //can use x, y directly instead of data
        data: {episode: 7, views: 9},
        className: 'show-bg',
        y: 430,
        x: 300,
        dy: -50,
        dx: 50,
        type: d3.annotationCalloutCircle
    },
    {
        note: {
            label: 'Show moved to the prime time thursday night slot',
            bgPadding: 20,
            title: 'Must See TV'
        },
        //can use x, y directly instead of data
        data: {episode: 7, views: 9},
        className: 'show-bg',
        y: 380,
        x: 670,
        dy: -50,
        dx: 50,
        type: d3.annotationCalloutCircle
    }]
    const makeAnnotations = d3.annotation()
        // .editMode(true)
        // //also can set and override in the note.padding property
        // //of the annotation object
        // .notePadding(15)
        // //accessors & accessorsInverse not needed
        // //if using x, y in annotations JSON
        // .accessors({
        //     x: d => scale_x_1(d.episode),
        //     y: d => scale_y(d.views)
        // })
        // .accessorsInverse({
        //     episode: d => scale_x_1.invert(d.x),
        //     views: d => scale_y.invert(d.y)
        // })
        .annotations(annotations)
    svg.append('g')
        .attr('id', 'annotation-group')
        .style('opacity', 0)
        .call(makeAnnotations);

    d3.select('#annotation-group').transition().duration(3000).style('opacity', 1);

    d3.select('#nav_button_text')
        .on('click', peakScene);
    d3.select('#nav_button')
        .on('click', peakScene);
}

async function peakScene() {
    d3.select('#annotation-group').remove();
    d3.select('#growth_scene_g').remove();
    let scale_x_1 = d3.scaleLinear().domain([1,141]).range([0, 1100]);
    let scale_y_1 = d3.scaleLinear().domain([23,4]).range([0, 700]);
    d3.select('#xAxis').transition().duration(3000).call(d3.axisBottom().scale(scale_x_1))
    d3.select('#yAxis').transition().duration(3000).call(d3.axisLeft().scale(scale_y_1))
    const data = await d3.csv('Wiki_OfficeData.csv');
    svg.append('g').attr('id', 'peak_scene_g')
        .attr('transform', 'translate(' + 50 + ',' + 200 + ')')
        .selectAll('circle').data(data.filter(function (d) {return parseInt(d['Season']) < 8}))
        .enter().append('circle')
        .transition().duration(3000)
        .attr('id', 'episodes')
        .attr('fill', function (d) {
            switch (d['Season']) {
                case '1': return 'red';
                case '2': return 'orange';
                case '3': return 'yellow';
                case '4': return 'green';
                case '5': return 'blue';
                case '6': return 'indigo';
                case '7': return 'violet';
                case '8': return 'gold';
                case '9': return 'black';
            }
        }).attr('stroke', 'black')
        .attr('cx', function(d) {return scale_x_1(d['Episode']);})
        .attr('cy', function(d) { return scale_y_1(d['U.S. viewers (in millions)']); })
        .attr('r', 3)

    const annotations = [
        {
            note: {
                bgPadding: 20,
                title: 'Superbowl',
                label: 'Aired immediately after the superbowl'
            },
            //can use x, y directly instead of data
            data: {episode: 7, views: 9},
            className: 'show-bg',
            y: 200,
            x: 650,
            dy: 30,
            dx: 50,
            type: d3.annotationCalloutCircle
        },
        {
            note: {
                bgPadding: 20,
                title: 'Solid viewership numbers',
                label: 'The show thrived for 6 seasons on primetime television'
            },
            //can use x, y directly instead of data
            data: {episode: 7, views: 9},
            className: 'show-bg',
            y: 650,
            x: 1160,
            dy: 30,
            dx: 50,
            subject: {
                width: -1000,
                height: 200
            },
            type: d3.annotationCalloutRect
        }]
    const makeAnnotations = d3.annotation()
        .annotations(annotations)
    svg.append('g')
        .attr('id', 'annotation-group')
        .style('opacity', 0)
        .call(makeAnnotations);

    d3.select('#annotation-group').transition().duration(3000).style('opacity', 1);

    d3.select('#nav_button_text')
        .on('click', downFallScene);
    d3.select('#nav_button')
        .on('click', downFallScene);
}

async function downFallScene() {
    d3.select('#annotation-group').remove();
    d3.select('#peak_scene_g').remove();
    let scale_x_1 = d3.scaleLinear().domain([118,188]).range([0, 1100]);
    let scale_y_1 = d3.scaleLinear().domain([9,3]).range([0, 700]);
    d3.select('#xAxis').transition().duration(3000).call(d3.axisBottom().scale(scale_x_1))
    d3.select('#yAxis').transition().duration(3000).call(d3.axisLeft().scale(scale_y_1))
    const data = await d3.csv('Wiki_OfficeData.csv');
    svg.append('g').attr('id', 'downfall_scene_g')
        .attr('transform', 'translate(' + 50 + ',' + 200 + ')')
        .selectAll('circle').data(data.filter(function (d) {return parseInt(d['Season']) > 6}))
        .enter().append('circle')
        .transition().duration(3000)
        .attr('id', 'episodes')
        .attr('fill', function (d) {
            switch (d['Season']) {
                case '1': return 'red';
                case '2': return 'orange';
                case '3': return 'yellow';
                case '4': return 'green';
                case '5': return 'blue';
                case '6': return 'indigo';
                case '7': return 'violet';
                case '8': return 'gold';
                case '9': return 'black';
            }
        }).attr('stroke', 'black')
        .attr('cx', function(d) {return scale_x_1(d['Episode']);})
        .attr('cy', function(d) { return scale_y_1(d['U.S. viewers (in millions)']); })
        .attr('r', 3)

    const annotations = [
        {
            note: {
                bgPadding: 20,
                title: 'Goodbye Steve Carell',
                label: "Steve Carell's farewell episode"
            },
            //can use x, y directly instead of data
            data: {episode: 7, views: 9},
            className: 'show-bg',
            y: 270,
            x: 370,
            dy: 30,
            dx: 80,
            type: d3.annotationCalloutCircle
        },
        {
            note: {
                bgPadding: 20,
                title: 'Andy gets ruined',
                label: 'Carells replacement character is written poorly due to other commitments of cast and writers'
            },
            //can use x, y directly instead of data
            data: {episode: 7, views: 9},
            className: 'show-bg',
            y: 520,
            x: 820,
            dy: 10,
            dx: 80,
            subject: {
                width: -370,
                height: 240
            },
            type: d3.annotationCalloutRect
        },
        {
            note: {
                bgPadding: 20,
                title: 'Carells cameo',
                label: 'Steve Carrell appears in the series finale'
            },
            //can use x, y directly instead of data
            data: {episode: 7, views: 9},
            className: 'show-bg',
            y: 580,
            x: 1150,
            dy: 30,
            dx: 80,
            type: d3.annotationCalloutCircle
        }]
    const makeAnnotations = d3.annotation()
        .annotations(annotations)
    svg.append('g')
        .attr('id', 'annotation-group')
        .style('opacity', 0)
        .call(makeAnnotations);

    d3.select('#annotation-group').transition().duration(3000).style('opacity', 1);

    d3.select('#nav_button_text')
        .text('Explore')
        .on('click', freeRoam);
    d3.select('#nav_button')
        .on('click', freeRoam);
}

async function freeRoam() {
    d3.select('#annotation-group').remove();
    d3.select('#downfall_scene_g').remove();
    const data = await d3.csv('Wiki_OfficeData.csv');
    // for (const record in data) {
    //     if(data[record]['Season'] == '1') {
    //         console.log(data[record]['U.S. viewers (in millions)']);
    //     }
    // }

    let mouseover = function(d, i) {
        let episodeNumber = i['Prod.'] % 100;
        d3.select('#tooltip')
            .style('opacity', 1);
        d3.select('#tooltip')
            .html('Title: ' + i['Title'] + '<br/>' + 'Season: ' + i['Season'] + '<br/>'+ 'Episode: ' + episodeNumber + '<br/>'
            + 'U.S. Viewers: ' + i['U.S. viewers (in millions)'] + '<br/>' + 'Director: ' + i['Directed by'] + '<br/>' + 'Writer: ' + i['Written by'] + '<br/>');
    }
    let mousemove = function(d) {
        d3.select('#tooltip')
            .style('left', d.pageX+10 + 'px')
            .style('top', d.pageY+10 + 'px')
    }
    let mouseleave = function(d) {
        d3.select('#tooltip').style('opacity', 0)
    }

    svg.append('g').attr('id', 'freeroam_scene_g')
        .attr('transform', 'translate(' + 50 + ',' + 200 + ')')
        .selectAll('circle').data(data).enter().append('circle')
        .attr('id', 'episodes')
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseleave)
        .transition().duration(3000)
        .attr('fill', function (d) {
            switch (d['Season']) {
                case '1': return 'red';
                case '2': return 'orange';
                case '3': return 'yellow';
                case '4': return 'green';
                case '5': return 'blue';
                case '6': return 'indigo';
                case '7': return 'violet';
                case '8': return 'gold';
                case '9': return 'black';
            }
        })
        .attr('stroke', 'black')
        .attr('cx', function(d) {return scale_x(d['Episode']);})
        .attr('cy', function(d) { return scale_y(d['U.S. viewers (in millions)']); })
        .attr('r', 3);
    svg.append('text').attr('x', 620).attr('y', 160).transition().duration(3000).text('Hover for more episode information')
        .style('font-size', '24px')
        .attr('alignment-baseline','middle')
        .style('fill', 'red')
}