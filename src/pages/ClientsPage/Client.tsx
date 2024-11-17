import { CircularProgress, Grid, Stack } from '@mui/material';
import './Client.css'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { clients_api } from '../../utils/endpoints';
import { useEffect, useState } from 'react';
import {Client} from '../../Interfaces.tsx'

const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 70, headerClassName:'header-cell'},
    { field: 'code', headerName: 'Code', width: 70, headerClassName:'header-cell'},
    { field: 'company', headerName: 'Company', width: 140,headerClassName:'header-cell' },
    { field: 'Fullname', headerName: 'Full name', width: 180 ,headerClassName:'header-cell'},
     {
    field: 'email',
    headerName: 'E-mail',
    type: 'string',
    width: 180,
    headerClassName:'header-cell'
    },
    {
    field: 'adresse',
    headerName: 'Adresse',
    type:'string',
    width: 180,
    headerClassName:'header-cell'
    
    },
    {
    field: 'phone',
    headerName: 'Phone',
    type: 'number',
    width: 90,
    headerClassName:'header-cell'
    }
];


export default function ClientsTable() {
  //TODO: Add loading to all tables 
  const[rows,setRows]=useState([]);
  const [loading,setLoading]=useState(true)
  async function PrintClients(){
    
    try {
      const response = await fetch(clients_api, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json'
          }
      });
      const result = await response.json();
      const formattedRows = result.map((client:Client) => ({
        id: client.id, 
        code:((client.id)*3)+1000,
        company: `${client.company.name}`, 
        Fullname: client.name , 
        email: client.email , 
        adresse: `${client.address.street}, ${client.address.city}` , 
        phone: client.phone 
    }));
    setRows(formattedRows)
    } catch (error) {
    console.error('Error fetching client data:', error);
    } finally {
      setLoading(false); 
    }
  }  
  useEffect(() => {
    PrintClients();
  }, []);
  return (
    <Grid container style={{ width: "100%",marginTop:'25px'}} justifyContent={"center"} alignItems={"center"}>
    <Grid item lg={6} md={8} sm={10} xs={12} >
    <Stack className='table-container' spacing={7}>
    <h1 id='clients-title'>Clients</h1>
    <Stack  className='table' style={{ height: 500, width: '100%' }}>
    {loading? (
        <Stack alignItems="center" justifyContent="center" style={{ height: '100%' }}>
                <CircularProgress color="inherit" />
        </Stack>)
      :(<DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    )}
    </Stack>
    </Stack>
    </Grid>
    </Grid>
  );
}
