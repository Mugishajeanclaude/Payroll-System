import { useEffect, useState } from 'react';
import { departmentApi } from '../api';

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ departmentCode: '', departmentName: '', grossSalary: '', totalDeduction: '' });
  const [error, setError] = useState('');

  const fetchData = () => {
    setLoading(true);
    departmentApi.list()
      .then(setDepartments)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await departmentApi.create({
        ...form,
        grossSalary: Number(form.grossSalary),
        totalDeduction: Number(form.totalDeduction),
      });
      setShowForm(false);
      setForm({ departmentCode: '', departmentName: '', grossSalary: '', totalDeduction: '' });
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Departments</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add Department'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">New Department</h2>
          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Department Code</label>
              <input
                required
                value={form.departmentCode}
                onChange={(e) => setForm({ ...form, departmentCode: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. IT-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Department Name</label>
              <input
                required
                value={form.departmentName}
                onChange={(e) => setForm({ ...form, departmentName: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Information Technology"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gross Salary (RWF )</label>
              <input
                required
                type="number"
                value={form.grossSalary}
                onChange={(e) => setForm({ ...form, grossSalary: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Total Deduction (RWF )</label>
              <input
                required
                type="number"
                value={form.totalDeduction}
                onChange={(e) => setForm({ ...form, totalDeduction: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            Save Department
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">Code</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">Department</th>
              <th className="text-right px-4 py-3 text-sm font-semibold text-slate-600">Gross Salary</th>
              <th className="text-right px-4 py-3 text-sm font-semibold text-slate-600">Deduction</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr><td colSpan={4} className="text-center py-8 text-slate-400">Loading...</td></tr>
            ) : departments.length === 0 ? (
              <tr><td colSpan={4} className="text-center py-8 text-slate-400">No departments yet.</td></tr>
            ) : departments.map((dep) => (
              <tr key={dep._id} className="hover:bg-slate-50">
                <td className="px-4 py-3 text-sm font-medium text-slate-800">{dep.departmentCode}</td>
                <td className="px-4 py-3 text-sm text-slate-600">{dep.departmentName}</td>
                <td className="px-4 py-3 text-sm text-slate-600 text-right">RWF {dep.grossSalary?.toLocaleString()}</td>
                <td className="px-4 py-3 text-sm text-slate-600 text-right">RWF {dep.totalDeduction?.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
