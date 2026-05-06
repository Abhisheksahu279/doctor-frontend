import React, { useEffect, useState } from "react";
import axios from "axios";

const API = "https://doctor-backend-qqv2.onrender.com";

const AddDoctor = () => {
  const [errmsg, setErrMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [catlist, setCatlist] = useState([]);

  const [drname, setDrName] = useState("");
  const [dr_catid, setDr_catId] = useState("");
  const [image, setImage] = useState(null);

  // ================= GET CATEGORY =================

  useEffect(() => {
    axios
      .get(`${API}/list_dr_category`)
      .then((response) => {
        if (response.data.msg === "ok") {
          setCatlist(response.data.result);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // ================= IMAGE =================

  const setDrImage = (event) => {
    setImage(event.target.files[0]);
  };

  // ================= ADD DOCTOR =================

  const addDrSubmit = async (event) => {
    event.preventDefault();

    if (!drname || !image || !dr_catid) {
      setErrMsg("Please fill all fields");
      return;
    }

    let formdataObject = new FormData();

    formdataObject.append("dr_name", drname);
    formdataObject.append("dr_catid", dr_catid);
    formdataObject.append("image", image);

    try {
      const response = await axios.post(
        `${API}/addDrSubmit`,
        formdataObject,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.msg === "Doctor added") {
        setMsg("Doctor added successfully ✅");
        setErrMsg("");

        setDrName("");
        setDr_catId("");
        setImage(null);

      } else {
        setErrMsg(response.data.error);
      }

    } catch (error) {
      console.log(error);
      setErrMsg("Server error ❌");
    }
  };

  return (
    <div className="w-full">

      <h2 className="text-3xl font-bold mb-6">
        Add Doctor
      </h2>

      {msg && <p className="text-green-600">{msg}</p>}
      {errmsg && <p className="text-red-600">{errmsg}</p>}

      <form
        onSubmit={addDrSubmit}
        className="bg-white p-6 rounded-xl shadow-md space-y-4"
      >

        <input
          type="text"
          placeholder="Doctor Name"
          value={drname}
          onChange={(e) => setDrName(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <select
          value={dr_catid}
          onChange={(e) => setDr_catId(e.target.value)}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Category</option>

          {catlist.map((c) => (
            <option key={c.id} value={c.id}>
              {c.catname}
            </option>
          ))}
        </select>

        <input
          type="file"
          onChange={setDrImage}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save Doctor
        </button>

      </form>
    </div>
  );
};

export default AddDoctor;