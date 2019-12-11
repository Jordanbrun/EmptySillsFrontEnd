import React, {Component, Fragment} from 'react';
//import {Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import NavBar from '../Nav';
import PlantModule from '../PlantModule';
import SillsList from '../SillsList'

class Sills extends Component{
    constructor(){
        super();
        this.state = {
            plants: [],
            plantData: [],
            viewPlants: false,
            companionViewed: [],
            editPlant: []
        }
    }
    componentDidMount(){
        this.getUser();
        this.currentPlants();
    }
    getUser = async () => {
        try{
            const userId = localStorage.getItem('sessionUserId');
            const user = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/users/${userId}`, {
                credentials: 'include',
                method: "GET"
            })

        } catch(err){
            this.props.history.push('/')
        }
    }
    currentPlants = async () => {
        try{
            await this.setState({
                plantData: [],
                plants: []
            })
            const searchedPlant = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/plants/`, {
                method: "GET",
                credentials: 'include'
            });
            console.log(searchedPlant, "1")
            const parsedPlants = await searchedPlant.json()
            console.log(parsedPlants.data, "2")
            console.log(this.state.plants, "3")
            console.log(parsedPlants.data.length)
            for(let i=0; i<parsedPlants.data.length; i++){
                console.log(parsedPlants.data[i],"4")
                console.log(parsedPlants.data[i].user.id, "5")
                if(parsedPlants.data[i].user.id.toString() === localStorage.getItem('sessionUserId').toString()){
                    console.log("6")
                    await this.setState({
                        plantData: [...this.state.plantData, parsedPlants.data[i]]
                    })
                        console.log(this.state.plantData, '7')
                        console.log(this.state.plantData[i],"8")
                        console.log(this.state.plantData[i].plant_id,"9")
                        //console.log(this.state.parsedPlants.data[i], "8")
                    const quedPlants = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/plants/sill/`, {
                        method: "POST",
                        body: JSON.stringify(this.state.plantData[i].plant_id),
                        credentials: 'include',
                        headers: {
                        'Content-Type': 'application/json'}
                     })
                    const allPlantData = await quedPlants.json()
                    console.log(quedPlants)
                    await this.setState({
                         plants: [...this.state.plants, allPlantData]
                    })
                    console.log(this.state.plants)
                    console.log(this.state.plantData)
                }
            }



        } catch(err){
            console.log(err)
            this.props.history.push('/')
        }
    }
    removePlant = async (id) => {
        const deletePlantResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/plants/${id}/`, {
            method: 'DELETE',
            credentials: 'include'
        })
        const deletePlantParsed = await deletePlantResponse.json()
        this.setState({plants: this.state.plants.filter((plants) => plants.id !== id )})
    }
    // openPlantModal = async (plant) => {
    //     await this.setState({
    //         viewPlants: true,
    //         plantViewed: plant
    //     })
    // }
    // closeModal = async () => {
    //     await this.setState({
    //         viewPlant: false
    //     })
    // }
    waterPlant = async(plantWatered) => {
         try {

            console.log(plantWatered)

             const editResponce = await fetch (process.env.REACT_APP_API_URL + `/api/v1/plants/${plantWatered}/`, {
             method: 'PUT',
             credentials: "include"
          });

          const editResponseParsed = await editResponce.json();
          console.log('editResponseParsed: ', editResponseParsed)


          const plantArr = this.state.plantData.map((plant) => {
            if(plant.id === editResponseParsed.data.id) {
              plant = editResponseParsed.data
            }
            return plant;
          })

          this.setState({
            plantData: plantArr
          })

        } catch (err) {
          console.log(err);
        }
    }
    render(){
        return(
            <Fragment>
                <NavBar />
                <SillsList searchedPlant={this.state.plants} plantId={this.state.plantData} waterPlant={this.waterPlant} removePlant={this.removePlant}/>
            </Fragment>
        )
    }
}

export default Sills;