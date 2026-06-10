import { useContext, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import type { StockStatus } from '../types/product';
import { formatCurrency } from '../utils/format';
import {
  getReorderQuantity,
  getStockLabel,
  getStockStatus,
  sortByStockUrgency,
  TARGET_STOCK_LEVEL,
} from '../utils/stock';

type Filter = 'all' | StockStatus;

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'All Items' },
  { id: 'critical', label: 'Critical' },
  { id: 'low', label: 'Low Stock' },
  { id: 'healthy', label: 'Healthy' },
];

export default function StockAlerts() {
  const context = useContext(ProductContext);
  const products = context?.products ?? [];
  const updateStock = context?.updateStock;
  const [filter, setFilter] = useState<Filter>('all');

  const stats = useMemo(() => {
    const critical = products.filter((product) => getStockStatus(product.stock) === 'critical');
    const low = products.filter((product) => getStockStatus(product.stock) === 'low');
    const healthy = products.filter((product) => getStockStatus(product.stock) === 'healthy');
    const reorderUnits = [...critical, ...low].reduce(
      (sum, product) => sum + getReorderQuantity(product.stock),
      0
    );

    return { critical, low, healthy, reorderUnits };
  }, [products]);

  const filteredProducts = useMemo(() => {
    const sorted = sortByStockUrgency(products);
    if (filter === 'all') return sorted;
    return sorted.filter((product) => getStockStatus(product.stock) === filter);
  }, [products, filter]);

  const handleRestock = (id: number, currentStock: number) => {
    updateStock?.(id, currentStock + getReorderQuantity(currentStock));
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Stock Alerts</h2>
          <p>Track low inventory, review reorder needs, and restock items quickly.</p>
        </div>
        <Link to="/products/new" className="btn btn-primary">
          + Add Product
        </Link>
      </div>

      <section className="stats-grid">
        <article className="stat-card danger">
          <div className="label">Critical Items</div>
          <div className="value">{stats.critical.length}</div>
          <div className="hint">Below 10 units</div>
        </article>
        <article className="stat-card warning">
          <div className="label">Low Stock Items</div>
          <div className="value">{stats.low.length}</div>
          <div className="hint">Between 10 and 19 units</div>
        </article>
        <article className="stat-card success">
          <div className="label">Healthy Items</div>
          <div className="value">{stats.healthy.length}</div>
          <div className="hint">20+ units available</div>
        </article>
        <article className="stat-card primary">
          <div className="label">Suggested Reorder</div>
          <div className="value">{stats.reorderUnits}</div>
          <div className="hint">Units needed to reach {TARGET_STOCK_LEVEL}</div>
        </article>
      </section>

      <article className="panel">
        <div className="panel-header">
          <h3>Inventory Health</h3>
          <div className="filter-tabs">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`filter-tab${filter === item.id ? ' active' : ''}`}
                onClick={() => setFilter(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="panel-body table-panel">
          {filteredProducts.length === 0 ? (
            <div className="empty-state">No products match this stock filter.</div>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Current Stock</th>
                  <th>Status</th>
                  <th>Suggested Reorder</th>
                  <th>Inventory Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const status = getStockStatus(product.stock);
                  const reorderQty = getReorderQuantity(product.stock);

                  return (
                    <tr key={product.id}>
                      <td>
                        <strong>{product.name}</strong>
                      </td>
                      <td>{product.category}</td>
                      <td>{product.stock} units</td>
                      <td>
                        <span className={`badge ${status === 'healthy' ? 'success' : status}`}>
                          {getStockLabel(status)}
                        </span>
                      </td>
                      <td>{reorderQty > 0 ? `${reorderQty} units` : '—'}</td>
                      <td>{formatCurrency(product.price * product.stock)}</td>
                      <td>
                        {reorderQty > 0 ? (
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => handleRestock(product.id, product.stock)}
                          >
                            Restock
                          </button>
                        ) : (
                          <span className="table-muted">Well stocked</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </article>
    </>
  );
}
