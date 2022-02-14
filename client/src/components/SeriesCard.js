import React from 'react';
import { Card, Button } from 'react-bootstrap'

const Series = ({title, season, year, discs, description, onClick, onDelete}) => {
    return (
        <Card 
            className='series'
            bg='secondary'
            text='light'
        >
            <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Subtitle>Season {season} released {year}</Card.Subtitle>
            <Card.Text>{description}</Card.Text>
            <Card.Text>Contains {discs} discs</Card.Text>
            <Button variant='outline-light' 
            size='sm' 
            onClick={onClick}>
                Update
                </Button>
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

export default Series;