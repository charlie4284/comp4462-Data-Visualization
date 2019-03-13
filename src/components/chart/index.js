import React from 'react';
import { Container, List, Image } from 'semantic-ui-react';
import data from '../../data/201801.jsonl'
import { connect } from 'react-redux'
import { addData } from '../../rootReducer';

class Chart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }
    fileRead = () => {
        fetch(data).then((response)=>{
            response.text().then((value)=>{
                const jsonl = value
                const toArray = jsonl.split('\n')
                let returnArray = Array(toArray.length)
                toArray.map((value, index)=>{
                    returnArray[index] = JSON.parse(value)
                })
                this.props.dataAdd(returnArray)
                this.setState({data:returnArray})
            })
        })
    }
    componentDidMount(){
        this.fileRead()
    }
    render(){
        const { data } = this.state;
        return (
            <Container style={{height:'100%', width:'100%', overflow:'hidden'}}>
                <Container style={{height:'95%', width:'100%', overflow:'scroll', overflowX:'hidden'}}>
                    <List>
                        {data.map((value,index)=>{
                            return(
                                <List.Item>
                                    <Image size='tiny' src={value.imgurl}/>
                                    <List.Content>
                                        <List.Header style={{fontSize:'1.3em', marginBottom:'0.3em'}} as='a'>{`${value.rank}. ${value.title}`}</List.Header>
                                        <List.Description>{`Artist:${value.artist}`}</List.Description>
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