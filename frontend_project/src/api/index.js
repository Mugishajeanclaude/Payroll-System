const API_BASE = 'http://localhost:4400/api';

async function request(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: res.statusText }));
    throw new Error(err.message || 'Request failed');
  }
  return res.json();
}

export const departmentApi = {
  list: () => request('/department/read'),
  create: (data) => request('/department/create', { method: 'POST', body: JSON.stringify(data) }),
};

export const employeeApi = {
  list: () => request('/employee/read'),
  create: (data) => request('/employee/create', { method: 'POST', body: JSON.stringify(data) }),
};

export const salaryApi = {
  list: () => request('/salary/read'),
  create: (data) => request('/salary/create', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => request(`/salary/update/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => request(`/salary/delete/${id}`, { method: 'DELETE' }),
  report: () => request('/salary/report'),
};
