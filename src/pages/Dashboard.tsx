import { useContext, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { formatCurrency } from '../utils/format';

export default function Dashboard() {
  const context = useContext(ProductContext);
  const products = context?.products ?? [];

  const stats = useMemo(() => {
    const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0);
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const lowStock = products.filter((product) => product.stock < 20);
    const categories = new Set(products.map((product) => product.category));

    return { totalValue, totalStock, lowStock, categoryCount: categories.size };
  }, [products]);

  const recentProducts = products.slice(-4).reverse();

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Dashboard</h2>
          <p>Overview of your inventory performance and stock health.</p>
        </div>
        <Link to="/products/new" className="btn btn-primary">
          + Add Product
        </Link>
      </div>

      <section className="stats-grid">
        <article className="stat-card primary">
          <div className="label">Total Products</div>
          <div className="value">{products.length}</div>
          <div className="hint">Active items in catalog</div>
        </article>
        <article className="stat-card success">
          <div className="label">Inventory Value</div>
          <div className="value">{formatCurrency(stats.totalValue)}</div>
          <div className="hint">Based on price × stock</div>
        </article>
        <article className="stat-card">
          <div className="label">Units in Stock</div>
          <div className="value">{stats.totalStock}</div>
          <div className="hint">Across all products</div>
        </article>
        <article className="stat-card warning">
          <div className="label">Low Stock Alerts</div>
          <div className="value">{stats.lowStock.length}</div>
          <div className="hint">{stats.categoryCount} categories tracked</div>
        </article>
      </section>

      <section className="panel-grid">
        <article className="panel">
          <div className="panel-header">
            <h3>Recently Added Products</h3>
            <Link to="/products" className="btn btn-secondary">
              View all
            </Link>
          </div>
          <div className="panel-body">
            {recentProducts.length === 0 ? (
              <div className="empty-state">No products yet. Add your first item to get started.</div>
            ) : (
              <div className="product-list">
                {recentProducts.map((product) => (
                  <div key={product.id} className="product-row">
                    <div>
                      <strong>{product.name}</strong>
                      <span>{product.category}</span>
                    </div>
                    <div>
                      <span className={`badge ${product.stock < 20 ? 'warning' : 'success'}`}>
                        {product.stock} in stock
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <h3>Low Stock Watchlist</h3>
          </div>
          <div className="panel-body">
            {stats.lowStock.length === 0 ? (
              <div className="empty-state">All products are above the low-stock threshold.</div>
            ) : (
              <div className="product-list">
                {stats.lowStock.map((product) => (
                  <div key={product.id} className="product-row">
                    <div>
                      <strong>{product.name}</strong>
                      <span>{formatCurrency(product.price)} each</span>
                    </div>
                    <span className="badge danger">{product.stock} left</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </article>
      </section>
    </>
  );
}
