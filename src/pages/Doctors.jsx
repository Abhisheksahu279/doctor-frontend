import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Doctors = () => {
  const { speciality } = useParams();

  const [catList, setCatList] = useState([]);
  const [drlist, setDrList] = useState([]);
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);

  const navigate = useNavigate();

  // 🔥 Fetch categories
  useEffect(() => {
    axios.get("http://localhost:8080/list_dr_category")
      .then(res => {
        if (res.data.msg === "ok") {
          setCatList(res.data.result);
        }
      });
  }, []);

  // 🔥 Fetch doctors
  useEffect(() => {
    axios.get("http://localhost:8080/alldoctorslist")
      .then(res => {
        if (res.data.msg === "ok") {
          setDrList(res.data.result);
        }
      });
  }, []);

  // 🔥 Filter doctors based on category
  useEffect(() => {
    if (speciality) {
      const decoded = decodeURIComponent(speciality);

      const filtered = drlist.filter(
        (doc) =>
          doc.catname?.toLowerCase().trim() ===
          decoded.toLowerCase().trim()
      );

      setFilterDoc(filtered);
    } else {
      setFilterDoc(drlist);
    }
  }, [speciality, drlist]);

return (
  <div className="max-w-7xl mx-auto px-4 py-6">

    <h2 className="text-xl text-gray-600 mb-5">
      Browse through the doctors specialist.
    </h2>

    <div className="flex flex-col sm:flex-row gap-6">

      {/* Filter Button (Mobile) */}
      <button
        className="sm:hidden bg-blue-500 text-white px-4 py-2 rounded"
        onClick={() => setShowFilter(!showFilter)}
      >
        Filters
      </button>

      {/* ✅ Sidebar FIXED WIDTH */}
      <div
        className={`
          ${showFilter ? "block" : "hidden"} 
          sm:block 
          sm:w-1/4 
          w-full
        `}
      >
        <div className="flex flex-col gap-3">
          {catList.map((cat) => (
            <div
              key={cat.id}
              onClick={() =>
                speciality === cat.catname
                  ? navigate("/doctors")
                  : navigate(`/doctors/${encodeURIComponent(cat.catname)}`)
              }
              className={`px-4 py-2 border rounded cursor-pointer ${
                decodeURIComponent(speciality || "") === cat.catname
                  ? "bg-blue-100"
                  : "hover:bg-gray-100"
              }`}
            >
              {cat.catname}
            </div>
          ))}
        </div>
      </div>

      {/* ✅ Doctors Grid FIXED */}
      <div className="sm:w-3/4 w-full">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">

          {filterDoc.length > 0 ? (
            filterDoc.map((doc) => (
              <div
                key={doc.id}
                onClick={() => navigate(`/appointment/${doc.id}`)}
                className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4 cursor-pointer"
              >
                <img
                  src={`data:image/jpeg;base64,${doc.dr_image}`}
                  className="w-full h-40 object-cover rounded-lg"
                  alt="doctor"
                />

                <div className="mt-3 text-center">
                  <h3 className="text-lg font-semibold">
                    {doc.dr_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {doc.catname}
                  </p>

                  <div className="flex justify-center items-center gap-2 mt-2 text-green-500 text-sm">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                    Available
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No doctors found</p>
          )}

        </div>

      </div>

    </div>
  </div>
);};

export default Doctors;