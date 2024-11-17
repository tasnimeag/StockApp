
import React from 'react';
import { Button, Grid, Stack,CircularProgress} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useStyles from './Orders.ts';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {  Orders } from '../../Interfaces.tsx';
import PreviewIcon from '@mui/icons-material/Preview';
import AutoFixNormalIcon from '@mui/icons-material/AutoFixNormal';
import { update_order, view_details } from '../../utils/paths.ts';
import { orders2_api } from '../../utils/endpoints.ts';
import UpdateOrder from './UpdateOrder.tsx';
import ViewDetails from './ViewDetails.tsx';

export default function OrdersTable() {
  const[rows,setRows]=useState<Orders[]>([]);
  const classes=useStyles();
  const location = useLocation();
  const [loading,setLoading]=useState(true)
  const navigate=useNavigate();
  
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Order ID ', width: 130},
    { field: 'Code_Client', headerName: 'Code client', width: 130},
     
    {   field: 'Date',
        headerName: 'Date',
        width: 130,
        
    },
    {   field: 'Total_TTC',
        headerName: 'Total_TTC',
        width: 130,
        
    },
    {   field: 'Status',
        headerName: 'Status',
        width: 130,
        
    },
    {field: 'options', headerName: 'Options', width: 130,
      renderCell: (params) => {
        const handleViewDetails = (event: React.MouseEvent) => {
          event.stopPropagation();
          const id=params.row.id;
          navigate(`${view_details}/${id}`)
        };
  
        const handleModify = (event: React.MouseEvent) => {
          event.stopPropagation();
          const id=params.row.id
          console.log(`Modify order ID: ${params.row.id}`);
          navigate(`${update_order}/${id}`)
        };
        return (
          <Stack direction="row" spacing={1}>
            <Button variant="outlined" color="secondary" onClick={handleModify}>
              <AutoFixNormalIcon/>
            </Button>
            <Button variant="outlined" color="primary" onClick={handleViewDetails}>
              <PreviewIcon/>
            </Button>
          </Stack>
        );
      }
    },
  ];
  
  async function PrintOrders(){
    try{
      const response = await fetch(orders2_api, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
     });
     if (!response.ok) {
      throw new Error('Failed to fetch orders');
    }
    const result = await response.json();
    const Rows = result.map((order:Orders) => ({
      id: order.id,
      Code_Client: order.Code_Client,
      Date: order.Date,
      Total_TTC: order.Total_TTC,
      Status: order.Status,
    }));
    setRows(Rows);
    
    }catch(error){
      console.error('Error fetching order data:', error);
    }finally{
      setLoading(false);
    }
  }    
    useEffect(() => {
      PrintOrders();
    }, []);
    
    const handleUpdate = (updatedOrder: Orders) => {
      const updatedRows = rows.map(order =>
        order.id === updatedOrder.id ? updatedOrder : order
      );
      setRows(updatedRows);
    };
    
  return (
    <React.Fragment>
      {location.pathname.includes("view") ? (
        <ViewDetails />
      ) : location.pathname.includes("update") ? (
        <UpdateOrder onUpdate={handleUpdate}/>
      ):
    <Grid container style={{ width: "100%",marginTop:'25px'}} justifyContent={"center"} alignItems={"center"}>
    <Grid item lg={6} md={8} sm={10} xs={12} >
    <Stack className={classes.table} spacing={6}>
    <h1 className={classes.ordersTitle}>Order Management</h1>
    
    <Stack  style={{ height: 500, width: '100%' }} justifyContent={"center"} alignItems={"center"}>
    {loading?(
        <Stack alignItems="center" justifyContent="center" style={{ height: '100%' }}>
          <CircularProgress color="primary" />
        </Stack>
    ):(<DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 3 },
          },
        }}
        pageSizeOptions={[3,5, 10]}
        checkboxSelection
        classes={{ columnHeader: classes.prodCell }} 
    />)}
   
    </Stack>
    </Stack>
    </Grid>
    </Grid>
  
  };
  </React.Fragment>
);
}

