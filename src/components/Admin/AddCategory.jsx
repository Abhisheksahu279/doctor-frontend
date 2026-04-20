import React, { useState, useRef } from 'react';
import axios from 'axios';

// ✅ API BASE
const API = "https://doctor-backend-qqv2.onrender.com";

const AddCategory = () => {

    const [catname, setCatName] = useState('');
    const [image, setImage] = useState(null);
    const [msg, setMsg] = useState('');
    const fileInputRef = useRef();

    const setcatimage = (event) => {
        setImage(event.target.files[0]);
    };

    const addCatSubmit = async () => {

        if (!catname || !image) {
            alert("Fill all fields");
            return;
        }

        let formdataObject = new FormData();
        formdataObject.append('image', image);
        formdataObject.append('catname', catname);

        try {
            // ✅ FIXED → POST instead of GET
            const response = await axios.post(
                `${API}/addCategorySubmit`,
                formdataObject,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                }
            );

            if (response.data.msg === "ok") {
                setMsg("Category added successfully ✅");
            } else {
                setMsg(response.data.error);
            }

            setCatName('');
            setImage(null);
            fileInputRef.current.value = "";

        } catch (error) {
            console.log(error);
            setMsg("Error occurred ❌");
        }
    };

    return (
        <div className="w-full">

            <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Add Category
            </h2>

            <div className="bg-white shadow-md rounded-xl p-6 max-w-lg">

                <div className="space-y-4">

                    <input 
                        type="text"
                        placeholder="Category Name"
                        value={catname}
                        onChange={(e) => setCatName(e.target.value)}
                        className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-400"
                    />

                    <input 
                        type="file"
                        onChange={setcatimage}
                        ref={fileInputRef}
                        className="w-full border p-2 rounded"
                    />

                    <button 
                        onClick={addCatSubmit}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                    >
                        Add Category
                    </button>

                    {msg && <p className="text-green-600">{msg}</p>}
                </div>

            </div>
        </div>
    );
};

export default AddCategory;