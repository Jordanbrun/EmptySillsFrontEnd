import React, {Component} from 'react';
import {Menu, Header, Segment, Button} from 'semantic-ui-react';
import {Link} from 'react-router-dom';

class NavBar extends Component{
    constructor(){
        super();
        this.state = {
            active: ""
        }
    }
    handleNav = async (e) => {
        await this.setState({
            active: e.currentTarget.value
        })
    }
    handleLogout = async (e) => {
        localStorage.setItem('sessionUserId', null);
    }
    render(){
        return(
            <Header>
                <Menu pointing secondary color="white"  >
                    <Menu.Item name="home" active={this.state.active==="home"}>
                        <Link to="/home">
                            <Button inverted color="black" value="home" onClick={this.handleNav} size='small'>Home</Button>
                        </Link>
                    </Menu.Item>
                     <Menu.Item name="sill" value="sill" active={this.state.active==="sill"}>
                        <Link to="/sill" value="sill">
                            <Button inverted color="black"size='small' value="sill" onClick={this.handleNav}>Sill</Button>
                        </Link>
                    </Menu.Item>
                    <Menu.Item name="search" value="search" active={this.state.active==="search"}>
                    <Link to="/search" value="search">
                        <Button inverted color="black"size='small' value="search" onClick={this.handleNav}>Search</Button>
                    </Link>
                    </Menu.Item>
                    <Menu.Item position="right">
                        <Link to={{
                            pathname:'/',
                            state: {
                                loggedout: true,
                                msg: "You have successfully logged out"
                            }
                        }}>
                            <Button inverted color="black" size='small' value="logout" onClick={this.handleLogout}>Logout</Button>
                        </Link>
                    </Menu.Item>
                </Menu>
            </Header>
        )
    }
}


export default NavBar;