import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Zeecare is the state-of-the-art facility dedicated to providing
          comprehensive healthcare services with compassion and expertise. Our
          team of skilled professionals is committed to delivering personalized
          care tailored to each patient's need.At Zeecare,we prioritize your
          well-being,enduring a harmonious journey towards optimal health and
          wellness.
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className="animated-image" />
        <span>
          <img src="/vector.png" alt="vector" />
        </span>
      </div>
    </div>
  );
};

export default Hero;
