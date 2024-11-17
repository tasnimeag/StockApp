import { Grid, Stack } from "@mui/material";
import { Constants } from "../../utils/constants";
import './Home.css'
const Home = () => {
  return (
    <Grid  container style={{ position: 'relative' }}>
      <Grid item lg={5} md={6} sm={12} xs={12}>
        <h1 id="tle">{Constants.Home_title}</h1>
        <Stack className='content' >
          <p className='acceuil-text'>{Constants.Home_content}</p>
          <img className='i' alt="photo" src='/Img.jpg'/>
          <p id="photo-text">{Constants.Home_img_text}</p>
        </Stack>
        <img  className='ph' src='/home.jpg'/>
      </Grid>
      <Grid item lg={12} md={12} sm={12} xs={12}>
        <Stack className="home-part">
          <img  className='im' src='/mystock.jpg'/>
          <p className="text">My application is a comprehensive management system designed to handle clients, orders, and products efficiently. It allows users to manage client information, track and process orders, and maintain an up-to-date inventory of products. The app is built with a focus on ease of use, ensuring that users can seamlessly navigate through client records, monitor order statuses, and update product details. This tool is ideal for businesses looking to streamline their operations and maintain organized, real-time data across all aspects of their workflow.</p>
        </Stack>
      </Grid>
    </Grid>
    
  )
}
export default Home;