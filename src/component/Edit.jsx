import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

const Edit = () => {

    //pre definend state for users
    const users = {
        name: '',
        email: '',
        phone: ''
    }

    const [user, setUser] = useState(users);
    const { id } = useParams(); //geting the user id from parameter
    const nav = useNavigate();  //use to navigate to home after user updated 


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value })

    }

    //geting the value from id to show on fields
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => {
            setUser(res.data);
        }).catch(err => console.log(err))
    }, [])

    //updateing the value 
    const sumbit = async () => {
        await axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user).then((res) => {
            console.log(res)
            nav('/')
        }).catch(err => console.log(err))
    }

    return (
        <div ><Container className="w-50 mt-5">
            <Form >
                <h3>Update User</h3>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" value={user.name} placeholder="Full Name" name='name' onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" value={user.email} placeholder="Enter email" name='email' onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control type="text" value={user.phone} placeholder="Phone Number" name='phone' onChange={handleChange} />
                </Form.Group>
                <Button onClick={sumbit}>Update User</Button>
            </Form>
        </Container></div>
    )
}

export default Edit