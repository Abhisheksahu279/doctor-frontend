import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://doctor-backend-qqv2.onrender.com";

const ListCategory = () => {

  const [data, setData] = useState([]);

  const fetchData = async () => {

    try {

      const res = await axios.get(`${API}/list_dr_category`);

      if (res.data.msg === "ok") {
        setData(res.data.result);
      }

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteCat = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this category?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(`${API}/deleteCategory/${id}`);

      setData((prev) =>
        prev.filter((item) => item.id !== id)
      );

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>

      <h2 className="text-2xl font-bold mb-4">
        Category List
      </h2>

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
                  src={`${API}${item.catimage}`}
                  alt={item.catname}
                  className="w-16 h-16 object-cover mx-auto rounded"
                />

              </td>

              <td>

                <button
                  onClick={() => deleteCat(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
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