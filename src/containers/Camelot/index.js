import React from 'react';
import { connect } from 'react-redux';
import * as d3 from 'd3';
import data from '../../data/201101.json'
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
        rank: parseInt(json.rank),
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