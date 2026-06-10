import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import ProductForm from './pages/ProductForm';
import Reports from './pages/Reports';
import StockAlerts from './pages/StockAlerts';
import { ProductProvider } from './context/ProductContext';

export default function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/new" element={<ProductForm />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/stock-alerts" element={<StockAlerts />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
}
