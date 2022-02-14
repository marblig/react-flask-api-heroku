import React, {useState, useEffect} from "react";
import Series from "./SeriesCard";
import { Modal, Form, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

const SeriesPage = () => {

    const [series, setSeries] = useState([]);
    const [show, setShow] = useState(false);
    const {register, reset, handleSubmit, setValue, formState:{errors}} = useForm();
    const [seriesId, setSeriesId]=useState(0);

        useEffect(() =>{
            fetch('/series')
            .then(response => response.json())
            .then(data=>{
                console.log(data)
                setSeries(data)
            })
            .catch(err => console.log(err))
        }, []
    );
    
    const getAllSeries=()=>{
        fetch('/series')
        .then(res => res.json())
        .then(data => {
            setSeries(data)
        })
        .catch(err => console.log(err))
    }

    const closeModal = () => {
        setShow(false)
    };
    const showModal = (id) => {
        setShow(true)
        setSeriesId(id)
        series.map(
            (series) => {
                if(series.id===id){
                    setValue('title',series.title)
                    setValue('season',series.season)
                    setValue('year',series.year)
                    setValue('discs',series.discs)
                    setValue('description',series.description)
                }
            }
        )
    };

    const updateSeries=(data)=>{
        console.log(data)

        

        const requestOptions={
            method:'PUT',
            headers:{
                'content-type':'application/json'
            },
            body:JSON.stringify(data)
        }


        fetch(`/series/${seriesId}`,requestOptions)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)

            const reload =window.location.reload()
            reload() 
        })
        .catch(err=>console.log(err))
    };



    const deleteSeries=(id)=>{
        console.log(id)
        

        const requestOptions={
            method:'DELETE',
            headers:{
                'content-type':'application/json'
            }
        }


        fetch(`/series/${id}`,requestOptions)
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
            getAllSeries()
        
        })
        .catch(err=>console.log(err))
    }



    return(
        <div className="series container">
            <Modal
               show={show}
               size="lg"
               onHide={closeModal}
            >

            <Modal.Header closeButton>
                <Modal.Title>
                    Update Series               
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
                    <Form.Label>Season</Form.Label>
                    <Form.Control 
                        type="text"
                        style={{backgroundColor: "#302e2b", color: "white"}}
                        {...register('season', {required: true})}
                    />
                </Form.Group>
                {errors.title && <p style={{ color: 'red' }}><small>Season is required</small></p>}
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
                    <Form.Label>Discs</Form.Label>
                    <Form.Control 
                        type="text"
                        style={{backgroundColor: "#302e2b", color: "white"}}
                        {...register('discs', {required: true})}
                    />
                </Form.Group>
                {errors.title && <p style={{ color: 'red' }}><small>Discs is required</small></p>}
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
                    <Button variant="info" onClick={handleSubmit(updateSeries)}>
                        Update Series
                    </Button>
                </Form.Group>
            </form>
            </Modal.Body>
            </Modal>
            <h1>SERIES</h1>
            {
                series.map(
                    (series, index) => (
                       <Series 
                        key={index}
                        title={series.title}
                        season={series.season} 
                        year={series.year} 
                        discs={series.discs} 
                        description={series.description}
                        onClick={()=>{showModal(series.id)}}
                        onDelete={()=>{deleteSeries(series.id)}}
                        /> 
                    )
                )
            }
        </div>
    )
};

export default SeriesPage;