import React, { Component } from 'react'
import { Button, Dimmer, Input, Segment, Loader, Container, Divider } from 'semantic-ui-react'
import NavBar from '../Nav';
import axios from 'axios'
import PlantList from '../PlantList'

class Search extends Component{
    constructor(){
        super();
        this.state = {
            currentUser: JSON.parse(localStorage.getItem('currentUser')) || {},
            loader: false,
            plants: [],
            userInput:"",
            submitPlant: {
                plant_id: 0,
                user: 0
            }
        }
    }
    // componentDidMount(){
    //     this.getUser();
    // }
    // getUser = async () => {
    //     try{
    //         const userId = localStorage.getItem('sessionUserId');
    //         const user = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/${userId}`, {
    //             credentials: 'include',
    //             method: "GET"
    //         })

    //         const parsedUser = await user.json()
    //          console.log("currentUser:", parsedUser);
    //         this.setState({
    //             currentUser: parsedUser
    //         })

    //     } catch(err){
    //         console.log(err);
    //         this.props.history.push('/')
    //     }
    // }
    searchButton = async () => {
        try {
            this.setState({
                plants: [],
                loader: true
            })

            const searchPlant = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/plants/search/`, {
            method: "POST",
            body: JSON.stringify(this.state),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*' }
            })

            const parsedPlant = await searchPlant.json();
            console.log(parsedPlant);

            for(let i=0; i<parsedPlant.length; i++){
            this.setState({
            plants: [...this.state.plants, parsedPlant[i]]
                })
            }

            this.setState({
                loader: false
             })
        } catch(err){
            this.setState({
                loader: false
            })
            console.log(err, "error in searchBar")
        }
    }
    updateValue = (e) => {
            this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
    }
    addPlant = async (id) => {
        try {
            console.log(id)
                await this.setState({
                    submitPlant: {plant_id: id}
                })
            console.log(this.state.submitPlant)
            const plantUrl = `${process.env.REACT_APP_API_URL}/api/v1/plants/`;
            const plantResponce = await fetch(plantUrl, {
                method: "POST",
                credentials: 'include',
                body: JSON.stringify(this.state.submitPlant),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(this.state.submitPlant)
            this.setState({
                plant_id: 0
            })
        } catch(err) {
            console.log(err)
        }
    }

    render(){
        return(
            <React.Fragment>
            <NavBar/>
            <Container text>
                    <Input icon='leaf' onChange={this.updateValue} name="userInput" iconPosition='left' value={this.state.userInput} placeholder='Search plants...' centered='true' />
                    <Button color="green" onClick={this.searchButton}>Search</Button>
                    <Divider hidden='true'/>
                    <Dimmer active={this.state.loader}>
                        <Loader active={this.state.loader}/>
                    </Dimmer>
                    <PlantList searchedPlant={this.state.plants} addPlant={this.addPlant}/>
            </Container>
            </React.Fragment>
        )
    }
}

export default Search;

//  <input
                    //type="text"
                    //value={this.state.userInput}
                    //onChange={this.updateValue}
                 // />