import React from 'react';
import { Container, List, Image } from 'semantic-ui-react';
import data from '../../data/201101.json';
import { connect } from 'react-redux'
import { addData } from '../../rootReducer';

class Chart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }
    // fileRead = (data) => {
    //     const returndata = data.map((obj)=>{
    //         return obj
    //     })
    //     this.setState({data: returndata})
    // }
    stringHandler(string){
        if(string.length > 30){
            return string.substring(0,29).concat('...')
        }
        return string
    }
    stringHandlerTitle(string){
        if(string.length > 20){
            return string.substring(0,19).concat('...')
        }
        return string
    }
    componentDidMount(){
        this.setState({data:data})
    }
    render(){
        const { data } = this.state;
        return (
            <Container style={{height:'100%', width:'100%', overflow:'hidden'}}>
                <Container style={{height:'95%', width:'100%', overflow:'scroll', overflowX:'hidden'}}>
                    <List style={{overflowX:'hidden'}}>
                        {data.map((value)=>{
                            return(
                                <List.Item>
                                    <Image size='tiny' src={value.imgurl}/>
                                    <List.Content>
                                        <List.Header style={{fontSize:'1.3em', marginBottom:'0.3em'}} as='a'>{`${value.rank}. ${this.stringHandlerTitle(value.title)}`}</List.Header>
                                        <List.Description>{`Artist:${this.stringHandler(value.artist)}`}</List.Description>
                                        <List.Description>{`Key:${value.key}`}</List.Description>
                                        <List.Description>{`Camelot:${value.chamelot}`}</List.Description>
                                    </List.Content>
                                </List.Item>
                            )
                        })}
                    </List>
                </Container>
            </Container>
        )
    }
}

function mapDispatchToProps(dispatch){
    return {
        dataAdd: (data) => dispatch(addData(data))
    }
}

const mapStateToProps = state => ({
    ...state.globalState
})

export default connect(mapStateToProps, mapDispatchToProps)(Chart)