import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { RegisterData } from '../../Interfaces';
import { Constants } from '../../utils/constants';
import { pwd_REGEX } from '../../utils/expressions';
import { Register_api } from '../../utils/endpoints';
import { acceuil_path } from '../../utils/paths';
import { AppBar, Grid, Stack, TextField, Toolbar } from '@mui/material';
function Register() {
    
    const userRef=useRef<HTMLInputElement>(null);
    const errRef=useRef<HTMLDivElement>(null);
    
    const[formData,setFormData]=useState<RegisterData>({
        username:"",
        email:"",
        password:"",
        passwordconfirm:""
        
    })
    
    const [validPwd,setValidpwd]=useState(false)
    
    const[errMsg,setErrMsg]=useState('');
    
    const[success,setSuccess]=useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        if(userRef.current)
            userRef.current.focus();
    },[])

    useEffect(() => {
        setValidpwd(pwd_REGEX.test(formData.password));
    }, [formData.password]);

    function handleChange(event:ChangeEvent<HTMLInputElement>){
        const {name,value}=event.target
        setFormData(prevFormdata=>({
            ...prevFormdata,
            [name]:value
        }));
    }
     async function handleSubmit(event:FormEvent<HTMLFormElement>){
        event.preventDefault()
        if(!validPwd){
            setErrMsg(Constants.password_validation );
             return;
        }
        if(formData.password!==formData.passwordconfirm){
            setErrMsg(Constants.password_confirmation);
            return;
        }
        setErrMsg('')
        try {
            const response = await fetch(Register_api, {
                method: 'POST',
                body: JSON.stringify({
                    name: formData.username,
                    email: formData.email,
                    password: formData.password,
                    avatar:"https://picsum.photos/800"
                }),
                headers: {
                    "Content-Type": 'application/json',
                    "Accept": 'application/json'
                }
            });
            if (!response.ok) throw new Error(Constants.register_error);

            const result = await response.json();
            localStorage.setItem("user-info", JSON.stringify(result));
            setSuccess(true);
            navigate(acceuil_path); 
        } catch (error) {
            setErrMsg(Constants.creation_error);
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
    
    {success? (
        <p>{Constants.success_creation_msg}</p>
    ):(
    <Grid container style={{ width: "100%",marginTop:'130px'}} justifyContent={"center"}>
    <Grid item lg={6} md={4} sm={10} xs={12} >
    <div className='form--container'>
        <h1 id="title">Créer un compte dans yourstock</h1>
        <form className='form' onSubmit={handleSubmit}>
        <Stack spacing={3} className='formulaire'>
            <TextField 
                type="text"
                name="username"
                placeholder='UserName'
                value={formData.username}
                onChange={handleChange}
                className="register--input"
                ref={userRef}
                required
            />
           
            <TextField 
                type="email"
                name="email"
                placeholder='Email'
                value={formData.email}
                onChange={handleChange}
                className="register--input"
                required
            />
            
            <TextField 
                type="password"
                name="password"
                placeholder='Password'
                value={formData.password}
                onChange={handleChange}
                className="register--input"
                required
            />
            <TextField 
                type="password"
                name="passwordconfirm"
                placeholder='Confirm your password'
                value={formData.passwordconfirm}
                onChange={handleChange}
                className="register--input"
                required
            />
            {errMsg && (<div ref={errRef} className='error-msg'>{errMsg}</div>)}
            <button className='buton'> Create an account</button>
            </Stack>
            <Stack spacing={2} className='link' style={{ alignItems: 'flex-start'}}>
                <span>Already registred?</span>
                <Link  className="connect" to="/" >Login</Link>
            </Stack>
        </form>
    </div>
    </Grid>
    </Grid>)}
    </>
  )
}

export default Register;
