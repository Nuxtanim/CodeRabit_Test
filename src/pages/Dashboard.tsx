
import {useContext} from 'react';
import {ProductContext} from '../context/ProductContext';
export default function Dashboard(){
 const {products}=useContext(ProductContext);
 const totalValue=products.reduce((a:any,p:any)=>a+p.price*p.stock,0);
 return <div><h1>Dashboard</h1><p>Total Products:{products.length}</p><p>Value:{totalValue}</p></div>
}
