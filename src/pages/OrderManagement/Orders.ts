import {makeStyles} from '@mui/styles';

const useStyles=makeStyles(()=>({
    ordersTitle:{
        color:'#767373',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textDecoration: 'underline',
    },
    prodCell:{
        color:'#c6c61b',
        fontSize:'17px'
    },
    table:{
        marginLeft:'60px',
    }
}))
export default useStyles;