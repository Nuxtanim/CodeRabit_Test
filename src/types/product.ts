export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
}

export type StockStatus = 'critical' | 'low' | 'healthy';

export interface ProductContextValue {
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  updateStock: (id: number, stock: number) => void;
}
