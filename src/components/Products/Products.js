import React from 'react'
import {Grid} from '@material-ui/core'
import Product from './Product/Product.js'

import useStyles from './styles.js'


//no longer needed
// const products = [
//     {id:1, name:'Shoes',description: 'Running Shoes', price: '$5', image:'https://images.asics.com/is/image/asics/1011B215_650_SR_RT_GLB?$zoom$'},
//     {id:1, name:'Macbook',description: 'Apple Macbook', price: '$10', image:'https://9to5mac.com/wp-content/uploads/sites/6/2021/03/MacBook-Air.jpg?resize=1024,512'}

// ]



const Products = ({products, onAddToCart})=>{
    const classes = useStyles(); 
    return(
    <main className={classes.content}>
        <div className={classes.toolbar}/>
        <Grid 
        container
        justify='center'
        spacing={4}
        >
            {products.map((product)=>(
                <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product product={product} onAddToCart={onAddToCart}/>
                </Grid>
            ))}
        </Grid>
    </main>
    );
}


export default Products
