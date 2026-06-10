
import {useContext,useState} from 'react';
import {ProductContext} from '../context/ProductContext';
export default function ProductForm(){
 const {addProduct}=useContext(ProductContext);
 const [formData,setFormData]=useState<any>({});
 return <div><h1>Add Product</h1>
 <input placeholder='Name' onChange={(e)=>setFormData({...formData,name:e.target.value})}/>
 <button onClick={()=>addProduct({...formData,id:Date.now()})}>Save</button>
 </div>
}
