import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Appointment = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState("");

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/doctors",
        {
          withCredentials: true,
        }
      );
      setDoctors(data.doctors);
    };
    fetchDoctors();
  }, []);

  const handleAppointment = async (e) => {
    {
      try {
        const hasVisitedBool = Boolean(hasVisited);
        const { data } = await axios.post(
          "http://localhost:4000/api/v1/appointment/post",
          {
            firstName,
            lastName,
            email,
            phone,
            nic,
            dob,
            gender,
            appointment_date: appointmentDate,
            department,
            doctor_firstName: doctorFirstName,
            doctor_lastName: doctorLastName,
            address,
            hasVisited: hasVisitedBool,
          },
          {
            withCredentials: true,
            Headers: { "Content-Type": "application/json" },
          }
        );
        toast.success(data.message);
        setFirstName(""),
          setLastName(""),
          setEmail(""),
          setPhone(""),
          setNic(""),
          setDob(""),
          setGender(""),
          setAppointmentDate(""),
          setDepartment(""),
          setDoctorFirstName(""),
          setDoctorLastName(""),
          setHasVisited(""),
          setAddress("");
      } catch (error) {
        toast.error(error.response.data.message);
      }

      e.preventDefault();
    }
  };
  return (
    <div className="container form-component appointment-form">
      <h2>Appointment</h2>

      <form onSubmit={handleAppointment}>
        <div>
          <input
            type="text"
            value={firstName}
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            value={lastName}
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="text"
            value={email}
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="number"
            value={phone}
            placeholder="Contact Number"
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            value={nic}
            placeholder="NIC"
            onChange={(e) => setNic(e.target.value)}
          />
          <input
            type="date"
            value={dob}
            placeholder="date of birth"
            onChange={(e) => setDob(e.target.value)}
          />
        </div>
        <div>
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input
            type="date"
            placeholder="Appointment Date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
          />
        </div>
        <div>
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setDoctorFirstName("");
              setDoctorLastName("");
            }}
          >
            {departmentsArray.map((depart, index) => {
              return (
                <option value={depart} key={index}>
                  {depart}
                </option>
              );
            })}
          </select>
          <select
            value={`${doctorFirstName} ${doctorLastName}`}
            onChange={(e) => {
              const [firstName, lastName] = e.target.value.split(" ");
              setDoctorFirstName(firstName);
              setDoctorLastName(lastName);
            }}
            disabled={!department}
          >
            <option value="">Select Doctor</option>
            {doctors
              .filter((doctor) => doctor.doctorDepartment === department)
              .map((doctor, index) => (
                <option
                  value={`${doctor.firstName} ${doctor.lastName}`}
                  key={index}
                >
                  {doctor.firstName} {doctor.lastName}
                </option>
              ))}
          </select>
        </div>
        <textarea
          rows="4"
          value={address}
          placeholder="Address"
          onChange={(e) => setAddress(e.target.value)}
        />
        <div
          style={{
            gap: "10px",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <p style={{ marginBottom: 0 }}>Have you visited before?</p>
          <input
            type="checkbox"
            checked={hasVisited}
            onChange={(e) => setHasVisited(e.target.checked)}
            style={{ flex: "none", width: "25px" }}
          />
        </div>
        <div style={{ justifyContent: "center", alignItems: "center" }}>
          <button type="submit">GET APPOINTMENT</button>
        </div>
      </form>
    </div>
  );
};

export default Appointment;
