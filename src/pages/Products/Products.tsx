import './Products.css'
import {Stack,CircularProgress, Button} from '@mui/material';
import Grid from '@mui/material/Grid';
import {DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { products_api } from '../../utils/endpoints';
import { Product} from '../../Interfaces.tsx'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useNavigate,useLocation } from 'react-router-dom';
import { addProd_path } from '../../utils/paths.ts';
import { categoryNames, Constants } from '../../utils/constants.ts';
import AddProduct from './AddProduct.tsx';
import DeleteIcon from '@mui/icons-material/Delete';
function Products() {
    const[rows,setRows]=useState<Product[]>([]);
    const navigate=useNavigate();
    const location=useLocation();
    const [loading,setLoading]=useState(true);
    function handleClick(){
      navigate(addProd_path);
    }
    const columns: GridColDef[] = [
      { field: 'id', headerName: 'Product Id', width: 120, headerClassName: 'cell' },
      { field: 'reference', headerName: 'Reference', width: 120, headerClassName: 'cell' },
      { field: 'title', headerName: 'Title', width: 140, headerClassName: 'cell' },
      { field: 'price', headerName: 'Price', width: 140, headerClassName: 'cell' },
      { field: 'description', headerName: 'Description', type: 'string', width: 140, headerClassName: 'cell' },
      { field: 'category', headerName: 'Category', width: 140, headerClassName: 'cell' },
      {
        field: 'Qtinstock',
        headerName: 'Quantity in stock',
        type: 'number',
        width: 80,
        headerClassName: 'cell',
        valueGetter: () => 20,
      },
      { field: 'creationAt', headerName: 'CreationAt', type: 'string', width: 140, headerClassName: 'cell' },
      { field: 'updatedAt', headerName: 'UpdatedAt', type: 'string', width: 140, headerClassName: 'cell' },
      { field: 'expiredAt', headerName: 'ExpiredAt', type: 'string', width: 140, headerClassName: 'cell' },
      { field: 'images', headerName: 'Image', width: 140, headerClassName: 'cell' },
      {
        field: 'options',
        headerName: 'Options',
        width: 130,
        headerClassName: 'cell',
        renderCell: (params) => {
          const handleDelete = (event: React.MouseEvent) => {
            event.stopPropagation();
            const id = params.row.id;
            setRows((prevRows: Product[]) => prevRows.filter((row: Product) => row.id !== id));
          };
          return (
            <Button variant="outlined" color="primary" onClick={handleDelete}>
              <DeleteIcon />
            </Button>
          );
        },
      },
    ];
   
      async function PrintProducts(){
        try {
            const response = await fetch(products_api, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
             });
            const result = await (response.json());
            if (!result || result.length === 0) {
              console.log('No data returned from API');
              return;
          }
            const formattedRows= result.map((product:Product) => ({
              id: product.id,
              reference:('108'.concat(product.id.toString())),
              title: product.title, 
              price: product.price , 
              description: product.description , 
              category:categoryNames[product.category.id], 
              creationAt: product.creationAt ,
              updatedAt:product.updatedAt,
              expiredAt: product.expiredAt||(parseInt((product.creationAt).substring(0,4))+3).toString(),
              quantity:2,
              images:product.images
          }));
          setRows(formattedRows)
          } catch (error) {
          console.error('Error fetching products:',Constants.error);
          }finally{
            setLoading(false);
          }
    }
    function HandleNew(newProduct: Product) {
      setRows((prevRows) => [...prevRows, newProduct]);
  }

  useEffect(() => {
      PrintProducts();
    }, [rows]);
    

    return (
    <>
    {location.pathname.includes("add") ? (
      <AddProduct onSuccess={HandleNew}/>
    ) : (
    <Grid container style={{ width: "100%",marginTop:'25px'}} justifyContent={"center"} alignItems={"center"}>
    <Grid item lg={6} md={8} sm={10} xs={12} >
    <Stack  spacing={3}>
        <h1 id='products-title'>Products</h1>
    <Stack className='buttons' spacing={2} >
    <button onClick={handleClick} className="btn" style={{ marginLeft: '20px' }}>
        <AddShoppingCartIcon/>
        Add Product 
    </button>
    </Stack>
    <Stack  style={{ height: 500, width: '100%' }}>
      {loading?(
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
        pageSizeOptions={[5,10,50,100]}
        checkboxSelection
        
      />)}
    </Stack>
    </Stack>
    </Grid>
    </Grid>
  )}
  </>
);
}
export default Products;

