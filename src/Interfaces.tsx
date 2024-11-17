export  interface SidebarItem {
    icon: React.ReactNode;
    title: string;
    link: string;
}
export  interface SidebarProps {
    sidebarData: SidebarItem[];
}
export  interface RegisterData{
    username:string;
    email:string;
    password:string;
    passwordconfirm:string;
}
export  interface FormData{
    email:string;
    password:string;
}
export  interface Client {
    id: number;
    name: string;
    email: string;
    address: {
        street: string;
        city: string;
    };
    phone: string;
    company: {
        name: string;
    };
}
export interface Product{
    id :string;
    title:string;
    price:number;
    description:string;
    category:{
        id:number;
        name:string;
        image:string;
        creationAt:string;
        updatedAt:string;
    }
    creationAt:string;
    updatedAt:string;
    expiredAt:string;
    images:string[];
}
export interface Orders{
    id: number,
    Code_Client: number,
    Date: string,
    /*Products: {
      ref: number,
      title: string,
      price: number
    },*/
    Total_TTC: number,
    Status: string,
    Date_of_payment:string,
    Payment_Method: string,
    Delivery_price: number,
    Total_price_of_products: number,
    Address: string,
    Delivery_company: string
}
export interface Order{
    id:number;
    userId:number;
    date:string;
    products:{ 
        productId: number; 
        quantity: number; 
    }[];
}
export interface OrderDetails{
    status: string,
    Address: string,
    totalAmount: number,
    paymentMethod: string,
    products: {
    productId: number,
    quantity: number,
    price: number
  }
}
