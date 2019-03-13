import React from 'react';
import { connect } from 'react-redux';

const pi = 3.14159265359

class Camelot extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      height:0,
      centerX:0,
      centerY:0,
    }
  }
  boxStyle = () => {
    return {
      height:'100%',
      width:this.state.height,
      border:'1px solid black',
      borderRadius: '50%',
      position:'relative',
      display:'flex'
    }
  }
  // calculateRadiusPos = (top,left) => {
  //   if(top)
  // }
  componentDidMount(){
    const height = this.divElement.clientHeight;
    this.setState({height:height},()=>{
      const elementProp = this.divElement.getBoundingClientRect()
      const centerX = (elementProp.top + elementProp.bottom)/2
      const centerY = (elementProp.left + elementProp.right)/2
      this.setState({centerX:centerX, centerY:centerY})
    })
  }
  render(){
    console.log(this.props)
    return (
        <div ref={(divElement)=>this.divElement = divElement} style={this.boxStyle()}>
          Camelot
        </div>
    )
  }
}

const mapStateToProps = state => ({
  ...state.globalState
})

export default connect(mapStateToProps)(Camelot)