// src/components/Admin/UpdateCategory.jsx

import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [catname, setCatName] = useState("");
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  const updateCat = () => {
    let formdata = new FormData();
    formdata.append("catname", catname);

    if (image) {
      formdata.append("image", image);
    }

    axios.put(`https://doctor-backend-qqv2.onrender.com/updateCategory/${id}`, formdata)
      .then((res) => {
        if (res.data.msg) {
          setMsg("Updated successfully ✅");

          // redirect after update
          setTimeout(() => {
            navigate("/admin/listcategory");
          }, 1000);
        } else {
          setMsg("Update failed ❌");
        }
      })
      .catch((err) => {
        console.log(err);
        setMsg("Error ❌");
      });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Update Category</h2>

      <input
        type="text"
        placeholder="Category Name"
        value={catname}
        onChange={(e) => setCatName(e.target.value)}
        className="border p-2 rounded mb-3 w-full"
      />

      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        className="border p-2 rounded mb-3 w-full"
      />

      <button
        onClick={updateCat}
        className="bg-yellow-500 text-white px-4 py-2 rounded"
      >
        Update
      </button>

      {msg && <p className="mt-3">{msg}</p>}
    </div>
  );
};

export default UpdateCategory;