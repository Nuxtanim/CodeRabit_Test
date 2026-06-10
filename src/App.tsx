
import {BrowserRouter,Routes,Route,Link} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductForm from './pages/ProductForm';
import Reports from './pages/Reports';
import {ProductProvider} from './context/ProductContext';

export default function App(){
 return <ProductProvider><BrowserRouter>
 <nav>
 <Link to='/'>Dashboard</Link> | <Link to='/products'>Products</Link> | <Link to='/products/new'>Add</Link> | <Link to='/reports'>Reports</Link>
 </nav>
 <Routes>
 <Route path='/' element={<Dashboard/>}/>
 <Route path='/products' element={<Products/>}/>
 <Route path='/products/new' element={<ProductForm/>}/>
 <Route path='/reports' element={<Reports/>}/>
 </Routes>
 </BrowserRouter></ProductProvider>
}
