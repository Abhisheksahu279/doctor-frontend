import React, { useEffect, useState } from "react";
import axios from "axios";

const AddDoctor = () => {
  const [errmsg, setErrMsg] = useState("");
  const [msg, setMsg] = useState("");
  const [catlist, setCatlist] = useState([]);

  const [drname, setDrName] = useState("");
  const [dr_catid, setDr_catId] = useState("");
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [pwd, setPWD] = useState("");
  const [dob, setDob] = useState("");
  const [doj, setDoj] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [gender, setGender] = useState("");

  // 🔥 NEW FIELDS
  const [degree, setDegree] = useState("");
const [experience, setExperience] = useState("");
const [fees, setFees] = useState("");
const [about, setAbout] = useState("");

  useEffect(() => {
   axios.get("https://doctor-backend-qqv2.onrender.com/list_dr_category")
      .then((response) => {
        if (response.data.msg === "ok") {
          setCatlist(response.data.result);
        } else {
          setErrMsg("No categories found");
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const setDrImage = (event) => {
    setImage(event.target.files[0]);
  };

  const addDrSubmit = (event) => {
    event.preventDefault();

    if (!drname || !email || !pwd) {
      setErrMsg("Please fill all required fields");
      return;
    }

    if (!dr_catid) {
      setErrMsg("Please select category");
      return;
    }

    if (!doj) {
      setErrMsg("Please select Date of Joining");
      return;
    }

    if (!image) {
      setErrMsg("Please upload image");
      return;
    }

    let formdataObject = new FormData();

    formdataObject.append("drname", drname);
    formdataObject.append("image", image);
    formdataObject.append("dr_catid", Number(dr_catid));
    formdataObject.append("gender", gender);
    formdataObject.append("dob", dob);
    formdataObject.append("doj", doj);
    formdataObject.append("address1", address1);
    formdataObject.append("address2", address2);
    formdataObject.append("email", email);
    formdataObject.append("pwd", pwd);

    // 🔥 ADD NEW DATA
    formdataObject.append("degree", degree);
    formdataObject.append("experience", experience);
    formdataObject.append("fees", fees);
    formdataObject.append("about", about);

   axios.get("https://doctor-backend-qqv2.onrender.com/addDrSubmit", formdataObject)
      .then((response) => {
        if (response.data.result > 0) {
          setMsg("Doctor saved successfully");
          setErrMsg("");

          // RESET
          setDrName("");
          setDr_catId("");
          setImage(null);
          setEmail("");
          setPWD("");
          setDob("");
          setDoj("");
          setAddress1("");
          setAddress2("");
          setGender("");
          setDegree("");
          setExperience("");
          setFees("");
          setAbout("");
        } else {
          setErrMsg(response.data.error);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Add Doctor
      </h2>

      {msg && <p className="text-green-600 mb-4">{msg}</p>}
      {errmsg && <p className="text-red-600 mb-4">{errmsg}</p>}

      <div className="bg-white p-6 rounded-xl shadow-md">
        <form onSubmit={addDrSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">

          <input type="text" placeholder="Doctor Name"
            value={drname} onChange={(e) => setDrName(e.target.value)}
            className="border p-2 rounded" />

          <input type="file" onChange={setDrImage} className="border p-2 rounded" />

          <select value={dr_catid} onChange={(e) => setDr_catId(e.target.value)}
            className="border p-2 rounded">
            <option value="">Select Category</option>
            {catlist.map((c) => (
              <option key={c.id} value={c.id}>{c.catname}</option>
            ))}
          </select>

          <select value={gender} onChange={(e) => setGender(e.target.value)}
            className="border p-2 rounded">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>

          <input type="date" value={dob} onChange={(e) => setDob(e.target.value)}
            className="border p-2 rounded" />

          <input type="date" value={doj} onChange={(e) => setDoj(e.target.value)}
            className="border p-2 rounded" />

          {/* 🔥 NEW FIELDS UI */}
          <input type="text" placeholder="Degree (MBBS, MD...)"
            value={degree} onChange={(e) => setDegree(e.target.value)}
            className="border p-2 rounded" />

          <input type="number" placeholder="Experience (years)"
            value={experience} onChange={(e) => setExperience(e.target.value)}
            className="border p-2 rounded" />

          <input type="number" placeholder="Fees"
            value={fees} onChange={(e) => setFees(e.target.value)}
            className="border p-2 rounded" />

          <textarea placeholder="About Doctor"
            value={about} onChange={(e) => setAbout(e.target.value)}
            className="border p-2 rounded md:col-span-2"
          />

          <input type="text" placeholder="Address 1"
            value={address1} onChange={(e) => setAddress1(e.target.value)}
            className="border p-2 rounded md:col-span-2" />

          <input type="text" placeholder="Address 2"
            value={address2} onChange={(e) => setAddress2(e.target.value)}
            className="border p-2 rounded md:col-span-2" />

          <input type="email" placeholder="Email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded" />

          <input type="password" placeholder="Password"
            value={pwd} onChange={(e) => setPWD(e.target.value)}
            className="border p-2 rounded" />

          <div className="md:col-span-2">
            <button type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
              Save Doctor
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AddDoctor;