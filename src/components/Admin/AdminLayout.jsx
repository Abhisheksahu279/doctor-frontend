import React from "react";
import { Link, Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

     
      <div className="w-64 bg-gray-900 text-white p-5">
        <h2 className="text-xl font-bold mb-6 text-center">Admin Panel</h2>

        <ul className="space-y-4">
          <li>
            <Link to="/admin" className="block px-4 py-2 rounded hover:bg-gray-700">
              Dashboard
            </Link>
          </li>

          <li>
            <Link to="/admin/addcategory" className="block px-4 py-2 rounded hover:bg-gray-700">
              Add Category
            </Link>
          </li>

          <li>
            <Link to="/admin/adddoctor" className="block px-4 py-2 rounded hover:bg-gray-700">
              Add Doctor
            </Link>
          </li>

          <li>
             <Link to="/admin/listcategory" className="block px-4 py-2 rounded hover:bg-gray-700">List Category</Link>
         </li>

        <li>
          <Link to="/admin/listdoctor" className="block px-4 py-2 rounded hover:bg-gray-700">List Doctor</Link>
        </li>
        </ul>
      </div>

      
      <div className="flex-1 p-6">
        <div className="bg-white p-6 rounded-xl shadow-md min-h-full">
          <Outlet /> 
        </div>
      </div>

    </div>
  );
};

export default AdminLayout;