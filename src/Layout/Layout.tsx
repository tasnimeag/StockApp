import Sidebar from '../Components/Sidebar/Sidebar.tsx'
import SidebarData from '../Components/Sidebar/SidebarData.tsx'
import { Outlet } from 'react-router'
import Navbar from '../Components/Navbar/Navbar.tsx'
import Footer from '../Components/Footer/Footer.tsx'
function Layout() {
  return (
    <div>
      <header>
        <Navbar />
        <Sidebar 
        sidebarData={SidebarData}/>
      </header>
     
      <main>
        <Outlet/>
      </main>
       <Footer /> 
    </div>
  )
}

export default Layout;
