// used for the delete category
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ListCategory = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // ================= FETCH DATA =================
  const fetchData = () => {
   axios.get("https://doctor-backend-qqv2.onrender.com/list_dr_category")
      .then((res) => {
        if (res.data.msg === "ok") {
          setData(res.data.result);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= DELETE CATEGORY =================
  const deleteCat = (id) => {
    if (!window.confirm("Delete this category?")) return;

    axios.delete(`https://doctor-backend-qqv2.onrender.com/deleteCategory/${id}`)
      .then((res) => {
        console.log(res.data);

        // refresh list after delete
        fetchData();
      })
      .catch((err) => {
        console.log(err);
        alert("Delete failed");
      });
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
          {data.map((item) => (
            <tr key={item.id} className="text-center border">

              <td>{item.id}</td>

              <td>{item.catname}</td>

              <td>
                <img
                  src={`data:image/jpeg;base64,${item.catimage}`}
                  alt="category"
                  className="w-16 h-16 object-cover mx-auto rounded"
                />
              </td>

              <td className="space-x-2">
                <button
                  onClick={() => deleteCat(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>

                <button
                  onClick={() => navigate(`/admin/updatecategory/${item.id}`)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListCategory;