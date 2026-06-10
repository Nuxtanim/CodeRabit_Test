import { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { formatCurrency, stripHtml } from '../utils/format';

export default function Products() {
  const context = useContext(ProductContext);
  const products = context?.products ?? [];
  const deleteProduct = context?.deleteProduct;
  const [search, setSearch] = useState('');

  const filtered = useMemo(
    () =>
      products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase())
      ),
    [products, search]
  );

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Products</h2>
          <p>Browse, search, and manage your full product catalog.</p>
        </div>
        <Link to="/products/new" className="btn btn-primary">
          + Add Product
        </Link>
      </div>

      <div className="toolbar">
        <div className="search-box">
          <input
            type="search"
            placeholder="Search by name or category..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <span className="badge neutral">{filtered.length} results</span>
      </div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          No products match your search. Try a different keyword or add a new product.
        </div>
      ) : (
        <section className="products-grid">
          {filtered.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-card-top">
                <div>
                  <h3>{product.name}</h3>
                  <div className="category">{product.category}</div>
                </div>
                <span className={`badge ${product.stock < 20 ? 'warning' : 'success'}`}>
                  {product.stock < 20 ? 'Low stock' : 'In stock'}
                </span>
              </div>

              <div className="product-card-body">
                <p>{stripHtml(product.description) || 'No description provided.'}</p>
                <div className="product-meta">
                  <div className="meta-item">
                    <span>Price</span>
                    <strong>{formatCurrency(product.price)}</strong>
                  </div>
                  <div className="meta-item">
                    <span>Stock</span>
                    <strong>{product.stock} units</strong>
                  </div>
                </div>
              </div>

              <div className="product-card-actions">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => deleteProduct?.(product.id)}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </section>
      )}
    </>
  );
}
