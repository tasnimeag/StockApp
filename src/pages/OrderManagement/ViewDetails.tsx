import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import {  Orders } from "../../Interfaces.tsx";
import { Grid, Stack, ThemeProvider, Typography ,CircularProgress} from "@mui/material";
import {useStyle,theme} from './ViewDetails.ts';
import { orders2_api } from "../../utils/endpoints.ts";

function ViewDetails() {
    const {orderId } = useParams<{ orderId: string }>();
    const [error,setError]=useState<string | null>(null);
    const [orderDetails, setOrderDetails] = useState<Orders| null>(null);
    const [loading,setLoading]=useState(true)
    const design=useStyle();
    useEffect(() => {
    async function fetchOrderDetails() {
    try {
        const response = await fetch(`${orders2_api}/${orderId}`,{
            method:"GET",
            headers:{
                'Content-Type': 'application/json'
            }
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrderDetails(data);
    }catch (error: any) {
        setError(error.message);
    }finally{
        setLoading(false);
    }
}
    if (orderId) {
        fetchOrderDetails();
    }
    }, [orderId]);
    return (
        <Grid container style={{width:'100%',justifyContent:'center'}}>
        <Grid item lg={8} md={6} sm={10} xs={12}>
        <Stack spacing={6} className={design.container}>
        <ThemeProvider theme={theme}>
        <Typography  variant="h4">Details for order ID: {orderId}</Typography>
        </ThemeProvider>
        {loading?(
            <Stack  className={design.load}>
                <CircularProgress color="primary" />
            </Stack>
        ):orderDetails ? (
            <Stack  spacing={4}>
                <Stack spacing={2}>
                <ThemeProvider theme={theme}>
                <Typography variant="h5" >Payment:</Typography>
                </ThemeProvider>
                <Typography><strong>Delivery Price:</strong> {orderDetails.Delivery_price}</Typography>
                <Typography><strong>Total Amount:</strong> {orderDetails.Total_TTC}</Typography>
                <Typography><strong>Payment Method:</strong> {orderDetails.Payment_Method}</Typography>
                <Typography><strong>Date of payment:</strong> {orderDetails.Date_of_payment}</Typography>
                </Stack>
                <Stack spacing={2}>
                    <ThemeProvider theme={theme}>
                    <Typography variant="h5">Order Tracking:</Typography>
                    </ThemeProvider>
                    {/*<Typography><strong>Products: </strong> 
                        <strong>[REF:</strong>{orderDetails.Products.ref} , 
                        <strong>title:</strong>{orderDetails.Products.title},
                        <strong>price:</strong> {orderDetails.Products.price}<strong>]</strong></Typography>*/}
                    <Typography><strong>Status:</strong> {orderDetails.Status}</Typography>
                    <Typography><strong>Address:</strong>{orderDetails.Address}</Typography>
                    <Typography><strong>Delivery Company:</strong>{orderDetails.Delivery_company}</Typography>
                </Stack>
            </Stack>
    ):( error&& <Typography color="error">{error}</Typography>)}
    </Stack>
    </Grid>
    </Grid>
)};
export default ViewDetails;
