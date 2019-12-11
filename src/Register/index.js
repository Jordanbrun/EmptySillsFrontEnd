import React, {Component} from 'react';
import {Form, Button, Image, Label, Message, Card, Header} from 'semantic-ui-react';

class Registration extends Component{
    constructor(){
        super();
        this.state = {
            email: "",
            display_name: "",
            password: ""
        }
    }
    handleChange = (e) => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		})
    }
    handleSubmit = async (e) => {
        e.preventDefault();
        const registrationUrl = `${process.env.REACT_APP_API_URL}/api/v1/users/register`;
        const registerResponse = await fetch(registrationUrl, {
            method: "POST",
            body: JSON.stringify(this.state),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const parsedResponse = await registerResponse.json();

        if(parsedResponse.status.code === 201){
            console.log(parsedResponse);
            localStorage.setItem('sessionUserId', parsedResponse.data.id)
            this.props.history.push('/home')
        } else{
            this.setState({
                errorMsg: parsedResponse.status.message
            })
        }
    }

    searchButton = () => {

    }

    render(){
        return(
            <Card centered>
                <Card.Content>
                    <Header>Registration</Header>
                    <Image src="https://i.ibb.co/7XcZ3YC/Logo-Makr-2-Y74t-W.png" size='small' centered='true'></Image>
                    <Form onSubmit={this.handleSubmit}>
                        <Label>Email</Label>
                        <Form.Input name="email" value={this.state.email} type="email" onChange={this.handleChange}/>
                        <Label>Display Name</Label>
                        <Form.Input name="display_name" value={this.state.display_name} type="text" onChange={this.handleChange} />
                        <Label>Password</Label>
                        <Form.Input name="password" value={this.state.password} type="password" onChange={this.handleChange}/>
                        <Button color="green" onClick={this.searchButton} >Register</Button>
                        {this.state.errorMsg ? <Message negative>{this.state.errorMsg}</Message> : null}
                    </Form>
                </Card.Content>
            </Card>
        )
    }
}


export default Registration;