import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://doctor-backend-qqv2.onrender.com";

const ListCategory = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/list_dr_category`);

      if (res.data?.msg === "ok") {
        setData(res.data?.result || []);
      } else {
        setData([]);
      }
    } catch (err) {
      console.log(err);
      setData([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= DELETE CATEGORY =================
  const deleteCat = async (id) => {
    const confirmDelete = window.confirm("Delete this category?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/deleteCategory/${id}`);

      // safe UI update
      setData((prev) => (prev || []).filter((item) => item.id !== id));

    } catch (err) {
      console.log(err);
      alert("Delete failed ❌");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Category List</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {(data || []).length > 0 ? (
            (data || []).map((item) => (
              <tr key={item.id} className="text-center border">

                <td>{item.id}</td>

                <td>{item.catname}</td>

                <td>
                  {item.catimage ? (
                    <img
                      src={`data:image/jpeg;base64,${item.catimage}`}
                      alt="category"
                      className="w-16 h-16 object-cover mx-auto rounded"
                    />
                  ) : (
                    <span>No Image</span>
                  )}
                </td>

                <td className="space-x-2">
                  <button
                    onClick={() => deleteCat(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() =>
                      navigate(`/admin/updatecategory/${item.id}`)
                    }
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4">
                No categories found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListCategory;