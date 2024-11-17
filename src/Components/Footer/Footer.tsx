import { Grid, Stack } from '@mui/material';
import { Constants } from '../../utils/constants';
import './Footer.css';
function Footer() {
  return (
    <footer className='footer'>
    <Grid container >
    <Grid item lg={12} md={12} sm={12} xs={12}  style={{ width: "100%",justifyContent:'center'}} >
    <div  className='Container'>
    
      <Stack spacing={2}className='Container-text'>
        <h3>Yourstock</h3>
        <p >
            {Constants.footer_container_text}
        </p>
      </Stack > 
      <Stack spacing={2} className='about-container'>
            <h3>About Us</h3>
            <p className='about-text'>{Constants.text}</p>
      </Stack>

      <Stack spacing={2} className='contact'>
          <h3>Contact Us</h3>
          <p><b>Email:</b>contact@yourstock.tn</p>
          <p><b>Phone:</b>+21655914789</p>
      </Stack>
      </div>
      </Grid>
      </Grid>
      <Stack className='CR'>
          <hr />
          <p>{Constants.CR}</p>
      </Stack>
      
  </footer>
  )
}


export default Footer;