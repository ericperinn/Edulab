import React from 'react';
import NavBar from './NavBar';
import '../styles/CoursePage.css';
import cursoImage from '../images/cursoImage.jpg'; // Import your course image

function CoursePage() {
  return (
    <div className="course-page-container">
      <NavBar />
      <div className="course-content">
        <div className="course-info">
          <h2 className="course-title">Course Title</h2>
          <p className="course-details">
            <span>Professor: John Doe</span><br />
            <span>Local: University Campus</span><br />
            <span>Horário: 10:00 AM - 12:00 PM</span><br />
          </p><br />
          <p className="course-description">
            This is the course description. You can provide details about the course content, objectives, and more.
          </p><br />
          <button className="enroll-button">Inscrever-se</button>
        </div>
        <div className="course-divider"></div>
        <div className="course-image-container">
          <img src={cursoImage} alt="Course" className="course-image" />
        </div>
      </div>
    </div>
  );
}

export default CoursePage;
