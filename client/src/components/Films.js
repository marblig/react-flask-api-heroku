import React, {useState, useEffect} from "react";
import Film from "./FilmCard";
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const FilmsPage = () => {

    const [films, setFilms] = useState([]);
    const [show, setShow] = useState(false);
    const {register, reset, handleSubmit, setValue, formState:{errors}} = useForm();
    const [filmId, setFilmId]=useState(0);

        useEffect(() =>{
            fetch('/films')
            .then(response => response.json())
            .then(data=>{
                console.log(data)
                setFilms(data)
            })
            .catch(err => console.log(err))
        }, []
    );

    const getAllFilms=()=>{
        fetch('/films')
        .then(res => res.json())
        .then(data => {
            setFilms(data)
        })
        .catch(err => console.log(err))
    }

    const closeModal = () => {
        setShow(false)
    };
    const showModal = (id) => {
        setShow(true)
        setFilmId(id)
        films.map(
            (film) => {
                if(film.id===id){
                    setValue('title',film.title)
                    setValue('director',film.director)
                    setValue('year',film.year)
                    setValue('description',film.description)
                }
            }
        )
    };


    const updateFilm=(data)=>{
        console.log(data)

        

        const requestOptions={
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        }


        fetch(`/films/${filmId}`, requestOptions)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)

            const reload = window.location.reload()
            reload() 
        })
        .catch(err=>console.log(err))
    };

    const deleteFilm=(id)=>{
        console.log(id)
        

        const requestOptions={
            method:'DELETE',
            headers:{
                'content-type':'application/json'
            }
        }


        fetch(`/films/${id}`,requestOptions)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            getAllFilms()
        
        })
        .catch(err=>console.log(err))
    }



    return(
        <div className="film container">
            <Modal
               show={show}
               size="lg"
               onHide={closeModal}
            >

            <Modal.Header closeButton>
                <Modal.Title>
                    Update Film               
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                    <Button variant="info" onClick={handleSubmit(updateFilm)}>
                        Update Film
                    </Button>
                </Form.Group>
            </form>
            </Modal.Body>
            </Modal>

            <h1>FILMS</h1>
            {
                films.map(
                    (film, index) => (
                       <Film 
                       key={index}
                       title={film.title} 
                       director={film.director} 
                       year={film.year} 
                       description={film.description}
                       onClick={()=>{showModal(film.id)}}
                       onDelete={()=>{deleteFilm(film.id)}}
                       /> 
                    )
                )
            }
        </div>
    )
};

export default FilmsPage;