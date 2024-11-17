import { RouterProvider } from "react-router"
import './index.css'
import { router } from './routes/routes'



export default function App() {
  return(
    <>
    
    <RouterProvider router={router} />
    
    </>
  )
}
 