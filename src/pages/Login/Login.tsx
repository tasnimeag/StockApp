import React,{ChangeEvent,FormEvent, useRef, useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import './Login.css'
import {FormData}  from '../../Interfaces';
import { login_api } from '../../utils/endpoints';
import { acceuil_path, register_path } from '../../utils/paths';
import { Constants } from '../../utils/constants';
import Toolbar from '@mui/material/Toolbar';
import { AppBar, Grid, Stack, TextField } from '@mui/material';

function Login() {
    const errorRef=useRef<HTMLDivElement>(null);
    const[errorMsg,setErrorMsg]=useState('');
    const navigate=useNavigate();
    const[formData,setFormData]=React.useState<FormData>({
        email:"",
        password:""
    });
    
    function handleChange(event:ChangeEvent<HTMLInputElement>){
        const {name,value}=event.target
        setFormData(prevFormdata=>({
            ...prevFormdata,
            [name]:value
        }))
    }
    async function handleSubmit(event:FormEvent<HTMLFormElement>){
        event.preventDefault()
        try {
            const response = await fetch(login_api, {
                method: 'POST',
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password,
                }),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            });
            const result = await response.json();
            localStorage.setItem("user-info",JSON.stringify(result))
            navigate(acceuil_path); 
        } catch (error) {
            setErrorMsg(Constants.error_login);
        }
    }
  return (
    <>
    <AppBar>
    <Toolbar className='toolbar'>
        <Stack className='nav'>
          <img alt="logo" src="./src/assets/logo.png" /> 
        </Stack>
    </Toolbar>
    </AppBar>
    <Grid container style={{ width: "100%",marginTop:'160px'}} justifyContent={"center"}>
     {/* <Grid item lg={2} md={2} sm={1}   style={{ border: "1px solid red"}}></Grid> */}
     <Grid item lg={4} md={6} sm={10} xs={12} >
         <div className='form-container'>
            <h1>Welcome to yourstock app!</h1>
         <form className='form' onSubmit={handleSubmit}>
          <Stack spacing={4} className='formulaire'>
          <TextField 
                 type="email"
                 name="email"
                 placeholder='Email'
                 value={formData.email}
                 onChange={handleChange}
                 className="form--input"
                 required
             />
             
            <TextField
                 type="password"
                 name="password"
                 placeholder='Password'
                 value={formData.password}
                 onChange={handleChange}
                 className="form--input"
                 required
             />
            {errorMsg && (<div className="msg" ref={errorRef}>{errorMsg}</div>)}
             <button className='form--submit' > Login</button>
        </Stack>
        <Stack style={{ alignItems: 'flex-end'}}>
          <Link  className="lien" to={register_path} >Create account</Link>
        </Stack>
            
             
         </form>
      
     </div>
     </Grid>
     
     </Grid>
</>
)}
export default Login;
