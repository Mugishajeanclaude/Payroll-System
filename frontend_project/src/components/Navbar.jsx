import { NavLink } from 'react-router-dom';

const links = [
  { to: '/departments', label: 'Departments' },
  { to: '/employees', label: 'Employees' },
  { to: '/salaries', label: 'Salaries' },
  { to: '/report', label: 'Monthly Report' },
];

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <NavLink to="/" className="text-xl font-bold tracking-tight">
            Payroll<span className="text-blue-400">System</span>
          </NavLink>
          <div className="flex gap-1">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
