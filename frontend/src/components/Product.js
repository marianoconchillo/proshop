import React from 'react'

import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Rating } from './Rating';

export const Product = ( { product } ) => {
    return (
        <Card className="my-2 p-3 rounded card-home">
            <Link to={`/product/${ product._id }`}>
                <Card.Img src={ product.picture_url } className="card-img" variant='top' />
            </Link>

            <Card.Body>
                <Link to={`/product/${ product._id }`}>
                    <Card.Title as="div">
                        <strong>{ product.title }</strong>
                    </Card.Title>
                </Link>

                <Card.Text as="div">

                    <Rating
                        value={ product.rating } 
                        text={`${ product.numReviews } reviews`}/>
                </Card.Text>

                <Card.Text as="h3">
                    ${ product.unit_price }
                </Card.Text>
                
            </Card.Body>

        </Card>
    )
}
