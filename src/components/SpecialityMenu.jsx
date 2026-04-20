import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SpecialityMenu = () => {
  const [catlist, setCatList] = useState([]);
  const [errmsg, setErrMsg] = useState("");

  const navigate = useNavigate(); // 

  useEffect(() => {
    axios.get("https://doctor-backend-qqv2.onrender.com/list_dr_category")
      .then((response) => {
        if (response.data.msg === "ok") {
          setCatList(response.data.result);
        } else {
          setErrMsg(response.data.msg);
        }
      })
      .catch((err) => {
        console.log(err);
        setErrMsg("Server error");
      });
  }, []);

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-800">
      <h1 className="text-3xl font-medium">Find by Speciality</h1>

      <p className="sm:w-1/3 text-center text-sm">
        Simple browse through our extensive list of trusted doctors,
        schedule your appointment hassle-free.
      </p>

      {errmsg && <p className="text-red-500">{errmsg}</p>}

      <div className="flex flex-wrap justify-center gap-6 pt-5 w-full">

        {catlist.length > 0 ? (
          catlist.map((category) => (
            <div
              key={category.id}
              onClick={() =>
                navigate(`/doctors/${encodeURIComponent(category.catname)}`)
              }
              className="flex flex-col items-center w-24 cursor-pointer hover:scale-105 transition"
            >
              
              {category.catimage ? (
                <img
                  className="w-16 h-16 sm:w-20 sm:h-20 mb-2 object-cover rounded-full"
                  src={`data:image/jpeg;base64,${category.catimage}`}
                  alt={category.catname}
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 flex items-center justify-center rounded-full">
                  No Image
                </div>
              )}

              <p className="text-center text-sm">{category.catname}</p>

            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}

      </div>
    </div>
  );
};

export default SpecialityMenu;