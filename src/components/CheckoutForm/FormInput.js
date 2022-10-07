import React from 'react'
import {TextField, Grid} from '@material-ui/core';
import {useFormContext, Controller} from 'react-hook-form';

function FormInput({name, label}) {
    const {control} = useFormContext();
    const isError = false;
    return (
        <Grid item xs={12} sm={6}>
            <Controller
                as={TextField} //make it looks like text field
                defaultValue=''
                control={control}
               //solution: https://stackoverflow.com/questions/66957809/typeerror-props-render-is-not-a-function-react-hook-form
                render = {({ field})=> (
                    <TextField
                        fullWidth
                        name={name}
                        label={label}
                        required //true
                    />
                )}
            />
        </Grid>
    )
}

export default FormInput