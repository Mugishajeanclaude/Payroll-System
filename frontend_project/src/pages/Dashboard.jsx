import { useEffect, useState } from 'react';
import { employeeApi, departmentApi, salaryApi } from '../api';

export default function Dashboard() {
  const [stats, setStats] = useState({ employees: 0, departments: 0, salaries: 0 });

  useEffect(() => {
    Promise.all([
      employeeApi.list(),
      departmentApi.list(),
      salaryApi.list(),
    ]).then(([emps, deps, sals]) => {
      setStats({ employees: emps.length, departments: deps.length, salaries: sals.length });
    }).catch(() => {});
  }, []);

  const cards = [
    { label: 'Total Employees', value: stats.employees, color: 'bg-blue-500' },
    { label: 'Departments', value: stats.departments, color: 'bg-emerald-500' },
    { label: 'Salary Records', value: stats.salaries, color: 'bg-amber-500' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-800 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center mb-4`}>
              <span className="text-white text-xl font-bold">{card.value}</span>
            </div>
            <p className="text-slate-600 text-sm font-medium">{card.label}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Welcome to Payroll System</h2>
        <p className="text-slate-600 text-sm">
          Manage departments, employees, and payroll records all in one place.
          Use the navigation above to get started.
        </p>
      </div>
    </div>
  );
}
