import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Stack, TextField, ThemeProvider } from "@mui/material";
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { ChangeEvent, FormEvent, useState } from "react";
import React from "react";
import { add_api} from "../../utils/endpoints";
import {theme,useStyle} from "./AddProduct.ts";
import { useNavigate } from "react-router";
import { products_path } from "../../utils/paths.ts";
import { categoryNames, Constants } from "../../utils/constants.ts";
import { Product } from "../../Interfaces.tsx";
function AddProduct({onSuccess}:{ onSuccess: (newProduct: Product) => void }){
    const[success,setSuccess]=useState(false);
    const[errMsg,setErrMsg]=useState('');
    const navigate=useNavigate();
    const classes=useStyle();
    const[productData,setProductData]=React.useState({
        title:'',
        price:0,
        description: "",
        categoryId:1,
        images:[] as string[]
        
    });
    
    function handleChange(event:ChangeEvent<HTMLInputElement>){
        const {name,value}=event.target
        setProductData(prevProductData => ({
            ...prevProductData,
            [name]: value
        }));
    }
    const isValidURL = (urlString: string): boolean => {
       
            const url = new URL(urlString);
            return url.protocol === 'http:' || url.protocol === 'https:';
        
    };
    function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
        const {value } = event.target;
        const imageUrls=value.split(',').map((imgURL)=>imgURL.trim())
         const allValid = imageUrls.every(isValidURL);
        if (allValid) {
            setProductData(prevProductData => ({
                ...prevProductData,
                images: imageUrls
            }));
            setErrMsg(''); 
            } else {
                setErrMsg('Each value in images must be a valid URL address');
            }
    }    
    function HandleSelectChange(event:SelectChangeEvent<number>){
        const {value}=event.target
        setProductData(prevProductData => ({
            ...prevProductData,
            categoryId:value as number,
        }));
    }
    async function HandleProduct(event:FormEvent<HTMLFormElement>){
        event.preventDefault();
        try {
            
            const categoryName = categoryNames[productData.categoryId as keyof typeof categoryNames] || 'Unknown';
            const newProduct = {
                ...productData,
                category: categoryName, 
            };
            const response = await fetch(add_api, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newProduct)
            });

            const data = await response.json();
            console.log('Product Data:', productData);
            console.log('New Product Data:', newProduct);
            if (response.ok) {
                setErrMsg('');
                //setProducts(prevProducts => [...prevProducts, data]); 
                setSuccess(true);
                onSuccess(data);
                navigate(products_path);
            } else {
                setErrMsg(`Error adding product: ${data.message}`);
            }
        } catch (error) {
            setErrMsg('Error adding product');
            console.error('Error adding product:', error);
        }
    }
    function Cancel(){
        navigate(products_path);
    }
    
   return (
    success ? (
        <p>{Constants.success_adding}</p>
    ):(
    <Grid container style={{ width: "100%",marginTop:'60px'}} justifyContent={"center"}>
        <Grid item lg={4} md={2} sm={10} xs={12} >
         <div className='container'>
            <div className={classes.head}>
            <h3 className={classes.element}> Your new Product</h3>
            <HighlightOffIcon
                sx={{
                    color:'red'
                }}
                onClick={Cancel}
            />
            </div>
            <hr className={classes.customHr}/>
         <form className='form' onSubmit={HandleProduct}>
          <Stack spacing={4} className='prod-formulaire'>
          <ThemeProvider theme={theme}>
          <TextField 
                 label="Title"
                 type="string"
                 name="title"
                 value={productData.title}
                 onChange={handleChange}
                 required
             />
             <TextField
                 label="Price"
                 type="number"
                 value={productData.price}
                 name="price"
                 onChange={handleChange}
                 required
             />
             <TextField
                 label="Description"
                 type="string"
                 name="description"
                 value={productData.description}
                 onChange={handleChange}
                 multiline
                 maxRows={6}
                 required
             />
             <FormControl fullWidth >
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                name='category'
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={productData.categoryId}
                label="Category"
                onChange={HandleSelectChange}
                >
                    <MenuItem value={1}>Clothes</MenuItem>
                    <MenuItem value={2}>Electronics</MenuItem>
                    <MenuItem value={3}>Furniture</MenuItem>
                    <MenuItem value={4}>Shoes</MenuItem>
                    <MenuItem value={5}>Miscellaneous</MenuItem>
                </Select>
            </FormControl>
            <TextField
                    label="Images"
                    name="images"
                    placeholder="Enter image URLs separated by comma "
                    value={productData.images.join(',')}
                    onChange={handleImageChange}
            />
            {errMsg && (<div style={{ color: 'red' }}>{errMsg}</div>)}
            <Button  variant="outlined" type='submit'> Confirm </Button>
            </ThemeProvider>
        </Stack>
        </form>
      </div>
     </Grid>
    </Grid>
  ));
}
export default AddProduct;
