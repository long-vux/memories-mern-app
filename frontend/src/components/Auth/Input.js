import {  TextField, InputAdornment, IconButton, Grid } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Input = ({name, label, handleChange, half, autoFocus, type, handleShowPassword }) => {
    const isHalf = half ? 6 : 12;

    return (
        <Grid item xs={12} sm={isHalf}>
            <TextField 
                name={name} 
                onChange={handleChange}
                variant="outlined"
                required 
                fullWidth
                label={label} 
                autoFocus={autoFocus}
                type={type}
                InputProps={name === 'password' ? {
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword}>
                                {type === 'password' ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>
                    )
                } : null}
            />
        </Grid>
    )
}

export default Input;