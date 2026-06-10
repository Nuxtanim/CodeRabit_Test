import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Dashboard', icon: '▦' },
  { to: '/products', label: 'Products', icon: '◫' },
  { to: '/products/new', label: 'Add Product', icon: '＋' },
  { to: '/reports', label: 'Reports', icon: '◷' },
];

export default function Layout() {
  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">IN</div>
          <div>
            <h1>Inventory Pro</h1>
            <p>Stock management dashboard</p>
          </div>
        </div>

        <nav className="nav-list">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <strong>Need a quick check?</strong>
          <span>Monitor stock levels and inventory value from the dashboard.</span>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
