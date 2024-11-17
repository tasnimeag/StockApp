import {createBrowserRouter} from "react-router-dom";
import Login from '../pages/Login/Login'
import Register from "../pages/CreateAccount/Register";
import Layout from "../Layout/Layout";
import Home from '../pages/Home/Home.tsx';
import Client from "../pages/ClientsPage/Client.tsx";
import Products from "../pages/Products/Products.tsx";
import AddProduct from "../pages/Products/AddProduct.tsx";
import Orders from "../pages/OrderManagement/Orders.tsx";
import UpdateOrder from "../pages/OrderManagement/UpdateOrder.tsx";
import ViewDetails from "../pages/OrderManagement/ViewDetails.tsx";
import Parameters from "../pages/Parameters/Parameters.tsx";
import Help from "../pages/Help/Help.tsx";



export const router = createBrowserRouter([
  {
      path: "/",
      element: <Login />, 
  },
  {
    path:'/register',
    element:<Register />
  },
  {
      
      children: [
          {
              path: "/app",
              element: <Layout />, 
              children: [
                  {
                      path: "home",
                      element: <Home />
                  },
                  {
                    path: "clients",
                    element: <Client />

                  },
                  {
                      path: "products",
                      element: <Products />,
                      children:[
                        {
                        path: "add",
                        element: <AddProduct onSuccess={(newProduct) => console.log("New Product:",newProduct)}/>
                        }
                      ]
                  },
                  
                  {path: "orders",
                    element: <Orders />,
                    children:[
                      {
                        path:"view/:orderId",
                        element:<ViewDetails/>
                      },
                      {
                        path:"update/:id",
                        element:<UpdateOrder onUpdate={(updatedOrder) => console.log("Updated Order:", updatedOrder)}/>
                      }
                      
                    ]
                  },
                  {
                    path: "parameters",
                    element: <Parameters />
                  },
                  {
                    path: "help",
                    element: <Help />
                  }
                ]
          }]
  }
      
])
  


