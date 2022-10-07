import React, { useState, useEffect, Fragment,  } from 'react'
import {commerce} from './lib/commerce';
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";
//import Products from './components/Products/Products.js'
//import Navbar from './components//Navbar/Navbar.js'

import {Products, Navbar, Cart, Checkout} from './components';
//for this to work: need to create a inidex.js under components folder


function App() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState('');

    const fetchProducts = async () => {
        //const response = await commerce.products.list(); //return a promise, so await to see whats inside the promise
        const {data} = await commerce.products.list(); //can destructure the data from that response
    
        setProducts(data);
    }

    const fetchCart = async()=> {
        //const response = await commerce.cart.retrieve();
        //const cart = await commerce.cart.retrieve();
        //setCart(cart);

        setCart(await commerce.cart.retrieve()); 
        
    } 

    const handleAddToCart = async (productId, quanitity) => {
        const item = await commerce.cart.add(productId, quanitity);

        setCart(item.cart);
    }

    const handleAddCartQty = async (productId, quantity) => {
        const {cart} = await commerce.cart.update(productId, {quantity}) //put quantity in a new object because qty is the only thing want to update
    
        setCart(cart)
    }

    const handleUpdateCartQty = async (productId, quantity) => {
        const {cart} = await commerce.cart.update(productId, {quantity}) //put quantity in a new object because qty is the only thing want to update
    
        setCart(cart)
    }

    const handleRemoveFromCart = async (productId) => {
        const {cart} = await commerce.cart.remove(productId);

        setCart(cart)
    }

    const handleEmptyCart = async () => {
        const {cart} = await commerce.cart.empty();

        setCart(cart)
    }

    const refreshCart = async()=> {
        const newCart = await commerce.cart.refresh();

        setCart(newCart);
    }

    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder)
            setOrder(incomingOrder);
            refreshCart();
        } catch (error) {
            setErrorMessage(error.data.error.message);
        }
    }

    useEffect(()=>{
        fetchProducts();
        fetchCart();
    },[])

    //console.log(products)
    console.log(cart)

    return (
        <BrowserRouter>
        <div>
            <Navbar totalItems={cart.total_items}/>
            <Routes>
 
                <Route exact path='/' element={<Products products={products} onAddToCart={handleAddToCart}/>}>  
                </Route>

                <Route exact path='/cart' element={
                    <Cart cart={cart} 
                        handleAddCartQty = {handleAddCartQty}
                        handleRemoveFromCart ={handleRemoveFromCart}
                        handleEmptyCart ={handleEmptyCart}
                    />}>
                </Route>
                <Route exact path='/checkout' element={<Checkout 
                    cart={cart} 
                    order={order} 
                    onCaptureCheckout={handleCaptureCheckout} 
                    error={errorMessage}
                    />}>
                </Route>
            </Routes>
        </div>
        </BrowserRouter>
    )
}

export default App
