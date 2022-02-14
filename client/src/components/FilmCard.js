import React from 'react';
import { Card, Button } from 'react-bootstrap'

const Film = ({title, director, year, description, onClick, onDelete}) => {
    return (
        <Card 
            className='film'
            bg='dark'
            text='light'
        >
            <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle>Directed by {director} - {year}</Card.Subtitle>
            <Card.Text>{description}</Card.Text>
            <Button variant='outline-light' size='sm' onClick={onClick}>Update</Button>
            {' '}
            <Button variant='outline-danger' 
            onClick={onDelete}
            size='sm'>
            Delete
            </Button>
            </Card.Body>
        </Card>
    )
}

export default Film;