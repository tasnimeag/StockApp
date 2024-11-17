import {makeStyles} from '@mui/styles';
import { createTheme} from '@mui/material/styles';
const useStyle=makeStyles(()=>({
    container:{
        dispaly:'flex',
        marginTop:'70px',
        width:'100%',
        padding:'20px',
        border:'5px solid #F2A71B',
        boxShadow:'10px 8px #F2E8B3',
       justifyContent:'center',
        alignItems:'center',
    },
    load:{
      alignItems:"center",
      justifyContent:"center" ,
       height: '100%'
    }
   
}))
const theme = createTheme({
    components: {
        MuiTypography: {
          styleOverrides: {
            h4:{
                textDecoration:'underline',
                color:'#F1BF1D',
                textAlign:'center',
            },
            h5:{
              color:'pink',
              textDecoration:'underline',
              
            }
          }
        },
      },
})
export {useStyle,theme};