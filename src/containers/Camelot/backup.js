import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import data from '../../data/201101.json'
import { Popup, Container, Image } from 'semantic-ui-react';

let colours = ['#2176ae', '#57b8ff', '#b66d0d', '#fbb13c', '#fe6847']

class Camelot extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      width: 0,
      height: 0,
      data: null
    }
    this.updateStyleAndAttrs = this.updateStyleAndAttrs.bind(this);
    this.graphContainer = React.createRef();
  }
  camelotConvert(camelot){
    switch(camelot){
      case '12A':
        return 1;
      case '12B':
        return 2;
      case '1A':
        return 3;
      case '1B':
        return 4;
      case '2A':
        return 5;
      case '2B':
        return 6;
      case '3A':
        return 7;
      case '3B':
        return 8;
      case '4A':
        return 9;
      case '4B':
        return 10;
      case '5A':
        return 11;
      case '5B':
        return 12;
      case '6A':
        return 13;
      case '6B':
        return 14;
      case '7A':
        return 15;
      case '7B':
        return 16;
      case '8A':
        return 17;
      case '8B':
        return 18;
      case '9A':
        return 19;
      case '9B':
        return 20;
      case '10A':
        return 21;
      case '10B':
        return 22;
      case '11A':
        return 23;
      case '11B':
        return 24;
      default:
        return -1;
    }
  }
  relatedCamelot(first, second){
    if(Math.abs(first-second) < 3){
      return true
    }
    return false
  }
  componentDidMount() {
    const nodes = data.map(json => {
      return {
        id: json.title,
        group: this.camelotConvert(json.camelot),
        bpm: json.bpm,
        speechiness: parseInt(json.speechiness)
      }
    })
    const links = data.map(json => {
      const related = data.map( song => {
        if(this.relatedCamelot(this.camelotConvert(song.camelot), this.camelotConvert(json.camelot))){
          return {
            source: json.title,
            target: song.title,
            value: 5
          }
        }
      })
      return related.filter(data=> data!==undefined)
    })
    let appendedLinks = [];
    links.map(linksArray => {
      appendedLinks = appendedLinks.concat(linksArray)
    })
    const finalData = {
      nodes: nodes,
      links: appendedLinks
    }
    this.setState({data: finalData, width: this.graphContainer.parentNode.clientWidth-100, height: this.graphContainer.parentNode.clientHeight-100})
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.data !== this.state.data){
      this.updateStyleAndAttrs()
    }
  }

  updateStyleAndAttrs() {
    const { width, height, data } = this.state;
    const colorScale = d3.scaleLinear().domain([0,100]).range(["white", "blue"])

    function dragstarted(d) {
      if (!d3.event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }
    
    function dragended(d) {
      if (!d3.event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    const svg = d3.select(this.graphSVG);
    const simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id((d) => { return d.id; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));
    const link = svg.select(".linksClass")
      .selectAll("line")
      .data(data.links)
      .enter().append("line")
      .attr("stroke-width", (d) => {return Math.sqrt(d.value); })
      .attr("stroke", "gray");
    const node = svg.select(".nodesClass")
      .selectAll("g")
      .data(data.nodes)
      .enter().append("g")
    const circles = node.append("circle")
      .attr("r", d => {return Math.sqrt(d.bpm)})
      .attr("fill", (d) => { return colorScale(d.speechiness)})
      .on("mouseover", (d) => {
        this.setState({isVisible:true, content:d})
      })					
      .on("mouseout", (d) => {
        this.setState({isVisible:false, content:null})
      })
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("title")
      .text(function(d) { return d.id; });

    simulation
      .nodes(data.nodes)
      .on("tick", ticked);

    simulation.force("link")
      .links(data.links);

    function ticked() {
      link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

      node
        .attr("transform", function(d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
    }
  }

  render() {
    const { width, height, isVisible, content } = this.state;
    return (
    <div style={{width:'100%', height:'100%'}}>
      <div ref={graphContainer => this.graphContainer = graphContainer} style={{paddingLeft:'1em', width:'100%', height:'100%'}}>
        <svg ref={graphSVG => this.graphSVG = graphSVG} width={width} height={height}> 
          <g className="linksClass"></g>
          <g className="nodesClass"></g>
        </svg>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.globalState
})

export default connect(mapStateToProps)(Camelot)