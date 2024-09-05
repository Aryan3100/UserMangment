import React from 'react'
import { Link } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { Button, Spinner } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { Trash3, PencilSquare } from 'react-bootstrap-icons';
import axios from 'axios'
import { useEffect, useState } from 'react'

const Home = () => {

    const [value, setValue] = useState([]); // using for storing the fetched data
    const [done, setDone] = useState(true); // using it for spinner

    //function for fetching the user information from api & managing the loading state
    const fetchData = async () => {
        setDone(false)
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/users')
        setValue(data)
        setDone(true)
    }

    //calling the function when app load
    useEffect(() => {
        fetchData();
    }, [])

    //function for deleteing the user 
    const deleteUser = async (id) => {
        await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`).then((res) => {
            setValue((prv) => prv.filter((user) => user.id !== id))
        }).catch(err => console.log(err))
    }


    return (
        <Container className='my-5'>
                {done === false ? <Spinner animation="border" />
                    :
                    <>
                        <Link to={'/add'}>
                            <Button variant="primary" className='my-3'> AddUser</Button>
                        </Link>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>E-mail</th>
                                    <th>Phone</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {value.map((item, id) => {
                                    return (
                                        <tr key={id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>
                                                <Trash3 className='mx-2' color="red" onClick={() => deleteUser(item.id)} />
                                                <Link to={`/edit/` + item.id} ><PencilSquare className='mx-1' /></Link>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </>
                }
        </Container>
    )
}

export default Home