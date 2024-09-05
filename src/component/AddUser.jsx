import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddUser = () => {

    //pre-defined state for users
    const users = {
        name: '', email: '', phone: ''
    }


    const [user, setUser] = useState(users) //useing it for manageing the input state 
    const nav = useNavigate(); //useing it for navigate to home page after user added successfully

    //function for geting data in user 
    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    }

    //funuction for adding new user
    const show = async (e) => {
        e.preventDefault();
        await axios.post('https://jsonplaceholder.typicode.com/users', user).then((res) => {
            console.log(res)
            nav('/')
        }).catch(err => console.log(err))

    }

    return (
        <div ><Container className="w-50 mt-5">
            <Form onSubmit={show} >
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Full Name" name='name' onChange={inputHandler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name='email' onChange={inputHandler} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" placeholder="Phone Number" name='phone' onChange={inputHandler} />
                </Form.Group>
                <Button onClick={show}>Add User</Button>
            </Form>
        </Container></div>
    )
}

export default AddUser