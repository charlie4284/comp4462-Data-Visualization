import React from 'react'
import { Menu, Container, Image, Icon } from 'semantic-ui-react';

export default function Titlebar(){
    return (
        <Menu fixed="top" secondary>
            <Container style={{width:'100%', padding:'1em'}}>
                <Menu.Item>
                    <h1 style={{marginLeft:'0em'}}>Billboard/Music Visualizer</h1>
                </Menu.Item>
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Icon size='big' name='github'/>
                    </Menu.Item>
                    <Menu.Item>
                        <Icon size='big' name='facebook'/>
                    </Menu.Item>
                    <Menu.Item>
                        <h4 style={{marginRight:'4em'}}>COMP4462</h4>
                    </Menu.Item>
                </Menu.Menu>
            </Container>
        </Menu>
    )
}