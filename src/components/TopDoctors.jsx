import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TopDoctors = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);

  // ✅ Fetch doctors from backend
  useEffect(() => {
   axios.get("https://doctor-backend-qqv2.onrender.com/alldoctorslist")
      .then((res) => {
        if (res.data.msg === "ok") {
          setDoctors(res.data.result);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">

      <h1 className="text-3xl font-medium">Top Doctors to Book</h1>

      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {/* ✅ FIXED GRID */}
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-5 px-3 sm:px-0">

        {doctors.length > 0 ? (
          doctors.slice(0, 8).map((doc) => (
            <div
              key={doc.id}
              onClick={() => {
                navigate(`/appointment/${doc.id}`);
                window.scrollTo(0, 0);
              }}
              className="bg-white border rounded-xl shadow hover:shadow-lg transition p-4 cursor-pointer"
            >
              {/* Image */}
              <img
                src={`data:image/jpeg;base64,${doc.dr_image}`}
                className="w-full h-40 object-cover rounded-lg"
                alt="doctor"
              />

              {/* Info */}
              <div className="mt-3 text-center">
                <h3 className="text-lg font-semibold">{doc.dr_name}</h3>
                <p className="text-sm text-gray-500">{doc.catname}</p>

                <div className="flex justify-center items-center gap-2 mt-2 text-green-500 text-sm">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Available
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}

      </div>

      {/* Button */}
      <button
        onClick={() => {
          navigate("/doctors");
          window.scrollTo(0, 0);
        }}
        className="bg-blue-500 text-white px-8 py-3 rounded-full mt-10 hover:bg-blue-600"
      >
        More
      </button>
    </div>
  );
};

export default TopDoctors;