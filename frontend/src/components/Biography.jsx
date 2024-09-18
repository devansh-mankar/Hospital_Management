import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="about-image" />
      </div>

      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>

        <p>
          Our healthcare website allows users to easily book appointments,
          access medical records, and consult with doctors online. Patients can
          view personalized health insights, track medications, and manage
          prescriptions. With secure, user-friendly navigation, it empowers
          patients to take control of their health and well-being from any
          device.
        </p>

        <p>
          Book appointments, access records, consult doctors, manage
          prescriptions.
        </p>
        <p>Book, consult, access records, manage prescriptions.</p>
        <p>
          Users can easily navigate our healthcare website to schedule
          appointments, view medical records, and connect with healthcare
          professionals for online consultations. The platform also allows for
          prescription management and personalized health insights, making it a
          comprehensive tool for health management.
        </p>
        <p>
          Schedule appointments, view records, consult doctors, manage
          prescriptions, track health, access results.
        </p>
        <p>Eat || Sleep || Zeecare</p>
      </div>
    </div>
  );
};

export default Biography;
