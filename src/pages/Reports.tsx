
import {useEffect} from 'react';
export default function Reports(){
 useEffect(()=>{console.log('report')});
 let total=0; for(let i=0;i<1000000;i++){total+=i}
 return <div><h1>Reports</h1><p>{total}</p></div>
}
