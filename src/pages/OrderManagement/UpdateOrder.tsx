import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Button, CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, ThemeProvider, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom';
import { orders2_api} from '../../utils/endpoints';
import { order_management } from '../../utils/paths';
import { Orders } from '../../Interfaces';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Constants } from '../../utils/constants';
import { theme, useStyle } from './Update';
 function UpdateOrder({onUpdate}:{ onUpdate: (updatedOrder: Orders) => void }) {
  const {id} = useParams<{ id: string }>();
  const [,setSuccess]=useState(false)
  const [errMsg,setErrMsg]=useState<string | null>(null);
  const[loading,setLoading]=useState(true)
  const Classes=useStyle();
  const navigate=useNavigate()
  const[values,setValues]=useState({
    id: 0,
    Code_Client: 0,
    Date: '',
    /*Products: {
      ref: 0,
      title: '',
      price: 0,
    },*/
    Total_TTC: 0,
    Status: '',
    Date_of_payment: '',
    Payment_Method: '',
    Delivery_price: 0,
    Total_price_of_products: 0,
    Address: '',
    Delivery_company: '',
  });
  
  
  function handleChange(event:ChangeEvent<HTMLInputElement>){
    const {name,value}=event.target
    setValues(prevData => {
      /*const keys = name.split('.');
      
      if (keys.length === 2 && keys[0] === 'Products') {
        return{   
        ...prevData,
        Products: {
          ...prevData.Products,
          [keys[1]]: value,
        },
      };
      }else{}*/
        return {
          ...prevData,
          [name]: value
        };
      
    });
  }
  function handleSelect(event: SelectChangeEvent<string>) {
    const {value}=event.target
    setValues(prevValues => ({
        ...prevValues,Status:value as string
    }));
   }
   function Delete() {
    navigate(order_management);
  }
  useEffect(()=>{
    async function fetchOrder(){
    try{
      const response = await fetch (`${orders2_api}/${id}`,
        {
          method:"GET",
          headers:{
             'Content-Type': 'application/json'
          }
        })
        const res:Orders=await response.json();
        setValues(res);
    }catch(error){
      setErrMsg("Failed to load order details")
    }finally{
      setLoading(false)
    }
  }
  fetchOrder();
  },[id])
  
  async function handleSubmit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    
    try{
      const updatedOrder = {
        id: values.id, 
        Code_Client: values.Code_Client,
        Date: values.Date,
        Total_TTC: values.Total_TTC,
        Status: values.Status,
        Date_of_payment: values.Date_of_payment,
        Payment_Method: values.Payment_Method,
        Delivery_price: values.Delivery_price,
        Total_price_of_products: values.Total_price_of_products,
        Address: values.Address,
        Delivery_company: values.Delivery_company,
      };
      
      const response=await fetch(`${orders2_api}/${id}`,{
        method:"PUT",
        headers:{
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedOrder)
      })
    
    if (!response.ok) {
      setErrMsg(`Error updating order: ${Constants.error_updating_order}`);
    }else{
      const res=await response.json();
      console.log("res:",res);
      onUpdate(res);
      setSuccess(true);
      navigate(order_management)
    }
    }catch(error){
      setErrMsg("Error when updating order");
    }
}
  
  return (
   <Grid container style={{ width:'100%',minHeight: '70vh',marginTop:'130px'}} justifyContent={"center"} alignItems="center" >
    <Grid item lg={8} md={8} sm={10} xs={12} >
    <Stack className={Classes.stack}>
    <fieldset className={Classes.fieldset}>
    <div className={Classes.up}>
    <Typography className={Classes.typography} variant="h5">Update order N°: {id}</Typography>
        <HighlightOffIcon
                sx={{
                    color:'black',
                }}
                onClick={Delete}
        />
    </div>
    {loading?(
          <Stack alignItems="center" justifyContent="center" style={{ height: '100%' }}>
            <CircularProgress color="inherit" />
          </Stack>
    ):(
      <form className='form' onSubmit={handleSubmit}>
        <Stack spacing={3} >
          <ThemeProvider theme={theme}>
            {/*<TextField 
                name="Products.ref"
                label="Products REF"
                placeholder='Products REF'
                value={values.Products.ref}
                className={Classes.updateInput}
                onChange={handleChange}
            />*/}
            <TextField 
                name="Total_TTC"
                placeholder='Total_TTC'
                label="Total_TTC"
                value={values.Total_TTC}
                className={Classes.updateInput}
                onChange={handleChange}
            />
           <FormControl  >
                <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                name='Status'
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={values.Status}
                label="Status"
                onChange={handleSelect}
                >
                    <MenuItem value="Delivered">Delivered</MenuItem>
                    <MenuItem value="Shipped">Shipped</MenuItem>
                    <MenuItem value="Processing">Processing</MenuItem>
                    
                </Select>
            </FormControl>
            {errMsg && (<div  className='error-update'>{errMsg}</div>)}
            <Button variant='contained' type='submit'>Update</Button>
            </ThemeProvider>
          </Stack>
        </form>
        )}
      </fieldset>
  </Stack>
  </Grid>
  </Grid>
)}
export default UpdateOrder;
