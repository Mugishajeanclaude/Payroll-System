import { useEffect, useState } from 'react';
import { salaryApi } from '../api';

export default function Report() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    setLoading(true);
    salaryApi.report()
      .then(setRecords)
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchData(); }, []);

  const totalGross = records.reduce((sum, r) => sum + (r.grossSalary || 0), 0);
  const totalDeduction = records.reduce((sum, r) => sum + (r.totalDeduction || 0), 0);
  const totalNet = records.reduce((sum, r) => sum + (r.netSalary || 0), 0);

  return (
    <div className="print-area">
      <div className="flex items-center justify-between mb-6 no-print">
        <h1 className="text-2xl font-bold text-slate-800">Monthly Salary Report</h1>
        <button
          onClick={() => window.print()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          Print Report
        </button>
      </div>

      <h1 className="text-2xl font-bold text-slate-800 mb-6 hidden print:block">Monthly Salary Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Total Gross Salary</p>
          <p className="text-xl font-bold text-slate-800">RWF {totalGross.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Total Deductions</p>
          <p className="text-xl font-bold text-red-600">RWF {totalDeduction.toLocaleString()}</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <p className="text-sm text-slate-500">Total Net Pay</p>
          <p className="text-xl font-bold text-emerald-600">RWF {totalNet.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">Employee No.</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">Name</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">Department</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">Position</th>
                <th className="text-right px-4 py-3 text-sm font-semibold text-slate-600">Gross</th>
                <th className="text-right px-4 py-3 text-sm font-semibold text-slate-600">Deduction</th>
                <th className="text-right px-4 py-3 text-sm font-semibold text-slate-600">Net</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-slate-600">Month</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={8} className="text-center py-8 text-slate-400">Loading...</td></tr>
              ) : records.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-8 text-slate-400">No records found.</td></tr>
              ) : records.map((r) => (
                <tr key={r._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 text-sm text-slate-800">{r.employeeNumber?.employeeNumber}</td>
                  <td className="px-4 py-3 text-sm text-slate-800">{r.employeeNumber?.firstName} {r.employeeNumber?.lastName}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{r.employeeNumber?.departmentCode?.departmentName || 'N/A'}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{r.employeeNumber?.position}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 text-right">RWF {r.grossSalary?.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 text-right">RWF {r.totalDeduction?.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-800 text-right">RWF {r.netSalary?.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{r.month}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
