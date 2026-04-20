import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const Appointment = () => {
  const { docId } = useParams();
  const navigate = useNavigate();

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [reason, setReason] = useState("");

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  // AUTO FILL
  useEffect(() => {
    if (user) {
      setPatientName(user.name || "");
      setPatientEmail(user.email || "");
    }
  }, []);

  // FETCH DOCTOR
  useEffect(() => {
    axios.get("http://localhost:8080/alldoctorslist")
      .then((res) => {
        if (res.data.msg === "ok") {
          const doctor = res.data.result.find(
            (d) => d.id === Number(docId)
          );
          setDocInfo(doctor);
        }
      });
  }, [docId]);

  // GENERATE SLOTS
  useEffect(() => {
    if (!docInfo) return;

    let today = new Date();
    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      currentDate.setHours(10, 0);

      let timeSlots = [];

      while (currentDate < endTime) {
        timeSlots.push({
          dateTime: new Date(currentDate),
          time: currentDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  }, [docInfo]);

  // BOOK APPOINTMENT
  const bookAppointment = async () => {
    if (!slotTime) return alert("Please select time ❌");
    if (!patientName || !patientEmail || !patientPhone || !reason)
      return alert("Please fill all details ❌");
    if (!userId) return alert("Please login first ❌");

    const selectedDate =
      docSlots[slotIndex]?.[0]?.dateTime.toISOString().split("T")[0];

    try {
      const response = await axios.post(
        "http://localhost:8080/bookAppointment",
        {
          doc_id: docId,
          user_id: userId,
          patient_name: patientName,
          patient_email: patientEmail,
          patient_phone: patientPhone,
          reason: reason,
          app_date: selectedDate,
          app_time: slotTime,
        }
      );

      if (response.data.msg === "ok") {
        alert("Appointment Booked Successfully ✅");
        setPatientPhone("");
        setReason("");
        navigate("/my-appointments", { replace: true });
      } else {
        alert(response.data.error);
      }
    } catch (err) {
      console.log(err);
      alert("Server error ❌");
    }
  };

  return (
    docInfo && (
      <div className="p-6">

        {/* Doctor Info */}
        <div className="flex gap-6 mb-6">
          <img
            src={`data:image/jpeg;base64,${docInfo.dr_image}`}
            className="w-40 rounded"
            alt=""
          />

          <div>
            <h2 className="text-2xl font-bold">{docInfo.dr_name}</h2>
            <p className="text-gray-500">{docInfo.catname}</p>

            {/* ✅ NEW DATA */}
            <div className="mt-3 space-y-1 text-gray-700">
              <p><b>Degree:</b> {docInfo.degree || "N/A"}</p>
              <p><b>Experience:</b> {docInfo.experience || 0} years</p>
              <p><b>Fees:</b> ₹{docInfo.fees || 0}</p>
            </div>

            <p className="mt-3 text-gray-600">
              <b>About:</b> {docInfo.about || "No details available"}
            </p>
          </div>
        </div>

        {/* Slots */}
        <h3 className="text-lg font-semibold">Select Slot</h3>

        <div className="flex gap-3 mt-3 overflow-x-scroll">
          {docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSlotIndex(index);
                setSlotTime("");
              }}
              className={`cursor-pointer p-3 rounded-full text-center ${
                slotIndex === index
                  ? "bg-blue-500 text-white"
                  : "border"
              }`}
            >
              <p>{daysOfWeek[new Date(item[0]?.dateTime).getDay()]}</p>
              <p>{new Date(item[0]?.dateTime).getDate()}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-3 mt-4 overflow-x-scroll">
          {docSlots[slotIndex]?.map((item, index) => (
            <p
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`px-4 py-2 rounded-full cursor-pointer ${
                slotTime === item.time
                  ? "bg-blue-500 text-white"
                  : "border"
              }`}
            >
              {item.time}
            </p>
          ))}
        </div>

        {/* FORM */}
        <div className="mt-6 space-y-3">
          <input
            type="text"
            placeholder="Your Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <input
            type="email"
            placeholder="Your Email"
            value={patientEmail}
            onChange={(e) => setPatientEmail(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <input
            type="text"
            placeholder="Phone Number"
            value={patientPhone}
            onChange={(e) => setPatientPhone(e.target.value)}
            className="border p-2 rounded w-full"
          />

          <textarea
            placeholder="Reason for visit"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          onClick={bookAppointment}
          className="bg-blue-500 text-white px-10 py-3 rounded mt-6"
        >
          Book Appointment
        </button>
      </div>
    )
  );
};

export default Appointment;