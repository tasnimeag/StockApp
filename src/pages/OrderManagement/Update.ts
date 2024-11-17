import {makeStyles} from '@mui/styles';
import { createTheme} from '@mui/material/styles';
const theme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
            '& .MuiInputLabel-root': {
              color: '#ED8B16', 
              fontSize: '16px',   
            },
          '& .MuiInputBase-input': {
            color: 'black', 
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#ED8B16', 
            },
            '&:hover fieldset': {
              borderColor: '#ED8B16', 
            },
            '&.Mui-focused fieldset': {
                color:'#ED8B16',
                border: '2px solid #ED8B16',
            },
            '&.Mui-focused label': {
              color: '#ED8B16', 
              borderColor:'#ED8B16'
            },
            },
        },
    },
    },
    MuiButton: {
      styleOverrides: {
        root: {
            color:'black',
            fontSize:'15px',
            backgroundColor:'#D97A43',
            border:' transparent',
            fontWeight:'bold',
            width:'25%',
            display:'flex',
            justifyContent:'center',
            alignSelf:'left',
            '&:hover':{
              color:'white',
              fontWeight:'bold',
              backgroundColor:'#FF9933',
              border:'none'
            },
        },
      },
    },
    MuiFormControl:{
        styleOverrides:{
            root:{
                color:'#ED8B16',
                width:'80%'
            }
        }
    },
    MuiInputLabel:{
        styleOverrides:{
            root:{
                color:'#ED8B16',
                "&.Mui-focused":{
                color:'#ED8B16'
            }
        }
      }
    },
    MuiSelect: {
        styleOverrides: {
          root: {
            color: 'black', 
            fontSize:'17px'
          },
          icon: {
            color: '#ED8B16',  
          },
          
        },
    },
    MuiOutlinedInput:{
        styleOverrides:{
            root:{
                '&.Mui-focused fieldset': {
                    
                    borderColor: '#ED8B16',
                },
                '&:hover fieldset': {
                    borderColor: '#ED8B16', 
                },
                '& fieldset': {
                    borderColor: '#ED8B16', 
                },
                
            }
        }
    },
    MuiMenuItem:{
        styleOverrides:{
            root:{
                '&.Mui-selected': {
                    backgroundColor:'bisque',
                    '&:hover': {
                            backgroundColor:'bisque',
                    },
                },
            },
        }
  },
}});
const useStyle=makeStyles(()=>({
 
    up:{
        display:'flex',
        justifyContent:'space-between'
    },
    typography: {
        color:'#767373',
        textDecoration:'underline',
        padding:'15px'
    },
    fieldset:{
       border:'4px solid',
       padding:'30px',
       color:'#F2B263',
       boxShadow:'0 0 150px'
    },
    stack:{
        background:'url("/back.jpg") no-repeat center center/cover'
    },
    updateInput:{
        fontSize:'19px',
        width:'80%'
    }

}))
export  {theme,useStyle};