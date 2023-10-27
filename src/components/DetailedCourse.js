import React from 'react';
import { useParams } from 'react-router-dom';

function DetailedCourse({ course }) {
    const { id } = useParams();
  return (
    <div className="detailed-course">
      <h2>{course.name}</h2>
      <p>Descrição: {course.description}</p>
      <p>Local: {course.location}</p>
      <p>Horário: {course.time}</p>
      <p>Convidado: {course.guestName}</p>
      {/* Add an enrollment button and logic here */}
    </div>
  );
}






export default DetailedCourse;
