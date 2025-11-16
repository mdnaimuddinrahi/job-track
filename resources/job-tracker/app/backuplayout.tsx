// app/layout.tsx
import './globals.css';
import Sidebar from '../components/Sidebar';
import React from 'react';
import Header from '@/components/Header';

export const metadata = { title: 'Admin' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 font-sans">

        <div className="flex h-screen">
          
          <Sidebar />

          
          <div className="flex-1 flex flex-col">
            <Header />
            

            
            <main className="flex-1 p-6 overflow-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                <div className="bg-white p-4 rounded shadow">
                  <h2 className="text-lg font-semibold">Users</h2>
                  <p className="text-2xl font-bold mt-2">1,245</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <h2 className="text-lg font-semibold">Sales</h2>
                  <p className="text-2xl font-bold mt-2">$12,345</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <h2 className="text-lg font-semibold">Orders</h2>
                  <p className="text-2xl font-bold mt-2">320</p>
                </div>
                <div className="bg-white p-4 rounded shadow">
                  <h2 className="text-lg font-semibold">Feedback</h2>
                  <p className="text-2xl font-bold mt-2">87</p>
                </div>
              </div>

              
              <div className="mt-8 bg-white rounded shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4">John Doe</td>
                      <td className="px-6 py-4">john@example.com</td>
                      <td className="px-6 py-4">Admin</td>
                      <td className="px-6 py-4">Active</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4">Jane Smith</td>
                      <td className="px-6 py-4">jane@example.com</td>
                      <td className="px-6 py-4">Editor</td>
                      <td className="px-6 py-4">Inactive</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </main>
          </div>
        </div>

      </body>
    </html>
  );
}
