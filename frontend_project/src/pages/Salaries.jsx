import { useEffect, useState } from 'react';
import { salaryApi, employeeApi } from '../api';

export default function Salaries() {
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ employeeNumber: '', grossSalary: '', totalDeduction: '', month: '' });

  const fetchData = () => {
    setLoading(true);
    Promise.all([salaryApi.list(), employeeApi.list()])
      .then(([sals, emps]) => {
        setSalaries(sals);
        setEmployees(emps);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const resetForm = () => {
    setForm({ employeeNumber: '', grossSalary: '', totalDeduction: '', month: '' });
    setEditing(null);
    setShowForm(false);
    setError('');
  };

  const openEdit = (sal) => {
    setForm({
      employeeNumber: sal.employeeNumber?._id || '',
      grossSalary: sal.grossSalary,
      totalDeduction: sal.totalDeduction,
      month: sal.month,
    });
    setEditing(sal._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const payload = {
        grossSalary: Number(form.grossSalary),
        totalDeduction: Number(form.totalDeduction),
        month: form.month,
      };
      if (editing) {
        await salaryApi.update(editing, payload);
      } else {
        await salaryApi.create({ ...form, ...payload });
      }
      resetForm();
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this salary record?')) return;
    try {
      await salaryApi.delete(id);
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Salaries</h1>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add Salary'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">
            {editing ? 'Edit Salary' : 'New Salary'}
          </h2>
          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {!editing && (
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Employee</label>
                <select required value={form.employeeNumber}
                  onChange={(e) => setForm({ ...form, employeeNumber: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Select...</option>
                  {employees.map((emp) => (
                    <option key={emp._id} value={emp._id}>
                      {emp.employeeNumber} - {emp.firstName} {emp.lastName}
                    </option>
                  ))}
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gross Salary (RWF )</label>
              <input required type="number" value={form.grossSalary}
                onChange={(e) => setForm({ ...form, grossSalary: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Total Deduction (RWF )</label>
              <input required type="number" value={form.totalDeduction}
                onChange={(e) => setForm({ ...form, totalDeduction: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Month</label>
              <input required type="month" value={form.month}
                onChange={(e) => setForm({ ...form, month: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>
          <div className="mt-4 flex gap-3">
            <button type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
              {editing ? 'Update' : 'Save'}
            </button>
            <button type="button" onClick={resetForm}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-lg text-sm font-medium transition-colors">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">Employee</th>
                <th className="text-right px-4 py-3 text-sm font-semibold text-slate-600">Gross</th>
                <th className="text-right px-4 py-3 text-sm font-semibold text-slate-600">Deduction</th>
                <th className="text-right px-4 py-3 text-sm font-semibold text-slate-600">Net</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">Month</th>
                <th className="text-center px-4 py-3 text-sm font-semibold text-slate-600">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={6} className="text-center py-8 text-slate-400">Loading...</td></tr>
              ) : salaries.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-slate-400">No salary records yet.</td></tr>
              ) : salaries.map((sal) => (
                <tr key={sal._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-800">
                    {sal.employeeNumber?.firstName} {sal.employeeNumber?.lastName}
                    <span className="text-slate-400 ml-1">({sal.employeeNumber?.employeeNumber})</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 text-right">RWF {sal.grossSalary?.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 text-right">RWF {sal.totalDeduction?.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-800 text-right">RWF {sal.netSalary?.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{sal.month}</td>
                  <td className="px-4 py-3 text-center">
                    <button onClick={() => openEdit(sal)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3">Edit</button>
                    <button onClick={() => handleDelete(sal._id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
