import React from 'react';
import { Outlet } from 'react-router';
import AdminNav from './AdminNav';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 pb-16">
      <AdminNav />
      <Outlet />
    </div>
  );
};

export default AdminDashboard;