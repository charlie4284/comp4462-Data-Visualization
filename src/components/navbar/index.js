import { Menu } from 'semantic-ui-react';
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { changeTab } from '../../rootReducer';

class Navbar extends React.Component {
    render(){
        const { tab, backgroundColor, changeTabInfo } = this.props;
        return (
            <Menu pointing secondary vertical style={{border:'none'}}>
                <Menu.Item 
                    name='Camelot' 
                    as={Link} to="/camelot" 
                    active={tab === 'camelot'} 
                    onClick={()=>changeTabInfo('camelot')} 
                />
                <Menu.Item
                    name='BPM'
                    as={Link}
                    to="/bpm"
                    active={tab === 'BPM'}
                    onClick={()=>changeTabInfo('BPM')}
                />
                <Menu.Item
                    name='Key'
                    as={Link}
                    to="/key"
                    active={tab === 'Key'}
                    onClick={()=>changeTabInfo('Key')}
                />
            </Menu>
        )
    }
}

const mapStateToProps = state => ({
    ...state.globalState
})

function mapDispatchToProps(dispatch) {
    return {
        changeTabInfo: (tab) => dispatch(changeTab(tab))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)