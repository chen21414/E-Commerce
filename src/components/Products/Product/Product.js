import React from 'react'
import {Card, CardMedia, CardContent, CardActions, Typography, IconButton} from '@material-ui/core';
import {AddShoppingCart} from '@material-ui/icons'

import useStyles from './styles';

function Product({product, onAddToCart}) {
    const classes = useStyles();

    //console.log(product);

    //return <div>test</div> //prevent return below

    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.image.url} title={product.name}/>
            <CardContent>
                <div className={classes.cardContent}>
                        {/* use any kind of text in material UI, variant='h5' means medium large heading, gutterBottom = some space at bottom */}
                        <Typography variant='h5' gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant='h5' >
                            {product.price.formatted_with_symbol}
                        </Typography>
                </div>
                <Typography dangerouslySetInnerHTML={{__html: product.description}} variant='body2' color='textSecondary'>
                    {/* dangerouslySetInnerHTML to make description w/o <p> tag */}
                </Typography>
            </CardContent>
            <CardActions disableSpacing className={classes.CardActions}>
                <IconButton aria-label='Add to Cart' onClick={()=> onAddToCart(product.id, 1)}>
                    {/* makes onAddToCart a callback, so it won't call immediately */}
                    {/* aria-label: if some user cannot see the bottom, will see the text */}
                    <AddShoppingCart/>
                </IconButton>
            </CardActions>
        </Card>
    )
}

export default Product
