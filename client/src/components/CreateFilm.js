import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const CreateFilmPage = () => {

    const {register, handleSubmit, reset, formState:{errors}} = useForm();


    const createFilm = (data) => {
        console.log(data)

        const requestOptions = {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(data)

        }

        fetch('/add_film', requestOptions)
            .then(res => res.json())
            .then(data => {
                reset()
            })
            .catch(err => console.log(err))

    }


    return(
        <div className="container">

            <h1>Add a new film</h1>
            <form>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control 
                        type="text"
                        style={{backgroundColor: "#302e2b", color: "white"}}
                        {...register('title', {required: true})}
                    />
                </Form.Group>
                {errors.title && <p style={{ color: 'red' }}><small>Title is required</small></p>}
                <Form.Group>
                    <Form.Label>Director</Form.Label>
                    <Form.Control 
                        type="text"
                        style={{backgroundColor: "#302e2b", color: "white"}}
                        {...register('director', {required: true})}
                    />
                </Form.Group>
                {errors.title && <p style={{ color: 'red' }}><small>Director is required</small></p>}
                <Form.Group>
                    <Form.Label>Year</Form.Label>
                    <Form.Control 
                        type="text"
                        style={{backgroundColor: "#302e2b", color: "white"}}
                        {...register('year', {required: true})}
                    />
                </Form.Group>
                {errors.title && <p style={{ color: 'red' }}><small>Year is required</small></p>}
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control 
                        as="textarea" 
                        rows={5}
                        style={{backgroundColor: "#302e2b", color: "white"}}
                        {...register('description', {required: true})}
                    />
                </Form.Group>
                {errors.title && <p style={{ color: 'red' }}><small>A description is required</small></p>}
                <br></br>
                <Form.Group>
                    <Button variant="info" onClick={handleSubmit(createFilm)}>
                        Add Film
                    </Button>
                </Form.Group>
            </form>
        </div>
    )
}

export default CreateFilmPage;