import { useEffect, useState } from 'react';
import { employeeApi, departmentApi } from '../api';

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    employeeNumber: '', firstName: '', lastName: '', position: '',
    address: '', telephone: '', gender: 'Male', hiredDate: '', departmentCode: ''
  });

  const fetchData = () => {
    setLoading(true);
    Promise.all([employeeApi.list(), departmentApi.list()])
      .then(([emps, deps]) => {
        setEmployees(emps);
        setDepartments(deps);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await employeeApi.create(form);
      setShowForm(false);
      setForm({
        employeeNumber: '', firstName: '', lastName: '', position: '',
        address: '', telephone: '', gender: 'Male', hiredDate: '', departmentCode: ''
      });
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Employees</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          {showForm ? 'Cancel' : '+ Add Employee'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">New Employee</h2>
          {error && <p className="text-red-600 text-sm mb-3">{error}</p>}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Employee No.</label>
              <input required value={form.employeeNumber} onChange={(e) => setForm({ ...form, employeeNumber: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
              <input required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
              <input required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Position</label>
              <input required value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
              <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Telephone</label>
              <input required value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
              <input required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Hired Date</label>
              <input required type="date" value={form.hiredDate} onChange={(e) => setForm({ ...form, hiredDate: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
              <select required value={form.departmentCode} onChange={(e) => setForm({ ...form, departmentCode: e.target.value })}
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Select...</option>
                {departments.map((d) => (
                  <option key={d._id} value={d._id}>{d.departmentName}</option>
                ))}
              </select>
            </div>
          </div>
          <button type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
            Save Employee
          </button>
        </form>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">No.</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">Name</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">Position</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">Gender</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">Department</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">Hired Date</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">Contact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={7} className="text-center py-8 text-slate-400">Loading...</td></tr>
              ) : employees.length === 0 ? (
                <tr><td colSpan={7} className="text-center py-8 text-slate-400">No employees yet.</td></tr>
              ) : employees.map((emp) => (
                <tr key={emp._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm font-medium text-slate-800">{emp.employeeNumber}</td>
                  <td className="px-4 py-3 text-sm text-slate-800">{emp.firstName} {emp.lastName}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{emp.position}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{emp.gender}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{emp.departmentCode?.departmentName || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{emp.hiredDate}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{emp.telephone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
