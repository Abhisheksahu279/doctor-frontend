import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/Home";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Myprofile from "./pages/Myprofile";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import Footer from "./components/Footer";
import Appointment from "./pages/Appointment";
import MyAppointments from "./pages/MyAppointments";
import ListCategory from "./components/Admin/ListCategory";
import ListDoctor from "./components/Admin/ListDoctor";
// Admin
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHome from "./components/Admin/AdminHome";
import AddCategory from "./components/Admin/AddCategory";
import AddDoctor from "./components/Admin/AddDoctor";
import UpdateCategory from "./components/Admin/UpdateCategory";

import Register from "./pages/Register";


function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  // USER UI 
  if (!isAdminRoute) {
    return (
      <div className="mx-4 sm:mx-[10%]">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:speciality" element={<Doctors />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/my-profile" element={<Myprofile />} />
          <Route path="/my-appointments" element={<MyAppointments />} />
          <Route path="/appointment/:docId" element={<Appointment />} />
        </Routes>

        <Footer />
      </div>
    );
  }

  //  ADMIN PANEL
  return (
    <Routes>
      <Route path="/admin" element={<AdminLayout />}>
      <Route index element={<AdminHome />} />


        <Route path="addcategory" element={<AddCategory />} />
        <Route path="adddoctor" element={<AddDoctor />} />
        <Route path="updatecategory/:id" element={<UpdateCategory />} />

        <Route path="listcategory" element={<ListCategory />} />
        <Route path="listdoctor" element={<ListDoctor />} />


      </Route>
    </Routes>
  );
}

export default App;