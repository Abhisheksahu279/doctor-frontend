import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://doctor-backend-qqv2.onrender.com";

const ListDoctor = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  // ================= FETCH =================
  const fetchData = async () => {
    setLoading(true);

    try {
      const res = await axios.get(`${API}/alldoctorslist`);

      if (res.data?.msg === "ok") {
        setData(res.data?.result || []);
      } else {
        setData([]);
      }

    } catch (err) {
      console.log(err);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= DELETE =================
  const deleteDoctor = async (id) => {
    const confirmDelete = window.confirm("Delete this doctor? ❗");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/deleteDoctor/${id}`);

      setData((prev) => (prev || []).filter((doc) => doc.id !== id));

    } catch (err) {
      console.log(err);
      alert("Delete failed ❌");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Doctor List</h2>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (data || []).length === 0 ? (
        <p className="text-red-500">No doctors found</p>
      ) : (
        <table className="w-full border shadow-md">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2">ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {(data || []).map((item) => (
              <tr key={item.id} className="text-center border hover:bg-gray-50">

                <td className="p-2">{item.id}</td>

                <td>{item.dr_name}</td>

                <td>{item.catname || "N/A"}</td>

                <td>
                  {item.dr_image ? (
                    <img
                      src={`data:image/jpeg;base64,${item.dr_image}`}
                      alt="doctor"
                      className="w-16 h-16 object-cover mx-auto rounded"
                    />
                  ) : (
                    <p>No Image</p>
                  )}
                </td>

                <td>
                  <button
                    onClick={() => deleteDoctor(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListDoctor;