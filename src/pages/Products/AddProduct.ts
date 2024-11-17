import {makeStyles} from '@mui/styles';
import { createTheme} from '@mui/material/styles';
const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
            '& .MuiInputLabel-root': {
              color: 'olivedrab', 
              fontSize: '16px',   
            },
          '& .MuiInputBase-input': {
            color: 'black', 
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'olivedrab', 
            },
            '&:hover fieldset': {
              borderColor: 'olivedrab', 
            },
            '&.Mui-focused fieldset': {
              border: '2px solid olivedrab',
            },
            '&.Mui-focused label': {
              color: 'olivedrab', 
              borderColor:'olivedrab'
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
            color:'black',
            border:'olive 2px solid',
            fontWeight:'bold',
            width:'45%',
            display:'flex',
            justifyContent:'center',
            alignSelf:'center',
            '&:hover':{
              color:'white',
              fontWeight:'bold',
              backgroundColor:'olivedrab',
              border:'none'
            },
        },
      },
    },
  },
});
const useStyle=makeStyles(()=>({
  head:{
    display: 'flex',
    justifyContent: 'space-between',
  },
  element: {
    textDecoration: 'underline',
    color: '#767373',
  },
  customHr: {
    border: 0,
    height: '2px',
    backgroundColor: 'gainsboro',
    width: '100%',
    margin: '10px',
  },


}))
export  {theme,useStyle};