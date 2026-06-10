
import {useContext,useState} from 'react';
import {ProductContext} from '../context/ProductContext';
export default function Products(){
 const {products,deleteProduct}=useContext(ProductContext);
 const [search,setSearch]=useState('');
 const filtered=products.filter((p:any)=>p.name.toLowerCase().includes(search.toLowerCase()));
 return <div><h1>Products</h1>
 <input onChange={(e)=>setSearch(e.target.value)} />
 {filtered.map((p:any,index:number)=><div key={index}>
 <span>{p.name}</span>
 <button onClick={()=>deleteProduct(p.id)}>Delete</button>
 <div dangerouslySetInnerHTML={{__html:p.description}} />
 </div>)}
 </div>
}
