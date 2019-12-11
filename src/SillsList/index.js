import React, {Component, Fragment} from 'react';
import NavBar from '../Nav';
import {Button, Card, Container,Image, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

function SillsList(props){
    const mappedPlants = props.searchedPlant.map((plant) => {
        const deletePlant = props.plantId.map((data, i) => {
            if(data.plant_id === plant.id){
                console.log(plant.id)
                console.log(data.plant_id)
            return(
                <React.Fragment>
                    <Button color='red' onClick={ () => props.removePlant(data.id)} >Remove Plant from Sill</Button>
                    <Button color='blue' onClick={ () => props.waterPlant(data.id)} > Water Plant</Button>
                    <br/>
                    Last Watered: {data.last_watered}
                </React.Fragment>
            )
        }
    })
        return(
            <Card key={plant.id} color='black'>
                <Card.Header>
                {
                    (plant.images === undefined || plant.images === null || plant.images[0] === null || plant.images[0] === undefined || plant.images[0].url === undefined ) ? <div>No Available Image</div> : <Image src={plant.images[0].url}/>
                }
                <Icon name='leaf'/> {plant.common_name}</Card.Header>
                <Card.Content>
                    <Card.Description>{plant.scientific_name}</Card.Description>
                    <Card.Description>{plant.family_common_name}</Card.Description>
                    <Card.Description>{deletePlant}</Card.Description>
                </Card.Content>
            </Card>
        )
    })


    return(
        <Container>
        <Card.Group>
            {mappedPlants}
        </Card.Group>
        </Container>
    )
}

export default SillsList

