import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import data201101 from '../../data/201101.json'
import { Container, Image, Popup, Select } from 'semantic-ui-react';

const colors = ['','#ab369e','#cc39bc','#624890','#7150a9','#3776cf','#3b8bf9','#07a6cf','#01c7f9','#08bebe','#00e3e3','#08b279','#00d48f','#349b35','#37b938','#69a50d','#79c506','#d2b208','#fdd503','#d45b15','#ff6811','#d4442b','#fe4b2c','#d42a3f','#f62f3e']
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
  colorToCamelot(color){
    switch(color){
      case '#ab369e':
        return "12A"
      case '#cc39bc':
        return "12B"
      case '#624890': 
        return "1A"
      case '#7150a9':
        return "1B"
      case '#3776cf':
        return "2A"
      case '#3b8bf9':
        return "2B"
      case '#07a6cf':
      	 return "3A"
      case '#01c7f9':
      	 return "3B"
      case '#08bebe':
      	 return "4A"
      case '#00e3e3':
      	 return "4B"
      case '#08b279':
      	 return "5A"
      case '#00d48f':
      	 return "5B"
      case '#349b35':
      	 return "6A"
      case '#37b938':
      	 return "6B"
      case '#69a50d':
      	 return "7A"
      case '#79c506':
      	 return "7B"
      case '#d2b208':
      	 return "8A"
      case '#fdd503':
      	 return "8B"
      case '#d45b15':
      	 return "9A"
      case '#ff6811':
      	 return "9B"
      case '#d4442b':
      	 return "10A"
      case '#fe4b2c':
      	 return "10B"
      case '#d42a3f':
      	 return "11A"
      case '#f62f3e':
      	 return "11B"
    }
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
        return 0;
    }
  }
  relatedCamelot(first, second){
    if(first === 0 || second === 0){
      return false
    }
    if(Math.abs(first-second) < 3){
      return true
    } else if (Math.abs(first-second) == 22) {
      return true
    }
    return false
  }
  calculateSimilarity(first, second){
    const bpmSimilarity = Math.abs(1/(first.bpm - second.bpm));
    const energySimilarity = Math.abs(1/(first.energy - second.energy));
    const danceabilitySimilarity = Math.abs(1/(first.danceability - second.danceability));
    return bpmSimilarity+energySimilarity+danceabilitySimilarity
  }
  resultSort(sortBy, firstData, secondData){

  }
  sortData(){
    let data = []
    data = data.concat(data201101)
    const nodes = data.map(json => {
      return {
        id: json.title,
        group: this.camelotConvert(json.camelot),
        artist: json.artist,
        rank: parseInt(json.rank),
        bpm: json.bpm,
        duration: json.duration,
        energy: json.energy,
        danceability: json.danceability,
        happiness: json.happiness,
        loudness: json.loudness,
        acousticness: json.acousticness,
        instrumentalness: json.instrumentalness,
        livenss: json.liveness,
        imgurl: json.imgurl,
        speechiness: parseInt(json.speechiness)
      }
    })
    const links = data.map((json,index) => {
      let related = data //.slice(index+1)
      const result = related.map( song => {
        
        if(this.relatedCamelot(this.camelotConvert(song.camelot), this.camelotConvert(json.camelot))){
          return {
            source: json.title,
            target: song.title,
            value: this.calculateSimilarity(song, json)
          }
        }
      })
      return result.filter(data=> data!==undefined)
    })
    let appendedLinks = [];
    links.map(linksArray => {
      const newArray = linksArray.sort((a,b)=> b.value-a.value).slice(0,5)
      appendedLinks = appendedLinks.concat(newArray)
    })
    const finalData = {
      nodes: nodes,
      links: appendedLinks
    }
    return finalData
  }
  componentDidMount() {
    const finalData = this.sortData()
    this.setState({data: finalData, width: this.graphContainer.parentNode.clientWidth-100, height: this.graphContainer.parentNode.clientHeight-100})
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevState.data !== this.state.data){
      this.updateStyleAndAttrs()
    }
  }
  updateStyleAndAttrs() {
    const { width, height, data } = this.state;
    const colorScale = d3.scaleLinear()
      .domain([0,1])
      .interpolate(d3.interpolateHcl)
      .range([d3.rgb("#ffffff"), d3.rgb('#aaaaaa')]);
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
    const maxRadius = Math.max.apply(Math, data.nodes.map(function(o) { return o.bpm; }))
    const svg = d3.select(this.graphSVG);
    const simulation = d3.forceSimulation()
      .force("link", d3.forceLink().id((d) => { return d.id; }))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2));
    const link = svg.select(".linksClass")
      .selectAll("line")
      .data(data.links)
      .enter().append("line")
      .attr("stroke-width", 1)
      .attr("stroke", (d)=>colorScale(Math.sqrt(d.value)));
    const node = svg.select(".nodesClass")
      .selectAll("g")
      .data(data.nodes)
      // .enter().append("g")
    const circles = node.select("circle")
      .attr("r", d => {return d.bpm/maxRadius*15})
      .attr("fill", (d) => { return colors[d.group]})
      .on("mouseenter", (d,i) => {
        let matching = []
        svg.selectAll("line").attr("stroke", (line,i)=>{
          if(line.source.id === d.id){
            matching = matching.concat(line.target.id)
            return colorScale(Math.sqrt(line.value))
          }
          else {
            return "#ddd"
          }
        })
        svg.selectAll("circle").attr("fill", (cur,j)=>{
          if(matching.includes(cur.id) || d.id===cur.id){
            return colors[cur.group]
          }
          else {
            return "#ddd"
          }
        })
      })					
      .on("mouseleave", (d) => {
        svg.selectAll("circle").attr("fill", (cur)=>{
          return colors[cur.group]
        })
        svg.selectAll("line").attr("stroke", (line)=>{return colorScale(Math.sqrt(line.value))})
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
    const { width, height, data } = this.state;
    return (
    <div style={{width:'100%', height:'100%'}}>
      <div ref={graphContainer => this.graphContainer = graphContainer} style={{paddingLeft:'1em', width:'100%', height:'100%'}}>
        <svg ref={graphSVG => this.graphSVG = graphSVG} width={width} height={height}> 
          <g className="linksClass"></g>
          <g className="nodesClass">
            {data && data.nodes.map((node,index)=>{
              return (
                <g>
                  <Popup trigger={<circle></circle>}>
                    <Image src={node.imgurl} size="small" />
                    Rank: {node.rank} <br/>
                    Title: {node.id} <br/>
                    Artist: {node.artist} <br/>
                    BPM: {node.bpm}
                  </Popup>
                </g>
              )
            })}
          </g>
        </svg>
      </div>
      <div style={{position:'absolute', top:'5em', left:'1em', display:'flex', width:'800px', height:'50px', border:'1px solid black'}}>
        {colors.map(color=>{
          if(color===''){
            return
          }
          return (
            <div style={{background: `${color}`, width:`${800/24}px`, alignItems:'center', justifyContent:'center', display:'flex'}}>
              {this.colorToCamelot(color)}
            </div>
          )
        })}
      </div>
      <div style={{position:'absolute', top:'5em', right:'8em', width:'100px', height:'50px'}}> 
        <Select placeholder="Select primary link" options={[{key: 'Key', value:'Key', text:'Key'},{key: 'BPM', value:'BPM', text:'BPM'},{key: 'Duration', value:'Duration', text:'Duration'},{key: 'Energy', value:'Energy', text:'Energy'},{key: 'Danceability', value:'Danceability', text:'Danceability'},{key: 'Loudness', value:'Loudness', text:'Loudness'},{key: 'Acousticness', value:'Acousticness', text:'Acousticness'},{key: 'Speechiness', value:'Speechiness', text:'Speechiness'},]}>
          
        </Select>
      </div>
    </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.globalState
})

export default connect(mapStateToProps)(Camelot)