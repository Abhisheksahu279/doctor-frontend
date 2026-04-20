// src/components/Admin/UpdateCategory.jsx

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API = "https://doctor-backend-qqv2.onrender.com";

const UpdateCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [catname, setCatName] = useState("");
  const [image, setImage] = useState(null);
  const [msg, setMsg] = useState("");

  // ✅ FETCH EXISTING DATA (IMPORTANT)
  useEffect(() => {
    axios.get(`${API}/list_dr_category`)
      .then((res) => {
        if (res.data.msg === "ok") {
          const cat = res.data.result.find(
            (item) => item.id === Number(id)
          );

          if (cat) {
            setCatName(cat.catname);
          }
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  // ✅ UPDATE FUNCTION
  const updateCat = async () => {
    if (!catname) {
      setMsg("Category name required ❌");
      return;
    }

    let formdata = new FormData();
    formdata.append("catname", catname);

    if (image) {
      formdata.append("image", image);
    }

    try {
      const res = await axios.put(
        `${API}/updateCategory/${id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (res.data.msg) {
        setMsg("Updated successfully ✅");

        setTimeout(() => {
          navigate("/admin/listcategory");
        }, 1000);

      } else {
        setMsg("Update failed ❌");
      }

    } catch (err) {
      console.log(err);
      setMsg("Server error ❌");
    }
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