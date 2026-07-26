import React from 'react';
import { Outlet } from 'react-router';
import AdminNav from './AdminNav';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50/50 flex">
      
      <AdminNav />

   
      <main className="flex-1 ml-64 min-h-screen pb-16">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;