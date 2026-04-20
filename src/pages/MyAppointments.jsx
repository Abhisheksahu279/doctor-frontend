import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // ✅ ADDED
import axios from "axios";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  const location = useLocation(); // ✅ ADDED

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // ================= LOAD =================
  useEffect(() => {
    if (!userId) return;

    axios
      .get(`http://localhost:8080/myappointments/${userId}`)
      .then((res) => {
        if (res.data.msg === "ok") {
          setAppointments(res.data.result);
        }
      })
      .catch((err) => console.log(err));
  }, [userId, location]); // ✅ UPDATED (IMPORTANT)

  // ================= DELETE =================
  const deleteAppointment = (id) => {
    if (!window.confirm("Cancel this appointment?")) return;

    axios
      .delete(`http://localhost:8080/deleteAppointment/${id}`)
      .then(() => {
        setAppointments((prev) =>
          prev.filter((item) => item.id !== id)
        );
      })
      .catch((err) => console.log(err));
  };

  // ================= FORMAT DATE =================
  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  };

  return (
    <div className="px-6 py-6">
      <h2 className="text-2xl font-bold mb-6">My Appointments</h2>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments booked</p>
      ) : (
        <div className="space-y-5">
          {appointments.map((item) => (
            <div
              key={item.id}
              className="border rounded-xl p-5 shadow-md flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
            >
              {/* LEFT */}
              <div className="space-y-1">
                <h3 className="text-xl font-semibold text-blue-600">
                  {item.dr_name}
                </h3>

                <p><b>Name:</b> {item.patient_name || "N/A"}</p>
                <p><b>Email:</b> {item.patient_email || "N/A"}</p>
                <p><b>Phone:</b> {item.patient_phone || "N/A"}</p>
                <p><b>Reason:</b> {item.reason || "N/A"}</p>

                <p className="mt-2">
                  <b>Date:</b> {formatDate(item.app_date)}
                </p>

                <p>
                  <b>Time:</b> {item.app_time || "N/A"}
                </p>
              </div>

              {/* RIGHT */}
              <div>
                <button
                  onClick={() => deleteAppointment(item.id)}
                  className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyAppointments;