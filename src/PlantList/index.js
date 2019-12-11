import React, {Component, Fragment} from 'react';
import NavBar from '../Nav';
import {Button, Card, Container,Image, Icon} from 'semantic-ui-react'
import {Link} from 'react-router-dom'

function PlantList(props){
    const mappedPlants = props.searchedPlant.map((plant) => {
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
                    <Button color='green' onClick={() => props.addPlant(plant.id)}>Add Plant to Sill</Button>
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

export default PlantList;