import React, {Component} from 'react';
import NavBar from '../Nav';
import { Container, Segment, Image } from 'semantic-ui-react';



class MainContainer extends Component{
    constructor(){
        super();
        this.state = {
            currentUser: []
        }
    }
    componentDidMount(){
        this.getUser();
    }
    getUser = async () => {
        try{
            const userId = localStorage.getItem('sessionUserId');

            const user = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/${userId}`, {
                credentials: 'include',
                method: "GET"
            })

            const parsedUser = await user.json()
             console.log("currentUser:", parsedUser);

             
            this.setState({
                currentUser: parsedUser
            })

        } catch(err){
            console.log(err);
            this.props.history.push('/')
        }
    }
    render(){
        return(
            <React.Fragment>
                <NavBar/>
                <Container text>
                <Image src="https://i.ibb.co/7XcZ3YC/Logo-Makr-2-Y74t-W.png" size='small' centered='true'></Image>
                 <Segment inverted>Welcome back to Empty Sills, {this.state.currentUser.display_name}! Be sure to stop by your "Sill" to check the status of your plants.</Segment>
                </Container>
                
            </React.Fragment>
        )
    }
}


export default MainContainer;