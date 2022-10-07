import React, {useState, useEffect} from 'react'
import {InputLabel, Select, MenuItem, Button, Grid, Typography} from '@material-ui/core';
import {useForm, FormProvider} from 'react-hook-form';

import {Link} from 'react-router-dom'

import {commerce} from '../../lib/commerce';

import FormInput from './FormInput';

function AddressForm({checkoutToken, next}) {
    const [shippingCountries, setShippingCountries] = useState([]);
    const [shippingCountry, setShippingCountry] = useState('');
    const [shippingSubdivisions, setShippingSubdivisions] = useState([]);
    const [shippingSubdivision, setShippingSubdivision] = useState('');
    const [shippingOptions, setshippingOptions] = useState([]);
    const [shippingOption, setshippingOption] = useState('');
    const methods = useForm();

    const countries = Object.entries(shippingCountries).map(([code, name]) => ({id: code, label: name})) //make id = code, label = name
    //console.log(countries);
    // (5) [{…}, {…}, {…}, {…}, {…}]
    // 0: {id: 'AU', label: 'Australia'}
    // 1: {id: 'FR', label: 'France'}
    // 2: {id: 'DE', label: 'Germany'}
    // 3: {id: 'GB', label: 'United Kingdom of Great Britain and Northern Ireland (the)'}
    // 4: {id: 'US', label: 'United States'}
    // length: 5

    const subdivisions = Object.entries(shippingSubdivisions).map(([code, name]) => ({id: code, label: name})) //make id = code, label = name
    
    //sO means shipping options
    const options = shippingOptions.map((sO) =>({id:sO.id, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}) ) //sO.price.formatted_with_symbol = price

    console.log(shippingOptions);

    const fetchShippingCountries = async (checkoutTokenId) => {
        const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)
        
        //console.log(countries);
        setShippingCountries(countries);
        setShippingCountry(Object.keys(countries)[0]); //AU, UK, US
    }

    const fetchSubdivisions = async (countryCode) => {
        const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)

        setShippingSubdivisions(subdivisions);
        setShippingSubdivision(Object.keys(subdivisions)[0]);
    }

    //fetch shipping options bc US is domestic, EU is international, region = null if there's none
    const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
        const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region}) //after , is option object, make sure to get a specific shipping oiption for this country and for the specified region
    
        setshippingOptions(options);
        setshippingOption(options[0].id); //immediately select the first avaliable shipping option
    }

    useEffect(()=>{
        fetchShippingCountries(checkoutToken.id)
    }, [])

    useEffect(()=> {
        if(shippingCountry) fetchSubdivisions(shippingCountry);
    }, [shippingCountry]);

    useEffect(()=>{
        if(shippingSubdivision) fetchShippingOptions(checkoutToken.id, shippingCountry, shippingSubdivision)
    }, [shippingSubdivision])

    return (
        <>
            <Typography variant='h6' gutterBottom>Shipping Address</Typography>
            <FormProvider {...methods}>
                {/* the handleSubmit callback (data) is going to have all below specific fields, ...data means get all the properties, why not just data, because also the Grid */}
                <form onSubmit={methods.handleSubmit((data) => next({...data, shippingCountry, setShippingSubdivision, shippingOption}))}> 
                    <Grid container spacing={3}>
                        <FormInput  name='firstName' label='First name'/>
                        <FormInput  name='lastName' label='Last name'/>
                        <FormInput  name='address' label='Address'/>
                        <FormInput  name='email' label='Email'/>
                        <FormInput  name='city' label='City'/>
                        <FormInput  name='ZIP' label='ZIP'/>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Country</InputLabel>
                            <Select value={shippingCountry} fullWidth onChange={(e)=>setShippingCountry(e.target.value)}>
                                {/* {console.log(Object.entries(shippingCountries))} */}
                                {/* the result console log from above */}
                                {/* 0: (2) ['AU', 'Australia']
                                1: (2) ['FR', 'France']
                                2: (2) ['DE', 'Germany']
                                3: (2) ['GB', 'United Kingdom of Great Britain and Northern Ireland (the)']
                                4: (2) ['US', 'United States']
                                length: 5
                                [[Prototype]]: Array(0) */}
                                {countries.map((country) => (
                                    <MenuItem key={country.id} value={country.id}>
                                    {country.label}
                                    </MenuItem>
                                ))}
                                
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Subdivision</InputLabel>
                            <Select value={shippingSubdivision} fullWidth onChange={(e)=>setShippingSubdivision(e.target.value)}>
                                {subdivisions.map((subdivision) => (
                                    <MenuItem key={subdivision.id} value={subdivision.id}>
                                    {subdivision.label}
                                    </MenuItem>
                                ))}
                                
                            </Select>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <InputLabel>Shipping Options</InputLabel>
                            <Select value={shippingOption} fullWidth onChange={(e) => setshippingOption(e.target.value)}>
                                {options.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>
                                    {option.label}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Grid>
                    </Grid>
                    <br/>
                    <div style={{display:'flex', justifyContent: 'space-between'}}>
                                    <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
                                    <Button type='submit' variant='contained' color='primary'>Next</Button>
                    </div>
                </form>
            </FormProvider>
        </>
    )
}

export default AddressForm
