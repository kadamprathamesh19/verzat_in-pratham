import React, { useEffect, useState, useMemo } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import {
  Users, MessageSquare, Mail, ArrowUpRight, ArrowDownRight, Activity, Download
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

// Helper: Merge and group data by date
const groupDataByDate = (arr, type) => {
  return arr.reduce((acc, item) => {
    const dateStr = new Date(item.createdAt).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric'
    });
    acc[dateStr] = acc[dateStr] || { date: dateStr, users: 0, messages: 0, subscriptions: 0 };
    acc[dateStr][type]++;
    return acc;
  }, {});
};

const StatCard = ({ title, value, change, icon: Icon, iconBgColor }) => {
  const isPositive = change >= 0;
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-800 mt-1">{value.toLocaleString()}</p>
        </div>
        <div className={`p-3 rounded-full ${iconBgColor}`}>
          <Icon className="h-6 w-6 text-white" />
        </div>
      </div>
      {/* <div className="flex items-center mt-4">
        <span
          className={`flex items-center text-xs font-semibold ${
            isPositive ? 'text-green-500' : 'text-red-500'
          }`}
        >
          {isPositive ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
          {Math.abs(change).toFixed(1)}%
        </span>
        <p className="text-xs text-gray-400 ml-2">vs. last period</p>
      </div> */}
    </div>
  );
};

const DashboardChart = ({ data }) => (
  <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 h-96">
    <h3 className="text-lg font-semibold text-gray-800 mb-4">Activity Overview</h3>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
        <YAxis tick={{ fontSize: 12 }} stroke="#9ca3af" />
        <Tooltip contentStyle={{ background: 'rgba(255,255,255,0.8)', borderRadius: '0.5rem', border: '1px solid #e2e8f0' }} />
        <Legend wrapperStyle={{ fontSize: '14px' }} />
        <Line type="monotone" dataKey="users" stroke="#4f46e5" strokeWidth={2} dot={{ r: 2 }} name="New Users" />
        <Line type="monotone" dataKey="messages" stroke="#10b981" strokeWidth={2} dot={{ r: 2 }} name="Messages" />
        <Line type="monotone" dataKey="subscriptions" stroke="#f59e0b" strokeWidth={2} dot={{ r: 2 }} name="Subscriptions" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default function Dashboard() {
  const { adminUser, fetchUsers } = useUserContext();
  const [stats, setStats] = useState({ users: 0, messages: 0, newsletters: 0 });
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRange, setFilterRange] = useState('week');
  const [customDate, setCustomDate] = useState('');
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const headers = { 'Authorization': `Bearer ${token}` };
      const now = new Date();
      let fromDate = null;

      if (customDate) {
        const sel = new Date(customDate);
        if (sel > now) {
          toast.error('Selected date cannot be in the future!');
          setLoading(false);
          return;
        }
        fromDate = sel.toISOString();
      } else if (filterRange === 'week' || filterRange === 'month' || filterRange === 'year') {
        const d = new Date();
        if (filterRange === 'week') d.setDate(now.getDate() - 7);
        if (filterRange === 'month') d.setMonth(now.getMonth() - 1);
        if (filterRange === 'year') d.setFullYear(now.getFullYear() - 1);
        fromDate = d.toISOString();
      }

      const query = fromDate ? `?from=${encodeURIComponent(fromDate)}` : '';

      const [usersRes, messagesRes, newslettersRes] = await Promise.all([
        fetch(`${apiUrl}/api/admin/users${query}`, { headers }),
        fetch(`${apiUrl}/api/admin/messages${query}`, { headers }),
        fetch(`${apiUrl}/api/admin/newsletter${query}`, { headers }),
      ]);
      if (!usersRes.ok || !messagesRes.ok || !newslettersRes.ok) {
        throw new Error('Failed to fetch one or more resources');
      }

      const users = await usersRes.json();
      const messages = await messagesRes.json();
      const newsletters = await newslettersRes.json();

      setStats({
        users: users.length,
        messages: messages.length,
        newsletters: newsletters.length,
      });

      const usersG = groupDataByDate(users, 'users');
      const msgsG = groupDataByDate(messages, 'messages');
      const subsG = groupDataByDate(newsletters, 'subscriptions');

      const merged = {};
      [usersG, msgsG, subsG].forEach(group => {
        Object.values(group).forEach(item => {
          merged[item.date] = merged[item.date] || { date: item.date, users: 0, messages: 0, subscriptions: 0 };
          merged[item.date].users += item.users;
          merged[item.date].messages += item.messages;
          merged[item.date].subscriptions += item.subscriptions;
        });
      });

      setChartData(Object.values(merged).sort((a, b) => new Date(a.date) - new Date(b.date)));
    } catch (error) {
      console.error(error);
      toast.error('Failed to load stats.');
      setStats({ users: 0, messages: 0, newsletters: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
    fetchUsers();
  }, [filterRange, customDate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <svg className="mx-auto h-12 w-12 text-indigo-500 animate-spin" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.29A7.962 7.962 0 014 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z" />
          </svg>
          <p className="mt-4 text-lg font-semibold text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer position="top-center" />
      <div className="max-w-screen-xl mx-auto p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome Back, {adminUser ? adminUser.name : 'AdminD'}!
            </h1>
            <p className="mt-1 text-gray-900">Here’s a snapshot of your platform’s activity.</p>
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mt-4 sm:mt-0">
            <select
              value={filterRange}
              onChange={(e) => { setFilterRange(e.target.value); setCustomDate(''); }}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm"
            >
              <option value="week">Past 7 Days</option>
              <option value="month">Past 30 Days</option>
              <option value="year">Past Year</option>
            </select>
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm"
            />
            {/* <button className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 transition flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button> */}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Link to="/users" ><StatCard title="Total Users" value={stats.users} change={0} icon={Users} iconBgColor="bg-indigo-500" /></Link>
          <Link to="/messages"><StatCard title="Total Messages" value={stats.messages} change={0} icon={MessageSquare} iconBgColor="bg-green-500" /></Link>
          <Link to="/newsletter"><StatCard title="Total Subscribers" value={stats.newsletters} change={0} icon={Mail} iconBgColor="bg-amber-500" /></Link>
        </div>
        <DashboardChart data={chartData} />
      </div>
    </div>
  );
}
