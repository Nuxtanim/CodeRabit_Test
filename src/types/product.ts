export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: string;
  description: string;
}

export interface ProductContextValue {
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
}
