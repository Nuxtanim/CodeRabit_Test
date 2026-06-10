import { createContext, useState, type ReactNode } from 'react';
import data from '../data/products.json';
import type { Product, ProductContextValue } from '../types/product';

export const ProductContext = createContext<ProductContextValue | null>(null);

export function ProductProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(data);

  const addProduct = (product: Product) => {
    setProducts((current) => [...current, product]);
  };

  const deleteProduct = (id: number) => {
    setProducts((current) => current.filter((product) => product.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
}
