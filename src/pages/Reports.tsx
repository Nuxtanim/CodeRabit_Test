import { useContext, useMemo } from 'react';
import { ProductContext } from '../context/ProductContext';
import { formatCurrency } from '../utils/format';

export default function Reports() {
  const context = useContext(ProductContext);
  const products = context?.products ?? [];

  const report = useMemo(() => {
    const totalValue = products.reduce((sum, product) => sum + product.price * product.stock, 0);
    const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
    const averagePrice =
      products.length === 0
        ? 0
        : products.reduce((sum, product) => sum + product.price, 0) / products.length;

    const byCategory = products.reduce<Record<string, { count: number; value: number; stock: number }>>(
      (groups, product) => {
        const current = groups[product.category] ?? { count: 0, value: 0, stock: 0 };
        current.count += 1;
        current.value += product.price * product.stock;
        current.stock += product.stock;
        groups[product.category] = current;
        return groups;
      },
      {}
    );

    const topValueProducts = [...products]
      .sort((a, b) => b.price * b.stock - a.price * a.stock)
      .slice(0, 5);

    return { totalValue, totalStock, averagePrice, byCategory, topValueProducts };
  }, [products]);

  const maxCategoryValue = Math.max(
    ...Object.values(report.byCategory).map((category) => category.value),
    1
  );

  return (
    <>
      <div className="page-header">
        <div>
          <h2>Reports</h2>
          <p>Inventory insights by category, value, and stock distribution.</p>
        </div>
      </div>

      <section className="stats-grid">
        <article className="stat-card primary">
          <div className="label">Total Inventory Value</div>
          <div className="value">{formatCurrency(report.totalValue)}</div>
        </article>
        <article className="stat-card">
          <div className="label">Total Units</div>
          <div className="value">{report.totalStock}</div>
        </article>
        <article className="stat-card success">
          <div className="label">Average Product Price</div>
          <div className="value">{formatCurrency(report.averagePrice)}</div>
        </article>
        <article className="stat-card warning">
          <div className="label">Categories</div>
          <div className="value">{Object.keys(report.byCategory).length}</div>
        </article>
      </section>

      <section className="report-grid">
        <article className="panel">
          <div className="panel-header">
            <h3>Value by Category</h3>
          </div>
          <div className="panel-body">
            <div className="bar-list">
              {Object.entries(report.byCategory).map(([category, data]) => (
                <div key={category} className="bar-item">
                  <strong>{category}</strong>
                  <div className="bar-track">
                    <div
                      className="bar-fill"
                      style={{ width: `${(data.value / maxCategoryValue) * 100}%` }}
                    />
                  </div>
                  <span>{formatCurrency(data.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="panel">
          <div className="panel-header">
            <h3>Category Summary</h3>
          </div>
          <div className="panel-body">
            <div className="category-pills">
              {Object.entries(report.byCategory).map(([category, data]) => (
                <span key={category} className="category-pill">
                  {category}: {data.count} items · {data.stock} units
                </span>
              ))}
            </div>
          </div>
        </article>

        <article className="panel" style={{ gridColumn: '1 / -1' }}>
          <div className="panel-header">
            <h3>Top Products by Inventory Value</h3>
          </div>
          <div className="panel-body">
            <div className="product-list">
              {report.topValueProducts.map((product, index) => (
                <div key={product.id} className="product-row">
                  <div>
                    <strong>
                      #{index + 1} {product.name}
                    </strong>
                    <span>
                      {product.stock} units · {formatCurrency(product.price)} each
                    </span>
                  </div>
                  <span className="badge neutral">
                    {formatCurrency(product.price * product.stock)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>
    </>
  );
}
