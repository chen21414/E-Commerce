import React from 'react'
import {AppBar, Toolbar, IconButton, Badge, MenuItem, Menu, Typography} from '@material-ui/core'
import {CallMissedSharp, ShoppingCart} from '@material-ui/icons'
import { mergeClasses } from '@material-ui/styles'
import { Link, useLocation } from 'react-router-dom'

import logo from '../../assets/cart-1956097_960_720.png'
import useStyles from './styles'

function Navbar({totalItems}) {
    const classes = useStyles();
    const location = useLocation();

    return (
        <>
            <AppBar position='fixed' className={mergeClasses.appBar} color='inherit'>
                <Toolbar>
                    <Typography component={Link} to='/' variant='h6' className={classes.title} color='inherit'>
                        <img src={logo} alt="Commerce.js" height='25px' className={classes.image}/>
                        PineApple
                    </Typography>
                    <div className={classes.grow}/>
                    {location.pathname === '/' && (
                    <div className={classes.button}>
                        <Link to='/cart'>go to cart</Link>
                        <IconButton component={Link} to='/cart' aria-label='Show cart items' color='inherit'>
                            <Badge badgeContent={totalItems} color='secondary'>
                                {/* badgeContent is # of items we have */}
                                <ShoppingCart/>
                            </Badge>
                        </IconButton>
                    </div>)} 
                    {/* && means only if the first part is true */}
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Navbar
