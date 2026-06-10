import { useContext, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import type { Product } from '../types/product';

const emptyForm = {
  name: '',
  price: '',
  stock: '',
  category: 'Electronics',
  description: '',
};

export default function ProductForm() {
  const context = useContext(ProductContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState(emptyForm);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const product: Product = {
      id: Date.now(),
      name: formData.name.trim(),
      price: Number(formData.price),
      stock: Number(formData.stock),
      category: formData.category.trim(),
      description: formData.description.trim(),
    };

    context?.addProduct(product);
    navigate('/products');
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Add Product</h2>
          <p>Create a new inventory item with pricing, stock, and category details.</p>
        </div>
      </div>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="name">Product Name</label>
            <input
              id="name"
              placeholder="e.g. Wireless Headphones"
              value={formData.name}
              onChange={(event) => setFormData({ ...formData, name: event.target.value })}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={formData.category}
              onChange={(event) => setFormData({ ...formData, category: event.target.value })}
            >
              <option value="Electronics">Electronics</option>
              <option value="Accessories">Accessories</option>
              <option value="Office">Office</option>
              <option value="Furniture">Furniture</option>
            </select>
          </div>

          <div className="form-field">
            <label htmlFor="price">Price (INR)</label>
            <input
              id="price"
              type="number"
              min="0"
              placeholder="1200"
              value={formData.price}
              onChange={(event) => setFormData({ ...formData, price: event.target.value })}
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="stock">Stock Quantity</label>
            <input
              id="stock"
              type="number"
              min="0"
              placeholder="25"
              value={formData.stock}
              onChange={(event) => setFormData({ ...formData, stock: event.target.value })}
              required
            />
          </div>

          <div className="form-field full">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Short product description for your team..."
              value={formData.description}
              onChange={(event) => setFormData({ ...formData, description: event.target.value })}
            />
          </div>
        </div>

        <div className="form-actions">
          <Link to="/products" className="btn btn-secondary">
            Cancel
          </Link>
          <button type="submit" className="btn btn-primary">
            Save Product
          </button>
        </div>
      </form>
    </>
  );
}
