
import React,{createContext,useState} from 'react';
import data from '../data/products.json';
export const ProductContext = createContext<any>(null);

export const ProductProvider = ({children}:any)=>{
 const [products,setProducts]=useState(data);
 const addProduct=(product:any)=>setProducts([...products,product]);
 const deleteProduct=(id:number)=>setProducts(products.filter((p:any)=>p.id!==id));
 return <ProductContext.Provider value={{products,addProduct,deleteProduct}}>{children}</ProductContext.Provider>
}
